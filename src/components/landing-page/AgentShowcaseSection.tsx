import { useState, useRef, useEffect } from "react";
import {
  Phone, MessageSquare, Users, Headphones, Mail, Receipt,
  Check, ArrowRight, Mic, Clock, Zap, TrendingUp,
  Calendar, Bell, Search, Database, RefreshCw, Star,
  ChevronLeft, ChevronRight, Bot,
} from "lucide-react";
import { startFreeTrial } from "@/lib/trial";
import agentVoiceImg    from "@/assets/agent-voice-new.webp";
import agentWhatsappImg from "@/assets/agent-whatsapp-new.webp";
import agentCrmImg      from "@/assets/agent-crm-new.webp";
import agentSupportImg  from "@/assets/agent-support-new.webp";
import agentMailingImg  from "@/assets/agent-email-new.webp";
import agentPaymentImg  from "@/assets/agent-payment-new.webp";
import agentInvoicingImg from "@/assets/agent-invoicing-new.webp";
import agentChatbotImg   from "@/assets/agent-chatbot-new.webp";
import underlineImg from "@/assets/Untitled_design__13__2-removebg-preview.webp";

interface FloatingIcon {
  icon: React.ComponentType<{ className?: string }>;
  style: React.CSSProperties;
}

interface AgentColor {
  cardBg: string;
  blob: string;
  accent: string;
  tagBg: string;
  tagText: string;
  btnClass: string;
  checkColor: string;
  checkBg: string;
  border: string;
}

interface Agent {
  id: string;
  tab: string;
  tabLabel: string;
  label: string;
  mainIcon: React.ComponentType<{ className?: string }>;
  agentImage: string;
  headline: string;
  headlineAccent: string;
  description: string;
  features: string[];
  floatingIcons: FloatingIcon[];
  colors: AgentColor;
}

