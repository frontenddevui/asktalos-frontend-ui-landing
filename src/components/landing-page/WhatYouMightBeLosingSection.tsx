import { ArrowRight, Target } from "lucide-react";
import { Link } from "react-router-dom";
import underlineImg from "@/assets/Untitled_design__13__2-removebg-preview.webp";

import imgLostCustomers from "@/assets/cost-lost-customers.png";
import imgGhostLeads    from "@/assets/cost-ghost-leads.png";
import imgManualTasks   from "@/assets/cost-manual-tasks.png";
import imgFunnelLeaks   from "@/assets/cost-funnel-leaks.png";
import imgRevenueLoss   from "@/assets/cost-revenue-loss.png";

type Item = { img: string; title: string; question: string };

const COSTS: Item[] = [
  { img: imgLostCustomers, title: "Interested customers might go to your competitors.",   question: "What if faster response wins the deal?"               },
  { img: imgGhostLeads,    title: "Leads might stop responding if they don't hear back.", question: "What if silence looks like disinterest?"              },
  { img: imgManualTasks,   title: "Your team might spend more time on repetitive tasks.", question: "What if that time could be used to close more deals?" },
  { img: imgFunnelLeaks,   title: "Many leads might never make it through the funnel.",   question: "What if small gaps are costing big opportunities?"    },
  { img: imgRevenueLoss,   title: "Potential revenue might slip away every month.",       question: "What if consistent follow-ups made a difference?"    },
];

export default function WhatYouMightBeLosingSection() {
  return (
      <section
        className="py-8 sm:py-12 px-4 sm:px-6 lg:px-12 xl:px-16 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, rgba(254,215,170,0.6) 0%, rgba(255,237,213,0.5) 8%, rgba(255,247,237,0.3) 18%, #ffffff 35%, #ffffff 65%, rgba(255,247,237,0.3) 82%, rgba(255,237,213,0.5) 92%, rgba(254,215,170,0.6) 100%)" }}
      >
        {/* Subtle dot pattern */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.55 }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-[1.85rem] sm:text-3xl lg:text-4xl font-bold leading-tight mb-1">
              <span className="text-gray-900">What You Might Be </span>
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">Losing</span>
            </h2>
            <img src={underlineImg} alt="" className="h-3 sm:h-4 mx-auto my-3 w-48 sm:w-64" loading="lazy" />
            <p className="text-gray-500 text-sm sm:text-lg max-w-xl mx-auto">
              These are the possible outcomes of the gaps in your process.
            </p>
          </div>

          {/* Cost cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 mb-10">
            {COSTS.map(({ img, title, question }, i) => (
              <div key={i} className="bg-white rounded-2xl p-3 sm:p-5 border border-orange-100 flex flex-col sm:flex-col gap-2 sm:gap-3">
                <div className="flex items-center gap-3 sm:block">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img src={img} alt={title} className="w-12 h-12 sm:w-[72px] sm:h-[72px] object-contain" />
                  </div>
                  <div className="flex-1 sm:mt-2">
                    <p className="text-sm font-semibold text-gray-800 leading-snug">{title}</p>
                  </div>
                </div>
                <p className="text-xs text-orange-600 font-medium italic mt-auto sm:mt-0">
                  <span className="bg-orange-50 border border-orange-200 rounded-md px-2 py-0.5 inline-block leading-relaxed">{question}</span>
                </p>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl px-4 py-5 sm:px-10 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm sm:text-base lg:text-lg leading-tight">
                  Turn every enquiry into an opportunity.
                </p>
                <p className="text-white/80 text-xs sm:text-sm">
                  Fix the gaps. Improve your pipeline. Grow your revenue.
                </p>
              </div>
            </div>
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-2 bg-white text-orange-500 font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm hover:bg-orange-50 transition-colors shadow-md flex-shrink-0"
            >
              See How We Can Help
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 flex-shrink-0">
                <ArrowRight className="h-3 w-3 text-white" />
              </span>
            </Link>
          </div>
        </div>
      </section>
  );
}
