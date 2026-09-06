import axios from 'axios';

const API_BASE_URL = 'https://aiml-prod.ngrok.io';
const COMPANY_ID = '432'; // nevis_software_solutions

export interface PublicEnquiryData {
  email: string;
  phone_number: string;
  first_name: string;
  last_name?: string;
  domain: string;
  product: string;
  city: string;
  company_name?: string;
  working_domain?: string;
  // The industry the lead works in, as typed in the demo form's "Industry" field.
  // Sent alongside working_domain, which the CRM keeps for backward compatibility.
  industry?: string;
  date_and_time?: string;
  meeting_date_and_time?: string;
  lead_source?: string;
  notes?: string;
  source_campaign?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_url?: string;
  // Meta (Facebook) attribution fields. The CRM stores these with the lead so a
  // server-side Conversions API event can be sent for the SAME conversion:
  // event_id is the dedup key shared with the browser event, and fbc/fbp are the
  // pixel cookies Meta needs to match the event to a person.
  event_id?: string;
  fbc?: string;
  fbp?: string;
  event_source_url?: string;
}

export interface PublicEnquiryResponse {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Flatten a field-error map into a single readable message.
 * e.g. { phone_number: ["phone number is not valid"] } -> "phone number is not valid"
 * Returns null when there is nothing usable to show.
 */
const flattenFieldErrors = (value: unknown): string | null => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;

  const messages: string[] = [];
  for (const fieldValue of Object.values(value)) {
    if (fieldValue == null) continue;
    const text = Array.isArray(fieldValue)
      ? fieldValue.filter(Boolean).map(String).join(' ')
      : String(fieldValue);
    if (text && text !== '[object Object]') {
      messages.push(text);
    }
  }

  return messages.length ? messages.join(' ') : null;
};

/**
 * Extract a human-readable error message from an API error response.
 * Handles the many shapes a backend/DRF error can take:
 *  - plain string
 *  - { message } / { error } / { detail }
 *  - { non_field_errors: [...] }
 *  - field-level errors, e.g. { email: ["already exists"], phone_number: [...] }
 *  - axios/fetch network errors (falls back to error.message)
 */
export const extractApiErrorMessage = (
  error: any,
  fallback = 'Something went wrong. Please try again.'
): string => {
  // axios puts the response body on error.response.data; fetch flows pass the body directly
  const data = error?.response?.data ?? error?.data ?? error;

  if (!data) return error?.message || fallback;
  if (typeof data === 'string') return data;

  // Nested field errors, e.g. { error: "Validation failed", details: { phone_number: ["..."] } }.
  // Checked before the generic single-message keys so the specific field message wins over
  // the generic wrapper ("Validation failed").
  const nested = flattenFieldErrors(data.details) || flattenFieldErrors(data.errors);
  if (nested) return nested;

  // Common single-message keys
  if (typeof data.message === 'string' && data.message) return data.message;
  if (typeof data.error === 'string' && data.error) return data.error;
  if (typeof data.detail === 'string' && data.detail) return data.detail;

  // DRF non_field_errors
  if (Array.isArray(data.non_field_errors) && data.non_field_errors.length) {
    return String(data.non_field_errors[0]);
  }

  // Field-level errors: { email: ["msg"], phone_number: "msg", ... }
  const { success: _success, ...fields } = data;
  const fieldErrors = flattenFieldErrors(fields);
  if (fieldErrors) return fieldErrors;

  return error?.message || fallback;
};

/**
 * Submit a public enquiry to the leads API
 * @param data - The enquiry data to submit
 * @returns Promise with the API response
 */