const agents: Agent[] = [
  {
    id: "voice",
    tab: "AI Voice Agent",
    tabLabel: "AI VOICE AGENT",
    label: "AI Voice",
    mainIcon: Phone,
    agentImage: agentVoiceImg,
    headline: "Calls Like a Human.",
    headlineAccent: "Hands Off to You.",
    description:
      "Leads call once — if nobody answers, they move on. AskTalos picks up every call, has a natural conversation, qualifies the lead, and only passes them to your team when they're ready to buy.",
    features: [
      "Every call answered instantly, every time",
      "Qualifies the lead with the right questions",
      "Transfers to your team the moment they want to buy",
    ],
    floatingIcons: [
      { icon: Phone,       style: { top: "12%",  left: "8%"   } },
      { icon: Mic,         style: { top: "18%",  right: "8%"  } },
      { icon: Users,       style: { bottom: "22%", left: "6%" } },
    ],
    colors: {
      cardBg: "#fff7ed", blob: "#fed7aa", accent: "#ff862f",
      tagBg: "#fff7ed", tagText: "#ea580c",
      btnClass: "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600",
      checkColor: "text-orange-500", checkBg: "bg-orange-50",
      border: "#fed7aa",
    },
  },
  {
    id: "whatsapp",
    tab: "WhatsApp Agent",
    tabLabel: "WHATSAPP AGENT",
    label: "WhatsApp",
    mainIcon: MessageSquare,
    agentImage: agentWhatsappImg,
    headline: "Instant Message.",
    headlineAccent: "Lead Saved.",
    description:
      "The moment a lead arrives, AskTalos sends a WhatsApp, chats naturally, finds out if they're a serious buyer, and logs everything — without anyone on your team doing a thing.",
    features: [
      "WhatsApp sent within seconds of every new enquiry",
      "Natural conversation that captures full lead details",
      "Everything saved to your CRM automatically",
    ],
    floatingIcons: [
      { icon: MessageSquare, style: { top: "12%",    left: "8%"   } },
      { icon: Users,         style: { top: "18%",    right: "8%"  } },
      { icon: Zap,           style: { bottom: "22%", left: "6%"   } },
    ],
    colors: {
      cardBg: "#f0fdf4", blob: "#bbf7d0", accent: "#22c55e",
      tagBg: "#dcfce7", tagText: "#16a34a",
      btnClass: "bg-green-500 hover:bg-green-600",
      checkColor: "text-green-500", checkBg: "bg-green-50",
      border: "#bbf7d0",
    },
  },
  {
    id: "crm",
    tab: "CRM Manager",
    tabLabel: "CRM MANAGER",
    label: "CRM",
    mainIcon: Database,
    agentImage: agentCrmImg,
    headline: "Nothing Falls Through.",
    headlineAccent: "Ever.",
    description:
      "Deals get lost when nobody's watching the pipeline. The CRM Manager tracks every lead, triggers follow-ups at the right time, and flags anything that needs your attention.",
    features: [
      "Every deal tracked automatically across your pipeline",
      "Follow-ups scheduled and sent without reminders",
      "Alerts your team before a deal goes cold",
    ],
    floatingIcons: [
      { icon: Database,  style: { top: "12%",    left: "8%"   } },
      { icon: RefreshCw, style: { top: "18%",    right: "8%"  } },
      { icon: Search,    style: { bottom: "22%", left: "6%"   } },
    ],
    colors: {
      cardBg: "#eff6ff", blob: "#bfdbfe", accent: "#2563eb",
      tagBg: "#dbeafe", tagText: "#1d4ed8",
      btnClass: "bg-blue-600 hover:bg-blue-700",
      checkColor: "text-blue-600", checkBg: "bg-blue-50",
      border: "#bfdbfe",
    },
  },
  {
    id: "support",
    tab: "Customer Support",
    tabLabel: "CUSTOMER SUPPORT",
    label: "Support",
    mainIcon: Headphones,
    agentImage: agentSupportImg,
    headline: "Answers in Seconds.",
    headlineAccent: "No Queue. No Wait.",
    description:
      "Customers who wait leave. AskTalos handles routine questions instantly, 24/7 — your team only steps in when something genuinely needs a human.",
    features: [
      "Most common questions answered automatically, day or night",
      "Handles many customers at once — no bottleneck",
      "Escalates to your team only when it matters",
    ],
    floatingIcons: [
      { icon: Headphones, style: { top: "12%",    left: "8%"   } },
      { icon: Zap,        style: { top: "18%",    right: "8%"  } },
      { icon: Star,       style: { bottom: "22%", left: "6%"   } },
    ],
    colors: {
      cardBg: "#faf5ff", blob: "#e9d5ff", accent: "#a855f7",
      tagBg: "#f3e8ff", tagText: "#7e22ce",
      btnClass: "bg-purple-500 hover:bg-purple-600",
      checkColor: "text-purple-500", checkBg: "bg-purple-50",
      border: "#e9d5ff",
    },
  },
  {
    id: "email",
    tab: "Mailing Agent",
    tabLabel: "MAILING AGENT",
    label: "Email",
    mainIcon: Mail,
    agentImage: agentMailingImg,
    headline: "Thousands of Emails.",
    headlineAccent: "Each One Personal.",
    description:
      "Sending emails one by one is a full-time job. AskTalos sends thousands in minutes — and every email reads like it was written for that exact person.",
    features: [
      "Thousands of emails sent in minutes, not days",
      "Each one personalised to the individual recipient",
      "Track opens, clicks, and replies in real time",
    ],
    floatingIcons: [
      { icon: Mail,       style: { top: "12%",    left: "8%"   } },
      { icon: TrendingUp, style: { top: "18%",    right: "8%"  } },
      { icon: Users,      style: { bottom: "22%", left: "6%"   } },
    ],
    colors: {
      cardBg: "#fefce8", blob: "#fef08a", accent: "#ca8a04",
      tagBg: "#fef9c3", tagText: "#854d0e",
      btnClass: "bg-yellow-500 hover:bg-yellow-600",
      checkColor: "text-yellow-500", checkBg: "bg-yellow-50",
      border: "#fef08a",
    },
  },
  {
    id: "payment",
    tab: "Payment Reminder",
    tabLabel: "PAYMENT REMINDER",
    label: "Payments",
    mainIcon: Bell,
    agentImage: agentPaymentImg,
    headline: "Gets You Paid.",
    headlineAccent: "Without the Awkward Chasing.",
    description:
      "Unpaid invoices pile up when nobody follows up. AskTalos sends polite, timely reminders automatically — keeping cash flowing without damaging the relationship.",
    features: [
      "Reminders sent automatically before and after the due date",
      "Professional tone that protects the customer relationship",
      "Tracks payment status so nothing gets forgotten",
    ],
    floatingIcons: [
      { icon: Bell,     style: { top: "12%",    left: "8%"   } },
      { icon: Receipt,  style: { top: "18%",    right: "8%"  } },
      { icon: Calendar, style: { bottom: "22%", left: "6%"   } },
    ],
    colors: {
      cardBg: "#fff1f2", blob: "#fecdd3", accent: "#ef4444",
      tagBg: "#ffe4e6", tagText: "#be123c",
      btnClass: "bg-red-500 hover:bg-red-600",
      checkColor: "text-red-500", checkBg: "bg-red-50",
      border: "#fecdd3",
    },
  },
  {
    id: "invoicing",
    tab: "Invoicing",
    tabLabel: "INVOICING",
    label: "Invoicing",
    mainIcon: Receipt,
    agentImage: agentInvoicingImg,
    headline: "Deal Closed.",
    headlineAccent: "Invoice Sent. Done.",
    description:
      "The moment a sale is confirmed, AskTalos creates and sends the invoice — accurate, professional, and instant. No manual steps, no delays.",
    features: [
      "Invoices generated automatically when a deal closes",
      "Sent directly to the customer without manual work",
      "Every invoice tracked until it's paid",
    ],
    floatingIcons: [
      { icon: Receipt,    style: { top: "12%",    left: "8%"   } },
      { icon: TrendingUp, style: { top: "18%",    right: "8%"  } },
      { icon: Zap,        style: { bottom: "22%", left: "6%"   } },
    ],
    colors: {
      cardBg: "#ede9fe", blob: "#ddd6fe", accent: "#7c3aed",
      tagBg: "#ede9fe", tagText: "#5b21b6",
      btnClass: "bg-violet-700 hover:bg-violet-800",
      checkColor: "text-violet-600", checkBg: "bg-violet-50",
      border: "#ddd6fe",
    },
  },
  {
    id: "chatbot",
    tab: "AI Chatbot",
    tabLabel: "AI CHATBOT",
    label: "Chatbot",
    mainIcon: Bot,
    agentImage: agentChatbotImg,
    headline: "Your Website Sells",
    headlineAccent: "While You Sleep.",
    description:
      "Most visitors leave without a word. The chatbot starts the conversation, answers questions, and captures lead details — any time of day, even on weekends.",
    features: [
      "Engages every visitor the moment they land on your site",
      "Answers questions and collects lead information automatically",
      "Passes ready-to-buy leads straight to your team",
    ],
    floatingIcons: [
      { icon: Bot,          style: { top: "12%",    left: "8%"   } },
      { icon: MessageSquare,style: { top: "18%",    right: "8%"  } },
      { icon: Zap,          style: { bottom: "22%", left: "6%"   } },
    ],
    colors: {
      cardBg: "#faf5ff", blob: "#e9d5ff", accent: "#9333ea",
      tagBg: "#f3e8ff", tagText: "#7e22ce",
      btnClass: "bg-purple-600 hover:bg-purple-700",
      checkColor: "text-purple-600", checkBg: "bg-purple-50",
      border: "#e9d5ff",
    },
  },
];



