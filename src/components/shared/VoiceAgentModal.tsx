import { useState, useEffect, useRef } from "react";
import { X, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VoiceAgentModal({ isOpen, onClose }: VoiceAgentModalProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Check for browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      return;
    }

    // Initialize Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event: any) => {
      const current = event.resultIndex;
      const transcriptText = event.results[current][0].transcript;
      setTranscript(transcriptText);

      if (event.results[current].isFinal) {
        handleVoiceInput(transcriptText);
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    // Initialize Speech Synthesis
    synthesisRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript("");
      setResponse("");
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleVoiceInput = (text: string) => {
    // Simulate AI response based on input
    const responses: { [key: string]: string } = {
      "hello": "Hello! I'm your AskTalos AI Voice Agent. How can I help you today?",
      "hi": "Hi there! I'm here to assist you. What can I do for you?",
      "pricing": "Our pricing starts at just $49 per month for the Starter plan, which includes up to 500 calls. For more details, I can connect you with our sales team.",
      "features": "AskTalos offers AI-powered voice calling, multilingual support, seamless handoff to live agents, CRM integration, and 24/7 availability. Would you like to know more about any specific feature?",
      "demo": "I'd be happy to give you a demo! Let me connect you with our team to schedule a personalized demonstration of our AI Voice Agent platform.",
      "support": "We provide 24/7 email support for all plans, and priority phone support with dedicated account managers for enterprise clients. How can I help you today?",
      "default": "Thank you for your question. I'm processing that information. Our AI Voice Agents can handle customer inquiries, schedule appointments, qualify leads, and much more. Would you like to speak with a sales representative for more detailed information?"
    };

    let responseText = responses.default;
    const lowerText = text.toLowerCase();

    for (const key in responses) {
      if (lowerText.includes(key)) {
        responseText = responses[key];
        break;
      }
    }

    setResponse(responseText);
    speakResponse(responseText);
  };

  const speakResponse = (text: string) => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel(); // Cancel any ongoing speech
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthesisRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6 relative animate-in slide-in-from-bottom-4 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">
              AI Voice Agent
            </span>
          </h2>
          <p className="text-sm text-gray-600">
            Speak naturally, and I'll respond with voice
          </p>
        </div>

        {!isSupported ? (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">
              Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.
            </p>
          </div>
        ) : (
          <>
            {/* Visual Feedback with Icons */}
            <div className="flex justify-center mb-6">
              <div className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                isListening 
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 animate-pulse shadow-2xl' 
                  : isSpeaking 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse shadow-2xl'
                  : 'bg-gradient-to-br from-gray-100 to-gray-200'
              }`}>
                {isListening ? (
                  <Mic className="w-16 h-16 text-white" />
                ) : isSpeaking ? (
                  <Volume2 className="w-16 h-16 text-white animate-bounce" />
                ) : (
                  <MicOff className="w-16 h-16 text-gray-500" />
                )}
              </div>
            </div>

            {/* Status Text */}
            <div className="text-center mb-6 min-h-[60px]">
              {isListening ? (
                <p className="text-orange-600 font-semibold animate-pulse">
                  Listening... Speak now
                </p>
              ) : isSpeaking ? (
                <p className="text-blue-600 font-semibold animate-pulse">
                  Speaking...
                </p>
              ) : (
                <p className="text-gray-600">
                  Click the microphone to start speaking
                </p>
              )}
            </div>

            {/* Transcript Display */}
            {transcript && (
              <div className="mb-4 p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                <p className="text-sm font-semibold text-gray-700 mb-1">You said:</p>
                <p className="text-gray-900">{transcript}</p>
              </div>
            )}

            {/* Response Display */}
            {response && (
              <div className="mb-4 p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                <p className="text-sm font-semibold text-gray-700 mb-1">AI Response:</p>
                <p className="text-gray-900">{response}</p>
              </div>
            )}

            {/* Control Buttons */}
            <div className="flex gap-3">
              {!isListening ? (
                <Button
                  onClick={startListening}
                  disabled={isSpeaking}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white h-12 rounded-xl font-bold disabled:opacity-50"
                >
                  <Mic className="w-5 h-5 mr-2" />
                  Start Speaking
                </Button>
              ) : (
                <Button
                  onClick={stopListening}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white h-12 rounded-xl font-bold"
                >
                  <MicOff className="w-5 h-5 mr-2" />
                  Stop
                </Button>
              )}

              {isSpeaking && (
                <Button
                  onClick={stopSpeaking}
                  variant="outline"
                  className="flex-1 border-2 border-orange-500 text-orange-600 hover:bg-orange-50 h-12 rounded-xl font-bold"
                >
                  <VolumeX className="w-5 h-5 mr-2" />
                  Stop Speaking
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
