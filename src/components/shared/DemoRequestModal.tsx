import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import voiceAgentImage from '@/assets/agent-voice-new.webp';
import {
  submitPublicEnquiry,
  getUtmParameters,
  extractApiErrorMessage
} from '@/services/leads.service';
import { reportDemoConversion, reportDemoFormSubmitted } from '@/lib/analytics';
import { newConversionEventId, buildMetaEventContext, trackMetaConversion } from '@/lib/metaPixel';
import Input, { getCountryCallingCode } from 'react-phone-number-input/input';
import type { Country } from 'react-phone-number-input';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-number-input/style.css';

interface DemoRequestModalProps {
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
  showAutoPopup?: boolean;
  autoPopupDelay?: number;
  preventAutoPopup?: boolean;
  companyToken?: string; // Optional company token for activity tracking
  companyId?: number; // Optional company ID for demo request
}

interface DemoTimeSlot {
  start: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

const DemoRequestModal = ({
  isOpenExternal = false,
  onCloseExternal,
  showAutoPopup = false,
  autoPopupDelay = 10000,
  preventAutoPopup = false,
  companyToken,
  companyId
}: DemoRequestModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasAutoOpenedRef = useRef(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [country] = useState<Country>('IN');
  const [availableSlots, setAvailableSlots] = useState<DemoTimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    working_domain: '',
    dateTime: '',
    message: ''
  });
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    phone: '',
    dateTime: '',
    working_domain: '',
  });

  // Validation functions
  const validateEmail = (email: string): string => {
    if (!email) return '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePhone = (phone: string): string => {
    if (!phone) return '';
    const phoneDigits = phone.replace(/\D/g, '');

    if (phoneDigits.length < 10) {
      return 'Phone number must be 10 digits';
    }
    if (phoneDigits.length > 12) {
      return 'Phone number must be 10 digits';
    }

    return '';
  };

  // Format a Date as YYYY-MM-DD using local time (avoids UTC day-shift near midnight in IST)
  const toLocalDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Parse a YYYY-MM-DD string as local time (new Date(string) parses as UTC, which shifts the day)
  const parseLocalDateString = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  // Fetch available time slots when date is selected
  const fetchAvailableSlots = async (date: Date) => {
    const dateString = toLocalDateString(date); // Format: YYYY-MM-DD
    setLoadingSlots(true);
    try {
      const response = await fetch(`https://aiml-prod.ngrok.io/demo-request/available-slots/?date=${dateString}`);
      if (response.ok) {
        const data = await response.json();
        setAvailableSlots(data.available_slots || []);
      } else {
        console.error('[DemoRequestModal] Failed to fetch available slots');
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error('[DemoRequestModal] Error fetching available slots:', error);
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  // Calculate minimum date based on current time
  const getMinDate = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // If time is after 7:30 PM (19:30), start from tomorrow
    if (currentHour > 19 || (currentHour === 19 && currentMinute >= 30)) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0); // Set to start of day
      return tomorrow;
    }

    // Set to start of current day
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  // Auto-open the modal once the user has scrolled 30% of the page
  // (not on a timer). Fires only once per page load.
  useEffect(() => {
    if (!showAutoPopup || preventAutoPopup || hasAutoOpenedRef.current) return;

    const SCROLL_THRESHOLD = 0.3; // 30% of the scrollable page

    const handleScroll = () => {
      if (hasAutoOpenedRef.current) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      if (scrollTop / scrollable >= SCROLL_THRESHOLD) {
        hasAutoOpenedRef.current = true;
        setIsOpen(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Handle the case where the page is already scrolled past the threshold
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAutoPopup, preventAutoPopup]);

  // Sync with external open state
  useEffect(() => {
    if (isOpenExternal) {
      setIsOpen(true);
    }
  }, [isOpenExternal]);

  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
    setApiError('');
    setValidationErrors({ email: '', phone: '', dateTime: '', working_domain: '' });
    setSelectedDate('');
    setAvailableSlots([]);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      working_domain: '',
      dateTime: '',
      message: ''
    });
    if (onCloseExternal) {
      onCloseExternal();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const dateTimeError = !formData.dateTime ? 'Please select a preferred time slot' : '';
    const workingDomainError = !formData.working_domain.trim() ? 'Industry is required' : '';

    setValidationErrors({
      email: emailError,
      phone: phoneError,
      dateTime: dateTimeError,
      working_domain: workingDomainError,
    });

    // Don't submit if there are validation errors
    if (emailError || phoneError || dateTimeError || workingDomainError) {
      return;
    }

    setLoading(true);
    setApiError('');

    // Split name into first and last name
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Get UTM parameters from URL
    const utmParams = getUtmParameters();

    // Mint the Meta dedup key up front: the CRM stores it with the lead so a
    // server-side Conversions API event can reuse the same id, and the browser
    // event below sends it as eventID.
    const metaEventId = newConversionEventId();

    const payload = {
      email: formData.email,
      phone_number: formData.phone,
      first_name: firstName,
      last_name: lastName,
      domain: 'asktalos.com',
      product: '',
      city: '',
      company_name: formData.company,
      // The "Industry" field is sent under both keys: `industry` is what the CRM
      // reads, `working_domain` is kept for the existing lead records/mapping.
      working_domain: formData.working_domain.trim(),
      industry: formData.working_domain.trim(),
      date_and_time: formData.dateTime,
      meeting_date_and_time: formData.dateTime,
      source_campaign: utmParams?.utm_campaign,
      lead_source: 'website',
      notes: formData.message,
      utm_campaign: utmParams.utm_campaign,
      utm_medium: utmParams.utm_medium,
      utm_source: utmParams.utm_source,
      utm_term: utmParams.utm_term,
      utm_content: utmParams.utm_content,
      utm_url: utmParams.utm_url,
      ...buildMetaEventContext(metaEventId),
    };

    try {
      // Await the essential enquiry so we only claim success once the lead is
      // actually saved on the server. This must NOT be fire-and-forget — if the
      // user closed the page, an un-awaited request could be dropped and the
      // lead lost.
      console.log('[DemoRequestModal] 📤 Submitting public enquiry:', payload);
      const response = await submitPublicEnquiry(payload);

      if (!response.success) {
        setApiError(response.message || 'Failed to submit request. Please try again.');
        return;
      }

      console.log('[DemoRequestModal] ✅ Public enquiry submitted successfully');

      // Analytics — fired only on a successful demo form submission
      reportDemoFormSubmitted({ company: formData.company, industry: formData.working_domain });
      reportDemoConversion();
      trackMetaConversion({
        eventId: metaEventId,
        contentName: 'Demo Request Form',
        identity: { email: formData.email, phone: formData.phone, firstName, lastName },
      });

      // Update URL for conversion tracking
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('lead_status', 'demo-confirmed');
      window.history.pushState({}, '', currentUrl.toString());

      // Now that the lead is confirmed saved, show success.
      setIsSubmitted(true);


      // Auto-close after the success screen has shown.
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (err: unknown) {
      console.error('[DemoRequestModal] ❌ Error submitting demo request:', err);
      setApiError(extractApiErrorMessage(err, 'An unexpected error occurred. Please try again later.'));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear API error when user starts typing
    if (apiError) setApiError('');

    // Perform field-level validation for email
    if (name === 'email') {
      const emailError = validateEmail(value);
      setValidationErrors((prev) => ({
        ...prev,
        email: emailError,
      }));
    }

    // Clear working_domain error when user types
    if (name === 'working_domain') {
      setValidationErrors((prev) => ({
        ...prev,
        working_domain: '',
      }));
    }
  };

  const handlePhoneChange = (value: string | undefined) => {
    setFormData((prev) => ({
      ...prev,
      phone: value || '',
    }));

    // Clear API error when user starts typing
    if (apiError) setApiError('');

    // Perform field-level validation
    const phoneError = validatePhone(value || '');
    setValidationErrors((prev) => ({
      ...prev,
      phone: phoneError,
    }));
  };

  if (!isOpen) return null;

  const labelClassName = 'mb-1 block text-[12px] font-medium text-slate-700';
  const inputClassName = 'h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100';
  const textareaClassName = 'min-h-[72px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100 resize-none';
  const availableTimeSlots = availableSlots.filter((slot) => slot.is_available);

  return createPortal(
    <>
      <style>{`
        .react-datepicker-popper {
          z-index: 100000 !important;
        }
        .react-datepicker {
          font-family: inherit;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          box-shadow: 0 24px 70px rgba(15, 23, 42, 0.15);
          overflow: hidden;
        }
        .react-datepicker__header {
          background: linear-gradient(180deg, #fff7ed 0%, #ffffff 100%);
          border-bottom: 1px solid #e2e8f0;
          padding-top: 0.75rem;
        }
        .react-datepicker__current-month {
          font-weight: 700;
          color: #0f172a;
          font-size: 0.875rem;
        }
        .react-datepicker__day-name,
        .react-datepicker__day {
          font-size: 0.8125rem;
          width: 2rem;
          line-height: 2rem;
        }
        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected {
          background-color: #f97316 !important;
          color: #ffffff !important;
        }
        .react-datepicker__day:hover {
          background-color: #ffedd5;
        }
        @media (max-width: 640px) {
          .react-datepicker__day-name,
          .react-datepicker__day {
            width: 1.8rem;
            line-height: 1.8rem;
          }
        }
      `}</style>

      <div className="fixed inset-0 z-[99999] overflow-hidden overscroll-contain px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-8">
        <div
          className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
          onClick={handleClose}
        />

        <div className="relative flex min-h-full items-start justify-center sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-request-modal-title"
            className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-[920px] flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] sm:rounded-[28px] lg:max-h-[min(90dvh,760px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md transition hover:border-slate-300 hover:text-slate-900 sm:right-4 sm:top-4"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex min-h-0 flex-1 flex-col bg-white">
              {isSubmitted ? (
                <div className="flex flex-1 items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),_transparent_40%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] px-5 py-8 text-center sm:px-8">
                  <div className="w-full max-w-md rounded-[24px] border border-green-100 bg-white px-7 py-8 shadow-[0_20px_60px_rgba(34,197,94,0.12)] sm:px-8 sm:py-10">
                    <div className="mx-auto inline-flex rounded-full bg-green-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-green-700">
                      Request received
                    </div>
                    <div className="mx-auto mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 sm:text-[2rem]">
                      Thanks, your demo request is in.
                    </h2>
                    <p className="mt-3 text-base leading-7 text-slate-600">
                      Our team will review your request and get back to you shortly with the next steps.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[330px_minmax(0,1fr)]">
                  <aside className="hidden border-r border-slate-200/80 bg-[linear-gradient(180deg,_#fff8f1_0%,_#fff1e6_100%)] lg:flex lg:min-h-0 lg:flex-col lg:justify-between lg:p-6">
                    <div>
                      <h3 className="text-[1.65rem] font-semibold leading-tight tracking-tight text-slate-900">
                        See AskTalos voice automation in action.
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        A quick walkthrough tailored to your workflow and call-handling needs.
                      </p>
                    </div>

                    <div className="mt-6 flex flex-1 items-center justify-center rounded-[24px] p-2">
                      <img
                        src={voiceAgentImage}
                        alt="AskTalos voice agent preview"
                        className="max-h-[360px] w-full object-contain mix-blend-multiply"
                        loading="lazy"
                        style={{
                          WebkitMaskImage: "radial-gradient(ellipse 78% 88% at center, black 56%, transparent 92%)",
                          maskImage: "radial-gradient(ellipse 78% 88% at center, black 56%, transparent 92%)",
                        }}
                      />
                    </div>

                    <div className="mt-5 px-1 text-sm font-medium text-slate-600">
                      30-minute tailored walkthrough
                    </div>
                  </aside>

                  <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
                    <div className="border-b border-slate-200/80 bg-white px-5 py-4 sm:px-6 lg:px-7 lg:py-5">
                      <h2 id="demo-request-modal-title" className="max-w-[28rem] text-[1.55rem] font-semibold leading-tight tracking-tight text-slate-900 sm:text-[1.8rem]">
                        Book an AskTalos demo
                      </h2>
                      <p className="mt-2 max-w-[30rem] text-sm leading-6 text-slate-600">
                        Choose a slot and tell us what you want to see.
                      </p>
                    </div>

                    <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6 sm:py-4 lg:px-7 lg:py-5">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className={labelClassName}>
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className={inputClassName}
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className={labelClassName}>
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={`${inputClassName} ${validationErrors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                            placeholder="john@company.com"
                          />
                          {validationErrors.email && (
                            <p className="mt-1.5 text-xs text-red-600">
                              {validationErrors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="phone" className={labelClassName}>
                            Phone Number *
                          </label>
                          <div className="grid grid-cols-[78px_minmax(0,1fr)] gap-2">
                            <div className="flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 px-3 text-sm font-semibold text-slate-700 shadow-sm">
                              +{getCountryCallingCode(country)}
                            </div>
                            <Input
                              international
                              country={country}
                              value={formData.phone}
                              onChange={handlePhoneChange}
                              required
                              className={`${inputClassName} flex-1 ${validationErrors.phone ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                              placeholder="Enter phone number"
                            />
                          </div>
                          {validationErrors.phone && (
                            <p className="mt-1.5 text-xs text-red-600">
                              {validationErrors.phone}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="working_domain" className={labelClassName}>
                            Industry *
                          </label>
                          <input
                            type="text"
                            id="working_domain"
                            name="working_domain"
                            required
                            value={formData.working_domain}
                            onChange={handleChange}
                            className={`${inputClassName} ${validationErrors.working_domain ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                            placeholder="e.g. Healthcare"
                          />
                          {validationErrors.working_domain && (
                            <p className="mt-1.5 text-xs text-red-600">
                              {validationErrors.working_domain}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="company" className={labelClassName}>
                            Company Name
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className={inputClassName}
                            placeholder="Your Company"
                          />
                        </div>

                        <div>
                          <label className={labelClassName}>
                            Preferred Date *
                          </label>
                          <DatePicker
                            selected={selectedDate ? parseLocalDateString(selectedDate) : null}
                            onChange={(date: Date | null) => {
                              if (date) {
                                const dateString = toLocalDateString(date);
                                setSelectedDate(dateString);
                                fetchAvailableSlots(date);
                                setFormData(prev => ({ ...prev, dateTime: '' }));
                              } else {
                                setSelectedDate('');
                                setAvailableSlots([]);
                                setFormData(prev => ({ ...prev, dateTime: '' }));
                              }
                            }}
                            dateFormat="MMM d, yyyy"
                            minDate={getMinDate()}
                            placeholderText="Select a date"
                            required
                            className={inputClassName}
                            calendarClassName="shadow-lg"
                            wrapperClassName="w-full"
                            popperClassName="z-[100000]"
                            popperPlacement="bottom-start"
                          />
                        </div>

                        <div>
                          <label className={labelClassName}>
                            Preferred Time *
                          </label>
                          {loadingSlots ? (
                            <div className="flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-500 shadow-sm">
                              Loading available slots...
                            </div>
                          ) : selectedDate && availableTimeSlots.length > 0 ? (
                            <select
                              value={formData.dateTime}
                              onChange={(e) => {
                                setFormData(prev => ({ ...prev, dateTime: e.target.value }));
                                if (validationErrors.dateTime) {
                                  setValidationErrors(prev => ({ ...prev, dateTime: '' }));
                                }
                                if (apiError) setApiError('');
                              }}
                              required
                              className={`${inputClassName} bg-white ${validationErrors.dateTime ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                            >
                              <option value="">Select a time</option>
                              {availableTimeSlots.map((slot, index) => (
                                <option key={index} value={slot.start}>
                                  {slot.start_time} - {slot.end_time}
                                </option>
                              ))}
                            </select>
                          ) : selectedDate ? (
                            <div className="flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-500 shadow-sm">
                              No slots available for this day
                            </div>
                          ) : (
                            <div className="flex h-10 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50/80 px-4 text-sm text-slate-400 shadow-sm">
                              Select a date first
                            </div>
                          )}
                          {validationErrors.dateTime && (
                            <p className="mt-1.5 text-xs text-red-600">
                              {validationErrors.dateTime}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="message" className={labelClassName}>
                            Message <span className="font-normal text-slate-400">(optional)</span>
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message ?? ''}
                            onChange={handleChange}
                            rows={2}
                            className={textareaClassName}
                            placeholder="What should we focus on in the demo?"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-200/80 bg-white px-5 py-3 sm:px-6 lg:px-7">
                      {apiError && (
                        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                          <p className="text-sm text-red-700">{apiError}</p>
                        </div>
                      )}

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="max-w-[24rem] text-xs leading-5 text-slate-500 sm:text-sm">
                          We will use these details only to schedule and personalize your demo.
                        </p>
                        <button
                          type="submit"
                          disabled={loading}
                          className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:from-orange-600 hover:to-amber-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[170px]"
                        >
                          {loading ? 'Submitting...' : 'Book My Demo'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default DemoRequestModal;
