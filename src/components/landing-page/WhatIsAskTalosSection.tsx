import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import './WhatIsAskTalosSection.css';

/**
 * WhatIsAskTalosSection Component
 * 
 * Converted from Angular component: home-bot-section.component
 * 
 * Angular TypeScript Configuration Equivalent:
 * 
 * @Component({
 *   selector: 'app-home-bot-section',
 *   templateUrl: './home-bot-section.component.html',
 *   styleUrls: ['./home-bot-section.component.scss']
 * })
 * export class HomeBotSectionComponent implements OnInit {
 *   config: SwiperOptions = {
 *     pagination: {
 *       clickable: true,
 *       renderBullet: function (index, className) {
 *         const slides = [...]; // 5 slides with icons, titles, colors
 *         return `<div class="${className}" data-index="${index}" 
 *                      style="border-color: ${slides[index].color}">
 *                   <img src="${slides[index].icon}" loading="lazy"
 />
 *                   <img src="${slides[index].iconWhite}" loading="lazy"
 />
 *                 </div>`;
 *       },
 *     },
 *     autoplay: {
 *       delay: 3000,
 *       disableOnInteraction: false,
 *       pauseOnMouseEnter: false,
 *     },
 *     loop: true,
 *     speed: 600,
 *     slidesPerView: 1,
 *     spaceBetween: 0,
 *     direction: 'horizontal',
 *   };
 * 
 *   ngOnInit(): void { }
 * }
 * 
 * Features:
 * - 5 slides: Chatbot, CRM, Calling Solution, WhatsApp Business API, Emails
 * - Custom pagination bullets positioned on left with circular icons
 * - Auto-rotate every 3 seconds
 * - Clickable bullets for manual navigation
 * - Active state changes: background color, icon swap, line connector animation
 * - Fully responsive with mobile rotation effects
 * - Color-coded bullets matching brand colors
 */

// Import images from 'Whats_asktalos' folder
import botMain from "@/assets/Whats_asktalos/bot-main.svg";

// Slide images
import chatbotImg from "@/assets/Whats_asktalos/chatbot-img.svg";
import crmImg from "@/assets/Whats_asktalos/crm-img.svg";
import callingSolutionImg from "@/assets/Whats_asktalos/calling-solution-img.svg";
import teamBotImg from "@/assets/team-bot-img.svg";
import emailsImg from "@/assets/Whats_asktalos/emails-img.webp";

// Icon images (normal state)
import chatbotIcon from "@/assets/Whats_asktalos/chatbot-icon.webp";
import crmIcon from "@/assets/Whats_asktalos/crm-icon.webp";
import callingIcon from "@/assets/Whats_asktalos/calling-icon.webp";
import whatsappIcon from "@/assets/Whats_asktalos/whatsapp-icon.webp";
import emailIcon from "@/assets/Whats_asktalos/email-icon.webp";

// Icon images (white state for active)
import chatbotIconWhite from "@/assets/Whats_asktalos/chatbot-icon-white.webp";
import crmIconWhite from "@/assets/Whats_asktalos/crm-icon-white.webp";
import callingIconWhite from "@/assets/Whats_asktalos/calling-icon-white.webp";
import whatsappIconWhite from "@/assets/Whats_asktalos/whatsapp-white.webp";
import emailIconWhite from "@/assets/Whats_asktalos/email-icon-white.webp";

// Line connector images
import chatbotLine from "@/assets/Whats_asktalos/chatbot-line.webp";
import crmLine from "@/assets/Whats_asktalos/crm-line.webp";
import callingLine from "@/assets/Whats_asktalos/calling-line.webp";
import teamLine from "@/assets/Whats_asktalos/team-line.webp";
import emailLine from "@/assets/Whats_asktalos/email-line.webp";

