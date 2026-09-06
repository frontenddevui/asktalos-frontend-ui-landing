import { useEffect, useRef, useState } from "react";

// target, decimals, suffix, label, sublabel
const STATS = [
  { target: 500, decimals: 0, suffix: "+",    thousands: false,  label: "Businesses Automated",  sublabel: "across India & counting"          },
  { target: 2,    decimals: 0, suffix: "M+",   thousands: false, label: "AI Conversations",       sublabel: "sent & received every month"      },
  { target: 4.8,  decimals: 1, suffix: " / 5", thousands: false, label: "Rating on G2",           sublabel: "★★★★★ by verified customers"      },
  { target: 99.9, decimals: 1, suffix: "%",    thousands: false, label: "Platform Uptime",        sublabel: "enterprise-grade reliability"     },
];

const DURATION = 2200; // ms

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function TrustSection() {
  const [visible, setVisible]   = useState(false);
  const [counts, setCounts]     = useState(STATS.map(() => 0));
  const rafRef                  = useRef<number | null>(null);
  const ref                     = useRef<HTMLDivElement>(null);

  // Trigger on scroll-in
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Run count-up once visible
  useEffect(() => {
    if (!visible) return;
    let startTime: number | null = null;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / DURATION, 1);
      const eased    = easeOutCubic(progress);
      setCounts(STATS.map(s => s.target * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCounts(STATS.map(s => s.target)); // exact final values
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [visible]);

  function formatCount(value: number, stat: typeof STATS[0]) {
    const n = stat.decimals > 0
      ? value.toFixed(stat.decimals)
      : Math.floor(value).toString();

    const formatted = stat.thousands
      ? parseInt(n).toLocaleString("en-IN")
      : n;

    return formatted + stat.suffix;
  }

  return (
    <section
      ref={ref}
      className="py-8 sm:py-10 bg-white"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-gray-200">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div
                className="text-4xl sm:text-5xl font-extrabold leading-none mb-1 tabular-nums" style={{ color: "#ff862f" }}
              >
                {formatCount(counts[i], stat)}
              </div>
              <div className="text-sm sm:text-base font-semibold text-gray-800 mt-1">
                {stat.label}
              </div>
              <div className="text-sm sm:text-xs text-gray-400 mt-0.5">
                {stat.sublabel.startsWith('★') ? (
                  <><span className="text-amber-400">{stat.sublabel.split(' ')[0]}</span>{' '}{stat.sublabel.split(' ').slice(1).join(' ')}</>
                ) : stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}