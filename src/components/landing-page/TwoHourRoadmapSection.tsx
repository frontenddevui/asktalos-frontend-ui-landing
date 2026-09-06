import { useEffect, useRef, useState } from "react";
import { Check, Clock, Layers, Sparkles } from "lucide-react";

type Module = {
  number: number;
  day: string;
  title: string;
  time: string;
  points: string[];
};

const MODULES: Module[] = [
  {
    number: 1,
    day: "Part 1",
    title: "AI Voice Agents & Smart Calling",
    time: "30 min",
    points: [
      "Deploy human-like AI voice agents for inbound & outbound calls",
      "Qualify leads and book meetings on autopilot 24/7",
      "Set up a complete contact center in under 2 hours",
      "Call routing, recording, and AI-powered call insights",
    ],
  },
  {
    number: 2,
    day: "Part 2",
    title: "WhatsApp & Chatbot Automation",
    time: "30 min",
    points: [
      "Broadcast to thousands and automate WhatsApp replies",
      "Turn WhatsApp into your top-converting sales channel",
      "Build 24/7 AI chatbots that resolve 80% of queries instantly",
      "Context-aware bots with smart escalation to humans",
    ],
  },
  {
    number: 3,
    day: "Part 3",
    title: "Smart CRM, Leads & Email Automation",
    time: "30 min",
    points: [
      "Automated lead scoring and nurturing workflows",
      "Conversion tracking so no lead slips through the cracks",
      "Behavior-triggered email sequences that convert on autopilot",
      "Win-back campaigns to recover lost customers",
    ],
  },
  {
    number: 4,
    day: "Part 4",
    title: "Instant Websites & Live Build",
    time: "30 min",
    points: [
      "Create professional websites instantly — no coding skills needed",
      "Connect AI agents, WhatsApp, CRM and email into one engine",
      "Build your own AI-powered business system live",
      "Launch a complete brand campaign with expert feedback",
    ],
  },
];

