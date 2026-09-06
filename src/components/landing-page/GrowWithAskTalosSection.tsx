import { useEffect, useRef, useState } from "react";
import personImg from "@/assets/CEO.webp";
import underlineImg from "@/assets/Untitled_design__13__2-removebg-preview.webp";
import wavyResponseImg from "@/assets/Wavy_Bus-12_Single-01.webp";
import wavyProductivityImg from "@/assets/Wavy_Bus-12_Single-03.webp";

/* ─────────────────────────────────────────────
   Animated counter hook
───────────────────────────────────────────── */
function useCounter(target: number, duration = 1400, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [active, target, duration]);
  return value;
}

/* ─── Decorative SVG Icons ─── */
function IconTrendingUp({ color }: { color: string }) {
  return (
    <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
function IconZap({ color }: { color: string }) {
  return (
    <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function IconTarget({ color }: { color: string }) {
  return (
    <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function IconSmile({ color }: { color: string }) {
  return (
    <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Card config  (5 cards, ascending heights)
───────────────────────────────────────────── */
const CARDS = [
  {
    stat: 40,
    suffix: "%",
    title: "Increased\nProductivity",
    sub: "Do more in less time",
    bg: "#ffffff",
    height: "360px",
    numColor: "#ff862f",
    textColor: "#1a1a1a",
    subColor: "#6b7280",
    hasPerson: false,
    wavyImg: "productivity" as const,
    BottomIcon: null,
    outlined: true,
  },
  {
    stat: 50,
    suffix: "%",
    title: "Faster\nResponse Time",
    sub: "Instant replies, every time",
    bg: "#ffffff",
    height: "420px",
    numColor: "#ff862f",
    textColor: "#1a1a1a",
    subColor: "#6b7280",
    hasPerson: false,
    wavyImg: "response" as const,
    BottomIcon: null,
    outlined: true,
  },
  {
    stat: 60,
    suffix: "%",
    title: "Saved on\nOperational Costs",
    sub: "Big savings, lifetime impact",
    bg: "#ff862f",
    height: "540px",
    numColor: "#ffffff",
    textColor: "#ffffff",
    subColor: "rgba(255,255,255,0.8)",
    hasPerson: true,
    wavyImg: null,
    BottomIcon: null,
    outlined: false,
  },
] as const;

export default function GrowWithAskTalosSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const counts = [
    useCounter(CARDS[0].stat, 1200, inView),
    useCounter(CARDS[1].stat, 1400, inView),
    useCounter(CARDS[2].stat, 1600, inView),
  ];

  return (
    <section
      ref={ref}
      style={{ background: "linear-gradient(180deg, rgba(254,215,170,0.6) 0%, rgba(255,237,213,0.5) 8%, rgba(255,247,237,0.3) 18%, #ffffff 35%, #ffffff 65%, rgba(255,247,237,0.3) 82%, rgba(255,237,213,0.5) 92%, rgba(254,215,170,0.6) 100%)", fontFamily: "Poppins, sans-serif" }}
      className="w-full px-6 pt-12 pb-4 md:px-10 md:pt-16 md:pb-4"
    >
      <div className="relative mx-auto" style={{ maxWidth: 1400 }}>

        {/* ── MOBILE: simple stacked stats ── */}
        <div className="lg:hidden">
          <div className="mb-6 text-center">
            <h2 className="text-[1.85rem] sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Grow with <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">AskTalos</span>
            </h2>
            <img src={underlineImg} alt="" className="h-3 sm:h-4 mx-auto my-2 w-40 sm:w-56" loading="lazy"
 />
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Every tool in AskTalos helps your team work faster, remove roadblocks, and bring in more sales.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {CARDS.map((card, i) => (
              <div
                key={i}
                className="rounded-2xl p-3 text-center"
                style={{ background: card.outlined ? "#fff7ed" : card.bg, border: card.outlined ? "2px solid #ff862f" : "none" }}
              >
                <span className="text-xl sm:text-2xl font-bold block" style={{ color: card.numColor }}>{counts[i]}{card.suffix}</span>
                <span className="text-xs font-semibold mt-1 block whitespace-pre-line" style={{ color: card.textColor }}>{card.title}</span>
                <span className="text-[11px] sm:text-[10px] mt-0.5 block" style={{ color: card.subColor }}>{card.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── DESKTOP: heading left + arch cards right ── */}
        <div className="hidden lg:flex" style={{ alignItems: "flex-start", justifyContent: "center", gap: 40 }}>

          {/* ── Heading on the LEFT ─────────────────────── */}
          <div
            className="relative z-10 flex-shrink-0"
            style={{ width: "clamp(220px, 22vw, 340px)", paddingTop: 24, paddingRight: 0 }}
          >
            <h2
              style={{
                fontSize: "clamp(32px, 3.8vw, 52px)",
                lineHeight: 1.1,
                fontWeight: 700,
                letterSpacing: "-1.5px",
                color: "#111827",
                whiteSpace: "nowrap",
              }}
            >
              Grow with{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">AskTalos</span>
            </h2>
            <p
              className="mt-4 text-sm font-normal leading-relaxed"
              style={{ color: "#6b7280", maxWidth: 260 }}
            >
              Every tool in AskTalos helps your team work faster,{" "}<br />
              remove roadblocks, and bring in more sales.
            </p>
          </div>

          {/* ── Arch Cards ──────────────────────────────── */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 0,
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {CARDS.map((card, i) => (
              <div
                key={i}
                style={{
                  width: "clamp(160px, 18vw, 260px)",
                  height: card.height,
                  background: card.bg,
                  borderRadius: "120px 120px 0 0",
                  border: card.outlined ? "2px solid #ff862f" : "none",
                  boxShadow: card.outlined ? "0 4px 24px rgba(249,115,22,0.12)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  paddingTop: 36,
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                  marginLeft: i > 0 ? "-12px" : 0,
                  zIndex: i + 1,
                  flexShrink: 0,
                  transform: inView ? "translateY(0)" : "translateY(100%)",
                  transition: `transform 0.85s cubic-bezier(0.22,1,0.36,1) ${i * 100}ms`,
                }}
              >
                {/* stat number */}
                <span
                  style={{
                    fontSize: "clamp(30px, 3.8vw, 52px)",
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: "-2px",
                    color: card.numColor,
                    display: "block",
                  }}
                >
                  {counts[i]}{card.suffix}
                </span>

                {/* title */}
                <span
                  style={{
                    fontSize: "clamp(12px, 1.3vw, 16px)",
                    fontWeight: 600,
                    lineHeight: 1.25,
                    color: card.textColor,
                    marginTop: 8,
                    whiteSpace: "pre-line",
                    paddingInline: 14,
                  }}
                >
                  {card.title}
                </span>

                {/* sub */}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: card.subColor,
                    marginTop: 6,
                    paddingInline: 12,
                    lineHeight: 1.3,
                  }}
                >
                  {card.sub}
                </span>

                {/* decorative icon at bottom */}
                {card.BottomIcon && !card.wavyImg && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: -8,
                      left: "50%",
                      transform: "translateX(-50%)",
                      pointerEvents: "none",
                    }}
                  >
                    <card.BottomIcon />
                  </div>
                )}

                {/* wavy illustration image (cards 1 & 2) */}
                {card.wavyImg && (
                  <img
                    src={card.wavyImg === "productivity" ? wavyProductivityImg : wavyResponseImg}
                    alt=""
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      margin: "0 auto",
                      width: "80%",
                      display: "block",
                      objectFit: "contain",
                      objectPosition: "bottom center",
                      pointerEvents: "none",
                    }}
                  loading="lazy"

                  />
                )}

                {/* person image on last card */}
                {card.hasPerson && (
                  <img
                    src={personImg}
                    alt="AskTalos happy customer"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      maxWidth: 260,
                      objectFit: "contain",
                      objectPosition: "bottom center",
                      height: "65%",
                      WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0) 100%)",
                      maskImage: "linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0) 100%)",
                    }}
                  loading="lazy"

                  />
                )}
              </div>
            ))}
          </div>

        </div>{/* end desktop flex */}
      </div>
    </section>
  );
}

