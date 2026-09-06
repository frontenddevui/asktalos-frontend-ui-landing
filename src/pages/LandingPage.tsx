import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { BelowFoldSkeleton } from "@/components/shared/skeletons";
import Layout from "@/components/shared/LandingLayout.tsx";
// Above-fold sections — eagerly loaded
import HeroSection from "@/components/landing-page/HeroSection.tsx";
import TrustSection from "@/components/landing-page/TrustSection.tsx";
// Below-fold sections — lazy loaded (split into separate chunks)
const WhatIsAskTalosSection     = lazy(() => import("@/components/landing-page/WhatIsAskTalosSection.tsx"));
const ProductSolutionsSection   = lazy(() => import("@/components/landing-page/ProductSolutionsSection.tsx"));
const OneStopSolutionSection    = lazy(() => import("@/components/landing-page/OneStopSolutionSection.tsx"));
const ProductFeaturesSection    = lazy(() => import("@/components/landing-page/ProductFeaturesSection.tsx"));
const TrustedBySection          = lazy(() => import("@/components/landing-page/TrustedBySection.tsx"));
const EasyIntegrationSection    = lazy(() => import("@/components/shared/EasyIntegrationSection.tsx"));
const CTADashboardSection       = lazy(() => import("@/components/landing-page/CTADashboardSection.tsx"));
const WhyAskTalosSection        = lazy(() => import("@/components/shared/WhyAskTalosSection.tsx"));
const RevenueSection            = lazy(() => import("@/components/landing-page/RevenueSection.tsx"));
const TestimonialsCarouselSection = lazy(() => import("@/components/landing-page/TestimonialsCarouselSection.tsx"));
const CustomerTestimonialsCarousel = lazy(() => import("@/components/landing-page/CustomerTestimonialsCarousel.tsx"));
const FAQSection                = lazy(() => import("@/components/shared/FAQSection.tsx"));
const GrowWithAskTalosSection   = lazy(() => import("@/components/landing-page/GrowWithAskTalosSection.tsx"));
const BusinessOwnerVideoTestimonialsSection = lazy(() => import("@/components/landing-page/BusinessOwnerVideoTestimonialsSection.tsx"));
const VideoTestimonialSection   = lazy(() => import("@/components/landing-page/VideoTestimonialSection.tsx"));
const TwoHourRoadmapSection     = lazy(() => import("@/components/landing-page/TwoHourRoadmapSection.tsx"));
const AgentShowcaseSection      = lazy(() => import("@/components/landing-page/AgentShowcaseSection.tsx"));
const ProblemsSection           = lazy(() => import("@/components/landing-page/ProblemsSection.tsx"));
const MeetYourCoachSection      = lazy(() => import("@/components/landing-page/MeetYourCoachSection.tsx"));
const WhatYouMightBeLosingSection = lazy(() => import("@/components/landing-page/WhatYouMightBeLosingSection.tsx"));
import { FadeUp, FadeUpStagger, FadeUpItem } from "@/components/shared/FadeUp";
import { Signal, Bot, Users, RefreshCw, Zap, Target, ShieldCheck, BarChart3, Headphones } from "lucide-react";
import step1CaptureLeads from "@/assets/step1-capture-leads.webp";
import step2AiCalls from "@/assets/step2-ai-calls.webp";
import step3QualifiedLeads from "@/assets/step3-qualified-leads.webp";
import step4FollowUps from "@/assets/step4-follow-ups.webp";
import step5Convert from "@/assets/step5-convert.webp";
import underlineImg from "@/assets/Untitled_design__13__2-removebg-preview.webp";
import centerBannerImg from "@/assets/market-leadership-banner.webp";
import heroFeatureCardsImg from "@/assets/hero-feature-cards.webp";


