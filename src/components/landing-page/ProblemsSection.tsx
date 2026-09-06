import underlineImg from "@/assets/Untitled_design__13__2-removebg-preview.webp";

import imgSalesFunnel    from "@/assets/sales-funnel.png";
import imgEnquiryWait    from "@/assets/prob-enquiry-wait.png";
import imgHotLeads       from "@/assets/prob-hot-leads.png";
import imgFollowupStops  from "@/assets/prob-followup-stops.png";
import imgLateOffers     from "@/assets/prob-late-offers.png";
import imgNightEnquiries from "@/assets/prob-night-enquiries.png";
import imgLostCustomers  from "@/assets/cost-lost-customers.png";

type Item = { img: string; title: string; question: string };

const PROBLEMS: Item[] = [
  { img: imgEnquiryWait,    title: "New enquiries wait for a reply.",                  question: "What if they lose interest?"                 },
  { img: imgHotLeads,       title: "Hot leads aren't called instantly.",               question: "What if they choose someone else?"           },
  { img: imgFollowupStops,  title: "Follow-ups stop after one or two tries.",          question: "What if they needed more reminders?"         },
  { img: imgLateOffers,     title: "Offers and updates take hours to send.",           question: "What if important messages go out too late?" },
  { img: imgNightEnquiries, title: "Enquiries at night or on weekends go unanswered.", question: "What if they were ready to buy then?"        },
  { img: imgLostCustomers,  title: "Existing customers hear from you only when you need a sale.", question: "Are you retaining them or finding new ones every day?" },
];

export default function ProblemsSection() {
  return (
    <>
      {/* ── Section 1: The Problems ─────────────────────────────── */}
      <section className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-12 xl:px-16" style={{ background: "linear-gradient(180deg, rgba(254,215,170,0.55) 0%, rgba(255,237,213,0.4) 8%, rgba(255,247,237,0.2) 18%, #ffffff 35%)" }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-[1.85rem] sm:text-3xl lg:text-4xl font-bold leading-tight mb-1">
              <span className="text-gray-900">Where Are Your </span>
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">Customers Going?</span>
            </h2>
            <img src={underlineImg} alt="" className="h-3 sm:h-4 mx-auto my-3 w-48 sm:w-64" loading="lazy" />
            <p className="text-gray-500 text-sm sm:text-lg max-w-xl mx-auto">
              Here's what might be happening in your sales process.
            </p>
          </div>

          {/* 2-col: problem list + funnel */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Problem cards */}
            <div className="w-full lg:flex-[3] space-y-2 sm:space-y-3">
              {PROBLEMS.map(({ img, title, question }, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-2xl px-3 py-2.5 border border-orange-100 shadow-sm">
                  <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white flex items-center justify-center overflow-hidden">
                    <img src={img} alt={title} className="w-14 h-14 sm:w-[72px] sm:h-[72px] object-contain" />
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-4">
                    <p className="text-sm font-semibold text-gray-800 leading-snug">{title}</p>
                    <p className="text-xs text-orange-600 font-medium italic flex-shrink-0">
                      <span className="bg-orange-50 border border-orange-200 rounded-md px-2 py-0.5 inline-block">{question}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sales Funnel */}
            <div className="w-full lg:flex-[2] flex flex-col items-center justify-center gap-4">
              {/* Mobile heading — styled like main section heading */}
              <div className="text-center lg:hidden">
                <h3 className="text-[1.85rem] font-bold leading-tight mb-1">
                  <span className="text-gray-900">Where Are Leads </span>
                  <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">Dropping Off?</span>
                </h3>
                <img src={underlineImg} alt="" className="h-3 mx-auto my-3 w-48" loading="lazy" />
              </div>
              {/* Desktop heading — compact */}
              <div className="text-center hidden lg:block">
                <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Sales Pipeline</span>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mt-1">Where Are Leads Dropping Off?</h3>
              </div>
              <img src={imgSalesFunnel} alt="Sales pipeline funnel" className="w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[380px]" />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
