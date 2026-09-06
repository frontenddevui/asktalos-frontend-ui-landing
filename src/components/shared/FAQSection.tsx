import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import underlineImg from "@/assets/Untitled_design__13__2-removebg-preview.webp";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const faqs = [
    {
      question: "What is AskTalos?",
      answer:
        "AskTalos is an AI-powered business automation platform that delivers intelligent, humanlike experiences across multiple channels including voice calls, chatbots, CRM, email marketing, and WhatsApp messaging. Unlike basic rule-based systems, AskTalos relies on advanced Natural Language Processing (NLP) and Machine Learning (ML) to understand and respond to customers intelligently, becoming smarter with every interaction.",
    },
    {
      question: "How does AskTalos work?",
      answer:
        "AskTalos operates by combining NLP and ML capabilities. When a customer communicates (via voice, text, or chat), our AI algorithms analyze the query and deliver the most relevant response. Over time, the platform learns from interactions and identifies verbal and contextual cues, continuously improving its ability to understand and serve your customers better. It's a three-step process: receive customer query → apply AI algorithms → deliver intelligent response.",
    },
    {
      question: "Can I customize AskTalos for my business?",
      answer:
        "Absolutely! AskTalos is designed to give you complete control. You can customize users, phone numbers, call queues, voice personalities, tone, and responses instantly from your own user interface. Whether you need to add, edit, or remove configurations, you have full autonomy to tailor AskTalos to match your brand and business needs perfectly.",
    },
    {
      question: "Is my data secured on AskTalos?",
      answer:
        "Yes, absolutely. We maintain enterprise-level multi-layered security for all data stored on AskTalos servers. We've been in the business for over a decade with zero security breaches. Your customer data is protected with enterprise-grade encryption, compliance with GDPR and HIPAA standards, and secure infrastructure at every stage of processing and storage.",
    },
    {
      question: "What are the different solutions AskTalos offers?",
      answer:
        "AskTalos provides multiple AI-powered solutions including: AI Voice Agents for intelligent phone calls, AI Chatbots for conversational interactions, CRM software for customer relationship management, Email Marketing tools for targeted campaigns, and WhatsApp messaging for direct customer communication. Each solution leverages AI and ML to deliver intelligent, personalized customer experiences.",
    },
    {
      question: "What is an AI-based Chatbot?",
      answer:
        "Unlike basic rule-based chatbots, AI-based chatbots like those powered by AskTalos deliver intelligent, humanlike experiences. They use Natural Language Processing to comprehend and respond to customers naturally. With machine learning capabilities, AI chatbots become smarter over time and use, allowing them to understand customers better and provide more relevant, contextual responses.",
    },
    {
      question: "Which CRMs and tools does AskTalos integrate with?",
      answer:
        "AskTalos integrates seamlessly with popular CRMs like Salesforce, HubSpot, Zoho, and many others. We also support integrations with Google Analytics, Facebook Ads, LinkedIn, and custom APIs. This comprehensive integration ecosystem enables seamless workflow automation and data flow across your entire business technology stack.",
    },
    {
      question: "What uptime guarantee does AskTalos provide?",
      answer:
        "We guarantee 99.99% uptime for AskTalos services. Our infrastructure is built on enterprise-grade cloud services with redundancy and automatic failover capabilities. This ensures your business communications and customer interactions never stop, even during infrastructure challenges, keeping your operations running smoothly around the clock.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden bg-white px-4 py-14 transition-all duration-1000 sm:px-6 sm:py-20 lg:px-8 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section header — centred, matching the pricing page */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <h2 className="text-[1.85rem] font-extrabold tracking-tight text-gray-900 sm:text-3xl lg:text-[2.5rem]">
            <span className="text-gray-900">Frequently Asked </span>
            <span className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Questions</span>
          </h2>
          <img src={underlineImg} alt="" className="mx-auto my-3 h-3 w-44 sm:my-4 sm:h-4 sm:w-60" loading="lazy" />
          <p className="text-base leading-relaxed text-gray-500 sm:text-[1.05rem]">
            Everything you need to know about AskTalos
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="transition-all duration-500"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 60}ms`
                }}
              >
                <div
                  className={`overflow-hidden rounded-xl border bg-white transition-all duration-300 ${
                    isOpen
                      ? "border-orange-300 shadow-md shadow-orange-100/60"
                      : "border-gray-200 shadow-sm hover:border-orange-200"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors sm:px-6 sm:py-5"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-gray-900 sm:text-base">{faq.question}</span>
                    <span
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen ? "bg-orange-500" : "bg-orange-50 ring-1 ring-orange-100"
                      }`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isOpen ? "-rotate-180 text-white" : "text-orange-600"
                        }`}
                      />
                    </span>
                  </button>
                  {/* grid-rows 0fr→1fr animates to the answer's natural height, so long
                      answers are never clipped the way a fixed max-height would clip them */}
                  {/* display:grid is set inline rather than via a `grid` class: the global
                      scroll-animate script in Layout targets `[class*="grid"] > *` and would
                      pin this zero-height wrapper's child at opacity 0 until observed. */}
                  <div
                    className="transition-all duration-300 ease-out"
                    style={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-gray-600 sm:px-6 sm:text-[15px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
