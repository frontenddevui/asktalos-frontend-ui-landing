import { useEffect, useRef, useState } from "react";
import underlineImg from "@/assets/Untitled_design__13__2-removebg-preview.webp";
import moreLeadsIcon from "@/assets/more-lead.svg";
import rateIcon from "@/assets/rate.svg";
import revenueIcon from "@/assets/revenue-user.svg";

const stats = [
  {
    icon: moreLeadsIcon,
    value: "50%",
    label: "More Leads",
    description: "Find more interested buyers and follow up with them faster using AI."
  },
  {
    icon: rateIcon,
    value: "5x",
    label: "Higher Conversion Rate",
    description: "Turn more interested people into paying customers with messages that feel personal."
  },
  {
    icon: revenueIcon,
    value: "50%",
    label: "Higher Revenue Per Customer",
    description: "Earn more from each customer by offering the right thing at the right time."
  }
];

export default function RevenueSection() {
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
      className={`py-8 sm:py-12 px-4 sm:px-6 lg:px-12 xl:px-16 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ background: "#ffffff" }}
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Header — centered badge style */}
        <div className="text-center mb-8 lg:mb-16">
          <h3 className="text-[1.85rem] sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Turn{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">AskTalos</span>
            {" "}Into Revenue
          </h3>
          <img src={underlineImg} alt="" className="h-3 sm:h-4 mx-auto my-3 sm:my-4 w-48 sm:w-64" loading="lazy"
 />
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
            Stop wasting time on repetitive tasks. Focus on what actually grows your business.
          </p>
        </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-1000 pb-6 sm:pb-0 ${index < stats.length - 1 ? "border-b border-gray-100 md:border-b-0" : ""} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
                }}
              >
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <img 
                    src={stat.icon}
                    alt={stat.label}
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain"
                  loading="lazy"

                  />
                </div>

                {/* Value */}
                <div className="mb-4">
                  <div className="text-[1.85rem] sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                </div>

                {/* Label */}
                <p className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {stat.label}
                </p>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
          {/* Attribution */}
          <p className="text-center text-xs text-gray-400 mt-8">
            * Based on average results reported by AskTalos customers. Individual results may vary.
          </p>
      </div>
    </section>
  );
}
