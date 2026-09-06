import { useState, useEffect } from "react";
import logoBarkco from "@/assets/logo-barkco.webp";
import logoPemeco from "@/assets/logo-pemeco.webp";
import logoOnfido from "@/assets/logo-onfido.webp";
import logoEncqap from "@/assets/logo-encqap.webp";
import logoInsideaiml from "@/assets/logo-insideaiml.webp";
import logoNuromat from "@/assets/logo-nuromat.webp";
import underlineImg from "@/assets/Untitled_design__13__2-removebg-preview.webp";

const CustomerTestimonialsCarousel = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(2);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      id: 0,
      name: "Barkco",
      role: "E-commerce Platform",
      quote: "AskTalos's <span class='text-orange-500'>AI voice agent now handles the majority of our inbound calls</span>, cutting hold times and letting our team focus on complex customer issues instead of <span class='text-orange-500'>repetitive queries</span>.",
      logo: logoBarkco
    },
    {
      id: 1,
      name: "Pemeco",
      role: "Retail Solutions",
      quote: "The unified <span class='text-orange-500'>CRM gives our sales team a single view</span> of every customer interaction. Deal cycles are faster and <span class='text-orange-500'>nothing falls through the cracks</span> anymore.",
      logo: logoPemeco
    },
    {
      id: 2,
      name: "Onfido",
      role: "Financial Services",
      quote: "AskTalos <span class='text-orange-500'>WhatsApp integration made our customer onboarding seamless</span>. Document verification and instant KYC through WhatsApp reduced our processing time from <span class='text-orange-500'>days to hours</span>.",
      logo: logoOnfido
    },
    {
      id: 3,
      name: "Encqap",
      role: "Healthcare Provider",
      quote: "Our <span class='text-orange-500'>AI chatbot now resolves common patient questions instantly</span>, 24/7, freeing our support team to focus on <span class='text-orange-500'>urgent care coordination</span>.",
      logo: logoEncqap
    },
    {
      id: 4,
      name: "InsideAIML",
      role: "EdTech Platform",
      quote: "Automated <span class='text-orange-500'>email sequences through AskTalos</span> keep students informed on enrollment, assignments, and deadlines <span class='text-orange-500'>without manual follow-ups</span>.",
      logo: logoInsideaiml
    },
    {
      id: 5,
      name: "Nuromat",
      role: "Logistics Company",
      quote: "Bringing calls, WhatsApp, and email into <span class='text-orange-500'>one AskTalos dashboard</span> gave our ops team complete visibility into <span class='text-orange-500'>every customer journey</span>.",
      logo: logoNuromat
    }
  ];

  const activeItem = testimonials[activeTestimonial];

  const handleTestimonialClick = (index: number) => {
    setActiveTestimonial(index);
  };

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-12 lg:pb-12 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-[1.85rem] sm:text-3xl md:text-4xl text-gray-900 text-center font-bold tracking-tight mb-3">
          What Our <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">Customers Say</span>
        </h2>
        <img src={underlineImg} alt="" className="h-4 mx-auto my-4 w-64" loading="lazy"
 />
        <p className="text-gray-600 text-base max-w-2xl mx-auto">
          Hear from businesses using AskTalos across CRM, calling, WhatsApp, email, and chatbot workflows. Real stories, real results.
        </p>
      </div>

      {/* Testimonial Section */}
      <div
        className="relative overflow-hidden ring-1 ring-gray-200 rounded-3xl p-6 sm:p-8 backdrop-blur bg-white"
        style={{ minHeight: '400px' }}
      >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: 'linear-gradient(to right, rgba(156, 163, 175, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(156, 163, 175, 0.12) 1px, transparent 1px)',
                backgroundSize: '64px 64px'
              }}
            ></div>
            <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl"></div>
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl"></div>

            <div className="absolute top-6 left-6 opacity-10 text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M7 7h3v10H5V9a2 2 0 0 1 2-2Zm9 0h3v10h-5V9a2 2 0 0 1 2-2Z"></path>
              </svg>
            </div>

            <div className="flex flex-col justify-between" style={{ minHeight: '320px' }}>
              <blockquote className="relative text-center max-w-5xl mx-auto transition-opacity duration-300 flex-1 flex items-center justify-center">
                <p
                  className="text-xl sm:text-[1.85rem] md:text-3xl leading-relaxed font-normal text-gray-900"
                  dangerouslySetInnerHTML={{ __html: activeItem.quote }}
                ></p>
              </blockquote>

              <div className="mt-6 text-center transition-opacity duration-300">
                <p className="text-sm sm:text-base text-gray-900 font-medium">
                  {activeItem.name} <span className="text-gray-600 font-normal">{activeItem.role}</span>
                </p>
              </div>

              <div className="mt-8 flex items-end justify-center gap-3 sm:gap-4 flex-wrap">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    onClick={() => handleTestimonialClick(index)}
                    className={`cursor-pointer transition-all duration-200 rounded-xl object-cover p-3 ${
                      activeTestimonial === index
                        ? 'h-16 w-24 sm:h-20 sm:w-28 ring-2 ring-orange-500/40 shadow-lg bg-white'
                        : 'h-14 w-20 sm:h-16 sm:w-24 ring-1 ring-gray-200 opacity-70 hover:opacity-90 bg-white'
                    }`}
                  >
                    <img
                      src={testimonial.logo}
                      alt={testimonial.name}
                      className="w-full h-full object-contain"
                    loading="lazy"

                    />
                  </div>
                ))}
              </div>
            </div>
      </div>
    </section>
  );
};

export default CustomerTestimonialsCarousel;
