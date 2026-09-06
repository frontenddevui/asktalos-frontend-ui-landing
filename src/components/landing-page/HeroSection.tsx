import { ArrowRight, Star, MessageCircle, Phone, Mail, Database, Bot, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { startFreeTrial } from "@/lib/trial";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { DemoModalSkeleton } from "@/components/shared/skeletons";
const DemoRequestModal = lazy(() => import("@/components/shared/DemoRequestModal"));
import { partnerAvatars } from "@/data/partnerProfiles";
import LogoCarousel from "@/components/shared/LogoCarousel";
import iconGrowth from "@/assets/graph_9770481.webp";
import iconChannels from "@/assets/icon-channels.webp";
import iconSetup from "@/assets/icon-computer.webp";
import iconAI from "@/assets/icon-ai-voice.webp";
import orbitIconWhatsapp from "@/assets/orbit-icon-whatsapp.webp";
import orbitIconPaymentReminder from "@/assets/orbit-icon-payment-reminder.webp";
import orbitIconMailing from "@/assets/orbit-icon-mailing.webp";
import orbitIconCustomerSupport from "@/assets/orbit-icon-customer-support.webp";
import orbitIconInvoicing from "@/assets/orbit-icon-invoicing.webp";
import orbitIconCrmManager from "@/assets/orbit-icon-crm-manager.webp";
import orbitIconVoiceAgent from "@/assets/orbit-icon-voice-agent.webp";
import underlineImg from "@/assets/Untitled_design__13__2-removebg-preview.webp";

const TOOL_TAGS = [
  { Icon: MessageCircle, label: "WhatsApp",    color: "#22c55e" },
  { Icon: Phone,         label: "Voice Agent", color: "#818cf8" },
  { Icon: Mail,          label: "Email",       color: "#60a5fa" },
  { Icon: Database,      label: "CRM",         color: "#fb923c" },
  { Icon: Bot,           label: "Chatbot",     color: "#f472b6" },
];

const ORBIT_RADIUS       = 220;    // px from orbit center to icon center — all icons ride this single ring
const ORBIT_RING_GAP     = 6;      // px gap between the two decorative dashed lines
const ORBIT_SPEED        = 360 / 32; // degrees per second (32s per full orbit)
const CIRCLE_D           = 100;    // center glow circle diameter
const CENTER_OFFSET_Y    = -10;    // px — nudges the play button + caption group down so it balances against the caption's added height above it

// Icons revolving around the orbit center — evenly spaced, 360/7 ≈ 51.4° apart
const ORBIT_ICONS = [
  { img: orbitIconCrmManager,      label: "CRM Agent",         startAngle: -20 },
  { img: orbitIconVoiceAgent,      label: "AI Voice Agent",    startAngle: 31  },
  { img: orbitIconCustomerSupport, label: "Support Agent",     startAngle: 82  },
  { img: orbitIconInvoicing,       label: "Invoice Agent",     startAngle: 134 },
  { img: orbitIconWhatsapp,        label: "WhatsApp Agent",    startAngle: 185 },
  { img: orbitIconMailing,         label: "Email Agent",       startAngle: 237 },
  { img: orbitIconPaymentReminder, label: "Reminder Agent",    startAngle: 288 },
];
const HERO_VOICE_DEMO_AUDIO = "/audio/hero-voice-demo.mp3";

export default function HeroSection() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isVoiceDemoPlaying, setIsVoiceDemoPlaying] = useState(false);

  const orbitCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileOrbitCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const orbitAnimRef  = useRef<number | null>(null);
  const orbitStartRef = useRef<number | null>(null);
  const voiceDemoAudioRef = useRef<HTMLAudioElement>(null);

  const toggleVoiceDemo = () => {
    const audio = voiceDemoAudioRef.current;
    if (!audio) return;
    if (isVoiceDemoPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  /* ── requestAnimationFrame orbit loop for hero channel icons — drives both desktop and mobile refs ── */
  useEffect(() => {
    const tick = (ts: number) => {
      if (orbitStartRef.current === null) orbitStartRef.current = ts;
      const deg = ((ts - orbitStartRef.current) / 1000) * ORBIT_SPEED;

      ORBIT_ICONS.forEach(({ startAngle }, i) => {
        const rad = ((deg + startAngle) % 360) * (Math.PI / 180);
        const x = Math.cos(rad) * ORBIT_RADIUS;
        const y = Math.sin(rad) * ORBIT_RADIUS;
        const left = `calc(50% + ${x}px)`;
        const top  = `calc(50% + ${y}px)`;

        const el = orbitCardRefs.current[i];
        if (el) { el.style.left = left; el.style.top = top; }

        const mel = mobileOrbitCardRefs.current[i];
        if (mel) { mel.style.left = left; mel.style.top = top; }
      });

      orbitAnimRef.current = requestAnimationFrame(tick);
    };

    orbitAnimRef.current = requestAnimationFrame(tick);
    return () => { if (orbitAnimRef.current) cancelAnimationFrame(orbitAnimRef.current); };
  }, []);

  /* ── Renders the dashed rings + play button + equalizer + caption + orbiting icons ──
     Called once for desktop (full size) and once for mobile (scaled down wrapper). */
  const renderOrbit = (cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>) => (
    <>
      {/* Dashed orbit rings — two concentric lines, thin gap, same color */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: ORBIT_RADIUS * 2,
          height: ORBIT_RADIUS * 2,
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          border: "1.5px dashed rgba(234,88,12,0.4)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: ORBIT_RADIUS * 2 - ORBIT_RING_GAP * 2,
          height: ORBIT_RADIUS * 2 - ORBIT_RING_GAP * 2,
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          border: "1.5px dashed rgba(234,88,12,0.4)",
        }}
      />

      {/* Center: click to hear the AI voice agent (no photo) */}
      <button
        type="button"
        onClick={toggleVoiceDemo}
        aria-label={isVoiceDemoPlaying ? "Pause AI voice agent demo" : "Play AI voice agent demo"}
        className="absolute rounded-full flex items-center justify-center group cursor-pointer border-0 overflow-hidden transition-transform duration-300 hover:scale-[1.04] active:scale-95"
        style={{
          width: CIRCLE_D, height: CIRCLE_D,
          top: `calc(50% - ${CENTER_OFFSET_Y}px)`, left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          background: "linear-gradient(135deg, #f97316, #f59e0b)",
          boxShadow: "0 0 0 8px rgba(249,115,22,0.09), 0 16px 48px rgba(0,0,0,0.16)",
        }}
      >
        {/* Idle: rotating sound-wave blobs behind the play button */}
        {!isVoiceDemoPlaying && (
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="sound-wave-blob sound-wave-blob-1" />
            <div className="sound-wave-blob sound-wave-blob-2" />
            <div className="sound-wave-blob sound-wave-blob-3" />
          </div>
        )}

        {/* Invite-to-click breathing ring (idle) */}
        {!isVoiceDemoPlaying && (
          <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-pulse" />
        )}

        {/* Speaking indicator — subtle pulse only, no ping (keeps the button the same visual size as idle) */}
        {isVoiceDemoPlaying && (
          <div className="absolute inset-0 rounded-full border-2 border-amber-300 animate-pulse" />
        )}

        {isVoiceDemoPlaying ? (
          /* Playing: white circle with icon + "Pause" label both inside it */
          <div className="relative z-10 h-16 w-16 rounded-full bg-white shadow-md flex flex-col items-center justify-center gap-0.5">
            <Pause className="h-7 w-7 text-orange-500 fill-orange-500" />
            <span className="text-orange-500 text-[9px] font-bold tracking-wide">Pause</span>
          </div>
        ) : (
          /* Idle: white circle with triangle icon + "Play" label both inside it */
          <div className="relative z-10 h-16 w-16 rounded-full bg-white shadow-md flex flex-col items-center justify-center gap-0.5 transition-transform group-hover:scale-110">
            <Play className="h-7 w-7 text-orange-500 fill-orange-500 ml-0.5" />
            <span className="text-orange-500 text-[9px] font-bold tracking-wide">Play</span>
          </div>
        )}
      </button>

      {/* Caption — above the circle, black + bold, with a decorative underline */}
      <div
        className="absolute pointer-events-none flex flex-col items-center"
        style={{
          top: `calc(50% - ${CENTER_OFFSET_Y}px - ${CIRCLE_D / 2 + 16}px)`,
          left: "50%",
          transform: "translate(-50%, -100%)",
          zIndex: 10,
        }}
      >
        {isVoiceDemoPlaying ? (
          <span className="text-gray-900 font-extrabold text-lg whitespace-nowrap">Playing Demo…</span>
        ) : (
          <span className="text-gray-900 font-extrabold text-lg whitespace-nowrap">
            Hear Our{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              AI Voice Agent
            </span>
          </span>
        )}
        <img src={underlineImg} alt="" className="h-2.5 w-28 mt-1" loading="lazy" />
      </div>

      {/* Big equalizer spanning from one edge of the outer orbit to the other — static until Play is pressed */}
      <div
        className="absolute flex items-center justify-center pointer-events-none"
        style={{
          top: `calc(50% - ${CENTER_OFFSET_Y}px)`,
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 6,
        }}
      >
        {Array.from({ length: 29 }).map((_, idx) => {
          const delays = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.4, 0.3, 0.2, 0.1, 0];
          // Same range as the playing keyframe's scaleY(1)→scaleY(3) swing — idle just freezes on one frame of it
          const idleScales = [1, 1.6, 2.2, 2.8, 3, 2.8, 2.2, 1.6, 1, 1.6, 2.2];
          const pos = idx % 11;
          return (
            <div
              key={idx}
              className={isVoiceDemoPlaying ? "orbit-eq-bar orbit-eq-bar-playing" : "orbit-eq-bar"}
              style={{
                transform: isVoiceDemoPlaying ? undefined : `scaleY(${idleScales[pos]})`,
                animationDelay: isVoiceDemoPlaying ? `${delays[pos]}s` : undefined,
                background: isVoiceDemoPlaying ? undefined : (idx % 2 === 0 ? "#FF8C42" : "#FFF38E"),
              }}
            />
          );
        })}
      </div>

      {/* Orbiting feature icons — positioned by RAF, label below icon */}
      {ORBIT_ICONS.map(({ img, Icon, color, label, startAngle }, i) => {
        const rad0 = (startAngle * Math.PI) / 180;
        return (
          <div
            key={label}
            ref={el => { cardRefs.current[i] = el; }}
            className="absolute z-20 flex flex-col items-center gap-1.5 pointer-events-none"
            style={{
              left: `calc(50% + ${Math.cos(rad0) * ORBIT_RADIUS}px)`,
              top:  `calc(50% + ${Math.sin(rad0) * ORBIT_RADIUS}px)`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="h-20 w-20 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center p-3.5">
              {img ? (
                <img src={img} alt={label} className="h-full w-full object-contain" />
              ) : (
                Icon && <Icon className="h-9 w-9" style={{ color }} />
              )}
            </div>
            <span className="text-xs font-semibold text-gray-700 whitespace-nowrap bg-white/90 px-2.5 py-1 rounded-full shadow-sm">
              {label}
            </span>
          </div>
        );
      })}
    </>
  );

  return (
    <>
      <section className="relative z-10 overflow-hidden bg-white pt-14 pb-0">

        {/* Subtle warm tint top-right */}
        <div
          className="pointer-events-none absolute z-0"
          style={{
            width: "min(400px, 60vw)",
            height: "min(400px, 60vw)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(251,146,60,0.07), transparent 70%)",
            filter: "blur(60px)",
            top: -60,
            right: -60,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6 items-center">

            {/* ── LEFT: Text ── */}
            <div className="text-center sm:text-left py-6 lg:py-10">

              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5">
                <Star className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
                <span className="text-sm font-semibold text-orange-600">Trusted by 500+ Businesses Across India</span>
              </div>

              {/* Heading */}
              <h1
                className="text-[1.85rem] sm:text-3xl md:text-[2.6rem] font-bold tracking-tight mb-4 text-gray-900"
                style={{ lineHeight: 1.18 }}
              >
                Your <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">AI-Powered</span> Sales Team that{" "}<span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">Follows Up, Engages</span> &amp; Closes More Deals.
              </h1>

              {/* Mobile-only orbit — same revolving icons + play button as desktop, scaled down */}
              <div className="flex lg:hidden justify-center overflow-hidden my-3" style={{ height: 320 }}>
                <div className="relative flex-shrink-0" style={{ width: 560, height: 560, transform: "scale(0.58)", transformOrigin: "top center" }}>
                  {renderOrbit(mobileOrbitCardRefs)}
                </div>
              </div>

              {/* One-liner sub-description */}
              <p className="text-base text-gray-500 mb-4 max-w-lg leading-relaxed">
                Automate every call, follow-up &amp; message so your team focuses only on closing deals, not chasing leads.
              </p>

              {/* Channel tags */}
              <div className="mb-5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                {TOOL_TAGS.map(({ Icon, label, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm"
                  >
                    <Icon style={{ color }} className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="text-xs font-medium text-gray-700">{label}</span>
                  </div>
                ))}
              </div>

              {/* 4 feature bullets — 2×2 grid */}
              <div className="mb-6 grid grid-cols-2 gap-x-5 gap-y-3 text-left mx-auto sm:mx-0 max-w-xs sm:max-w-none">
                {[
                  { img: iconGrowth,   title: "Close 3× More Leads",  sub: "Automated follow-ups"            },
                  { img: iconChannels, title: "6+ Channels Covered",   sub: "WhatsApp, Voice, Email & more"  },
                  { img: iconSetup,    title: "Setup in Minutes",      sub: "Zero coding required"           },
                  { img: iconAI,       title: "Always-On AI",          sub: "Works 24/7, never misses a lead" },
                ].map(({ img, title, sub }) => (
                  <div key={title} className="flex items-center gap-2.5">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white border border-gray-100 shadow-md">
                      <img src={img} alt={title} className="h-8 w-8 object-contain" loading="eager" decoding="async" width={32} height={32} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{title}</p>
                      <p className="text-xs text-gray-500">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-row gap-2 sm:gap-3 items-center justify-center sm:justify-start">
                <Button
                  size="lg"
                  onClick={() => startFreeTrial("home_hero")}
                  className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl px-3 py-4 sm:px-6 sm:py-6 text-sm sm:text-base font-semibold shadow-md shadow-orange-200 border-0"
                >
                  Start Free Trial
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white flex-shrink-0"><ArrowRight className="w-3 h-3 text-orange-500" /></span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsDemoModalOpen(true)}
                  className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white bg-transparent px-3 py-4 sm:px-6 sm:py-6 text-sm sm:text-base font-semibold transition-all duration-200 group"
                >
                  Book a Demo
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 group-hover:bg-white flex-shrink-0 transition-colors duration-200"><ArrowRight className="w-3 h-3 text-white group-hover:text-gray-900 transition-colors duration-200" /></span>
                </Button>
              </div>
            </div>

            {/* Shared audio element — both desktop and mobile play buttons control this single instance */}
            <audio
              ref={voiceDemoAudioRef}
              src={HERO_VOICE_DEMO_AUDIO}
              preload="none"
              onPlay={() => setIsVoiceDemoPlaying(true)}
              onPause={() => setIsVoiceDemoPlaying(false)}
              onEnded={() => setIsVoiceDemoPlaying(false)}
            />

            {/* ── RIGHT: Revolving channel-icon orbit ── */}
            <div className="hidden lg:flex relative items-center justify-center lg:justify-end pb-0" style={{ height: 560 }}>
              <div className="relative" style={{ width: 560, height: 560 }}>
                {renderOrbit(orbitCardRefs)}
              </div>
            </div>

            <style>{`
              @keyframes sound-waves-rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              .sound-wave-blob {
                position: absolute;
                left: -25%;
                width: 200%;
                height: 200%;
                border-radius: 40%;
                animation: sound-waves-rotate linear infinite;
              }
              .sound-wave-blob-1 {
                top: 40%;
                background: #fdba74;
                opacity: 0.5;
                border-radius: 40%;
                animation-duration: 5s;
              }
              .sound-wave-blob-2 {
                top: 45%;
                left: -35%;
                background: #fb923c;
                opacity: 0.4;
                border-radius: 35%;
                animation-duration: 7s;
              }
              .sound-wave-blob-3 {
                top: 50%;
                left: -35%;
                background: #ea580c;
                opacity: 0.35;
                border-radius: 33%;
                animation-duration: 11s;
              }
              .orbit-eq-bar {
                position: relative;
                height: 30px;
                width: 10px;
                margin: 0 2px;
                background: #FF8C42;
                transition: transform 0.3s ease;
              }
              .orbit-eq-bar-playing {
                animation: orbit-eq-wave 3s infinite ease-in-out;
              }
              @keyframes orbit-eq-wave {
                0%, 100% { transform: scaleY(1); background: #FF8C42; }
                16.67% { transform: scaleY(3); background: #FFF38E; }
                33.33% { transform: scaleY(1); background: #FF8C42; }
                50% { transform: scaleY(3); background: #FFF38E; }
                66.67% { transform: scaleY(1); background: #FF8C42; }
                83.34% { transform: scaleY(3); background: #FFF38E; }
              }
            `}</style>

          </div>
        </div>
        {/* ── Logo trust strip ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-t border-b border-gray-100 mt-2 pt-4 pb-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex-1 w-full">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-900 mb-3 text-center sm:text-left">
                Trusted by 500+ Growing Businesses Across India
              </p>
              <LogoCarousel />
            </div>
            <div className="hidden lg:block w-px self-stretch bg-gray-200 flex-shrink-0" />
            <div className="hidden lg:flex flex-col items-center gap-1.5 flex-shrink-0 pl-6">
              <div className="flex -space-x-2.5">
                {partnerAvatars.slice(0, 3).map((avatar, i) => (
                  <img
                    key={avatar.src}
                    src={avatar.src}
                    alt={avatar.alt}
                    className="h-9 w-9 rounded-full ring-2 ring-white object-cover"
                    style={{ zIndex: 10 - i }}
                    loading="lazy"
                    decoding="async"
                    width={36}
                    height={36}
                  />
                ))}
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-[11px] font-semibold text-white ring-2 ring-white"
                  style={{ zIndex: 6 }}
                >
                  6K+
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs font-semibold text-gray-700">458+ reviews (4.6 of 5)</p>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={isDemoModalOpen ? <DemoModalSkeleton /> : null}>
        <DemoRequestModal isOpenExternal={isDemoModalOpen} onCloseExternal={() => setIsDemoModalOpen(false)} showAutoPopup={false} />
      </Suspense>
    </>
  );
}
