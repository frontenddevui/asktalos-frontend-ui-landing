import { useState, useEffect, useRef } from "react";
import facebook from "@/assets/facebook.svg";
import ga1 from "@/assets/GA-1.svg";
import ga from "@/assets/GA.svg";
import gaw from "@/assets/GAW.svg";
import gsc from "@/assets/GSC.svg";
import hubspot from "@/assets/hubspot.svg";
import instagram from "@/assets/Instagram-1.svg";
import jira from "@/assets/jira.svg";
import linkedin from "@/assets/Linkedin.svg";
import semrush from "@/assets/semrush.svg";
import sf from "@/assets/sf.svg";
import twitter from "@/assets/twitter.svg";
import vimeo from "@/assets/vimeo.svg";
import wp from "@/assets/WP-1.svg";
// underlineImg removed — no longer used
import underlineImg from "@/assets/Untitled_design__13__2-removebg-preview.webp";

export default function EasyIntegrationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const tools = [
    { src: facebook, name: "Facebook" },
    { src: ga1, name: "Google Analytics" },
    { src: ga, name: "Google Analytics" },
    { src: gaw, name: "Google Ads" },
    { src: gsc, name: "Google Search Console" },
    { src: hubspot, name: "HubSpot" },
    { src: instagram, name: "Instagram" },
    { src: jira, name: "Jira" },
    { src: linkedin, name: "LinkedIn" },
    { src: semrush, name: "SEMrush" },
    { src: sf, name: "Salesforce" },
    { src: twitter, name: "X (Twitter)" },
    { src: vimeo, name: "Vimeo" },
    { src: wp, name: "WordPress" },
  ];

  // Split tools into two rows of 7 each
  const row1 = tools.slice(0, 7);
  const row2 = tools.slice(7, 14);

  return (
    <section 
      ref={sectionRef}
      className={`overflow-hidden px-4 py-14 transition-all duration-1000 sm:px-6 sm:py-20 lg:px-8 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ background: "linear-gradient(180deg, rgba(255,237,213,0.55) 0%, rgba(255,247,237,0.35) 12%, #ffffff 32%, #ffffff 68%, rgba(255,247,237,0.35) 88%, rgba(255,237,213,0.55) 100%)" }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header — centered badge style */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <h2 className="text-[1.85rem] font-bold tracking-tight sm:text-3xl md:text-4xl">
            <span className="text-gray-900">Easy integration </span>
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">with dozens+ tools</span>
          </h2>
          <img src={underlineImg} alt="" className="mx-auto my-3 h-3 w-44 sm:my-4 sm:h-4 sm:w-60" loading="lazy"
 />
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
            Connect AskTalos with all your favorite tools and platforms seamlessly
          </p>
        </div>

        {/* Tools Grid with Animation */}
        <div className="space-y-6 sm:space-y-8">
          {/* Row 1 - Left to Right Animation (7 icons) */}
          <div className="relative overflow-hidden">
            <style>
              {`
                @keyframes scroll-ltr {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(calc(-50% - 1rem));
                  }
                }
                .carousel-ltr {
                  animation: scroll-ltr 25s linear infinite;
                  display: flex;
                  gap: 1rem;
                }
                @media (min-width: 640px) {
                  .carousel-ltr {
                    gap: 2rem;
                  }
                  @keyframes scroll-ltr {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(calc(-50% - 2rem)); }
                  }
                }
              `}
            </style>
            <div className="carousel-container overflow-hidden">
              <div className="carousel-ltr">
                {row1.map((tool, index) => (
                  <div
                    key={`ltr-${index}`}
                    className="flex flex-shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-md hover:shadow-orange-100/50 sm:p-4"
                  >
                    <img
                      src={tool.src}
                      alt={`${tool.name} integration`}
                      className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 object-contain"
                    loading="lazy"

                    />
                  </div>
                ))}
                {row1.map((tool, index) => (
                  <div
                    key={`ltr-dup-${index}`}
                    className="flex flex-shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-md hover:shadow-orange-100/50 sm:p-4"
                  >
                    <img
                      src={tool.src}
                      alt={`${tool.name} integration`}
                      className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 object-contain"
                    loading="lazy"

                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 - Right to Left Animation (7 icons) */}
          <div className="relative overflow-hidden">
            <style>
              {`
                @keyframes scroll-rtl {
                  0% {
                    transform: translateX(calc(-50% - 1rem));
                  }
                  100% {
                    transform: translateX(0);
                  }
                }
                .carousel-rtl {
                  animation: scroll-rtl 25s linear infinite;
                  display: flex;
                  gap: 1rem;
                }
                @media (min-width: 640px) {
                  .carousel-rtl {
                    gap: 2rem;
                  }
                  @keyframes scroll-rtl {
                    0%   { transform: translateX(calc(-50% - 2rem)); }
                    100% { transform: translateX(0); }
                  }
                }
              `}
            </style>
            <div className="carousel-container-rtl overflow-hidden">
              <div className="carousel-rtl">
                {row2.map((tool, index) => (
                  <div
                    key={`rtl-${index}`}
                    className="flex flex-shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-md hover:shadow-orange-100/50 sm:p-4"
                  >
                    <img
                      src={tool.src}
                      alt={`${tool.name} integration`}
                      className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 object-contain"
                    loading="lazy"

                    />
                  </div>
                ))}
                {row2.map((tool, index) => (
                  <div
                    key={`rtl-dup-${index}`}
                    className="flex flex-shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-md hover:shadow-orange-100/50 sm:p-4"
                  >
                    <img
                      src={tool.src}
                      alt={`${tool.name} integration`}
                      className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 object-contain"
                    loading="lazy"

                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
