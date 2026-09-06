import iconTick from "@/assets/icon-tick-blue.webp";
import { useEffect, useState } from "react";
import underlineImg from "@/assets/Untitled_design__13__2-removebg-preview.webp";
import chatbotImg from "@/assets/live-chat.webp";
import callingImg from "@/assets/call-dnd.webp";
import crmImg from "@/assets/lead-management.webp";
import emailImg from "@/assets/schedule.webp";
import whatsappImg from "@/assets/connect.webp";

const products = [
  {
    id: 1,
    title: "Chatbot",
    description: "AI-powered chatbot solution for seamless query resolutions and 24/7 customer support. Built to reduce ticket generation and enhance customer experience with intelligent conversations.",
    points: [
      "Seamless query resolution and support",
      "24/7 automated customer support",
      "Reduce support ticket generation"
    ],
    image: chatbotImg,
    imageAlt: "Chatbot Interface"
  },
  {
    id: 2,
    title: "Calling Solution",
    description: "Advanced calling platform for outbound and inbound communications. Manage calls efficiently with DND compliance, call recordings, and comprehensive analytics to track performance.",
    points: [
      "DND compliance for regulated calling",
      "Complete call recording and management",
      "Real-time call analytics and reporting"
    ],
    image: callingImg,
    imageAlt: "Calling Solution"
  },
  {
    id: 3,
    title: "CRM Management",
    description: "Powerful CRM system for managing leads, sales pipelines, and customer relationships. Track interactions, manage permissions, and accelerate sales with intelligent lead scoring.",
    points: [
      "Advanced lead management and scoring",
      "Sales pipeline tracking and forecasting",
      "Complete communication history management"
    ],
    image: crmImg,
    imageAlt: "CRM Dashboard"
  },
  {
    id: 4,
    title: "Email Campaign",
    description: "Create, schedule, and manage email campaigns with ease. Use drag-and-drop editor, custom templates, and advanced analytics to maximize engagement and track ROI.",
    points: [
      "Drag-and-drop email template builder",
      "Schedule campaigns with time zone optimization",
      "Comprehensive email analytics and tracking"
    ],
    image: emailImg,
    imageAlt: "Email Campaign"
  },
  {
    id: 5,
    title: "WhatsApp Business API",
    description: "Connect with customers via WhatsApp with AI-powered conversations and expert handoff. Send media, custom cards, and manage conversations at scale efficiently.",
    points: [
      "AI-powered WhatsApp conversations",
      "Seamless expert agent handoff",
      "Media and custom card support"
    ],
    image: whatsappImg, 
    imageAlt: "WhatsApp Business"
  }
];

export default function ProductFeaturesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % products.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const currentProduct = products[currentIndex];

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-12 xl:px-16 bg-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Header - Same size as RevenueSection */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-[1.85rem] sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            All-in-One <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">Product Suite</span>
          </h2>
          <img src={underlineImg} alt="Underline" className="h-4 mx-auto mb-4 w-44 sm:w-64" loading="lazy"
 />
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Comprehensive solutions designed to streamline your customer engagement and sales operations
          </p>
        </div>

        {/* Auto-scrolling Product Cards Display */}
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-700 ease-in-out" style={{
            transform: `translateX(-${currentIndex * 100}%)`
          }}>
            {products.map((product) => (
              <div key={product.id} className="w-full flex-shrink-0 px-2">
                <div className="border-2 border-gray-200 rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                  <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
                    {/* Content Section - Always Left */}
                    <div>
                      <h3 className="text-xl sm:text-[1.85rem] lg:text-3xl font-bold text-gray-900 mb-3">
                        {product.title}
                      </h3>
                      <p className="text-base lg:text-lg text-gray-700 mb-6 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Feature Points */}
                      <div className="space-y-3">
                        {product.points.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <img src={iconTick} alt="Check" className="w-5 h-5 flex-shrink-0 mt-1" loading="lazy"
 />
                            <p className="text-gray-700 font-medium text-base lg:text-lg">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Image Section - Always Right */}
                    <div className="flex justify-center lg:justify-end">
                      <div className="w-full max-w-sm lg:max-w-md h-64 lg:h-72 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl flex items-center justify-center overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.imageAlt}
                          className="w-full h-full object-contain p-3"
                        loading="lazy"

                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? 'bg-orange-500 w-8'
                  : 'bg-gray-300 w-2 hover:bg-gray-400'
              }`}
              aria-label={`Go to product ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
