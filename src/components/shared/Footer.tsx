import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import asktalosFooterLogo from "@/assets/transparent__asktalos_white.svg";
import hipaaImg from "@/assets/68fb7910cab842b069cc53cd_Hipaa png.webp";
import soc2Img from "@/assets/688cbbe04820567a8e00723b_soc2.avif";
import gdprImg from "@/assets/688cbbf31929250227610cc7_GPTR.avif";

import { industryPages } from "@/data/industries";

function useCountUp(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setValue(Math.round(p * target));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
      {children}
    </h4>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a
        href={href}
        className="text-sm text-white/65 hover:text-white transition-colors leading-relaxed"
      >
        {children}
      </a>
    </li>
  );
}

export default function Footer() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setStatsInView(true); observer.disconnect(); }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const businessCount = useCountUp(500, 1800, statsInView);
  const productCount = useCountUp(12, 1200, statsInView);

  return (
    <footer className="relative z-10 bg-[#0a0a0a]">

      {/* ── CTA Banner ─────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-12 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-1">Ready to grow?</p>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              Transform your customer communication with AI.
            </h3>
            <p className="text-white/80 mt-1 text-sm">
              Join 500+ businesses closing more deals with AskTalos.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-white text-orange-500 font-bold px-6 py-3 rounded-xl text-sm hover:bg-orange-50 transition-colors shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/40"
            >
              Book a Free Demo
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 flex-shrink-0">
                <ArrowRight className="h-3 w-3 text-white" />
              </span>
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 border-2 border-white/80 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-white/10 transition-colors shadow-md shadow-black/20 hover:shadow-lg hover:shadow-black/30"
            >
              View Pricing
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20 flex-shrink-0">
                <ArrowRight className="h-3 w-3 text-white" />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Stats Bar ──────────────────────────────────────────────── */}
      <div className="border-b border-white/8 bg-white/[0.03]">
        <div ref={statsRef} className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16 py-6 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
          {([
            { num: statsInView ? `${businessCount.toLocaleString()}+` : "0+", label: "Businesses served" },
            { num: statsInView ? `${productCount}+` : "0+", label: "AI-powered products" },
            { num: "99.9%", label: "Platform uptime" },
            { num: "24/7",  label: "Support coverage" },
          ] as { num: string; label: string }[]).map(({ num, label }) => (
            <div key={label} className="text-center px-4 py-1">
              <div className="text-xl font-bold text-white">{num}</div>
              <div className="text-[11px] text-white mt-0.5 uppercase tracking-wide">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Columns ───────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16 pt-14 pb-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-12">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-3">
            <a href="/" className="mb-5 inline-block">
              <img src={asktalosFooterLogo} alt="AskTalos logo" className="h-9" loading="lazy" />
            </a>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-[260px]">
              The AI-powered growth engine helping 500+ businesses automate conversations, qualify leads, and close more deals.
            </p>
            {/* Social icons */}
            <div className="flex flex-wrap gap-2.5">
              <a href="https://www.facebook.com/asktalos" target="_blank" rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 hover:border-white hover:text-white transition-all">
                <svg width="8" height="16" viewBox="0 0 8 16" className="fill-current">
                  <path d="M7.43902 6.4H6.19918H5.75639V5.88387V4.28387V3.76774H6.19918H7.12906C7.3726 3.76774 7.57186 3.56129 7.57186 3.25161V0.516129C7.57186 0.232258 7.39474 0 7.12906 0H5.51285C3.76379 0 2.54609 1.44516 2.54609 3.5871V5.83226V6.34839H2.10329H0.597778C0.287819 6.34839 0 6.63226 0 7.04516V8.90323C0 9.26452 0.243539 9.6 0.597778 9.6H2.05902H2.50181V10.1161V15.3032C2.50181 15.6645 2.74535 16 3.09959 16H5.18075C5.31359 16 5.42429 15.9226 5.51285 15.8194C5.60141 15.7161 5.66783 15.5355 5.66783 15.3806V10.1419V9.62581H6.13276H7.12906C7.41688 9.62581 7.63828 9.41935 7.68256 9.10968V9.08387V9.05806L7.99252 7.27742C8.01466 7.09677 7.99252 6.89032 7.85968 6.68387C7.8154 6.55484 7.61614 6.42581 7.43902 6.4Z" />
                </svg>
              </a>
              <a href="https://twitter.com/asktalos" target="_blank" rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 hover:border-white hover:text-white transition-all">
                <svg width="16" height="12" viewBox="0 0 16 12" className="fill-current">
                  <path d="M14.2194 2.06654L15.2 0.939335C15.4839 0.634051 15.5613 0.399217 15.5871 0.2818C14.8129 0.704501 14.0903 0.845401 13.6258 0.845401H13.4452L13.3419 0.751468C12.7226 0.258317 11.9484 0 11.1226 0C9.31613 0 7.89677 1.36204 7.89677 2.93542C7.89677 3.02935 7.89677 3.17025 7.92258 3.26419L8 3.73386L7.45806 3.71037C4.15484 3.61644 1.44516 1.03327 1.00645 0.587084C0.283871 1.76125 0.696774 2.88845 1.13548 3.59296L2.0129 4.90802L0.619355 4.20352C0.645161 5.18982 1.05806 5.96477 1.85806 6.52838L2.55484 6.99804L1.85806 7.25636C2.29677 8.45401 3.27742 8.94716 4 9.13503L4.95484 9.36986L4.05161 9.93346C2.60645 10.8728 0.8 10.8024 0 10.7319C1.62581 11.7652 3.56129 12 4.90323 12C5.90968 12 6.65806 11.9061 6.83871 11.8356C14.0645 10.2857 14.4 4.41487 14.4 3.2407V3.07632L14.5548 2.98239C15.4323 2.23092 15.7935 1.8317 16 1.59687C15.9226 1.62035 15.8194 1.66732 15.7161 1.6908L14.2194 2.06654Z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/channel/UC-3eg6OQR2nZYkHvRJXm0sw" target="_blank" rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 hover:border-white hover:text-white transition-all">
                <svg width="16" height="12" viewBox="0 0 16 12" className="fill-current">
                  <path d="M15.6645 1.88018C15.4839 1.13364 14.9419 0.552995 14.2452 0.359447C13.0065 6.59222e-08 8 0 8 0C8 0 2.99355 6.59222e-08 1.75484 0.359447C1.05806 0.552995 0.516129 1.13364 0.335484 1.88018C0 3.23502 0 6 0 6C0 6 0 8.79263 0.335484 10.1198C0.516129 10.8664 1.05806 11.447 1.75484 11.6406C2.99355 12 8 12 8 12C8 12 13.0065 12 14.2452 11.6406C14.9419 11.447 15.4839 10.8664 15.6645 10.1198C16 8.79263 16 6 16 6C16 6 16 3.23502 15.6645 1.88018ZM6.4 8.57143V3.42857L10.5548 6L6.4 8.57143Z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/79907945" target="_blank" rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 hover:border-white hover:text-white transition-all">
                <svg width="14" height="14" viewBox="0 0 14 14" className="fill-current">
                  <path d="M13.0214 0H1.02084C0.453707 0 0 0.451613 0 1.01613V12.9839C0 13.5258 0.453707 14 1.02084 14H12.976C13.5432 14 13.9969 13.5484 13.9969 12.9839V0.993548C14.0422 0.451613 13.5885 0 13.0214 0ZM4.15142 11.9H2.08705V5.23871H4.15142V11.9ZM3.10789 4.3129C2.42733 4.3129 1.90557 3.77097 1.90557 3.11613C1.90557 2.46129 2.45002 1.91935 3.10789 1.91935C3.76577 1.91935 4.31022 2.46129 4.31022 3.11613C4.31022 3.77097 3.81114 4.3129 3.10789 4.3129ZM11.9779 11.9H9.9135V8.67097C9.9135 7.90323 9.89082 6.8871 8.82461 6.8871C7.73571 6.8871 7.57691 7.74516 7.57691 8.60323V11.9H5.51254V5.23871H7.53154V6.16452H7.55423C7.84914 5.62258 8.50701 5.08065 9.52785 5.08065C11.6376 5.08065 12.0232 6.43548 12.0232 8.2871V11.9H11.9779Z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/asktalos/" target="_blank" rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 hover:border-white hover:text-white transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" className="fill-current">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm8.96 2.54a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-2">
            <FooterHeading>Products</FooterHeading>
            <ul className="space-y-2.5">
              <FooterLink href="/chatbot">AI Chatbot</FooterLink>
              <FooterLink href="/crm">AI CRM</FooterLink>
              <FooterLink href="/voice-agent">AI Voice Calling</FooterLink>
              <FooterLink href="/whatsapp-automation">WhatsApp Automation</FooterLink>
              <FooterLink href="/email-solution">Email Automation</FooterLink>
              <FooterLink href="/pricing">View All Plans</FooterLink>
            </ul>
          </div>

          {/* Industries */}
          <div className="lg:col-span-2">
            <FooterHeading>Industries</FooterHeading>
            <ul className="space-y-2.5">
              {industryPages.map((industry) => (
                <FooterLink key={industry.slug} href={`/industries/${industry.slug}`}>
                  {industry.shortName}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Resources — NEW */}
          <div className="lg:col-span-2">
            <FooterHeading>Resources</FooterHeading>
            <ul className="space-y-2.5">
              <FooterLink href="/blog">Blog & Insights</FooterLink>
              <FooterLink href="/linktree">Quick Links</FooterLink>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <FooterHeading>Company</FooterHeading>
            <ul className="space-y-2.5">
              <FooterLink href="/about-us">About AskTalos</FooterLink>
              <FooterLink href="/career">Careers</FooterLink>
              <FooterLink href="/contact-us">Contact & Support</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
            </ul>
            <div className="mt-8">
              <FooterHeading>Legal</FooterHeading>
              <ul className="space-y-2.5">
                <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
                <FooterLink href="/terms-and-conditions">Terms & Conditions</FooterLink>
                <FooterLink href="/cancellations-refunds">Cancellations & Refunds</FooterLink>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* ── Separator ──────────────────────────────────────────────── */}
      <div className="border-t border-white/10 mx-6 sm:mx-12 lg:mx-16" />

      {/* ── Contact + Location ─────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact */}
          <div>
            <FooterHeading>Contact</FooterHeading>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-white flex-shrink-0">
                  <g clipPath="url(#clip0_941_15626)">
                    <path d="M15.1875 19.4688C14.3438 19.4688 13.375 19.25 12.3125 18.8438C10.1875 18 7.84377 16.375 5.75002 14.2813C3.65627 12.1875 2.03127 9.84377 1.18752 7.68752C0.250019 5.37502 0.343769 3.46877 1.43752 2.40627C1.46877 2.37502 1.53127 2.34377 1.56252 2.31252L4.18752 0.750025C4.84377 0.375025 5.68752 0.562525 6.12502 1.18752L7.96877 3.93753C8.40627 4.59378 8.21877 5.46877 7.59377 5.90627L6.46877 6.68752C7.28127 8.00002 9.59377 11.2188 13.2813 13.5313L13.9688 12.5313C14.5 11.7813 15.3438 11.5625 16.0313 12.0313L18.7813 13.875C19.4063 14.3125 19.5938 15.1563 19.2188 15.8125L17.6563 18.4375C17.625 18.5 17.5938 18.5313 17.5625 18.5625C17 19.1563 16.1875 19.4688 15.1875 19.4688ZM2.37502 3.46878C1.78127 4.12503 1.81252 5.46877 2.50002 7.18752C3.28127 9.15627 4.78127 11.3125 6.75002 13.2813C8.68752 15.2188 10.875 16.7188 12.8125 17.5C14.5 18.1875 15.8438 18.2188 16.5313 17.625L18.0313 15.0625C18.0313 15.0313 18.0313 15.0313 18.0313 15L15.2813 13.1563C15.2813 13.1563 15.2188 13.1875 15.1563 13.2813L14.4688 14.2813C14.0313 14.9063 13.1875 15.0938 12.5625 14.6875C8.62502 12.25 6.18752 8.84377 5.31252 7.46877C4.90627 6.81252 5.06252 5.96878 5.68752 5.53128L6.81252 4.75002V4.71878L4.96877 1.96877C4.96877 1.93752 4.93752 1.93752 4.90627 1.96877L2.37502 3.46878Z" fill="currentColor" />
                  </g>
                </svg>
                <a href="tel:+918484882401" className="text-sm text-white/70 hover:text-white transition-colors">
                  (+91) 84848 82401
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg width="18" height="14" viewBox="0 0 20 16" fill="none" className="text-white flex-shrink-0">
                  <path d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 4L10 9L2 4V2L10 7L18 2V4Z" fill="currentColor" />
                </svg>
                <a href="mailto:support@asktalos.com" className="text-sm text-white/70 hover:text-white transition-colors">
                  support@asktalos.com
                </a>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="lg:col-span-2">
            <FooterHeading>Offices</FooterHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-white/60 leading-relaxed">
              <p><span className="font-semibold text-white/90">Headquarter — Leeds:</span><br />146, West Point, Wellington Street, Leeds (UK) LS14JL</p>
              <p><span className="font-semibold text-white/90">Mumbai:</span><br />108, 1st Floor, Postmaster, Bandra West, Mumbai 400050</p>
              <p><span className="font-semibold text-white/90">Bengaluru:</span><br />Cessna Business Park, Sarjapur Marathahalli, Bengaluru 560103</p>
              <p><span className="font-semibold text-white/90">Pune:</span><br />2nd floor, Patil Plaza, 239, Pune, Maharashtra 411009</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Compliance + Bottom Bar ────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Compliance badges */}
          <div className="flex items-center gap-5 flex-wrap justify-center sm:justify-start">
            <span className="text-[11px] uppercase tracking-widest text-white/30 mr-1">Certified</span>
            <img src={soc2Img} alt="SOC 2" className="h-14 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy" />
            <img src={hipaaImg} alt="HIPAA" className="h-14 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" loading="lazy" />
            <img src={gdprImg} alt="GDPR" className="h-14 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy" />
          </div>
          {/* Copyright */}
          <p className="text-xs text-white/40 text-center">
            © 2026 AskTalos. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}
