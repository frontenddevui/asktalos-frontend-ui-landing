import { useEffect, useRef, useState } from "react";
import { Users, Award, Globe, TrendingUp } from "lucide-react";
import coachImg from "@/assets/trusted/coach-rajiv-CvgeMzUP.webp";

/** Count-up that fires once when the element scrolls into view. */
const useCountUp = (target: number, duration = 1800) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const step = (now: number) => {
              const progress = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.round(eased * target));
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
};

const MeetYourCoachSection = () => {
  const trained = useCountUp(1000);

  const stats = [
    { icon: Users, value: null as string | null, animated: trained, suffix: "+", label: "Business Owners Trained" },
    { icon: Award, value: "16+", label: "Years of Experience" },
    { icon: Globe, value: "21+", label: "Industries Worked With" },
    { icon: TrendingUp, value: "430+", label: "Success Stories" },
  ];

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-12 xl:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-[1.85rem] sm:text-3xl lg:text-4xl font-bold text-gray-900">
            He has Built What{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">
              He is Teaching You
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
        </div>

        <div className="grid lg:grid-cols-[5fr_6fr] gap-8 lg:gap-14 items-center max-w-6xl mx-auto">
          {/* Portrait */}
          <div className="relative max-w-md mx-auto w-full">
            <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 rounded-3xl bg-orange-100" />
            <div aria-hidden className="absolute -top-3 -left-3 w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 hidden sm:block" />
            <div className="relative rounded-3xl overflow-hidden bg-gray-100 aspect-[4/5] ring-1 ring-gray-200">
              <img
                src={coachImg}
                alt="Mahesh Pardeshi, AI Automation Coach"
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/85 backdrop-blur-sm border border-gray-200 px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="text-gray-900 text-sm font-semibold">Mahesh Pardeshi</div>
                  <div className="text-[11px] text-gray-600">Director, AskTalos — AI Automation</div>
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-orange-600 font-semibold">Coach</div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-orange-500 to-amber-500" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-orange-600 font-semibold">
                Pune's Leading Business Success Coach
              </span>
            </div>

            <h3 className="text-[1.85rem] sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-[1.15]">
              A Mentor On{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">
                A Mission
              </span>
            </h3>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Not a classroom theory. Not a YouTube hack. This is a proven playbook from someone who's helped real
              business owners just like you — stop grinding and start growing.
            </p>

            <blockquote className="relative rounded-2xl bg-orange-50/60 border border-orange-100 px-5 sm:px-6 py-5">
              <span aria-hidden className="absolute -top-4 left-5 text-5xl leading-none text-orange-400 font-serif select-none">&ldquo;</span>
              <p className="text-gray-800 text-base sm:text-lg italic leading-relaxed">
                I've sat across the table with{" "}
                <span className="text-orange-600 not-italic font-semibold">1,000+ business owners</span>. I
                know exactly where the money is leaking — and more importantly, how to stop it.
              </p>
            </blockquote>

            <div className="grid grid-cols-2 rounded-2xl overflow-hidden border border-gray-200 bg-white">
              {stats.map((stat, index) => {
                const isRightCol = index % 2 === 1;
                const isBottomRow = index >= 2;
                return (
                  <div
                    key={stat.label}
                    className={[
                      "p-4 sm:p-5 flex items-start gap-3",
                      isRightCol ? "" : "border-r border-gray-200",
                      isBottomRow ? "" : "border-b border-gray-200",
                    ].join(" ")}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-2xl sm:text-[1.65rem] font-bold text-gray-900 tabular-nums leading-none">
                        {stat.animated ? (
                          <>
                            <span ref={stat.animated.ref}>{stat.animated.value.toLocaleString()}</span>
                            {stat.suffix}
                          </>
                        ) : (
                          stat.value
                        )}
                      </div>
                      <div className="mt-1 text-[11px] sm:text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetYourCoachSection;