export const submitPublicEnquiry = async (
  data: PublicEnquiryData
): Promise<PublicEnquiryResponse> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/leads/public-enquiry/${COMPANY_ID}/`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'X-company-token': '26e79b36dd6b6cdc962e96e6b4c4ef6e02f9fc3a',
        },
      }
    );

    return {
      success: true,
      message: 'Enquiry submitted successfully',
      data: response.data,
    };
  } catch (error: any) {
    console.error('Error submitting public enquiry:', error);

    return {
      success: false,
      message: extractApiErrorMessage(error, 'Failed to submit enquiry. Please try again.'),
      data: error.response?.data,
    };
  }
};

const UTM_STORAGE_KEY = 'asktalos_utm_params';
const UTM_EXPIRY_DAYS = 30; // UTM parameters expire after 30 days

interface StoredUtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_url?: string;
  timestamp: number;
}

type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_url?: string;
};

/**
 * Save UTM parameters to localStorage
 */
const saveUtmParameters = (params: UtmParams) => {
  const hasUtmParams =
    params.utm_source || params.utm_medium || params.utm_campaign || params.utm_term || params.utm_content;

  if (hasUtmParams) {
    const data: StoredUtmParams = {
      ...params,
      timestamp: Date.now(),
    };
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(data));
  }
};

/**
 * Get stored UTM parameters from localStorage
 */
const getStoredUtmParameters = (): UtmParams | null => {
  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    if (!stored) return null;

    const data: StoredUtmParams = JSON.parse(stored);

    // Check if UTM parameters have expired (30 days)
    const expiryTime = UTM_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    const isExpired = Date.now() - data.timestamp > expiryTime;

    if (isExpired) {
      localStorage.removeItem(UTM_STORAGE_KEY);
      return null;
    }

    return {
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      utm_term: data.utm_term,
      utm_content: data.utm_content,
      utm_url: data.utm_url,
    };
  } catch (error) {
    console.error('Error reading stored UTM parameters:', error);
    return null;
  }
};

/**
 * Get UTM parameters from URL, or from localStorage if not in URL.
 * Also captures the full URL the UTM params were seen on as `utm_url`.
 * Automatically saves new UTM parameters to localStorage when found in URL.
 */
export const getUtmParameters = (): UtmParams => {
  // First, check URL for UTM parameters
  const urlParams = new URLSearchParams(window.location.search);
  const urlUtmParams = {
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
    utm_term: urlParams.get('utm_term') || undefined,
    utm_content: urlParams.get('utm_content') || undefined,
  };

  // If URL has UTM parameters, save them (along with the URL they came from) and return
  const hasUrlUtmParams =
    urlUtmParams.utm_source ||
    urlUtmParams.utm_medium ||
    urlUtmParams.utm_campaign ||
    urlUtmParams.utm_term ||
    urlUtmParams.utm_content;

  if (hasUrlUtmParams) {
    const params: UtmParams = { ...urlUtmParams, utm_url: window.location.href };
    saveUtmParameters(params);
    return params;
  }

  // If no UTM in URL, try to get from localStorage
  const storedUtmParams = getStoredUtmParameters();
  if (storedUtmParams) {
    return storedUtmParams;
  }

  // No UTM parameters found anywhere; still report the current page URL
  return {
    utm_source: undefined,
    utm_medium: undefined,
    utm_campaign: undefined,
    utm_term: undefined,
    utm_content: undefined,
    utm_url: window.location.href,
  };
};

export interface SignupLeadData {
  email: string;
  phone_number: string;
  first_name: string;
  last_name?: string;
  company_name?: string;
}

/**
 * Submit signup lead data to the leads API
 * This should be called after successful user signup
 * @param data - The signup data to submit
 * @returns Promise with the API response
 */
export const submitSignupLead = async (
  data: SignupLeadData
): Promise<PublicEnquiryResponse> => {
  try {
    // Get UTM parameters from URL
    const utmParams = getUtmParameters();

    // Prepare API payload
    const payload = {
      email: data.email,
      phone_number: data.phone_number,
      first_name: data.first_name,
      last_name: data.last_name || '',
      domain: 'asktalos.com',
      product: '',
      city: '',
      company_name: data.company_name || '',
      source_campaign: utmParams.utm_campaign || 'organic',
      lead_source: 'website',
      notes: 'User Signup',
      utm_campaign: utmParams.utm_campaign,
      utm_medium: utmParams.utm_medium,
      utm_source: utmParams.utm_source,
      utm_term: utmParams.utm_term,
      utm_content: utmParams.utm_content,
      utm_url: utmParams.utm_url,
    };

    const response = await axios.post(
      `${API_BASE_URL}/leads/public-enquiry/${COMPANY_ID}/`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      }
    );

    return {
      success: true,
      message: 'Signup lead submitted successfully',
      data: response.data,
    };
  } catch (error: any) {
    console.error('Error submitting signup lead:', error);
    
    return {
      success: false,
      message: extractApiErrorMessage(error, 'Failed to submit signup lead.'),
      data: error.response?.data,
    };
  }
};