export default function AgentShowcaseSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [slideDir, setSlideDir] = useState<"right" | "left">("right");
  const tabBarRef = useRef<HTMLDivElement>(null);
  const userInteracted = useRef(false);

  // Auto-advance every 3.5 s; stop once user interacts
  useEffect(() => {
    const id = setInterval(() => {
      if (userInteracted.current) { clearInterval(id); return; }
      setSlideDir("right");
      setAnimKey(k => k + 1);
      setActiveTab(prev => (prev + 1) % agents.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const navigate = (dir: number) => {
    userInteracted.current = true;
    setSlideDir(dir > 0 ? "right" : "left");
    setAnimKey(k => k + 1);
    setActiveTab((prev) => (prev + dir + agents.length) % agents.length);
  };

  const handleTabClick = (i: number) => {
    userInteracted.current = true;
    setSlideDir(i >= activeTab ? "right" : "left");
    setAnimKey(k => k + 1);
    setActiveTab(i);
  };

  const navigateToApp = () => {
    startFreeTrial("home_agents");
  };

  const visibleCards = [activeTab];

  return (
    <>
    <style>{`
      @keyframes agentSlideInRight {
        from { transform: translateX(80px); opacity: 0; }
        to   { transform: translateX(0);   opacity: 1; }
      }
      @keyframes agentSlideInLeft {
        from { transform: translateX(-80px); opacity: 0; }
        to   { transform: translateX(0);    opacity: 1; }
      }
      .agent-slide-right { animation: agentSlideInRight 0.38s cubic-bezier(0.4,0,0.2,1) both; }
      .agent-slide-left  { animation: agentSlideInLeft  0.38s cubic-bezier(0.4,0,0.2,1) both; }
    `}</style>
    <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-12 xl:px-16 relative overflow-hidden" style={{ background: "linear-gradient(180deg, rgba(254,215,170,0.6) 0%, rgba(255,237,213,0.5) 8%, rgba(255,247,237,0.3) 18%, #ffffff 35%, #ffffff 65%, rgba(255,247,237,0.3) 82%, rgba(255,237,213,0.5) 92%, rgba(254,215,170,0.6) 100%)" }}>
      {/* Subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.55,
        }}
      />

      {/* ── Header ── */}
      <div className="relative z-10 text-center mb-10 max-w-3xl mx-auto">
        <h2 className="text-[1.85rem] sm:text-3xl lg:text-4xl font-bold leading-tight mb-1">
          <span className="text-gray-900">Meet Your </span>
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">AI Team</span>
        </h2>
        <img src={underlineImg} alt="" className="h-3 sm:h-4 mx-auto my-3 w-48 sm:w-56" loading="lazy"
 />
        <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          One platform. Eight specialists. Every customer touchpoint covered around the clock.
        </p>
      </div>

      {/* ── Tab bar ── */}
      <div className="relative z-10 max-w-5xl mx-auto mb-7">
        <div
          ref={tabBarRef}
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {agents.map((a, i) => {
            const Icon = a.mainIcon;
            const isActive = activeTab === i;
            return (
              <button
                key={a.id}
                onClick={() => handleTabClick(i)}
                className={`relative flex-shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                    : "bg-white border border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-500"
                }`}
              >
                <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 ${isActive ? "text-white" : "text-gray-400"}`} />
                {a.tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Cards + Nav arrows ── */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Left arrow — hidden on mobile to avoid card overlap */}
        <button
          onClick={() => navigate(-1)}
          className="hidden sm:flex absolute sm:-left-5 lg:-left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center hover:bg-gray-50 transition"
          aria-label="Previous agent"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        {/* Single card */}
        <div className="max-w-3xl mx-auto">
          {visibleCards.map((idx) => {
            const a = agents[idx];
            const c = a.colors;
            return (
              <div
                key={animKey}
                className={`rounded-2xl overflow-hidden shadow-lg flex flex-col sm:flex-row border ${slideDir === "right" ? "agent-slide-right" : "agent-slide-left"}`}
                style={{ borderColor: c.border }}
              >
                {/* LEFT: person image with gradient fade (like feature cards) */}
                <div
                  className="relative w-full flex-shrink-0 sm:w-[42%] sm:min-h-[320px] overflow-hidden"
                  style={{ background: c.cardBg, minHeight: 200 }}
                >
                  <img
                    src={a.agentImage}
                    alt={a.tab}
                    className="w-[85%] sm:w-full h-auto sm:h-full mx-auto object-contain object-bottom max-h-[230px] sm:max-h-full"
                    loading="lazy"
                    style={{ opacity: 0.92 }}
                  />
                  {/* Gradient overlay — fades edges into card background */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: [
                        `linear-gradient(to right, transparent 55%, ${c.cardBg} 100%)`,
                        `linear-gradient(to bottom, ${c.cardBg} 0%, transparent 15%)`,
                        `linear-gradient(to top, ${c.cardBg} 0%, transparent 20%)`,
                        `linear-gradient(to left, transparent 85%, ${c.cardBg} 100%)`,
                      ].join(", "),
                    }}
                  />
                </div>

                {/* RIGHT: content */}
                <div className="flex-1 bg-white p-5 sm:p-6 flex flex-col justify-center">
                  {/* Agent tag badge */}
                  <span
                    className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-3 self-start"
                    style={{ background: c.tagBg, color: c.tagText }}
                  >
                    {a.tabLabel}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-tight">
                    <span className="text-gray-900">{a.headline} </span>
                    <br />
                    <span style={{ color: c.accent }}>{a.headlineAccent}</span>
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{a.description}</p>

                  <ul className="space-y-2 mb-5">
                    {a.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2.5">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full ${c.checkBg} flex items-center justify-center mt-0.5`}>
                          <span className={`text-[9px] font-bold leading-none ${c.checkColor}`}>{String(fi + 1).padStart(2, "0")}</span>
                        </div>
                        <span className="text-sm text-gray-700">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-3 self-start">
                    <button
                      onClick={navigateToApp}
                      className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition shadow-md ${c.btnClass}`}
                    >
                      Start Free Trial <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white flex-shrink-0"><ArrowRight className="w-3 h-3" style={{ color: c.accent }} /></span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right arrow — hidden on mobile to avoid card overlap */}
        <button
          onClick={() => navigate(1)}
          className="hidden sm:flex absolute sm:-right-5 lg:-right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center hover:bg-gray-50 transition"
          aria-label="Next agent"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        {/* Mobile-only prev/next row */}
        <div className="flex sm:hidden items-center justify-center gap-4 mt-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 transition"
            aria-label="Previous agent"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-sm text-gray-400 font-medium">{activeTab + 1} / {agents.length}</span>
          <button
            onClick={() => navigate(1)}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 transition"
            aria-label="Next agent"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>


    </section>
    </>
  );
}