// Active line connector images
import chatbotActive from "@/assets/Whats_asktalos/chatbot-active.webp";
import crmActive from "@/assets/Whats_asktalos/crm-active.webp";
import callingActive from "@/assets/Whats_asktalos/calling-active.webp";
import teamActive from "@/assets/Whats_asktalos/team-active.webp";
import emailActive from "@/assets/Whats_asktalos/email-active.webp";
const slides = [{
  id: 1,
  image: chatbotImg,
  icon: chatbotIcon,
  iconWhite: chatbotIconWhite,
  line: chatbotLine,
  lineActive: chatbotActive,
  title: "Chatbot",
  subtitle: "Instant responses for lead capture and support",
  color: "#f27e2c"
}, {
  id: 2,
  image: crmImg,
  icon: crmIcon,
  iconWhite: crmIconWhite,
  line: crmLine,
  lineActive: crmActive,
  title: "CRM",
  subtitle: "Structured pipeline control with clear ownership",
  color: "#ea2e56"
}, {
  id: 3,
  image: callingSolutionImg,
  icon: callingIcon,
  iconWhite: callingIconWhite,
  line: callingLine,
  lineActive: callingActive,
  title: "Calling Solution",
  subtitle: "Smarter call operations with faster follow-ups",
  color: "#ff862f"
}, {
  id: 4,
  image: teamBotImg,
  icon: whatsappIcon,
  iconWhite: whatsappIconWhite,
  line: teamLine,
  lineActive: teamActive,
  title: "WhatsApp Business API",
  subtitle: "Campaign automation and high-intent engagement",
  color: "#31c072"
}, {
  id: 5,
  image: emailsImg,
  icon: emailIcon,
  iconWhite: emailIconWhite,
  line: emailLine,
  lineActive: emailActive,
  title: "Emails",
  subtitle: "Personalized email journeys that scale conversion",
  color: "#ff862f"
}];
export default function WhatIsAskTalosSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex] ?? slides[0];

  // Dynamic styles for image URLs (background-image uses imported assets)
  const dynamicStyles = `
    /* Bot Main Center Image */
    .swiper-pagination::after {
      background-image: url("${botMain}");
    }

    /* Bullet 1 - Chatbot Icons */
    .swiper-pagination-bullet[data-index="0"] {
      background-image: url("${chatbotIcon}");
    }
    .swiper-pagination-bullet[data-index="0"]::before {
      content: "Chatbot";
    }
    .swiper-pagination-bullet[data-index="0"]::after {
      background-image: url("${chatbotLine}");
    }
    .swiper-pagination-bullet-active[data-index="0"] {
      background-image: url("${chatbotIconWhite}");
    }
    .swiper-pagination-bullet-active[data-index="0"]::before {
      color: #f27e2c;
    }
    .swiper-pagination-bullet-active[data-index="0"]::after {
      background-image: url("${chatbotActive}");
    }

    /* Bullet 2 - CRM Icons */
    .swiper-pagination-bullet[data-index="1"] {
      background-image: url("${crmIcon}");
    }
    .swiper-pagination-bullet[data-index="1"]::before {
      content: "CRM";
    }
    .swiper-pagination-bullet[data-index="1"]::after {
      background-image: url("${crmLine}");
    }
    .swiper-pagination-bullet-active[data-index="1"] {
      background-image: url("${crmIconWhite}");
    }
    .swiper-pagination-bullet-active[data-index="1"]::before {
      color: #ea2e56;
    }
    .swiper-pagination-bullet-active[data-index="1"]::after {
      background-image: url("${crmActive}");
    }

    /* Bullet 3 - Calling Solution Icons */
    .swiper-pagination-bullet[data-index="2"] {
      background-image: url("${callingIcon}");
    }
    .swiper-pagination-bullet[data-index="2"]::before {
      content: "Calling Solution";
    }
    .swiper-pagination-bullet[data-index="2"]::after {
      background-image: url("${callingLine}");
    }
    .swiper-pagination-bullet-active[data-index="2"] {
      background-image: url("${callingIconWhite}");
    }
    .swiper-pagination-bullet-active[data-index="2"]::before {
      color: #ff862f;
    }
    .swiper-pagination-bullet-active[data-index="2"]::after {
      background-image: url("${callingActive}");
    }

    /* Bullet 4 - WhatsApp Icons */
    .swiper-pagination-bullet[data-index="3"] {
      background-image: url("${whatsappIcon}");
    }
    .swiper-pagination-bullet[data-index="3"]::before {
      content: "WhatsApp Business API";
    }
    .swiper-pagination-bullet[data-index="3"]::after {
      background-image: url("${teamLine}");
    }
    .swiper-pagination-bullet-active[data-index="3"] {
      background-image: url("${whatsappIconWhite}");
    }
    .swiper-pagination-bullet-active[data-index="3"]::before {
      color: #31c072;
    }
    .swiper-pagination-bullet-active[data-index="3"]::after {
      background-image: url("${teamActive}");
    }

    /* Bullet 5 - Emails Icons */
    .swiper-pagination-bullet[data-index="4"] {
      background-image: url("${emailIcon}");
    }
    .swiper-pagination-bullet[data-index="4"]::before {
      content: "Emails";
    }
    .swiper-pagination-bullet[data-index="4"]::after {
      background-image: url("${emailLine}");
    }
    .swiper-pagination-bullet-active[data-index="4"] {
      background-image: url("${emailIconWhite}");
    }
    .swiper-pagination-bullet-active[data-index="4"]::before {
      color: #ff862f;
    }
    .swiper-pagination-bullet-active[data-index="4"]::after {
      background-image: url("${emailActive}");
    }
  `;

  // Swiper configuration matching Angular config
  const swiperConfig = {
    modules: [Pagination, Autoplay],
    direction: "horizontal" as const,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 600,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: false
    },
    pagination: {
      clickable: true,
      // Empty renderBullet - styling will be done via CSS using background-image like Angular
      renderBullet: (index: number, className: string) => {
        return `<span class="${className}" data-index="${index}"></span>`;
      }
    },
    onSwiper: (swiper: SwiperType) => {
      swiperRef.current = swiper;
    },
    onSlideChange: (swiper: SwiperType) => {
      setActiveIndex(swiper.realIndex);
    }
  };
  return <section className="pt-0 pb-8 sm:pb-12 overflow-hidden" style={{ background: "transparent" }}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Swiper Carousel Section */}
        <div className="bot-content-wrapper">
          <style>{dynamicStyles}</style>
          <div className="bot-content">
            <Swiper {...swiperConfig} className="mySwiper">
              {slides.map(slide => <SwiperSlide key={slide.id}>
                  <div className="change-bot-img">
                    <img src={slide.image} alt={slide.title} className="img-fluid" loading="lazy"
 />
                  </div>
                </SwiperSlide>)}
            </Swiper>
          </div>
        </div>
      </div>
    </section>;
}