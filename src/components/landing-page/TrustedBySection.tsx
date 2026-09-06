import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import logoInsideAIML from "@/assets/logo-insideaiml.webp";
import img1 from "@/assets/img-1.webp";
import img2 from "@/assets/img-2.webp";
import img4 from "@/assets/img-4.webp";

export default function TrustedBySection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-rotate images for InsideAIML testimonial
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % 3); // Cycle through 3 images
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(imageInterval);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-12 xl:px-16 relative overflow-hidden" style={{ background: "linear-gradient(180deg, rgba(254,215,170,0.6) 0%, rgba(255,237,213,0.5) 8%, rgba(255,247,237,0.3) 18%, #ffffff 35%, #ffffff 100%)" }}>
      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Heading */}
        <div className="mb-8 lg:mb-12">
          {/* Mobile: Left-aligned with orange bar */}
          <div className="lg:hidden">
            <div className="flex items-start gap-2 sm:gap-3 mb-2">
              <div className="w-1 sm:w-1.5 h-10 sm:h-12 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full flex-shrink-0"></div>
              <div>
                <h2 className="text-[1.85rem] sm:text-3xl font-bold mb-4">
                  <span className="text-gray-900">Trusted by </span>
                  <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">Leading Businesses Worldwide</span>
                </h2>
                <p className="hidden sm:block text-lg text-gray-600">
                  See how companies are transforming their customer service with AskTalos AI voice agents
                </p>
              </div>
            </div>
          </div>
          {/* Desktop: Center-aligned */}
          <div className="hidden lg:block text-center">
            <h2 className="text-[1.85rem] sm:text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gray-900">Trusted by </span>
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">Leading Businesses Worldwide</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how companies are transforming their customer service with AskTalos AI voice agents
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons - Desktop only with boxes */}
          <button onClick={() => setCurrentTestimonial(prev => prev === 0 ? 2 : prev - 1)} className="hidden lg:block absolute -left-2 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all border border-gray-200">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button onClick={() => setCurrentTestimonial(prev => prev === 2 ? 0 : prev + 1)} className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all border border-gray-200">
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Case Study Cards - Carousel */}
          <div className="overflow-hidden px-2 sm:px-4 lg:px-16">
            <div className="transition-all duration-500 ease-in-out">
              {/* Case Study Card 1 - InsideAIML EdTech */}
              {currentTestimonial === 0 && (
                <div className="border-2 border-gray-200 rounded-xl p-3 sm:p-6 bg-white shadow-lg animate-fade-in">
                  <div className="grid lg:grid-cols-[1fr,400px] gap-3 sm:gap-6">
                    <div className="flex flex-col justify-between py-2">
                      {/* Company Info at Top Left */}
                      <div className="flex items-center gap-3 sm:gap-8 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <img src={logoInsideAIML} alt="InsideAIML Logo" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-contain" loading="lazy"
 />
                          <div>
                            <div className="font-bold text-gray-900 text-sm sm:text-base">InsideAIML</div>
                            <div className="text-xs sm:text-sm text-gray-600">EdTech & Online Learning</div>
                          </div>
                        </div>
                        <div className="ml-auto">
                          <div className="text-xs sm:text-sm text-gray-500">Company Size</div>
                          <div className="font-bold text-base sm:text-lg bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">100-200</div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white border border-gray-300 rounded-md text-[10px] sm:text-xs font-medium text-gray-700">STUDENT ENROLLMENT</span>
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white border border-gray-300 rounded-md text-[10px] sm:text-xs font-medium text-gray-700">COURSE INQUIRIES</span>
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white border border-gray-300 rounded-md text-[10px] sm:text-xs font-medium text-gray-700">24/7 SUPPORT</span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 text-base sm:text-sm lg:text-base leading-relaxed mb-3 sm:mb-4">
                        Leading EdTech platform InsideAIML deployed AskTalos Voice AI agents to handle student inquiries, course enrollment, and support queries with instant responses 24/7.
                      </p>

                      {/* Metrics in Row */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-auto">
                        <div className="border border-gray-200 rounded-lg p-2 sm:p-3 bg-white">
                          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-1">8x</div>
                          <div className="text-[10px] sm:text-xs text-gray-600 leading-tight">Jump in Conversions</div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-2 sm:p-3 bg-white">
                          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-1">-50%</div>
                          <div className="text-[10px] sm:text-xs text-gray-600 leading-tight">Response Time</div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-2 sm:p-3 bg-white">
                          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-1">95%</div>
                          <div className="text-[10px] sm:text-xs text-gray-600 leading-tight">Student Satisfaction</div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-2 sm:p-3 bg-white">
                          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-1">+75%</div>
                          <div className="text-[10px] sm:text-xs text-gray-600 leading-tight">Enrollment Rate</div>
                        </div>
                      </div>
                    </div>

                    {/* Company Image - Auto-rotating Carousel */}
                    <div className="flex items-center justify-center">
                      <div className="bg-gray-900 rounded-xl w-full max-w-[400px] h-[200px] sm:h-[280px] overflow-hidden relative">
                        {/* Image 1 */}
                        <div className={`absolute inset-0 transition-opacity duration-1000 ${currentImage === 0 ? 'opacity-100' : 'opacity-0'}`}>
                          <img src={img1} alt="InsideAIML 1" className="w-full h-full object-cover" loading="lazy"
 />
                        </div>
                        {/* Image 2 */}
                        <div className={`absolute inset-0 transition-opacity duration-1000 ${currentImage === 1 ? 'opacity-100' : 'opacity-0'}`}>
                          <img src={img2} alt="InsideAIML 2" className="w-full h-full object-cover" loading="lazy"
 />
                        </div>
                        {/* Image 3 */}
                        <div className={`absolute inset-0 transition-opacity duration-1000 ${currentImage === 2 ? 'opacity-100' : 'opacity-0'}`}>
                          <img src={img4} alt="InsideAIML 3" className="w-full h-full object-cover" loading="lazy"
 />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Case Study Card 2 - E-commerce */}
              {currentTestimonial === 1 && (
                <div className="border-2 border-gray-200 rounded-xl p-3 sm:p-6 bg-white shadow-lg animate-fade-in">
                  <div className="grid lg:grid-cols-[1fr,400px] gap-3 sm:gap-6">
                    <div className="flex flex-col justify-between py-2">
                      {/* Company Info at Top Left */}
                      <div className="flex items-center gap-3 sm:gap-8 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">E</div>
                          <div>
                            <div className="font-bold text-gray-900 text-sm sm:text-base">EcomGrowth</div>
                            <div className="text-xs sm:text-sm text-gray-600">E-commerce & Retail</div>
                          </div>
                        </div>
                        <div className="ml-auto">
                          <div className="text-xs sm:text-sm text-gray-500">Company Size</div>
                          <div className="font-bold text-base sm:text-lg bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">200-500</div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white border border-gray-300 rounded-md text-[10px] sm:text-xs font-medium text-gray-700">SALES AUTOMATION</span>
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white border border-gray-300 rounded-md text-[10px] sm:text-xs font-medium text-gray-700">LEAD NURTURING</span>
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white border border-gray-300 rounded-md text-[10px] sm:text-xs font-medium text-gray-700">FOLLOW-UP CALLS</span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 text-base sm:text-sm leading-relaxed mb-3 sm:mb-4">
                        E-commerce company deployed AskTalos to handle outbound sales calls and lead qualification, dramatically increasing conversion rates.
                      </p>

                      {/* Metrics in Row */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-auto">
                        <div className="border border-gray-200 rounded-lg p-2 sm:p-3 bg-white">
                          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-1">+85%</div>
                          <div className="text-[10px] sm:text-xs text-gray-600 leading-tight">Lead Response Time</div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-2 sm:p-3 bg-white">
                          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-1">3.2x</div>
                          <div className="text-[10px] sm:text-xs text-gray-600 leading-tight">Conversion Rate</div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-2 sm:p-3 bg-white">
                          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-1">-65%</div>
                          <div className="text-[10px] sm:text-xs text-gray-600 leading-tight">Cost Per Lead</div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-2 sm:p-3 bg-white">
                          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-1">+40%</div>
                          <div className="text-[10px] sm:text-xs text-gray-600 leading-tight">Sales Qualified</div>
                        </div>
                      </div>
                    </div>

                    {/* Company Image - Right Side Only */}
                    <div className="flex items-center justify-center">
                      <div className="bg-black rounded-xl w-full max-w-[400px] h-[200px] sm:h-[280px]"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Case Study Card 3 - Tech Support */}
              {currentTestimonial === 2 && (
                <div className="border-2 border-gray-200 rounded-xl p-3 sm:p-6 bg-white shadow-lg animate-fade-in">
                  <div className="grid lg:grid-cols-[1fr,400px] gap-3 sm:gap-6">
                    <div className="flex flex-col justify-between py-2">
                      {/* Company Info at Top Left */}
                      <div className="flex items-center gap-3 sm:gap-8 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">T</div>
                          <div>
                            <div className="font-bold text-gray-900 text-sm sm:text-base">TechCorp Global</div>
                            <div className="text-xs sm:text-sm text-gray-600">Technology & SaaS</div>
                          </div>
                        </div>
                        <div className="ml-auto">
                          <div className="text-xs sm:text-sm text-gray-500">Company Size</div>
                          <div className="font-bold text-base sm:text-lg bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">1000+</div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white border border-gray-300 rounded-md text-[10px] sm:text-xs font-medium text-gray-700">24/7 SUPPORT</span>
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white border border-gray-300 rounded-md text-[10px] sm:text-xs font-medium text-gray-700">TICKET ROUTING</span>
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white border border-gray-300 rounded-md text-[10px] sm:text-xs font-medium text-gray-700">MULTILINGUAL</span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 text-base sm:text-sm leading-relaxed mb-3 sm:mb-4">
                        Tech company implemented AskTalos for round-the-clock customer support across 15+ languages, maintaining consistent service quality.
                      </p>

                      {/* Metrics in Row */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-auto">
                        <div className="border border-gray-200 rounded-lg p-2 sm:p-3 bg-white">
                          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-1">-70%</div>
                          <div className="text-[10px] sm:text-xs text-gray-600 leading-tight">Support Costs</div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-2 sm:p-3 bg-white">
                          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-1">+92%</div>
                          <div className="text-[10px] sm:text-xs text-gray-600 leading-tight">First Call Resolution</div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-2 sm:p-3 bg-white">
                          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-1">24/7</div>
                          <div className="text-[10px] sm:text-xs text-gray-600 leading-tight">Availability</div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-2 sm:p-3 bg-white">
                          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-1">+35%</div>
                          <div className="text-[10px] sm:text-xs text-gray-600 leading-tight">CSAT Score</div>
                        </div>
                      </div>
                    </div>

                    {/* Company Image - Right Side Only */}
                    <div className="flex items-center justify-center">
                      <div className="bg-black rounded-xl w-full max-w-[400px] h-[200px] sm:h-[280px]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Navigation Arrows - Mobile: Below box with circles */}
          <div className="flex lg:hidden items-center justify-center gap-4 mt-6">
            <button onClick={() => setCurrentTestimonial(prev => prev === 0 ? 2 : prev - 1)} className="bg-white rounded-full p-3 shadow-lg border-2 border-gray-200 hover:border-orange-500 transition-all">
              <ChevronLeft className="w-5 h-5 text-orange-500" />
            </button>
            <button onClick={() => setCurrentTestimonial(prev => prev === 2 ? 0 : prev + 1)} className="bg-white rounded-full p-3 shadow-lg border-2 border-gray-200 hover:border-orange-500 transition-all">
              <ChevronRight className="w-5 h-5 text-orange-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
