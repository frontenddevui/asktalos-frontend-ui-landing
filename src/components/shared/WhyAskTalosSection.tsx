import { useEffect, useRef, useState } from "react";
import whyIcon1 from "@/assets/why-icon1.svg";
import whyIcon2 from "@/assets/why-icon2.svg";
import whyIcon3 from "@/assets/why-icon3.svg";
import whyIcon4 from "@/assets/why-icon4.svg";
import underlineImg from "@/assets/Untitled_design__13__2-removebg-preview.webp";

const features = [
  {
    icon: whyIcon1,
    title: "Be There For Your Customers 24/7/365 Days",
  },
  {
    icon: whyIcon2,
    title: "View Complete Customer History",
  },
  {
    icon: whyIcon3,
    title: "Provide Faster Solutions To Your Customers",
  },
  {
    icon: whyIcon4,
    title: "Accelerate Team's Productivity With A Smooth Work Process",
  },
];

export default function WhyAskTalosSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`bg-white px-4 py-14 transition-all duration-1000 sm:px-6 sm:py-20 lg:px-8 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header — centred, matching the pricing page */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <h2 className="text-[1.85rem] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Why{" "}
            <span className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              AskTalos
            </span>
          </h2>
          <img src={underlineImg} alt="" className="mx-auto my-3 h-3 w-44 sm:my-4 sm:h-4 sm:w-60" loading="lazy" />
          <p className="text-sm leading-relaxed text-gray-500 sm:text-base">
            Create a personal connection with customers looking for support—without interrupting their experience or your expense load.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`h-full transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
            >
              <div className="group flex h-full flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/50">
                <span className="mb-5 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-orange-50 ring-1 ring-orange-100 transition-colors group-hover:bg-orange-100">
                  <img src={feature.icon} alt="" className="h-9 w-9 object-contain" loading="lazy" />
                </span>
                <h3 className="text-[15px] font-semibold leading-snug text-gray-900 sm:text-base">{feature.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
