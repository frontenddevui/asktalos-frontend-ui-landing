export type IndustryPageData = {
  slug: string;
  name: string;
  shortName: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  problems: string[];
  useCases: Array<{
    title: string;
    description: string;
  }>;
  products: Array<{
    title: string;
    description: string;
  }>;
  outcomes: string[];
  outcomeProblemStatements: string[];
  eightStepDescriptions: string[];
  seoTitle: string;
  seoDescription: string;
};

export const industryPages: IndustryPageData[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    shortName: "Healthcare",
    heroTitle: "Improve patient communication for modern",
    heroHighlight: "healthcare teams",
    heroDescription:
      "Use AskTalos to handle patient enquiries, appointment reminders, follow-up communication, and lead capture across calls, WhatsApp, chatbot, email, and CRM workflows.",
    problems: [
      "Missed appointments and poor follow-up reduce patient retention.",
      "Front-desk teams spend too much time answering repetitive patient questions.",
      "Lead tracking for consultations, diagnostics, and procedures is scattered across tools."
    ],
    useCases: [
      {
        title: "Appointment reminders",
        description: "Send automated reminders and confirmations on WhatsApp, email, or voice before visits."
      },
      {
        title: "Patient enquiry automation",
        description: "Answer common questions about services, doctors, timings, and consultation booking with AI chat and voice flows."
      },
      {
        title: "Procedure follow-up",
        description: "Run post-visit follow-ups, collect feedback, and guide patients to the next step in care."
      },
      {
        title: "Consultation lead tracking",
        description: "Capture every patient lead into CRM and assign it to the right coordinator or clinic location."
      }
    ],
    products: [
      { title: "CRM", description: "Track every patient enquiry, appointment, and status in one healthcare pipeline." },
      { title: "Chatbot", description: "Handle FAQs, route urgent requests, and capture new patient intent 24/7." },
      { title: "Voice Calling", description: "Automate reminder calls and consultation follow-ups at scale." },
      { title: "WhatsApp and Email", description: "Send reminders, reports-ready alerts, and re-engagement campaigns with one credit system." }
    ],
    outcomes: [
      "Lower no-show rates",
      "Faster patient response times",
      "Better consultation conversion tracking"
    ],
    outcomeProblemStatements: [
      "Missed appointments create gaps in clinic revenue and reduce patient lifetime value. Automated reminders significantly improve show rates and optimize doctor schedules.",
      "Slow patient communication during booking and follow-up creates friction and lost enquiries. Real-time responses across calls, WhatsApp, and chatbot ensure no patient waits.",
      "Consultation leads scattered across email, calls, and forms make tracking impossible. CRM workflows consolidate every patient enquiry into one clear pipeline with assignment rules.",
      "Patient retention suffers when follow-up communication is manual and inconsistent. Automated post-visit flows, feedback collection, and re-engagement reduce patient churn."
    ],
      eightStepDescriptions: [
        "Enable 24/7 appointment availability and booking confirmations to reduce patient friction and administrative overhead.",
        "Deploy AI-powered chatbots to handle common questions about services, pricing, and booking without manual staff involvement.",
        "Capture every patient enquiry directly into CRM to eliminate leads slipping through gaps in email or phone logs.",
        "Automate reminder sequences before appointments to significantly reduce no-show rates and optimize clinic capacity.",
        "Route consultation leads to the right team member instantly based on availability and specialization to accelerate care.",
        "Send triggered follow-up surveys after visits to collect feedback and identify upsell opportunities for additional services.",
        "Manage insurance verification and billing workflows with automated document reminders to reduce payment delays.",
        "Build loyalty through personalized post-visit re-engagement campaigns that keep patients informed about relevant services."
      ],
    seoTitle: "Healthcare CRM, Calling & WhatsApp Automation | AskTalos",
    seoDescription: "Automate patient communication, reminders, follow-ups, and enquiry management for healthcare teams with AskTalos."
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    shortName: "Real Estate",
    heroTitle: "Capture and convert property leads faster with",
    heroHighlight: "real estate automation",
    heroDescription:
      "Bring inbound property leads, broker follow-ups, site visit confirmations, and nurture campaigns into one platform built for real estate sales teams.",
    problems: [
      "Capture and convert property leads faster with real estate automation.",
      "Sales teams struggle to manage call-backs, site visits, and channel partner communication together.",
      "Marketing spend is wasted when lead response time is inconsistent."
    ],
    useCases: [
      {
        title: "Instant property lead capture",
        description: "Capture website, ad, and portal enquiries directly into CRM and trigger immediate follow-up."
      },
      {
        title: "Site visit coordination",
        description: "Automate confirmations, reminders, and follow-up messaging before and after site visits."
      },
      {
        title: "Project-specific nurture flows",
        description: "Send project brochures, inventory updates, and finance guidance through WhatsApp and email journeys."
      },
      {
        title: "Broker and lead status tracking",
        description: "Track lead ownership, project interest, and next action in a real estate pipeline."
      }
    ],
    products: [
      { title: "CRM", description: "Organize property leads by project, budget, location, and site visit stage." },
      { title: "Voice Calling", description: "Run immediate callback workflows for new leads and missed follow-ups." },
      { title: "WhatsApp", description: "Share brochures, maps, pricing updates, and visit reminders in one click." },
      { title: "Email", description: "Nurture colder leads with automated inventory and offer updates." }
    ],
    outcomes: [
      "Faster lead-to-site-visit conversion",
      "Cleaner project pipeline visibility",
      "Better utilization of ad-generated leads"
    ],
    outcomeProblemStatements: [
      "High-intent property enquiries lose value within hours when follow-up is delayed. Immediate callback automation and WhatsApp follow-up conversions turn hot leads into site visits.",
      "Sales teams juggle leads across multiple projects, brokers, and channels without clarity on where deals stand. Unified CRM tracking gives every team member instant visibility into pipeline health and bottlenecks.",
      "Marketing spend on property ads, portals, and social channels delivers leads—but inconsistent follow-up wastes them. Automated lead nurture journeys ensure every enquiry moves toward a site visit or qualified handoff.",
      "Broker partnerships break down when communication is slow or ownership is unclear. CRM workflows with broker tracking and automated status updates strengthen relationships and deal velocity."
    ],
      eightStepDescriptions: [
        "Capture property leads from websites, portals, and ads automatically into CRM for immediate assignment and follow-up.",
        "Send instant WhatsApp and SMS confirmations to acknowledge lead interest and set expectations for next steps.",
        "Deploy chatbots to answer property FAQs, filter unqualified leads, and guide serious buyers through the inquiry funnel.",
        "Automate site visit scheduling and confirmations to reduce cancellations and maximize time with qualified prospects.",
        "Track lead source and stage in CRM to identify which marketing channels drive the best ROI and close rates.",
        "Execute targeted WhatsApp campaigns to nurture cold leads with project updates, inventory changes, and financing info.",
        "Orchestrate team collaboration with automated notifications when leads move to decision stages or go inactive.",
        "Close deals faster with post-visit follow-up automation that keeps deals on track and handles negotiation touchpoints."
      ],
    seoTitle: "Real Estate CRM, Calling & Lead Automation | AskTalos",
    seoDescription: "Use AskTalos for real estate lead capture, site visit automation, CRM tracking, calling, WhatsApp, and email nurture."
  },
  {
    slug: "education",
    name: "Education",
    shortName: "Education",
    heroTitle: "Automate admissions and student communication for",
    heroHighlight: "education brands",
    heroDescription:
      "Support admissions, counselling, fee reminders, parent communication, and student re-engagement with one centralized communication platform.",
    problems: [
      "Admission teams miss student leads during peak enquiry periods.",
      "Counsellors spend too much time on repetitive follow-up and fee reminder tasks.",
      "Student and parent communication is spread across disconnected tools."
    ],
    useCases: [
      { title: "Admission enquiry management", description: "Capture and assign every course enquiry automatically for fast counsellor follow-up." },
      { title: "Counselling reminders", description: "Schedule follow-up messages and call reminders for applicants at each stage." },
      { title: "Fee and document reminders", description: "Automate reminders for payments, forms, interviews, and onboarding tasks." },
      { title: "Parent and student campaigns", description: "Run WhatsApp and email updates for admissions, classes, and re-enrolment." }
    ],
    products: [
      { title: "CRM", description: "Track applicants from first enquiry to enrolment with full ownership and next actions." },
      { title: "Chatbot", description: "Answer admission FAQs, intake dates, and course-related questions instantly." },
      { title: "WhatsApp and Email", description: "Send reminders, brochures, and counselling updates from a single workflow." },
      { title: "Calling", description: "Automate call-backs and priority outreach for high-intent applicants." }
    ],
    outcomes: [
      "Higher admissions conversion",
      "Reduced counsellor workload",
      "Consistent student communication"
    ],
    outcomeProblemStatements: [
      "Student enquiries peak during admission season, and counsellors can't follow up fast enough. Instant counsellor assignment and WhatsApp conversation routing ensure no lead falls through the cracks.",
      "Counsellors are buried in repetitive follow-up tasks—checking application status, sending fee reminders, and confirming interviews. Workflow automation frees up their time for meaningful counselling and relationship building.",
      "Students receive inconsistent communication about application status, fees, and onboarding, creating confusion and dropouts. Centralized WhatsApp and email sequences ensure every student gets the right message at the right time.",
      "Parent engagement is critical for admissions, but communication channels are fragmented. Multi-channel parent updates on admissions, fees, and milestones strengthen the entire enrollment journey."
    ],
      eightStepDescriptions: [
        "Capture every student enquiry from website, chatbot, and ads into one CRM pipeline with automatic counselor assignment.",
        "Send instant WhatsApp and email confirmations to prospective students acknowledging their interest and next steps.",
        "Answer 80% of common questions (eligibility, fees, placement, dates) with AI chatbots available 24/7 without counselor effort.",
        "Automate counseling session scheduling and send reminders to reduce missed counseling calls and optimize counselor time.",
        "Track application progress and share milestone updates with students to keep them engaged throughout the application cycle.",
        "Send targeted fee payment reminders and enrollment deadline alerts to convert interested students into confirmed admissions.",
        "Execute parent engagement campaigns sharing campus highlights, alumni success stories, and financial aid information.",
        "Follow up with admitted students through orientation reminders and onboarding materials to ensure successful enrollment start."
      ],
    seoTitle: "Education CRM, Chatbot & Admission Automation | AskTalos",
    seoDescription: "Automate student admissions, counselling, fee reminders, and parent communication with AskTalos."
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    shortName: "E-commerce",
    heroTitle: "Recover more carts and improve customer journeys in",
    heroHighlight: "e-commerce",
    heroDescription:
      "Use AskTalos to automate lead capture, abandoned cart follow-up, order support, retention journeys, and customer service across every high-volume channel.",
    problems: [
      "Abandoned carts and unserved support queries reduce revenue every day.",
      "Teams struggle to unify WhatsApp, email, chatbot, and calling into one customer view.",
      "Retention campaigns are inconsistent because audiences and workflows are fragmented."
    ],
    useCases: [
      { title: "Abandoned cart recovery", description: "Trigger WhatsApp, email, and call journeys for cart drop-offs based on customer behavior." },
      { title: "Order support automation", description: "Handle shipping, return, and order-status questions with chatbot and CRM workflows." },
      { title: "Upsell and repeat purchase campaigns", description: "Run targeted campaigns based on product interest, order history, and lifecycle stage." },
      { title: "COD confirmation flows", description: "Use calling and messaging automation to confirm high-risk COD orders before dispatch." }
    ],
    products: [
      { title: "Chatbot", description: "Support customers around the clock with instant order and product answers." },
      { title: "CRM", description: "Unify customer touchpoints, order intent, and support history in one profile." },
      { title: "WhatsApp and Email", description: "Run retention, recovery, and promotional journeys using centralized credits." },
      { title: "Calling", description: "Confirm orders and recover valuable leads with outbound calling workflows." }
    ],
    outcomes: [
      "More recovered revenue",
      "Lower support workload",
      "Stronger repeat-purchase automation"
    ],
    outcomeProblemStatements: [
      "Abandoned carts represent lost revenue—and slow follow-up makes recovery even harder. Triggered WhatsApp and email reminders recover 5-10% of abandoned carts automatically, turning browsers into buyers.",
      "Support teams spend hours answering repetitive questions about orders, returns, and shipping. Chatbot automation answers 60-70% of common questions, letting support focus on complex issues and retention.",
      "Repeat purchases require customers to feel valued and remembered. Email and WhatsApp journeys based on purchase history and behavior re-engage customers and drive higher lifetime value.",
      "COD orders carry high payment risk and involve manual confirmation calls. Automated voice and WhatsApp confirmation flows reduce non-payment and increase conversion confidence."
    ],
      eightStepDescriptions: [
        "Monitor shopping behavior in real-time and trigger abandoned cart reminders within minutes to recover revenue automatically.",
        "Send personalized product recommendations based on browsing and purchase history to increase average order value.",
        "Automate refund status updates and delivery tracking notifications so customers never need to call support.",
        "Use WhatsApp and SMS to confirm COD orders before delivery, reducing payment failures and chargebacks significantly.",
        "Deploy chatbots to handle order queries, size guides, and return policies, deflecting 70%+ of support tickets.",
        "Execute re-engagement campaigns for inactive customers showing them new arrivals, sales, and exclusive member offers.",
        "Send proactive shipping and delivery notifications to reduce support inquiries and improve customer experience.",
        "Build loyalty through post-purchase feedback surveys and exclusive loyalty program offers to drive repeat purchases."
      ],
    seoTitle: "Ecommerce CRM, Chatbot & Cart Recovery Automation | AskTalos",
    seoDescription: "Automate abandoned cart recovery, support, retention, WhatsApp, calling, and email workflows for e-commerce teams."
  },
  {
    slug: "financial-services",
    name: "Financial Services",
    shortName: "Finance",
    heroTitle: "Handle enquiries, document follow-ups, and conversion flows for",
    heroHighlight: "financial services",
    heroDescription:
      "Manage loans, advisory, insurance, and finance leads with compliant communication workflows that keep every prospect and follow-up organized.",
    problems: [
      "Financial leads require fast response, but teams often lose momentum after the first enquiry.",
      "Document collection and follow-up cycles are manual and time-consuming.",
      "Managers lack a complete view of pipeline quality and conversion bottlenecks."
    ],
    useCases: [
      { title: "Lead qualification", description: "Capture product interest and qualification details before a relationship manager steps in." },
      { title: "Document reminder journeys", description: "Automate reminders for KYC, application forms, statements, and missing data." },
      { title: "Renewal and repayment reminders", description: "Send proactive reminders for policy renewal, EMI due dates, and service actions." },
      { title: "Advisor follow-up tracking", description: "Keep high-value leads moving through CRM stages with clear next steps and ownership." }
    ],
    products: [
      { title: "CRM", description: "Track every finance lead, document stage, and relationship manager follow-up in one place." },
      { title: "WhatsApp and Email", description: "Run compliant reminders and nurturing campaigns with proper segmentation." },
      { title: "Calling", description: "Prioritize high-intent leads and application follow-ups with outbound call automation." },
      { title: "Chatbot", description: "Handle initial queries, eligibility checks, and service FAQs instantly." }
    ],
    outcomes: [
      "Shorter response cycles",
      "Better application completion rates",
      "Stronger lead-to-advisor conversion visibility"
    ],
    outcomeProblemStatements: [
      "Financial decision-making is time-sensitive—delays in responding to enquiries mean lost opportunities to competitors. Instant lead qualification and advisor assignment workflows ensure hot prospects get immediate attention.",
      "Document collection is the biggest bottleneck in finance workflows, with follow-ups scattered across email and calls. Automated reminder sequences with clear next steps dramatically improve KYC, form, and document completion rates.",
      "Managers lack clear visibility into which leads will close, where they're stuck, and what happens next. CRM tracking with automated pipeline movement gives leadership real-time conversion intelligence and forecasting power.",
      "Advisors need context and next steps for every lead interaction, not scattered notes. Centralized CRM ensures advisors spend time on relationship-building rather than information hunting, improving close rates and customer satisfaction."
    ],
      eightStepDescriptions: [
        "Qualify incoming loan and policy enquiries with automated intake forms to identify high-intent prospects before advisor touchpoint.",
        "Route qualified leads instantly to available relationship managers based on specialization and capacity for faster response.",
        "Send automated KYC reminder sequences and form submission guides to accelerate application completion and reduce dropouts.",
        "Track application status in real-time and share updates with customers via WhatsApp to reduce inquiry calls to support.",
        "Automate renewal reminders 90, 60, and 30 days before expiry to capture renewals that would otherwise lapse.",
        "Deploy chatbots to answer product eligibility questions, interest rates, and document requirements to reduce advisor workload.",
        "Send compliant personal finance tips and product education via WhatsApp to build trust and engagement between transactions.",
        "Create advisor dashboards showing pipeline health, renewal forecasts, and next actions to improve conversion visibility."
      ],
    seoTitle: "Financial Services CRM, Calling & WhatsApp Automation | AskTalos",
    seoDescription: "Automate finance, loan, insurance, and advisory lead workflows with CRM, calling, chatbot, WhatsApp, and email tools."
  },
  {
    slug: "travel-hospitality",
    name: "Travel & Hospitality",
    shortName: "Travel",
    heroTitle: "Deliver faster guest and traveler communication with",
    heroHighlight: "hospitality automation",
    heroDescription:
      "Support booking enquiries, itinerary updates, reservation follow-ups, and guest communication from one travel-ready customer workflow platform.",
    problems: [
      "Travel and hospitality teams deal with repeated booking and availability questions across channels.",
      "Manual reminder and guest communication workflows slow down operations.",
      "Teams lose upsell and repeat-booking opportunities due to weak follow-up."
    ],
    useCases: [
      { title: "Booking enquiry automation", description: "Capture booking requests and route them instantly to the right team or property." },
      { title: "Pre-arrival communication", description: "Send confirmations, reminders, check-in instructions, and upsell options automatically." },
      { title: "Itinerary and service updates", description: "Notify guests of changes, add-ons, and assistance needs through WhatsApp and email." },
      { title: "Post-stay follow-up", description: "Collect feedback, generate repeat bookings, and run retention campaigns after departure." }
    ],
    products: [
      { title: "Chatbot", description: "Answer booking and service questions instantly across digital channels." },
      { title: "CRM", description: "Track traveler or guest interactions, booking status, and service history." },
      { title: "WhatsApp and Email", description: "Send updates, reminders, and personalized offers with centralized credits." },
      { title: "Calling", description: "Support booking confirmations and premium guest outreach when speed matters." }
    ],
    outcomes: [
      "Improved booking response time",
      "Better guest experience consistency",
      "Higher repeat-booking opportunities"
    ],
    outcomeProblemStatements: [
      "During peak seasons, booking enquiries flood in across websites, portals, and messaging apps. Instant routing to available staff and chatbot answers ensure guests never wait, reducing booking loss to competitor sites.",
      "Guest experience can be inconsistent—some get confirmations immediately while others follow up manually. Automated pre-arrival sequences (confirmations, check-in details, upsell info) set every guest up for a smooth experience from day one.",
      "Travel and hospitality margins depend on repeat bookings and referrals, but follow-up after checkout is often missed. Post-stay feedback, retention offers, and loyalty program enrollment automations convert one-time guests into loyal repeat customers.",
      "Guests have questions at every stage—and manual answers slow operations. Chatbot FAQs about booking policies, room details, and local attractions handle 70%+ of questions, letting staff focus on premium experiences and service recovery."
    ],
      eightStepDescriptions: [
        "Capture booking enquiries from multiple channels (website, OTA, messaging) and route to available staff instantly to reduce booking loss.",
        "Send instant booking confirmations and room information to guests via WhatsApp with checkout and wifi details.",
        "Deploy chatbots to answer availability, pricing, cancellation policies, and local recommendations 24/7 without staff involvement.",
        "Send automated pre-arrival messaging with check-in instructions, parking info, and upsell offers for tours, meals, spa.",
        "Coordinate multi-property team on guest requests, amenity availability, and service issues to ensure seamless guest experience.",
        "Execute post-checkout feedback surveys and loyalty program invitations to capture reviews and drive repeat bookings.",
        "Send seasonal promotions and special event packages to past guests via WhatsApp to fill occupancy during slow seasons.",
        "Automate billing inquiries and payment reminders to accelerate checkout and reduce front-desk friction."
      ],
    seoTitle: "Travel & Hospitality CRM, Chatbot & Booking Automation | AskTalos",
    seoDescription: "Automate booking enquiries, guest messaging, confirmations, reminders, and CRM workflows for travel and hospitality teams."
  },
  {
    slug: "automotive",
    name: "Automotive",
    shortName: "Automotive",
    heroTitle: "Automate test-drive, service, and sales communication for",
    heroHighlight: "automotive businesses",
    heroDescription:
      "Use AskTalos to manage dealership leads, service reminders, booking confirmations, and ownership lifecycle communication with one central platform.",
    problems: [
      "Showroom and service teams often work from separate follow-up systems.",
      "Test-drive and service reminders are manual, inconsistent, and easy to miss.",
      "Leads from ads and campaigns lose value when callbacks are delayed."
    ],
    useCases: [
      { title: "Test-drive lead capture", description: "Bring every vehicle enquiry into CRM and assign it to the right sales advisor quickly." },
      { title: "Service reminders", description: "Automate scheduled service reminders and booking follow-ups for existing customers." },
      { title: "Offer and finance campaigns", description: "Run promotional communication for exchange offers, finance, and seasonal campaigns." },
      { title: "Delivery and ownership follow-up", description: "Guide customers after purchase with onboarding, feedback, and upsell journeys." }
    ],
    products: [
      { title: "CRM", description: "Track new vehicle leads, test-drive requests, and after-sales journeys in one pipeline." },
      { title: "Calling", description: "Run quick callback automation for test-drive and service enquiries." },
      { title: "WhatsApp and Email", description: "Send brochures, booking confirmations, and maintenance reminders at scale." },
      { title: "Chatbot", description: "Handle availability, pricing, variant, and booking questions automatically." }
    ],
    outcomes: [
      "Higher lead response speed",
      "More test-drive completions",
      "Better retention after delivery"
    ],
    outcomeProblemStatements: [
      "Hot leads cool fast—if a test-drive enquiry isn't acknowledged within 30 minutes, the customer moves to the next dealership. Instant callback routing and WhatsApp engagement ensure sales advisors connect with every high-intent lead immediately.",
      "Manual test-drive scheduling across multiple advisors and locations creates bottlenecks and missed opportunities. Automated booking workflows, availability updates, and reminders 24 hours before the drive dramatically improve show rates.",
      "After purchase, customer communication often stops, leaving money on the table for service bookings, upsells, and referrals. Automated post-delivery onboarding, service reminders, and loyalty engagement keep customers engaged and improve repeat service business.",
      "Ad spend and lead generation campaigns generate hundreds of enquiries, but inconsistent follow-up wastes 30-40% of the investment. Unified lead tracking from first enquiry through test drive to sale ensures no lead falls through the cracks."
    ],
      eightStepDescriptions: [
        "Capture vehicle enquiries from showroom, website, ads, and calls into one CRM with instant sales advisor assignment.",
        "Send test-drive confirmations via WhatsApp with vehicle details, color options, and time slot confirmation.",
        "Automate test-drive reminders 24 hours before scheduled time to reduce no-shows and optimize showroom capacity.",
        "Deploy chatbots to answer vehicle specifications, pricing, financing options, and color availability to qualify interest.",
        "Track test-drive outcome and send follow-up messaging within 2 hours with personalized offers while interest is high.",
        "Execute post-test-drive campaigns sharing financing plans, exchange-in offers, and limited-time promotions.",
        "Automate delivery scheduling and send post-delivery follow-up for accessories, warranty upgrades, and service bookings.",
        "Send service reminders at scheduled intervals (oil change, tire rotation, 40k service) to build long-term customer lifetime value."
      ],
    seoTitle: "Automotive CRM, Calling & Service Automation | AskTalos",
    seoDescription: "Automate dealership leads, test-drive bookings, service reminders, and customer communication with AskTalos."
  },
  {
    slug: "insurance",
    name: "Insurance",
    shortName: "Insurance",
    heroTitle: "Simplify policy lead management and renewals with",
    heroHighlight: "insurance automation",
    heroDescription:
      "Run policy enquiry workflows, renewal reminders, advisor follow-ups, and customer service communication from one insurance-ready CRM platform.",
    problems: [
      "Renewals are lost because reminders are late or inconsistent.",
      "Policy enquiries need multiple follow-ups, but manual tracking leads to missed opportunities.",
      "Insurance advisors need a clearer view of lead stage, documentation, and customer history."
    ],
    useCases: [
      { title: "Policy lead capture", description: "Capture fresh policy enquiries and distribute them to the right advisor automatically." },
      { title: "Renewal campaigns", description: "Send timely renewal reminders across WhatsApp, email, and calling workflows." },
      { title: "Claims and service support", description: "Automate support communication for claim status, documents, and service requests." },
      { title: "Advisor productivity workflows", description: "Track every lead stage, callback, and pending action in CRM." }
    ],
    products: [
      { title: "CRM", description: "Give advisors a single source of truth for policies, leads, renewals, and next steps." },
      { title: "WhatsApp and Email", description: "Handle reminders, policy updates, and service alerts without separate tools." },
      { title: "Calling", description: "Automate high-intent renewal and advisor callback workflows." },
      { title: "Chatbot", description: "Answer product, premium, and service questions instantly." }
    ],
    outcomes: [
      "Higher renewal consistency",
      "Cleaner advisor follow-up operations",
      "Better visibility into policy pipeline"
    ],
    outcomeProblemStatements: [
      "Renewals are the easiest revenue to keep, but inconsistent reminders cause lapses and churn. Automated renewal reminders sent 60, 30, and 7 days before expiry via WhatsApp, email, and calling dramatically improve retention rates.",
      "Advisors spend time hunting for policy files, customer history, and next steps instead of selling. CRM systems with complete policy, customer, and follow-up context let advisors focus on meaningful conversations and faster closures.",
      "Management can't forecast renewal health or identify stuck deals quickly enough to intervene. Automated pipeline tracking gives leadership real-time visibility into pending renewals, application stages, and where resources are needed most.",
      "Policy enquiries require multiple touchpoints and documentation—but scattered follow-ups reduce conversion. Automated nurture workflows that guide prospects through policy exploration, comparison, and application increase lead-to-policy conversion rates."
    ],
      eightStepDescriptions: [
        "Capture policy enquiries from website, portals, and referrals automatically and route to available advisors by policy type.",
        "Send instant WhatsApp confirmations with policy summaries and next steps to set expectations for the sales process.",
        "Automate eligibility checks and product recommendations based on customer inputs to pre-qualify before advisor call.",
        "Deploy chatbots to answer coverage details, premium calculations, claim processes, and policy comparison questions.",
        "Send renewal reminders 90, 60, and 30 days before expiry to capture renewals and prevent policy lapse revenue loss.",
        "Execute upsell campaigns highlighting related coverage (bundling home + auto, adding riders) to increase policy count.",
        "Automate claim process guidance and required document reminders to accelerate claim settlement and satisfaction.",
        "Build loyalty through anniversary greetings, policy review nudges, and referral incentive programs via WhatsApp."
      ],
    seoTitle: "Insurance CRM, Calling & Renewal Automation | AskTalos",
    seoDescription: "Automate insurance lead capture, policy renewals, advisor follow-ups, and customer support with AskTalos."
  },
  {
    slug: "staffing-recruitment",
    name: "Staffing & Recruitment",
    shortName: "Recruitment",
    heroTitle: "Move candidates and clients through the funnel faster with",
    heroHighlight: "recruitment automation",
    heroDescription:
      "AskTalos helps recruitment teams manage candidate pipelines, client enquiries, interview coordination, and follow-up communication in one place.",
    problems: [
      "Candidate follow-up breaks when recruiters manage high volumes manually.",
      "Interview coordination eats up time across email, calls, and messaging.",
      "Agencies struggle to maintain a single pipeline view for candidates and client demand."
    ],
    useCases: [
      { title: "Candidate screening and qualification", description: "Capture candidate responses and route qualified profiles into the right pipeline." },
      { title: "Interview coordination", description: "Automate reminders, confirmations, and rescheduling communication for candidates." },
      { title: "Client requirement management", description: "Track client openings, submissions, and follow-up status in CRM." },
      { title: "Re-engagement campaigns", description: "Reach inactive candidates and warm talent pools with WhatsApp and email outreach." }
    ],
    products: [
      { title: "CRM", description: "Manage candidate, client, and job-order pipelines in one recruitment workflow." },
      { title: "Calling", description: "Speed up candidate outreach and interview confirmations with automated calls." },
      { title: "WhatsApp and Email", description: "Run reminders, candidate engagement, and bulk outreach from one platform." },
      { title: "Chatbot", description: "Collect initial candidate details and answer job-related FAQs automatically." }
    ],
    outcomes: [
      "Faster candidate response time",
      "Less recruiter coordination overhead",
      "Better pipeline control for placements"
    ],
    outcomeProblemStatements: [
      "Candidate response rates drop when outreach is slow or scattered across tools. Instant candidate engagement via WhatsApp, email, and calling keeps hot talent warm and speeds the entire hiring cycle.",
      "Recruiters waste time coordinating interview dates, sending reminders, and chasing confirmations. Automated interview scheduling, reminder sequences, and reschedule workflows free up 20-30% of recruiter time for actual relationship-building.",
      "Multiple active searches, candidate pools, and client pipelines create chaos without centralized tracking. CRM visibility shows which candidates are in which stage, which roles need urgent attention, and which clients are closest to placement.",
      "Candidate engagement drops between application and interview, and good talent gets lost to other offers. Automated engagement workflows that celebrate milestones, share interview prep tips, and build excitement improve acceptance rates and reduce drop-offs."
    ],
      eightStepDescriptions: [
        "Capture candidate applications from job boards, referrals, and direct applicants into unified CRM with automated screening.",
        "Send instant WhatsApp acknowledgments and next steps (interview date, prep materials) to keep candidates engaged immediately.",
        "Deploy chatbots to answer questions about role, location, compensation, and company culture to reduce recruiter interruptions.",
        "Automate interview reminders, Zoom links, and pre-interview prep tips sent 24 hours before to reduce no-shows.",
        "Send feedback and next-round updates quickly after interviews to keep momentum and prevent candidates pursuing other offers.",
        "Route qualified candidates to matching client openings instantly, reducing time-to-placement and improving utilization.",
        "Execute re-engagement campaigns for passive candidates and past applicants with relevant openings and incentive offers.",
        "Automate offer acceptance confirmations, onboarding reminders, and feedback surveys to measure placement success."
      ],
    seoTitle: "Recruitment CRM, Calling & Candidate Automation | AskTalos",
    seoDescription: "Automate candidate screening, interview reminders, recruiter follow-ups, and client pipeline workflows with AskTalos."
  },
  {
    slug: "saas-technology",
    name: "SaaS & Technology",
    shortName: "SaaS",
    heroTitle: "Unify lead qualification, onboarding, and customer success for",
    heroHighlight: "SaaS and technology teams",
    heroDescription:
      "From inbound demo requests to lifecycle communication, AskTalos helps SaaS teams automate growth, support, and retention workflows with centralized credits.",
    problems: [
      "Demo requests and product enquiries often wait too long for sales follow-up.",
      "Customer success, support, and marketing journeys are fragmented across tools.",
      "Growth teams need one platform to run acquisition and retention communication together."
    ],
    useCases: [
      { title: "Demo qualification", description: "Capture, qualify, and route inbound demo requests into the right sales workflow." },
      { title: "Onboarding communication", description: "Automate onboarding reminders, activation journeys, and milestone follow-ups." },
      { title: "Renewal and expansion campaigns", description: "Run lifecycle communication to improve adoption, retention, and upsell motion." },
      { title: "Support deflection and escalation", description: "Handle repetitive support questions with chatbot and route priority issues correctly." }
    ],
    products: [
      { title: "CRM", description: "Track prospects, demos, onboarding, renewals, and account health in one system." },
      { title: "Chatbot", description: "Qualify website visitors and answer product questions before human handoff." },
      { title: "WhatsApp and Email", description: "Run onboarding and lifecycle journeys using one centralized credit pool." },
      { title: "Calling", description: "Speed up demo follow-ups and account outreach with automated voice workflows." }
    ],
    outcomes: [
      "Faster demo response and qualification",
      "Stronger onboarding consistency",
      "Better lifecycle automation with one credit model"
    ],    outcomeProblemStatements: [
      "Demo requests sit in email queues—by the time sales responds, the prospect has moved to a competitor. Instant demo scheduling, pre-call qualification, and confirmation workflows convert more enquiries into actual product demos.",
      "Onboarding success determines retention, but manual welcome sequences and milestone reminders create inconsistency. Automated onboarding journeys ensure every customer gets activation prompts, feature tips, and success check-ins at the right time.",
      "Renewal reminders often go out too late, and expansion opportunities are missed entirely. Lifecycle automation workflows keep customers engaged with feature announcements, usage tips, and upsell offers throughout their journey.",
      "Growth teams juggle multiple platforms—marketing automation for campaigns, support tools for questions, sales tools for follow-up. One centralized platform with pooled credits eliminates tool sprawl and makes lifecycle campaigns faster and cheaper to run."
      ],
      eightStepDescriptions: [
        "Capture demo requests from website, landing pages, and ads into CRM with automatic sales rep assignment based on segment.",
        "Send instant demo booking confirmations via WhatsApp with Zoom link, product overview, and company case studies.",
        "Automate demo follow-ups within 2 hours while demo impression is fresh, with use-case-specific offer and trial link.",
        "Send onboarding reminders post-signup covering activation checklist, feature deep-dives, and best practices guides.",
        "Deploy chatbots to answer feature questions, pricing comparisons, integrations, and common technical questions.",
        "Execute lifecycle campaigns for activation, feature adoption, expansion to higher tiers, and renewal 90 days before expiry.",
        "Send quarterly business reviews and usage insights to highlight ROI and identify upsell opportunities with data-backed recommendations.",
        "Automate churn prevention campaigns for inactive users showing them success stories and onboarding resources to re-activate."
    ],    seoTitle: "SaaS CRM, Chatbot & Demo Automation | AskTalos",
    seoDescription: "Use AskTalos to automate demo qualification, onboarding, customer communication, retention, and support workflows for SaaS teams."
  }
];

export const industryPageMap = Object.fromEntries(
  industryPages.map((industry) => [industry.slug, industry])
) as Record<string, IndustryPageData>;