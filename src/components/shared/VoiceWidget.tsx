import { useState, useRef, useEffect } from 'react';
import { X, Phone, AudioLines, Mic, MicOff, CheckCircle2 } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const VOICE_ASSISTANT_API_URL = 'https://aiml-prod.ngrok.io/api/voice-assistant';
const COMPANY_TOKEN = '26e79b36dd6b6cdc962e96e6b4c4ef6e02f9fc3a';

interface VoiceWidgetProps {
  onOpenChange?: (isOpen: boolean) => void;
}

const VoiceWidget = ({ onOpenChange }: VoiceWidgetProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationStep, setVerificationStep] = useState<'details' | 'otp'>('details');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [verificationMessage, setVerificationMessage] = useState<string | null>(null);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [isVerificationSuccessful, setIsVerificationSuccessful] = useState(false);
  
  const wsRef = useRef<WebSocket | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const isProcessingRef = useRef(false);  // Track if queue is being processed
  const streamSidRef = useRef<string | null>(null);
  const sequenceNumberRef = useRef(0);
  const nextPlayTimeRef = useRef<number>(0);  // For gapless audio playback
  const isMutedRef = useRef<boolean>(false);  // Track mute state for audio processor

  // Assistant ID - you can make this dynamic by passing as prop
  const assistantId = 'dd841ec1-f5ea-4c6d-9b65-f597a961bb67';

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      handleEndCall();
    };
  }, []);

  // Notify parent when open state changes
  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    if (resendCooldown === 0) return;

    const timer = window.setInterval(() => {
      setResendCooldown((seconds) => Math.max(seconds - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendCooldown]);

  const getApiMessage = async (response: Response, fallbackMessage: string) => {
    const responseBody = await response.json().catch(() => null) as { message?: string; detail?: string } | null;
    return responseBody?.message || responseBody?.detail || fallbackMessage;
  };

  const sendVerification = async (isResend = false) => {
    const normalizedPhone = phone.replace(/\D/g, '');

    if (!name.trim() || normalizedPhone.length !== 10) {
      setVerificationError('Enter your name and a valid 10-digit mobile number.');
      return;
    }

    if (isResend && resendCooldown > 0) {
      setVerificationMessage(`Please wait ${resendCooldown}s before requesting another OTP.`);
      return;
    }

    setIsSendingOtp(true);
    setVerificationError(null);
    setVerificationMessage(null);

    try {
      const response = await fetch(`${VOICE_ASSISTANT_API_URL}/send-verification/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-company-token': COMPANY_TOKEN,
        },
        body: JSON.stringify({ name: name.trim(), phone: normalizedPhone }),
      });
      const message = await getApiMessage(response, 'Unable to send the OTP. Please try again.');

      if (!response.ok) {
        setVerificationError(message);
        return;
      }

      setPhone(normalizedPhone);
      setVerificationStep('otp');
      setResendCooldown(60);
      setVerificationMessage(message);
    } catch {
      setVerificationError('Unable to reach the verification service. Please try again.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      setVerificationError('Enter the 6-digit OTP received on WhatsApp.');
      return;
    }

    setIsVerifyingOtp(true);
    setVerificationError(null);
    setVerificationMessage(null);

    try {
      const response = await fetch(`${VOICE_ASSISTANT_API_URL}/verify-otp/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-company-token': COMPANY_TOKEN,
        },
        body: JSON.stringify({ phone, otp }),
      });
      const message = await getApiMessage(response, 'OTP verification failed. Please try again.');

      if (!response.ok) {
        setVerificationError(message);
        return;
      }

      setIsVerificationSuccessful(true);
      window.setTimeout(() => {
        setIsVerificationOpen(false);
        setIsVerificationSuccessful(false);
        void handleStartCall();
      }, 1200);
    } catch {
      setVerificationError('Unable to reach the verification service. Please try again.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // μ-law codec functions (from working implementation)
  const pcm16ToMulaw = (pcm16Array: Int16Array): Uint8Array => {
    const mulawArray = new Uint8Array(pcm16Array.length);
    for (let i = 0; i < pcm16Array.length; i++) {
      let sample = pcm16Array[i];
      const sign = (sample >> 8) & 0x80;
      if (sign !== 0) sample = -sample;
      if (sample > 32635) sample = 32635;
      sample = sample + 0x84;
      const exponent = Math.floor(Math.log2(sample / 33));
      const mantissa = (sample >> (exponent + 3)) & 0x0F;
      const mulaw = ~(sign | (exponent << 4) | mantissa);
      mulawArray[i] = mulaw & 0xFF;
    }
    return mulawArray;
  };

  const mulawToPcm16 = (mulawArray: Uint8Array): Int16Array => {
    const pcm16Array = new Int16Array(mulawArray.length);
    for (let i = 0; i < mulawArray.length; i++) {
      let mulaw = ~mulawArray[i];
      const sign = (mulaw & 0x80) !== 0;
      const exponent = (mulaw >> 4) & 0x07;
      const mantissa = mulaw & 0x0F;
      let sample = ((mantissa << 3) + 0x84) << exponent;
      sample = sample - 0x84;
      if (sign) sample = -sample;
      pcm16Array[i] = sample;
    }
    return pcm16Array;
  };

  // Play received audio from assistant with proper scheduling
  const playAudio = async (base64Audio: string) => {
    try {
      console.log('[Audio] Received audio chunk, length:', base64Audio.length);
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 8000 });
        console.log('[Audio] Created AudioContext at 8kHz');
      }

      const audioContext = audioContextRef.current;
      console.log('[Audio] AudioContext state:', audioContext.state);
      
      // CRITICAL: Resume context if suspended (required for Chrome autoplay policy)
      if (audioContext.state === 'suspended') {
        console.log('[Audio] Attempting to resume AudioContext...');
        await audioContext.resume();
        console.log('[Audio] AudioContext resumed successfully, new state:', audioContext.state);
      }
      
      // Decode base64
      const binaryString = atob(base64Audio);
      const mulawData = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        mulawData[i] = binaryString.charCodeAt(i);
      }
      console.log('[Audio] Decoded base64 to μ-law, bytes:', mulawData.length);

      // Decode μ-law to PCM16
      const pcm16Data = mulawToPcm16(mulawData);
      console.log('[Audio] Converted μ-law to PCM16, samples:', pcm16Data.length);
      
      // Convert to Float32 for Web Audio API
      const float32Data = new Float32Array(pcm16Data.length);
      let maxAmplitude = 0;
      for (let i = 0; i < pcm16Data.length; i++) {
        float32Data[i] = pcm16Data[i] / 32768.0;
        maxAmplitude = Math.max(maxAmplitude, Math.abs(float32Data[i]));
      }
      console.log('[Audio] Converted to Float32, samples:', float32Data.length, 'Max amplitude:', maxAmplitude.toFixed(4));

      // Check if audio has actual content
      if (maxAmplitude < 0.001) {
        console.warn('[Audio] ⚠️ Audio chunk has very low amplitude - might be silence');
      }

      // Create AudioBuffer at 8kHz
      const audioBuffer = audioContext.createBuffer(1, float32Data.length, 8000);
      audioBuffer.getChannelData(0).set(float32Data);

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      
      // Add gain node for volume control and monitoring
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 2.0; // Boost volume to ensure audibility
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // CRITICAL: Schedule playback for gapless audio
      const startTime = Math.max(audioContext.currentTime, nextPlayTimeRef.current);
      console.log('[Audio] Scheduling playback - currentTime:', audioContext.currentTime.toFixed(3), 
                  'startTime:', startTime.toFixed(3), 'duration:', audioBuffer.duration.toFixed(3),
                  'gain:', gainNode.gain.value);
      
      source.onended = () => {
        console.log('[Audio] ✅ Audio chunk playback ended at', audioContext.currentTime.toFixed(3));
      };
      
      source.start(startTime);
      nextPlayTimeRef.current = startTime + audioBuffer.duration;
      console.log('[Audio] Audio chunk scheduled successfully, nextPlayTime:', nextPlayTimeRef.current.toFixed(3));
      
      setIsSpeaking(true);
    } catch (error) {
      console.error('[Audio] Error playing audio:', error);
      setIsSpeaking(false);
    }
  };

  // Queue and play audio - REAL-TIME: play immediately as data arrives
  const queueAudio = (audioData: string) => {
    console.log('[Audio] Received audio chunk, length:', audioData.length);
    audioQueueRef.current.push(audioData);
    console.log('[Audio] Queue size:', audioQueueRef.current.length);
    
    // Don't wait - start processing immediately for real-time conversation
    if (!isProcessingRef.current) {
      console.log('[Audio] Starting queue processing');
      processAudioQueue();
    } else {
      console.log('[Audio] Already processing queue');
    }
  };
  
  // Process audio queue in batches - EXACTLY like working implementation
  const processAudioQueue = async () => {
    if (isProcessingRef.current || audioQueueRef.current.length === 0) {
      return;
    }

    isProcessingRef.current = true;

    try {
      // Initialize playback context if needed
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 8000 });
        console.log('[Audio] Created playback AudioContext at 8kHz');
      }

      const context = audioContextRef.current;
      console.log('[Audio] AudioContext state:', context.state);

      // Resume context for autoplay policy
      if (context.state === 'suspended') {
        console.log('[Audio] Attempting to resume AudioContext...');
        await context.resume();
        console.log('[Audio] AudioContext resumed successfully, new state:', context.state);
      }

      console.log('[Audio] Processing queue with', audioQueueRef.current.length, 'chunks');
      // Process audio chunks in batches
      const batchSize = 10;
      while (audioQueueRef.current.length > 0) {
        const batch = audioQueueRef.current.splice(0, Math.min(batchSize, audioQueueRef.current.length));
        console.log('[Audio] Processing batch of', batch.length, 'chunks, remaining:', audioQueueRef.current.length);
        
        for (const base64Audio of batch) {
          try {
            await playAudio(base64Audio);
          } catch (err) {
            console.error('[Audio] Error processing chunk:', err);
          }
        }

        // Small delay between batches
        if (audioQueueRef.current.length > 0) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }
      }
    } catch (error) {
      console.error('[Audio] Processing error:', error);
    } finally {
      isProcessingRef.current = false;
    }
  };

  // Start recording user audio
  const startRecording = async () => {
    try {
      // Request high-quality audio with proper constraints
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 8000
        }
      });
      
      console.log('[Capture] Microphone access granted');
      audioStreamRef.current = stream;
      
      // Create AudioContext at 8kHz for μ-law
      const audioContext = new AudioContext({ sampleRate: 8000 });
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(1024, 1, 1);
      
      console.log('[Capture] AudioContext created at', audioContext.sampleRate, 'Hz');
      
      let frameCount = 0;
      processor.onaudioprocess = (e) => {
        if (wsRef.current?.readyState === WebSocket.OPEN && !isMutedRef.current) {
          const inputData = e.inputBuffer.getChannelData(0);
          
          // Convert Float32Array to Int16Array (PCM format)
          const pcm16Data = new Int16Array(inputData.length);
          for (let i = 0; i < inputData.length; i++) {
            const s = Math.max(-1, Math.min(1, inputData[i]));
            pcm16Data[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
          }
          
          // Convert PCM16 to μ-law
          const mulawData = pcm16ToMulaw(pcm16Data);
          
          // Convert to base64
          const base64Audio = btoa(String.fromCharCode.apply(null, Array.from(mulawData)));
          
          // Detailed logging every 50th frame
          if (frameCount % 50 === 0) {
            // Check audio levels to verify speech is being captured
            let maxAmplitude = 0;
            for (let i = 0; i < inputData.length; i++) {
              maxAmplitude = Math.max(maxAmplitude, Math.abs(inputData[i]));
            }
            console.log('[Capture] Frame', frameCount, '| PCM16 samples:', pcm16Data.length, 
                        '| μ-law bytes:', mulawData.length, '| base64 length:', base64Audio.length, 
                        '| Max amplitude:', maxAmplitude.toFixed(4));
          }
          frameCount++;
          
          // Send audio in the format expected by server (NO streamSid or sequenceNumber here)
          const message = JSON.stringify({
            event: 'media',
            media: {
              payload: base64Audio
            }
          });
          
          wsRef.current.send(message);
          setIsListening(true);
        }
      };
      
      source.connect(processor);
      processor.connect(audioContext.destination);
      
      // Store for cleanup
      (audioStreamRef.current as any).audioContext = audioContext;
      (audioStreamRef.current as any).processor = processor;
      
      console.log('🎤 Audio capture started at 8kHz with μ-law encoding');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setError('Failed to access microphone. Please check permissions.');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (audioStreamRef.current) {
      // Stop audio context and processor
      const stream = audioStreamRef.current as any;
      if (stream.audioContext) {
        stream.audioContext.close();
      }
      if (stream.processor) {
        stream.processor.disconnect();
      }
      
      audioStreamRef.current.getTracks().forEach(track => track.stop());
      audioStreamRef.current = null;
    }
    
    setIsListening(false);
  };

  const handleStartCall = async () => {
    if (isConnected || isConnecting) return;

    setIsConnecting(true);
    setError(null);

    try {
      // A local voice backend can override this through VITE_WS_URL.
      const wsBaseUrl = import.meta.env.VITE_WS_URL || 'wss://aiservices-prod.ngrok.io';
      
      const wsUrl = `${wsBaseUrl}/ws/voice-stream?token=ds`;
      console.log('[WebSocket] Current page protocol:', window.location.protocol);
      console.log('[WebSocket] Connecting to:', wsUrl);
      
      const ws = new WebSocket(wsUrl);
      
      wsRef.current = ws;
      
      // Set binary type to handle audio data properly
      ws.binaryType = 'arraybuffer';

      ws.onopen = async () => {
        console.log('✅ WebSocket connected successfully');
        console.log('WebSocket readyState:', ws.readyState);
        console.log('WebSocket URL:', ws.url);
        setIsConnected(true);
        setIsConnecting(false);
        
        // Initialize AudioContext immediately with user interaction
        try {
          if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 8000 });
            console.log('[Audio] Created playback AudioContext at 8kHz, initial state:', audioContextRef.current.state);
          }
          
          // CRITICAL: Force resume with retry - required for production HTTPS sites
          const context = audioContextRef.current;
          if (context.state !== 'running') {
            console.log('[Audio] AudioContext state is', context.state, '- attempting to resume...');
            
            // Try multiple times if needed
            for (let i = 0; i < 3; i++) {
              await context.resume();
              console.log('[Audio] Resume attempt', i + 1, 'state:', context.state);
              
              if (context.state === 'running') {
                console.log('[Audio] ✅ AudioContext is now running!');
                break;
              }
              
              // Wait a bit before retry
              await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            if (context.state !== 'running') {
              console.error('[Audio] ❌ AudioContext failed to start after 3 attempts!');
              setError('Audio initialization failed. Please refresh and try again.');
              return;
            }
          }
          
          // Test the audio context with a beep to verify output is working
          console.log('[Audio] Testing audio output with test beep...');
          const testOsc = context.createOscillator();
          const testGain = context.createGain();
          testGain.gain.value = 0.1; // Low volume
          testOsc.connect(testGain);
          testGain.connect(context.destination);
          testOsc.frequency.value = 440; // A note
          testOsc.start(context.currentTime);
          testOsc.stop(context.currentTime + 0.1);
          console.log('[Audio] Test beep sent - if you heard it, audio output is working!');
        } catch (audioError) {
          console.error('❌ Failed to initialize AudioContext:', audioError);
          setError('Failed to initialize audio. Please check your browser permissions.');
        }
        
        // 1. Send params event with assistance_id
        const paramsEvent = {
          event: 'params',
          params: {
            assistance_id: assistantId
          }
        };
        ws.send(JSON.stringify(paramsEvent));
        console.log('📤 1. Sent params event with assistance_id:', assistantId);
        
        // 2. Send connected event
        ws.send(JSON.stringify({ event: 'connected' }));
        console.log('📤 2. Sent connected event');
        
        // 3. Send start event with Twilio-like format
        const streamSid = `stream_${Date.now()}`;
        const startEvent = {
          event: 'start',
          sequenceNumber: '1',
          start: {
            streamSid: streamSid,
            accountSid: 'AC_asktalos',
            callSid: `CA_${assistantId}_${Date.now()}`,
            from: '+1234567890',
            to: '+0987654321',
            direction: 'inbound',
            mediaFormat: {
              encoding: 'audio/x-mulaw',
              sampleRate: 8000,
              channels: 1
            }
          },
          streamSid: streamSid
        };
        ws.send(JSON.stringify(startEvent));
        console.log('📤 3. Sent start event with streamSid:', streamSid);
        
        // Start audio capture after sending all events
        await startRecording();
        console.log('🎤 Microphone recording started');
      };

      ws.onmessage = async (event) => {
        console.log('🎉 ========== MESSAGE RECEIVED ==========');
        
        try {
          // Check if message is binary
          if (event.data instanceof Blob) {
            console.log('📥 Received binary Blob data, size:', event.data.size);
            const buffer = await event.data.arrayBuffer();
            const base64 = btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(buffer))));
            console.log('📥 Binary converted to base64, length:', base64.length);
            queueAudio(base64);
            return;
          }
          
          if (event.data instanceof ArrayBuffer) {
            console.log('📥 Received binary ArrayBuffer data, size:', event.data.byteLength);
            const base64 = btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(event.data))));
            console.log('📥 Binary converted to base64, length:', base64.length);
            queueAudio(base64);
            return;
          }

          // Handle JSON messages
          if (typeof event.data === 'string') {
            console.log('📥 Received text message, length:', event.data.length);
            
            try {
              const data = JSON.parse(event.data);
              console.log('📥 Parsed JSON event:', data.event, 'Full:', JSON.stringify(data).substring(0, 200));

              if (data.event === 'media' && data.media?.payload) {
                console.log('🔊 Media event received, payload length:', data.media.payload.length);
                queueAudio(data.media.payload);
              } else if (data.event === 'error') {
                console.error('❌ Error event:', data.error);
                setError(data.error?.message || 'An error occurred');
              } else if (data.event === 'stop') {
                console.log('🛑 Stop event - call ended by server');
                handleEndCall();
              } else {
                console.log('ℹ️ Other event:', data.event, 'Keys:', Object.keys(data));
              }
            } catch (parseError) {
              console.error('❌ JSON parse error:', parseError);
              console.log('Raw data:', event.data.substring(0, 100));
            }
          }
        } catch (error) {
          console.error('❌ Error processing message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        console.error('❌ Error details:', {
          type: error.type,
          target: error.target,
          currentOrigin: window.location.origin,
          wsUrl: ws.url
        });
        setError('Connection failed. This might be a CORS issue. Try accessing from ai.asktalos.com instead of localhost.');
        setIsConnecting(false);
        setIsConnected(false);
        stopRecording();
      };

      ws.onclose = (event) => {
        console.log('🔌 WebSocket disconnected. Code:', event.code, 'Reason:', event.reason || 'No reason provided');
        console.log('🔌 Close event details:', {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean,
          type: event.type
        });
        
        setIsConnected(false);
        setIsConnecting(false);
        stopRecording();
        
        // Don't show errors for normal closure (1000) or empty status (1005)
        // These are typically normal call endings
        if (event.code !== 1000 && event.code !== 1005) {
          if (event.code === 1006) {
            setError('Connection lost. Please try again.');
            console.error('❌ Code 1006: Abnormal closure');
          } else if (event.code === 1008) {
            setError('Connection rejected: Policy violation');
            console.error('❌ Code 1008: Policy violation');
          } else {
            setError(`Connection closed unexpectedly (${event.code})`);
          }
        }
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      setError('Failed to connect. Please try again.');
      setIsConnecting(false);
    }
  };

  const handleEndCall = () => {
    // Stop recording
    stopRecording();
    
    // Close WebSocket
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    // Clean up audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    // Clear audio queue
    audioQueueRef.current = [];
    isProcessingRef.current = false;
    nextPlayTimeRef.current = 0;
    
    setIsConnected(false);
    setIsSpeaking(false);
    setIsListening(false);
    setError(null);
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    isMutedRef.current = newMutedState;
    
    // Note: We don't disable the track, just stop sending data
    // This keeps the audio pipeline active
    console.log('[Capture] Mute toggled:', newMutedState ? 'MUTED' : 'UNMUTED');
  };

  const openVerification = () => {
    setVerificationStep('details');
    setOtp('');
    setVerificationError(null);
    setVerificationMessage(null);
    setIsVerificationSuccessful(false);
    setIsVerificationOpen(true);
  };

  // Notify parent when open state changes
  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  return (
    <>
      {/* Voice Toggle Button */}
      {!isOpen && (
        <div className="fixed bottom-5 left-5 md:bottom-6 md:left-6 z-40 flex items-center gap-4">
          {/* Button + the attention rings that radiate from behind it. The rings
              are siblings, not children, because the button clips its overflow. */}
          <div className="relative h-16 w-16 flex-shrink-0">
            <span aria-hidden="true" className="voice-ring" />
            <span aria-hidden="true" className="voice-ring voice-ring-2" />

            {/* Circular arrow orbiting the button. The arc sweeps 290° and
                leaves a gap on the right; the head's two barbs are set ±30° off
                the arc's end tangent so it reads as following the curve. */}
            <svg
              viewBox="0 0 100 100"
              aria-hidden="true"
              className="voice-orbit pointer-events-none absolute -inset-[15px] z-20 h-[94px] w-[94px] text-orange-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M84.4 74.1A42 42 0 1 1 84.4 25.9" />
              <path d="M83.6 16.9 84.4 25.9 76.2 22.1" />
            </svg>

            <button
              onClick={() => setIsOpen(true)}
              className="group relative z-10 transition-all duration-300 hover:scale-110 w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center overflow-hidden"
              aria-label="Open voice call"
            >
              {/* Animated Sound Wave Bars */}
              <div className="flex items-center justify-center gap-1">
                <div className="w-1 bg-white rounded-full animate-[wave_0.6s_ease-in-out_infinite]" style={{ height: '12px' }}></div>
                <div className="w-1 bg-white rounded-full animate-[wave_0.6s_ease-in-out_0.1s_infinite]" style={{ height: '20px' }}></div>
                <div className="w-1 bg-white rounded-full animate-[wave_0.6s_ease-in-out_0.2s_infinite]" style={{ height: '16px' }}></div>
                <div className="w-1 bg-white rounded-full animate-[wave_0.6s_ease-in-out_0.3s_infinite]" style={{ height: '24px' }}></div>
                <div className="w-1 bg-white rounded-full animate-[wave_0.6s_ease-in-out_0.4s_infinite]" style={{ height: '14px' }}></div>
              </div>
            </button>
          </div>

          {/* "Talk to us" label. The pointing is done by the orbiting arrow
              above, so this stays a clean pill. Hidden on the narrowest screens
              so it never crowds page content. */}
          <button
            onClick={() => setIsOpen(true)}
            className="voice-nudge hidden sm:inline-flex items-center rounded-full border border-orange-200 bg-white px-4 py-2 text-[0.8125rem] font-semibold text-slate-800 shadow-[0_10px_26px_rgba(15,23,42,0.13)] transition-colors hover:border-orange-300 hover:text-orange-600"
          >
            Talk to us
          </button>

          <style>{`
            @keyframes wave {
              0%, 100% { transform: scaleY(0.5); }
              50% { transform: scaleY(1); }
            }
            /* Halo radiating out from under the button. */
            .voice-ring {
              position: absolute;
              inset: 0;
              border-radius: 9999px;
              background: rgba(249, 115, 22, 0.4);
              /* ease-out, not expo — expo fires the halo outward so fast it is
                 invisible for most of the cycle. */
              animation: voice-ring-out 2.4s ease-out infinite;
            }
            .voice-ring-2 { animation-delay: 1.2s; }
            @keyframes voice-ring-out {
              0%   { transform: scale(0.96); opacity: 0.55; }
              80%  { transform: scale(1.8);  opacity: 0; }
              100% { transform: scale(1.8);  opacity: 0; }
            }
            /* Slides in shortly after load and then comes to rest. The ongoing
               motion lives in the arrow and the halo instead — a click target
               that never settles is harder to hit and reads as jittery. */
            .voice-nudge {
              animation: voice-nudge-in 0.55s cubic-bezier(0.16, 1, 0.3, 1) 1.1s both;
            }
            @keyframes voice-nudge-in {
              from { opacity: 0; transform: translateX(-10px) scale(0.94); }
              to   { opacity: 1; transform: translateX(0) scale(1); }
            }
            /* The circular arrow tracks slowly around the button. */
            .voice-orbit {
              transform-origin: 50% 50%;
              animation: voice-orbit-spin 9s linear infinite;
            }
            @keyframes voice-orbit-spin {
              to { transform: rotate(360deg); }
            }
            @media (prefers-reduced-motion: reduce) {
              .voice-ring { animation: none; opacity: 0; }
              .voice-nudge { animation: voice-nudge-in 0.01s both; }
              .voice-orbit { animation: none; }
            }
          `}</style>
        </div>
      )}

      {/* Voice Call Modal */}
      {isOpen && (
        <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <AudioLines className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Voice Assistant</h3>
                <p className="text-white/90 text-sm">Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close voice call"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Call Interface */}
          <div className="p-6 flex flex-col items-center justify-center space-y-6 bg-white">
            {/* Animated Avatar */}
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
              {/* Static Icon - never changes */}
              <AudioLines className="w-12 h-12 text-orange-500" />
              
              {/* Listening indicator with wave animation */}
              {isListening && !isSpeaking && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Mic className="w-4 h-4 text-white animate-pulse" />
                </div>
              )}
              
              {/* Speaking indicator - animated rings */}
              {isSpeaking && (
                <>
                  <div className="absolute inset-0 rounded-full border-4 border-orange-500 animate-ping"></div>
                  <div className="absolute inset-0 rounded-full border-2 border-orange-400 animate-pulse"></div>
                </>
              )}
            </div>
            
            <div className="text-center">
              <p className="text-gray-900 text-lg font-semibold mb-2">
                {isConnected 
                  ? isSpeaking 
                    ? 'Assistant Speaking...' 
                    : isListening 
                    ? 'Listening...' 
                    : 'Voice Call Active'
                  : 'Start Voice Call'
                }
              </p>
              <p className="text-gray-600 text-sm">
                {isConnected 
                  ? 'Talk naturally, the assistant will respond' 
                  : isConnecting 
                  ? 'Connecting to voice assistant...' 
                  : 'Click the button below to connect'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Call Controls */}
            {!isConnected ? (
              <button
                onClick={openVerification}
                disabled={isConnecting}
                className={`bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-amber-600 transition-all flex items-center gap-2 shadow-lg ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Phone className="w-5 h-5" />
                {isConnecting ? 'Connecting...' : 'Start Call'}
              </button>
            ) : (
              <div className="flex gap-3">
                <button 
                  onClick={toggleMute}
                  className={`${
                    isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'
                  } text-white px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 shadow-lg`}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
                
                <button 
                  onClick={handleEndCall}
                  className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition-all flex items-center gap-2 shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  End Call
                </button>
              </div>
            )}

            <p className="text-gray-500 text-xs text-center">
              Available 24/7 for support
            </p>
          </div>
        </div>
      )}

      {isVerificationOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-2xl">
            {!isVerificationSuccessful && (
              <button
                onClick={() => setIsVerificationOpen(false)}
                className="absolute right-4 top-4 text-gray-500 transition-colors hover:text-gray-900"
                aria-label="Close verification"
              >
                <X className="h-5 w-5" />
              </button>
            )}

            {isVerificationSuccessful ? (
              <div className="flex min-h-52 flex-col items-center justify-center gap-3 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 animate-[bounce_0.6s_ease-out]">
                  <CheckCircle2 className="h-10 w-10 text-green-600" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Number verified</h2>
                  <p className="mt-1 text-sm text-gray-600">Connecting you to the voice assistant...</p>
                </div>
              </div>
            ) : verificationStep === 'details' ? (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Verify your number</h2>
                  <p className="mt-1 text-sm text-gray-600">Enter your details to receive a WhatsApp OTP.</p>
                </div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    className="mt-1.5 h-11 w-full rounded-lg border border-gray-300 px-3 text-gray-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    placeholder="Enter your name"
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Phone number
                  <input
                    value={phone}
                    onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))}
                    autoComplete="tel"
                    inputMode="numeric"
                    className="mt-1.5 h-11 w-full rounded-lg border border-gray-300 px-3 text-gray-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    placeholder="Enter 10-digit phone number"
                  />
                </label>
                {verificationError && <p className="text-sm text-red-600">{verificationError}</p>}
                <button
                  onClick={() => sendVerification()}
                  disabled={isSendingOtp}
                  className="flex h-11 w-full items-center justify-center rounded-lg bg-orange-500 px-4 font-semibold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSendingOtp ? 'Sending OTP...' : 'Verify OTP'}
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Enter verification code</h2>
                  <p className="mt-1 text-sm text-gray-600">OTP received on WhatsApp for {phone}.</p>
                </div>
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp} inputMode="numeric">
                    <InputOTPGroup>
                      {[0, 1, 2, 3, 4, 5].map((index) => <InputOTPSlot key={index} index={index} />)}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                {verificationError && <p className="text-center text-sm text-red-600">{verificationError}</p>}
                {verificationMessage && <p className="text-center text-sm text-green-700">{verificationMessage}</p>}
                <button
                  onClick={verifyOtp}
                  disabled={isVerifyingOtp || otp.length !== 6}
                  className="flex h-11 w-full items-center justify-center rounded-lg bg-orange-500 px-4 font-semibold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isVerifyingOtp ? 'Verifying...' : 'Verify OTP'}
                </button>
                <button
                  onClick={() => sendVerification(true)}
                  disabled={isSendingOtp || resendCooldown > 0}
                  className="w-full text-sm font-medium text-orange-600 transition-colors hover:text-orange-700 disabled:cursor-not-allowed disabled:text-gray-400"
                >
                  {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : isSendingOtp ? 'Sending OTP...' : 'Resend OTP'}
                </button>
                <button onClick={() => setVerificationStep('details')} className="w-full text-sm font-medium text-gray-600 hover:text-gray-900">
                  Change phone number
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceWidget;