const Index = () => {
  const stepsRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reveal steps one-by-one when section enters viewport
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let fired = false;
    const activate = () => {
      if (fired) return;
      fired = true;
      timers.forEach(clearTimeout);
      timers.length = 0;
      setActiveStep(-1);
      [0, 1, 2, 3, 4].forEach((step) => {
        timers.push(setTimeout(() => setActiveStep(step), step * 550 + 200));
      });
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activate();
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (stepsRef.current) observer.observe(stepsRef.current);
    // Fallback: if observer never fires (e.g. already in view on load), show all steps after 1.5s
    const fallback = setTimeout(() => { activate(); }, 1500);
    return () => { observer.disconnect(); timers.forEach(clearTimeout); clearTimeout(fallback); };
  }, []);

  return <Layout showDemoPopup={true} demoPopupDelay={10000}>

      {/* ─── 1. HOOK ─────────────────────────────────── */}
      <HeroSection />

      {/* Below-fold content — loaded lazily */}
      <Suspense fallback={<BelowFoldSkeleton />}>

      {/* ─── 5. PROBLEMS + COSTS ─────────────────────── */}
      <ProblemsSection />

      {/* ─── 5b. MEET YOUR COACH ──────────────────────── */}
      <MeetYourCoachSection />

      {/* ─── 5c. WHAT YOU MIGHT BE LOSING ─────────────── */}
      <WhatYouMightBeLosingSection />

      {/* ─── 6. PROCESS VISUAL — lead to conversion ───── */}
      <section
        className="px-4 sm:px-6 lg:px-12 xl:px-16 pt-8 sm:pt-10 pb-12 sm:pb-16"
        style={{ background: "linear-gradient(180deg, #ffffff 0%, #ffffff 62%, rgba(255,247,237,0.7) 84%, #fff7ed 100%)" }}
      >
        <FadeUp className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-[1.85rem] sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
            From lead to loyalty,{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">All on Autopilot</span>
          </h2>
          <img src={underlineImg} alt="" className="h-3 sm:h-4 mx-auto my-3 w-48 sm:w-64" loading="lazy"
 />
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
            From the first message to the final sale, everything is handled automatically inside one simple system, with no manual work needed.
          </p>
        </FadeUp>

        {/* Steps card — scroll-animated */}
        <div ref={stepsRef} className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 px-6 py-8 sm:px-8 sm:py-10">

            {/* 5 steps */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2 items-start">
              {([
                {
                  img: step1CaptureLeads,
                  color: "#3b82f6",
                  title: "Capture leads instantly",
                  desc: "Every enquiry from calls, forms, ads, and chats — grabbed automatically the moment it arrives.",
                },
                {
                  img: step2AiCalls,
                  color: "#22c55e",
                  title: "AI calls them within seconds",
                  desc: "No delays, no voicemails. Every lead gets a call before they even think about your competitor.",
                },
                {
                  img: step3QualifiedLeads,
                  color: "#f97316",
                  title: "Qualified and assigned automatically",
                  desc: "90%+ of leads scored and routed to the right rep. Your team only speaks to people worth speaking to.",
                },
                {
                  img: step4FollowUps,
                  color: "#7c3aed",
                  title: "Follow-ups run themselves",
                  desc: "10+ touchpoints sent across WhatsApp, SMS, email, and calls — without anyone pressing a button.",
                },
                {
                  img: step5Convert,
                  color: "#f43f5e",
                  title: "More deals, same team",
                  desc: "Up to 3× more conversions. Zero extra headcount. Zero extra cost.",
                },
              ]).map((step, i, arr) => {
                const isActive = activeStep >= i;
                const isCurrentlyActive = activeStep === i;
                return (
                <div
                  key={i}
                  className="flex flex-col items-start sm:items-center gap-0 relative"
                  style={{
                    opacity: isActive ? 1 : 0.15,
                    transform: isActive ? "translateY(0)" : "translateY(18px)",
                    transition: "opacity 0.55s ease, transform 0.55s ease",
                  }}
                >
                    {/* Arrow between steps (desktop) */}
                  {i < arr.length - 1 && (
                    <div className="hidden sm:flex absolute top-[36px] left-[calc(50%+40px)] right-0 items-center" style={{ width: "calc(100% - 80px)", zIndex: 1 }}>
                      <div
                        className="flex-1 h-0.5 transition-colors duration-500"
                        style={{ background: activeStep > i ? step.color : "#e5e7eb" }}
                      />
                      <svg width="12" height="12" viewBox="0 0 12 12"
                        style={{ color: activeStep > i ? step.color : "#d1d5db" }}
                        className="flex-shrink-0 transition-colors duration-500"
                      >
                        <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </div>
                  )}
                  <div className="sm:text-center flex sm:flex-col sm:items-center gap-3 sm:gap-0 w-full">
                    {/* Step image */}
                    <div
                      className="flex-shrink-0 sm:mb-4 transition-all duration-500"
                      style={{
                        width: isCurrentlyActive ? 80 : 72,
                        height: isCurrentlyActive ? 80 : 72,
                        borderRadius: "50%",
                        boxShadow: isActive ? `0 0 0 8px ${step.color}26` : "none",
                      }}
                    >
                      <img src={step.img} alt={step.title} className="w-full h-full object-contain" style={{ borderRadius: "50%" }} loading="lazy" decoding="async" />
                    </div>
                    <div className="sm:px-2 text-left sm:text-center">
                      <p className="text-sm font-bold text-gray-900 leading-tight mb-1">{step.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Arrow between steps (mobile) */}
                  {i < arr.length - 1 && (
                    <div className="flex sm:hidden items-center pl-9 my-2">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-0.5 h-5 rounded-full transition-colors duration-500"
                          style={{ background: activeStep > i ? step.color : "#e5e7eb" }}
                        />
                        <svg
                          width="11" height="11" viewBox="0 0 11 11"
                          className="transition-colors duration-500"
                          style={{ color: activeStep > i ? step.color : "#d1d5db", marginTop: -1 }}
                        >
                          <path d="M5.5 1v9M2 7l3.5 3 3.5-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-100" />

            {/* Bottom features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { Icon: Zap,         label: "100% Automated",  sub: "Process",           bg: "#eff6ff", color: "#3b82f6" },
                { Icon: Target,      label: "Faster Response", sub: "Higher Conversion", bg: "#f5f3ff", color: "#8b5cf6" },
                { Icon: ShieldCheck, label: "No Manual Work",  sub: "No Missed Leads",   bg: "#f0fdf4", color: "#16a34a" },
                { Icon: BarChart3,   label: "More Sales",      sub: "Better Growth",     bg: "#fffbeb", color: "#d97706" },
              ].map(({ Icon, label, sub, bg, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-full" style={{ background: bg }}>
                    <Icon className="h-4 w-4" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{label}</p>
                    <p className="text-xs text-gray-400">{sub}</p>
                  </div>
                </div>
              ))}
            </div>


          </div>
        </div>
      </section>

      {/* ─── 3. VISUAL PLATFORM SNAPSHOT ─────────────── */}
      <section
        className="px-4 sm:px-6 lg:px-12 xl:px-16 pt-0 pb-0"
        style={{ background: "linear-gradient(180deg, #fff7ed 0%, rgba(255,247,237,0.55) 22%, #ffffff 48%, #ffffff 100%)" }}
      >
        <FadeUp className="max-w-5xl mx-auto pt-8">
          <img
            src={heroFeatureCardsImg}
            alt="AskTalos platform features — Unified CRM, AI Voice & Chatbot, Multi-Channel Campaigns, Integrated Billing"
            className="w-full h-auto object-contain"
            loading="lazy"
            decoding="async"
            width={1024}
            height={600}
          />
        </FadeUp>
      </section>

      {/* ─── 4. CREDIBILITY STATS ─────────────────────── */}
      <TrustSection />

      {/* ─── 13. SOCIAL PROOF — video testimonials ─────── */}
      <VideoTestimonialSection />

      {/* ─── 5. THE PITCH — what AskTalos does ────────── */}
      {/* moved below — see section 8.5 */}

      {/* ─── 9. MEET THE AGENTS ───────────────────── */}
      <AgentShowcaseSection />

      {/* ─── 8. CHANNEL SOLUTIONS ─────────────────────── */}
      <ProductSolutionsSection />

      {/* ─── 7. PRODUCT OVERVIEW — HIDDEN ────── */}
      {/* <section
        className="px-4 sm:px-6 lg:px-12 xl:px-16 pt-10 pb-8 sm:pb-12 bg-white"
      >
        <FadeUp className="max-w-3xl mx-auto text-center mb-2">
          <h2 className="text-[1.85rem] sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Connect Smarter.{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">Grow Faster.</span>
          </h2>
          <img src={underlineImg} alt="" className="h-3 sm:h-4 mx-auto my-3 w-48 sm:w-64" loading="lazy"
 />
          <p className="text-gray-500 text-base sm:text-lg">
            From first contact to loyal customer, manage every channel without switching tools.
          </p>
        </FadeUp>
        <WhatIsAskTalosSection />
      </section> */}

      {/* ─── 10. USE CASE — WhatsApp lead qualification ─ */}
      {/* ─── 8.5 YOUR 2-HOUR ROADMAP ──────────────────── */}
      <TwoHourRoadmapSection />

      {/* ─── 14. RESULTS & PROOF ──────────────────────── */}
      <RevenueSection />

      {/* ─── 14. GROWTH STATS ─────────────────────────── */}
      <GrowWithAskTalosSection />

      {/* ─── 15. MARKET LEADERSHIP BANNER ─────────────── */}
      <section className="relative py-10 sm:py-14 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-6 sm:mb-8">
            <h2 className="text-[1.85rem] sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              <span className="text-gray-900">Trusted by </span>
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">Thousands of Businesses</span>
            </h2>
            <img src={underlineImg} alt="Underline" className="h-3 sm:h-4 mx-auto my-3 sm:my-4 w-48 sm:w-64" loading="lazy"
 />
            <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto px-4">
              Thousands of businesses use AskTalos to grow faster, sell more, and keep customers happy with less manual work.
            </p>
          </FadeUp>
          <FadeUp delay={0.15} className="w-full max-w-5xl mx-auto px-2 sm:px-4">
            <img
              src={centerBannerImg}
              alt="Market leadership banner"
              className="w-full h-auto object-contain"
              loading="lazy"
              decoding="async"
              width={1024}
              height={400}
            />
          </FadeUp>
        </div>
      </section>

      {/* ─── 11. VIDEO TESTIMONIALS — business owners ─── */}
      <BusinessOwnerVideoTestimonialsSection />

      {/* ─── 17. INTEGRATION BREADTH ───────────────────── */}
      <EasyIntegrationSection />

      {/* ─── 22. WHAT OUR CUSTOMERS SAY ────────── */}
      <CustomerTestimonialsCarousel />

      {/* ─── 23. FAQ — answer final objections ─────────── */}
      <FAQSection />
      </Suspense>
    </Layout>;
};
export default Index;