import { useEffect, useRef, useState } from "react";
import { Star, Play } from "lucide-react";
import underlineImg from "@/assets/Untitled_design__13__2-removebg-preview.webp";

const TESTIMONIALS = [
  {
    name: "Priya Mehta",
    role: "Business Owner · Retail & E-commerce",
    rating: 4.5,
    subheading: "Hear directly from our customers and see how",
    quote:
      "My experience with AskTalos has been wonderful. A lot of what we have implemented is being applied in our customer engagement strategy. We are grateful to AskTalos for making our team capable of handling 3× more leads with the same headcount, the automation truly speaks for itself.",
    duration: "2:45",
    speed: "1.2x",
  },
  {
    name: "Arjun Sharma",
    role: "Founder · SaaS & Technology",
    rating: 5,
    subheading: "Hear directly from our customers and see how",
    quote:
      "AskTalos transformed how we handle customer conversations. The AI voice agent alone saved us 40+ hours per week. The platform is intuitive and the team is very supportive.",
    duration: "3:10",
    speed: "1.0x",
  },
  {
    name: "Neha Kapoor",
    role: "Marketing Head · Healthcare",
    rating: 4.5,
    subheading: "Hear directly from our customers and see how",
    quote:
      "We've seen a 60% improvement in lead response time since switching to AskTalos. The WhatsApp automation is especially powerful for our patient outreach campaigns.",
    duration: "2:20",
    speed: "1.2x",
  },
  {
    name: "Rohit Verma",
    role: "CEO · Real Estate",
    rating: 5,
    subheading: "Hear directly from our customers and see how",
    quote:
      "The CRM integration and automated follow-ups have completely changed our sales pipeline. We close deals 2× faster now. Highly recommend AskTalos to any growing business.",
    duration: "3:45",
    speed: "1.0x",
  },
  {
    name: "Sunita Patel",
    role: "Operations Manager · Education",
    rating: 4.5,
    subheading: "Hear directly from our customers and see how",
    quote:
      "AskTalos's chatbot handles 80% of our student queries automatically. Our support team now focuses on complex issues while routine questions are answered instantly.",
    duration: "2:55",
    speed: "1.2x",
  },
];

export default function VideoTestimonialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [active, setActive] = useState(0);

  const t = TESTIMONIALS[active];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const handlePlay = () => {
    if (videoRef.current) { videoRef.current.play(); setIsPlaying(true); }
  };

  const handleDotClick = (i: number) => {
    setActive(i);
    setIsPlaying(false);
    if (videoRef.current) videoRef.current.pause();
  };

  return (
    <section
      ref={sectionRef}
      className="py-8 sm:py-10 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #ffffff 35%, #ffffff 65%, rgba(255,247,237,0.3) 82%, rgba(255,237,213,0.5) 92%, rgba(254,215,170,0.6) 100%)" }}
    >
      <div className="max-w-[1100px] mx-auto">

        {/* ── Heading ── */}
        <div
          className="text-center mb-10 transition-all duration-700"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)" }}
        >
          <h2 className="text-[1.85rem] sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
            Real Stories,{" "}<span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">Real Results</span>
          </h2>
          <img src={underlineImg} alt="" className="h-3 sm:h-4 mx-auto my-3 w-48 sm:w-64" loading="lazy"
 />
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">Hear directly from our customers and see how AskTalos helped their business grow.</p>
        </div>

        {/* ── Main card ── */}
        <div
          className="transition-all duration-700"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(28px)", transitionDelay: "120ms" }}
        >
          {/* Single unified card */}
          <div className="rounded-2xl border border-gray-100 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

            {/* LEFT: Video */}
            <div className="relative bg-black" style={{ minHeight: 280 }}>
              <video
                ref={videoRef}
                src="/asktalos-product-demo.mp4"
                className="w-full h-full object-cover"
                style={{ minHeight: 280 }}
                controls={isPlaying}
                loop
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/30" onClick={handlePlay}>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl hover:scale-105 transition-all duration-200">
                    <Play className="w-7 h-7 sm:w-9 sm:h-9 text-orange-500 fill-orange-500 ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Quote content */}
            <div className="bg-white p-6 sm:p-8 flex flex-col justify-between">
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Meet {t.name}</h3>
                <p className="text-sm sm:text-xs text-gray-400 font-medium mb-3">{t.role}</p>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-4 h-4 text-orange-400 fill-orange-400" />
                  ))}
                  <Star className="w-4 h-4 text-orange-300 fill-orange-100" />
                  <span className="ml-1 text-sm font-bold text-gray-700">{t.rating}/5</span>
                </div>

                {/* Subheading */}
                <p className="text-sm sm:text-base font-semibold text-gray-800 mb-3 leading-snug">
                  {t.subheading}{" "}
                  <span className="text-orange-500">AskTalos</span>{" "}
                  helped their business grow
                </p>

                {/* Quote */}
                <p className="text-sm text-gray-500 leading-relaxed">{t.quote}</p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