/** Count up to `end` once the element scrolls into view. */
const useCountUp = (end: number, duration = 1800) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min(1, (now - start) / duration);
            setCount(Math.round((1 - Math.pow(1 - progress, 3)) * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return { count, ref };
};

export default function TwoHourRoadmapSection() {
  const { count, ref: countRef } = useCountUp(10234);
  const [visible, setVisible] = useState<boolean[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Reveal each card as it enters the viewport.
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((node, index) => {
      if (!node) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const next = [...prev];
              next[index] = true;
              return next;
            });
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(node);
      observers.push(observer);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <section className="py-8 md:py-20 lg:py-24 roadmap-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Intro: heading + progress chart ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center mb-10 lg:mb-14">
          <div className="w-full max-w-lg mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Your 2-Hour Roadmap
            </div>
            <h2 className="text-[1.85rem] sm:text-3xl lg:text-4xl font-bold text-center lg:text-left leading-tight text-gray-900">
              Step-by-Step{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">
                2-Hour Plan
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-md text-center lg:text-left">
              Four focused parts. Each one ships a working piece of your AI business engine.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs sm:text-sm font-semibold text-gray-600">
              <span className="inline-flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-orange-500" /> 4 focused parts
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-orange-500" /> 2 hours total
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-orange-500" /> No experience needed
              </span>
            </div>
          </div>

          <div className="relative w-full max-w-lg mx-auto lg:mx-0 lg:justify-self-end">
            <svg className="w-full h-72 sm:h-80 lg:h-96" viewBox="0 0 450 380" fill="none" role="img" aria-label="Skill growth from beginner to expert over the two-hour plan">
              <defs>
                <pattern id="roadmap-grid" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(156, 163, 175, 0.2)" strokeWidth="0.5" />
                </pattern>
                <linearGradient id="roadmap-curve" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              <rect x="70" y="60" width="320" height="250" fill="url(#roadmap-grid)" className="opacity-40" />
              <line x1="70" y1="60" x2="70" y2="310" stroke="#374151" strokeWidth="2" />
              <line x1="70" y1="310" x2="390" y2="310" stroke="#374151" strokeWidth="2" />
              <path
                d="M 90 280 Q 150 260 220 180 Q 280 100 360 80"
                stroke="url(#roadmap-curve)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                className="drop-shadow-sm"
              />
              <circle cx="90" cy="280" r="6" fill="#ef4444" stroke="#fff" strokeWidth="2" />
              <circle cx="220" cy="180" r="6" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
              <circle cx="360" cy="80" r="6" fill="#10b981" stroke="#fff" strokeWidth="2" />
              <rect x="65" y="295" width="50" height="20" fill="white" stroke="#374151" strokeWidth="1" rx="4" />
              <text x="90" y="308" textAnchor="middle" className="text-xs font-bold" fill="#000">You</text>
              <text x="35" y="285" textAnchor="middle" className="text-sm font-medium" fill="#000">Beginner</text>
              <text x="35" y="298" textAnchor="middle" className="text-sm font-medium" fill="#000">In AI</text>
              <text x="35" y="185" textAnchor="middle" className="text-sm font-medium" fill="#000">Confident</text>
              <text x="35" y="198" textAnchor="middle" className="text-sm font-medium" fill="#000">In AI</text>
              <text x="35" y="85" textAnchor="middle" className="text-sm font-medium" fill="#000">Expert</text>
              <text x="35" y="98" textAnchor="middle" className="text-sm font-medium" fill="#000">In AI</text>
              <rect x="65" y="325" width="50" height="18" fill="white" stroke="#374151" strokeWidth="1" rx="4" />
              <text x="90" y="337" textAnchor="middle" className="text-sm font-bold" fill="#000">Start</text>
              <rect x="205" y="325" width="50" height="18" fill="white" stroke="#374151" strokeWidth="1" rx="4" />
              <text x="230" y="337" textAnchor="middle" className="text-sm font-bold" fill="#000">1 Hr</text>
              <rect x="335" y="325" width="50" height="18" fill="white" stroke="#374151" strokeWidth="1" rx="4" />
              <text x="360" y="337" textAnchor="middle" className="text-sm font-bold" fill="#000">2 Hr</text>
              <text x="230" y="360" textAnchor="middle" className="text-sm font-bold tracking-wider" fill="#000">YOUR PROGRESS</text>
            </svg>
            <div
              ref={countRef}
              className="absolute pointer-events-none rounded-xl bg-white border border-emerald-200 shadow-md px-3 py-1.5 text-center"
              style={{ top: "8%", left: "78%", transform: "translateX(-50%)" }}
            >
              <div className="text-sm font-bold text-emerald-600 tabular-nums leading-none">
                {count.toLocaleString()}+
              </div>
              <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                Already here
              </div>
            </div>
          </div>
        </div>

        {/* ── The four parts, side by side ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {MODULES.map((module, index) => (
            <div
              key={module.number}
              ref={(node) => { cardRefs.current[index] = node; }}
              className={`flex flex-col rounded-2xl p-5 border border-white/20 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 roadmap-shine bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500 ${
                visible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/20 ring-1 ring-white/30 flex items-center justify-center text-base font-bold text-white tabular-nums">
                  {module.number}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-gray-900 rounded-full text-xs font-bold shadow-sm">
                  <Clock className="w-3.5 h-3.5" />
                  {module.time}
                </span>
              </div>

              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
                {module.day}
              </span>
              <h3 className="mt-1 mb-4 text-lg font-bold text-white leading-snug">{module.title}</h3>

              <div className="space-y-3 mt-auto">
                {module.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-white/25 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </span>
                    <span className="text-white/95 text-sm leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .roadmap-bg {
          background-color: #fff;
          background-image:
            radial-gradient(circle, #e5e7eb 1px, transparent 1px),
            linear-gradient(180deg, rgba(254,215,170,0.6), rgba(255,237,213,0.5) 8%, rgba(255,247,237,0.3) 18%, #fff 35%, #fff);
          background-size: 28px 28px, 100% 100%;
        }
        .roadmap-shine {
          position: relative;
          overflow: hidden;
        }
        .roadmap-shine::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: roadmap-shine-sweep 3s infinite;
        }
        @keyframes roadmap-shine-sweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .roadmap-shine::before { animation: none; }
        }
      `}</style>
    </section>
  );
}
