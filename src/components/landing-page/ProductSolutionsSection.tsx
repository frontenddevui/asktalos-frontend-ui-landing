import { useState, useEffect } from "react";
import { MessageSquare, Phone, Database, Mail, MessageCircle, Zap, Users, BarChart3, Settings, Lock } from "lucide-react";
import iconTick from "@/assets/icon-tick-blue.webp";
import { FadeUp } from "@/components/shared/FadeUp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Product tab icons (same as navbar)
import underlineImg from "@/assets/Untitled_design__13__2-removebg-preview.webp";
import crmIcon from "@/assets/crm_10690326.webp";
import callingIcon from "@/assets/technical-support_9732796.webp";
import whatsappIcon from "@/assets/whatsapp_2111774.webp";
import emailIcon from "@/assets/trend_10070238.webp";
import chatbotIcon from "@/assets/chat-bot_13889294.webp";

const ICON_FILTER = "brightness(0) saturate(100%) invert(59%) sepia(93%) saturate(1920%) hue-rotate(349deg) brightness(98%) contrast(97%)";
const ICON_FILTER_ACTIVE = "brightness(0) invert(1)";

export default function ProductSolutionsSection() {
  const [activeProduct, setActiveProduct] = useState("crm");
  const [activeSubTab, setActiveSubTab] = useState("crm-core");
  const [imageKey, setImageKey] = useState(0);

  // Update active sub-tab when product changes
  const handleProductChange = (productId: string) => {
    setActiveProduct(productId);
    if (productId === "chatbot") setActiveSubTab("chatbot-core");
    if (productId === "calling") setActiveSubTab("calling-core");
    if (productId === "crm") setActiveSubTab("crm-core");
    if (productId === "email") setActiveSubTab("email-core");
    if (productId === "whatsapp") setActiveSubTab("whatsapp-core");
  };

  useEffect(() => {
    setImageKey(k => k + 1);
  }, [activeSubTab]);

  // Image mapping for each subtab - using all provided images
  const imageMap: {
    [key: string]: string;
  } = {
    // Chatbot images
    "chatbot-core": new URL("../../assets/live-chat (1).webp", import.meta.url).href,
    "chatbot-advanced": new URL("../../assets/ai-engine.webp", import.meta.url).href,
    "chatbot-integration": new URL("../../assets/custom-card.webp", import.meta.url).href,
    "chatbot-analytics": new URL("../../assets/user-location.webp", import.meta.url).href,
    "chatbot-support": new URL("../../assets/users-management.webp", import.meta.url).href,
    // Calling Solution images
    "calling-core": new URL("../../assets/call-dnd.webp", import.meta.url).href,
    "calling-advanced": new URL("../../assets/Dashboard.webp", import.meta.url).href,
    "calling-integration": new URL("../../assets/call-recordings.webp", import.meta.url).href,
    "calling-analytics": new URL("../../assets/user-management.webp", import.meta.url).href,
    "calling-support": new URL("../../assets/reports.webp", import.meta.url).href,
    // CRM images
    "crm-core": new URL("../../assets/lead-management.webp", import.meta.url).href,
    "crm-advanced": new URL("../../assets/sales.webp", import.meta.url).href,
    "crm-integration": new URL("../../assets/permission.webp", import.meta.url).href,
    "crm-analytics": new URL("../../assets/sale-communication.webp", import.meta.url).href,
    "crm-support": new URL("../../assets/Dashboard.webp", import.meta.url).href,
    // Email images
    "email-core": new URL("../../assets/schedule.webp", import.meta.url).href,
    "email-advanced": new URL("../../assets/custom.webp", import.meta.url).href,
    "email-integration": new URL("../../assets/drag-drop.webp", import.meta.url).href,
    "email-analytics": new URL("../../assets/manage-emails.webp", import.meta.url).href,
    "email-support": new URL("../../assets/ai-engine.webp", import.meta.url).href,
    // WhatsApp images
    "whatsapp-core": new URL("../../assets/chat-ai.png", import.meta.url).href,
    "whatsapp-advanced": new URL("../../assets/connect.webp", import.meta.url).href,
    "whatsapp-integration": new URL("../../assets/custmised-card.webp", import.meta.url).href,
    "whatsapp-analytics": new URL("../../assets/ai-engine.webp", import.meta.url).href,
    "whatsapp-support": new URL("../../assets/chat-ai.png", import.meta.url).href
  };
  const products = [
    { id: "crm",      name: "AI CRM",             icon: crmIcon },
    { id: "calling",  name: "AI Voice Agent",      icon: callingIcon },
    { id: "whatsapp", name: "WhatsApp Automation", icon: whatsappIcon },
    { id: "email",    name: "Email Automation",    icon: emailIcon },
    { id: "chatbot",  name: "AI Chatbot",          icon: chatbotIcon },
  ];
  const productFeatures = {
    chatbot: [{
      id: "chatbot-core",
      name: "Live Chat",
      icon: MessageSquare,
      description: "Respond to customers in real time. Your whole team connects with every customer at once, boosting satisfaction instantly.",
      points: ["Complete chat history tracked and stored automatically", "Instant notifications for every new chat message", "Connects across multiple channels seamlessly"]
    }, {
      id: "chatbot-advanced",
      name: "Chat with AI Engine",
      icon: Zap,
      description: "Handle most routine queries automatically with AI — zero wait time, 24/7 coverage. Responses that feel natural and improve with every conversation.",
      points: ["Context-aware responses that feel natural and accurate", "Handles multiple languages naturally", "Routes every query to the right team instantly"]
    }, {
      id: "chatbot-integration",
      name: "Customised Cards",
      icon: Settings,
      description: "Boost engagement with rich, interactive messaging cards. Showcase products and drive conversions with fully custom card formats.",
      points: ["Rich media including images, video, and more", "Interactive buttons that drive higher engagement", "Fully custom branding and styling options"]
    }, {
      id: "chatbot-analytics",
      name: "User Location Track",
      icon: BarChart3,
      description: "Understand your customer base geographically. Optimize service delivery by region to increase local conversions.",
      points: ["Regional dashboards covering every geographic zone", "Interactive maps with real-time location data", "Detailed demographic data for every customer"]
    }, {
      id: "chatbot-support",
      name: "Users Management",
      icon: Users,
      description: "Control exactly who has access to what. Create custom roles for every department with enterprise-grade security.",
      points: ["Flexible permissions with granular access control", "Manage all your team members effortlessly", "Every action logged with complete audit trails"]
    }],
    calling: [{
      id: "calling-core",
      name: "Call to DND Numbers",
      icon: Phone,
      description: "Stay fully compliant with DND regulations on every outbound call. Automated opt-in management — zero violations, always.",
      points: ["Fully compliant on every single outbound call", "Regulatory compliance across all territories", "Manages all opt-in preferences automatically"]
    }, {
      id: "calling-advanced",
      name: "Dashboard",
      icon: BarChart3,
      description: "Monitor all your call KPIs in real time. Make faster decisions with a live visual analytics dashboard.",
      points: ["All key call metrics tracked and displayed automatically", "Live dashboards that update continuously", "Multiple chart types for instant visual insights"]
    }, {
      id: "calling-integration",
      name: "Call Recordings",
      icon: Zap,
      description: "Record every call in professional quality. Retrieve any recording instantly — encrypted storage and fully compliant.",
      points: ["Every call recorded in crystal-clear quality", "Instant playback for quality assurance reviews", "AES-256 encrypted storage, fully compliant"]
    }, {
      id: "calling-analytics",
      name: "User Management",
      icon: Users,
      description: "Manage all your agents with role-based access. Track every performance metric per agent in real time.",
      points: ["Role-based permissions with flexible access levels", "Complete access control and full team visibility", "Multiple performance metrics tracked per agent"]
    }, {
      id: "calling-support",
      name: "Dashboard Reports",
      icon: BarChart3,
      description: "Export all your campaign data in any format. Identify trends across any time window with ease.",
      points: ["Detailed data included in every campaign report", "Export in multiple formats instantly", "Historical trend analysis included"]
    }],
    crm: [{
      id: "crm-core",
      name: "Lead Management",
      icon: Users,
      description: "Know where every lead stands and what happens next — automatically.",
      points: ["AI scores and qualifies every new lead on arrival", "Nurture messages triggered at every stage of the funnel", "Full conversion tracking from first touch to closed deal"]
    }, {
      id: "crm-advanced",
      name: "Sales Management",
      icon: Zap,
      description: "Your team always knows who to call, what to say, and when.",
      points: ["Every open deal visible with its current stage at a glance", "Automatic alerts when a deal needs action before it goes cold", "Pipeline stays clean and up to date without manual effort"]
    }, {
      id: "crm-integration",
      name: "Permission Templates",
      icon: Lock,
      description: "Control who sees what — without slowing your team down.",
      points: ["Set access levels for each role in minutes", "Sensitive data protected, productivity maintained", "Update permissions instantly as your team grows or changes"]
    }, {
      id: "crm-analytics",
      name: "Sales Communication",
      icon: MessageSquare,
      description: "Every conversation with every customer — in one place, always in context.",
      points: ["All calls, messages, and emails linked to the right lead automatically", "Full history visible before every call, no digging needed", "Your team always knows what was last said and when"]
    }, {
      id: "crm-support",
      name: "Analytics & Reports",
      icon: BarChart3,
      description: "Stop guessing. See exactly what's working and what isn't.",
      points: ["Real-time performance data across every channel", "Pinpoint exactly where leads are dropping off", "Reports focused on the numbers that move your business"]
    }],
    email: [{
      id: "email-core",
      name: "Schedule Email Campaigns",
      icon: Mail,
      description: "Schedule campaigns to your entire list with automatic time zone optimization. Set it once and let it run.",
      points: ["Sends to your entire list automatically", "Automatic time zone optimization for every contact", "Manage all your recurring email campaigns"]
    }, {
      id: "email-advanced",
      name: "Custom Email Template",
      icon: Settings,
      description: "Choose from dozens of professional templates or build your own. Keep your brand consistent across every email.",
      points: ["Dozens of professional email templates ready to use", "Pixel-perfect custom designs — no coding needed", "Save reusable template blocks for any campaign"]
    }, {
      id: "email-integration",
      name: "Drag & Drop Email Editor",
      icon: Zap,
      description: "Build professional emails in minutes — no coding needed. Preview on any device and publish with one click.",
      points: ["Drag-and-drop to build any layout in minutes", "No coding skills needed — anyone can use it", "Live preview across all device sizes instantly"]
    }, {
      id: "email-analytics",
      name: "Manage Email List",
      icon: Users,
      description: "Segment contacts into targeted groups. Keep your list clean with automated removal of invalid contacts.",
      points: ["Flexible targeting segments for precise campaigns", "Grow subscriber lists faster with smart opt-ins", "Automatically removes invalid contacts to keep your list clean"]
    }, {
      id: "email-support",
      name: "Analytics & Reporting",
      icon: BarChart3,
      description: "All key email metrics in one place. Find your top-performing campaigns and repeat what works.",
      points: ["Track open rates across all your campaigns", "Monitor CTR, bounces & unsubscribes live", "Attribute revenue directly to email campaigns"]
    }],
    whatsapp: [{
      id: "whatsapp-core",
      name: "Chat with AI Engine",
      icon: MessageCircle,
      description: "Resolve most WhatsApp queries instantly with AI — zero wait time, 24/7 coverage. Context-aware responses that feel truly human.",
      points: ["Natural AI conversations customers actually enjoy", "Routes every query to the right person instantly", "Full conversation history carried across every chat"]
    }, {
      id: "whatsapp-advanced",
      name: "Connect with Expert",
      icon: Users,
      description: "Transfer to a live expert instantly with full conversation context preserved. Seamless for the customer, every time.",
      points: ["Instant handoff to live agents without losing context", "Routes to available agents based on real-time status", "Every handoff tracked and monitored for quality"]
    }, {
      id: "whatsapp-integration",
      name: "Custom Cards",
      icon: Settings,
      description: "Drive more clicks with rich, interactive WhatsApp cards. Guide customers to action with custom product showcase formats.",
      points: ["Rich media including images, video, and more", "Fully custom formatting to match your brand", "Full brand alignment with one-click template apply"]
    }, {
      id: "whatsapp-analytics",
      name: "Message Templates",
      icon: Mail,
      description: "Go live with pre-approved WhatsApp templates in minutes. Save time on message creation and never worry about policy violations.",
      points: ["Ready-to-use WhatsApp-approved message templates", "Fully compliant with WhatsApp's messaging policies", "Save hours on message creation with ready-made templates"]
    }, {
      id: "whatsapp-support",
      name: "Analytics & Reports",
      icon: BarChart3,
      description: "Track all your WhatsApp campaign metrics in real time. Optimize delivery, engagement, and conversion with live data.",
      points: ["Track delivery, read & reply rates all in real time", "Monitor all key conversation metrics per campaign", "Generate detailed campaign reports instantly"]
    }]
  };
  return <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-12 xl:px-16" style={{ background: "#ffffff" }}>
      <div className="max-w-[1400px] mx-auto">

        {/* Header — centered with underline */}
        <FadeUp className="mb-10 sm:mb-12 text-center">
          <h2 className="text-[1.85rem] sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">All Your Channels.</span>
            {" "}<span className="text-gray-900">One AI Platform.</span>
          </h2>
          <img src={underlineImg} alt="Underline" className="h-3 sm:h-4 mx-auto my-3 sm:my-4 w-48 sm:w-64" loading="lazy"
 />
          <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto px-4">
            One platform for chatbot, calling, CRM, email, and WhatsApp, built to help teams close more.
          </p>
        </FadeUp>

        {/* Main Product Tabs — centered pill box */}
        <div className="mb-8 w-full overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1 sm:gap-1.5 bg-white border border-gray-200 rounded-2xl p-1.5 shadow-sm w-max mx-auto">
            {products.map((product) => {
              const isActive = activeProduct === product.id;
              return (
                <button
                  key={product.id}
                  onClick={() => handleProductChange(product.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold whitespace-nowrap rounded-xl transition-all flex-shrink-0 ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-200"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <span className={`flex items-center justify-center w-6 h-6 rounded-md flex-shrink-0 ${
                    isActive ? "bg-white/25" : "bg-gray-100"
                  }`}>
                    <img
                      src={product.icon}
                      alt={product.name}
                      className="w-3.5 h-3.5 object-contain"
                      style={{ filter: isActive ? ICON_FILTER_ACTIVE : ICON_FILTER }}
                    loading="lazy"

                    />
                  </span>
                  {product.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        {products.map(product => (
          <div key={product.id} className={activeProduct === product.id ? "block" : "hidden"}>

            {/* ── Desktop: accordion left + image right ── */}
            <div className="hidden lg:block bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden">
              <div className="grid grid-cols-2 gap-0">
                {/* Left: Accordion */}
                <div className="p-8 border-r border-gray-200">
                  <Accordion
                    type="single"
                    collapsible
                    value={activeSubTab}
                    onValueChange={(val) => setActiveSubTab(val ?? "")}
                  >
                    {productFeatures[product.id as keyof typeof productFeatures]?.map((subTab) => {
                      const SubIcon = subTab.icon;
                      return (
                      <AccordionItem key={subTab.id} value={subTab.id} className="border-b border-gray-200 last:border-0">
                        <AccordionTrigger className="text-left hover:no-underline py-4">
                          <div className="flex items-center gap-3 pr-2">
                            <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                              activeSubTab === subTab.id ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-500"
                            }`}>
                              <SubIcon className="w-4 h-4" />
                            </span>
                            <span className="text-base font-semibold text-gray-900">{subTab.name}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-600 text-sm leading-relaxed mb-3">{subTab.description}</p>
                          <div className="space-y-2">
                            {subTab.points.map((point, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <img src={iconTick} alt="✓" className="w-4 h-4 flex-shrink-0 mt-0.5" loading="lazy"
 />
                                <p className="text-gray-700 font-medium text-sm">{point}</p>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                  </Accordion>
                </div>

                {/* Right: Dynamic Image */}
                <div className="flex items-center justify-center p-6 bg-gray-50">
                  <img
                    key={imageKey}
                    src={imageMap[activeSubTab]}
                    alt={activeSubTab}
                    className="w-full max-w-[520px] h-auto rounded-xl"
                    style={{ animation: "slideInRight 0.45s ease-out" }}
                    loading="eager"
                    width={520}
                    height={340}
                  />
                </div>
              </div>
            </div>

            {/* ── Mobile: accordion with inline image ── */}
            <div className="lg:hidden bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <Accordion
                type="single"
                collapsible
                value={activeSubTab}
                onValueChange={(val) => setActiveSubTab(val ?? "")}
              >
                {productFeatures[product.id as keyof typeof productFeatures]?.map((subTab) => {
                  const SubIconMobile = subTab.icon;
                  return (
                  <AccordionItem key={subTab.id} value={subTab.id} className="border-b border-gray-200 last:border-0">
                    <AccordionTrigger className="text-left hover:no-underline px-4 py-3">
                      <div className="flex items-center gap-2.5 pr-2">
                        <span className={`flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
                          activeSubTab === subTab.id ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-500"
                        }`}>
                          <SubIconMobile className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-sm font-semibold text-gray-900">{subTab.name}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="px-4 pb-4 flex flex-col gap-4">
                        <img src={imageMap[subTab.id]} alt={subTab.name} className="w-full h-auto rounded-lg object-contain max-h-52" width={520} height={340} loading="lazy"
 />
                        <p className="text-gray-600 text-sm leading-relaxed">{subTab.description}</p>
                        <div className="space-y-2">
                          {subTab.points.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <img src={iconTick} alt="✓" className="w-4 h-4 flex-shrink-0 mt-0.5" loading="lazy"
 />
                              <p className="text-gray-700 font-medium text-sm">{point}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  );
                })}
              </Accordion>
            </div>

          </div>
        ))}

      </div>
    </section>;
}