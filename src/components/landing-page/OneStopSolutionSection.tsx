import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import './OneStopSolutionSection.css';
import iconTick from "@/assets/icon-tick-blue.webp";

// Import product icons from navbar
import chatbotIcon from "@/assets/chat-bot_13889294.webp";
import crmIcon from "@/assets/crm_10690326.webp";
import technicalSupportIcon from "@/assets/technical-support_9732796.webp";
import trendIcon from "@/assets/trend_10070238.webp";
import whatsappIcon from "@/assets/whatsapp_2111774.webp";

// Import AskTalos logo
import logoImg from "@/assets/AskTalos_logo_svg.svg";
import underlineImg from "@/assets/Untitled_design__13__2-removebg-preview.webp";

// Define the products in circular orbit with detailed information
const products = [
  {
    id: 1,
    label: "CHATBOT",
    icon: chatbotIcon,
    title: "AI-Powered Chatbot",
    description: "Deliver seamless customer support 24/7 with intelligent conversations. Reduce support tickets and enhance customer satisfaction.",
    features: [
      "Seamless query resolution",
      "24/7 automated support",
      "Reduce support tickets"
    ]
  },
  {
    id: 2,
    label: "CALLING",
    icon: technicalSupportIcon,
    title: "Calling Solution",
    description: "Advanced calling platform with DND compliance, call recordings, and real-time analytics for efficient communication.",
    features: [
      "DND compliance",
      "Call recording & management",
      "Real-time analytics"
    ]
  },
  {
    id: 3,
    label: "EMAIL",
    icon: trendIcon,
    title: "Email Campaign",
    description: "Create, schedule, and manage email campaigns with drag-and-drop editor and comprehensive analytics.",
    features: [
      "Drag-and-drop builder",
      "Schedule optimization",
      "Email analytics"
    ]
  },
  {
    id: 4,
    label: "CRM",
    icon: crmIcon,
    title: "CRM Management",
    description: "Powerful CRM system for managing leads, sales pipelines, and customer relationships with intelligent scoring.",
    features: [
      "Advanced lead scoring",
      "Pipeline tracking",
      "Communication history"
    ]
  },
  {
    id: 5,
    label: "WHATSAPP",
    icon: whatsappIcon,
    title: "WhatsApp Business",
    description: "Connect with customers via WhatsApp with AI-powered conversations and seamless agent handoff.",
    features: [
      "AI-powered conversations",
      "Seamless handoff",
      "Media support"
    ]
  },
];

const ProductCard = ({ product, index, isActive, onClick }: any) => (
  <div 
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
    onClick={onClick}
  >
    <div className={`product-card-orbit-${index}`}>
      <div
        className={`
          flex flex-col items-center justify-center
          w-16 h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28 p-2 sm:p-3
          rounded-xl sm:rounded-2xl shadow-lg
          ${isActive ? 'bg-gradient-to-br from-orange-400 to-amber-300 border-2 border-orange-600' : 'bg-gradient-to-br from-white to-orange-50 border-2 border-orange-400/30'}
          cursor-pointer hover:shadow-2xl hover:scale-110 hover:border-orange-500/60
          transition-all duration-300 product-card-${index}
          backdrop-blur-sm
        `}
      >
        <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mb-0.5 sm:mb-1 flex items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 p-1 sm:p-2">
          <img src={product.icon} alt={product.label} className="w-full h-full object-contain brightness-0 invert" loading="lazy"
 />
        </div>
        <span className={`text-[8px] sm:text-xs font-bold text-center ${isActive ? 'text-white' : 'text-black'}`}>
          {product.label}
        </span>
      </div>
    </div>
  </div>
);

const CenterCard = () => (
  <div
    className="
      absolute top-1/2 left-1/2
      -translate-x-1/2 -translate-y-1/2
      flex flex-col items-center justify-center
      z-20
    "
  >
    <img src={logoImg} alt="AskTalos" className="w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 object-contain" loading="lazy"
 />
  </div>
);

export default function OneStopSolutionSection() {
  const [selectedProductId, setSelectedProductId] = useState(1);
  const [isManuallySelected, setIsManuallySelected] = useState(false);
  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  // Handle manual click - stop auto rotation
  const handleProductClick = (productId: number) => {
    setSelectedProductId(productId);
    setIsManuallySelected(true);
  };

  // Auto-rotate products every 7 seconds (only if not manually selected)
  useEffect(() => {
    if (isManuallySelected) return; // Don't auto-rotate if manually selected

    const interval = setInterval(() => {
      setSelectedProductId(prev => {
        const currentIndex = products.findIndex(p => p.id === prev);
        return products[(currentIndex + 1) % products.length].id;
      });
    }, 7000);
    return () => clearInterval(interval);
  }, [isManuallySelected]);

  return (
    <section className="pt-8 sm:pt-12 pb-0 px-4 sm:px-6 lg:px-12 xl:px-16 bg-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Centered Header and Underline - Above */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-[1.85rem] sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight px-4">
            One Stop Solution <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">for All Customer Services</span>
          </h2>
          <img src={underlineImg} alt="Underline" className="h-3 sm:h-4 mx-auto w-48 sm:w-64 mb-3" loading="lazy"
 />
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Manage all customer interactions from a single unified platform
          </p>
        </div>

        {/* Left: Diagram | Right: Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 items-center">
          {/* Left: Central Diagram Section */}
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-xl aspect-square mx-auto flex justify-center items-center sm:-translate-y-6 lg:-translate-y-12 lg:col-span-2">
            
            {/* Static circular reference line */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] lg:w-[320px] lg:h-[320px] rounded-full border-2 border-dashed border-orange-400/30 pointer-events-none z-0" />

            {/* Render Product Cards on Orbit */}
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isActive={selectedProductId === product.id}
                onClick={() => handleProductClick(product.id)}
              />
            ))}

            {/* Render Center Card with AskTalos Logo */}
            <CenterCard />
          </div>

          {/* Right: Product Details Cards */}
          <div className="flex flex-col space-y-3 sm:space-y-4 sm:-translate-y-6 lg:-translate-y-12 border-2 border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white lg:col-span-2">
            <div>
              {/* Product Title with Icon */}
              <div className="flex items-center gap-2 sm:gap-3 mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 p-2">
                  <img src={selectedProduct.icon} alt={selectedProduct.title} className="w-full h-full object-contain brightness-0 invert" loading="lazy"
 />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">
                  {selectedProduct.title}
                </h3>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Feature Points with Tick Icon */}
              <div className="space-y-2 sm:space-y-3">
                {selectedProduct.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 sm:gap-3">
                    <img src={iconTick} alt="Check" className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-1" loading="lazy"
 />
                    <p className="text-gray-700 font-medium text-sm sm:text-base lg:text-lg">{feature}</p>
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
