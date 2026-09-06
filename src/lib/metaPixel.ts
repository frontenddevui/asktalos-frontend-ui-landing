// Meta (Facebook) Pixel helpers.
// fbevents.js is loaded globally in index.html and initialised with pixel 1346019117493265.
//
// The point of this module is that a conversion is only reported once the CRM has
// confirmed the lead was actually saved — never on button click. Meta's
// automatic-event detection guesses conversions from clicks, which counts
// abandoned and failed submissions; those events show as "Automatically logged"
// in Events Manager and inflate the numbers ad spend is optimised against.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Meta pixel dataset for the AskTalos website. */
export const META_PIXEL_ID = '1346019117493265';

/** The standard event our lead campaigns are configured against. */
export const META_CONVERSION_EVENT = 'SubmitApplication';

/** Read a browser cookie by name; null when absent. */
export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

export interface MetaIdentifiers {
  /** Meta click id — only set when the visitor arrived via an ad click. */
  fbc: string | null;
  /** Meta browser id — set by the pixel on every visit. */
  fbp: string | null;
}

/**
 * Read the _fbc / _fbp cookies the pixel maintains. These are what let Meta
 * attribute a server-side Conversions API event back to the same person, so
 * they must be forwarded to whichever server sends the CAPI event.
 */
export const getMetaIdentifiers = (): MetaIdentifiers => ({
  fbc: getCookie('_fbc'),
  fbp: getCookie('_fbp'),
});

/**
 * Mint an event id for one submission.
 *
 * The SAME id must be used by the browser event and by the server-side
 * Conversions API event for that lead — that is the only reliable way Meta can
 * tell they are one conversion rather than two. So it is generated here, sent
 * to the CRM alongside the lead, and reused by the server.
 */
export const newConversionEventId = (): string => {
  const random =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2, 12);
  return `submitapp_${Date.now()}_${random}`;
};

export interface VisitorIdentity {
  email?: string;
  /** Any format; normalised to digits here. Include the country code. */
  phone?: string;
  firstName?: string;
  lastName?: string;
}

// Advanced Matching normalisation, per Meta's required formats. Browser-side
// Advanced Matching takes PLAIN values — fbevents.js does the SHA-256 hashing
// itself. (This is the opposite of the Conversions API, where the server must
// hash before sending.)
const normaliseEmail = (value: string) => value.trim().toLowerCase();
const normalisePhone = (value: string) => value.replace(/\D/g, '');
const normaliseName = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\s'-]/gu, '');

/**
 * Attach Advanced Matching data to the pixel.
 *
 * Re-calling fbq('init') with the same pixel id updates the matching
 * parameters used by subsequent events — which is why this runs at submit
 * time rather than on page load. At page load we have no idea who the visitor
 * is, so there is nothing to match on; only a completed form tells us.
 *
 * Blank fields are dropped rather than sent empty, which would only weaken the
 * match quality score.
 */
export const setAdvancedMatching = (identity: VisitorIdentity): void => {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;

  const matchData: Record<string, string> = {};
  const email = identity.email ? normaliseEmail(identity.email) : '';
  const phone = identity.phone ? normalisePhone(identity.phone) : '';
  const firstName = identity.firstName ? normaliseName(identity.firstName) : '';
  const lastName = identity.lastName ? normaliseName(identity.lastName) : '';

  if (email) matchData.em = email;
  if (phone) matchData.ph = phone;
  if (firstName) matchData.fn = firstName;
  if (lastName) matchData.ln = lastName;

  if (Object.keys(matchData).length === 0) return;

  window.fbq('init', META_PIXEL_ID, matchData);
  // Log which fields were matched, never the values themselves.
  console.log('[Meta Pixel] Advanced Matching set →', Object.keys(matchData).join(', '));
};

export interface ConversionEventFields {
  /** Shared browser/server dedup key — from newConversionEventId(). */
  eventId: string;
  /** Which form converted, e.g. "Demo Request Form". Shows up in Meta reporting. */
  contentName: string;
  /** Form values used for Advanced Matching. Omit to skip matching. */
  identity?: VisitorIdentity;
}

/**
 * Report a CONFIRMED conversion to the Meta pixel.
 *
 * Call this only after the lead API has answered success — a lead that was
 * never saved is not a conversion. Returns true when the event was handed to
 * fbq, false when the pixel is unavailable (ad-blocker, or fbevents.js
 * blocked); a missing pixel is logged and never allowed to break the form.
 */
export const trackMetaConversion = ({
  eventId,
  contentName,
  identity,
}: ConversionEventFields): boolean => {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
    console.warn(
      `[Meta Pixel] fbq unavailable — ${META_CONVERSION_EVENT} event NOT sent`,
      { eventId, contentName }
    );
    return false;
  }

  if (identity) setAdvancedMatching(identity);

  // Logged either side of the fbq call so that if the call itself throws, the
  // "about to send" line is still in the console and the failure is obvious.
  console.log(`[Meta Pixel] → sending ${META_CONVERSION_EVENT}`, {
    eventID: eventId,
    content_name: contentName,
  });

  window.fbq(
    'track',
    META_CONVERSION_EVENT,
    { content_name: contentName },
    // eventID (capital ID) is Meta's browser-side dedup key and must match the
    // event_id the server sends for this same lead.
    { eventID: eventId }
  );

  console.log(`[Meta Pixel] ✅ ${META_CONVERSION_EVENT} event sent`, {
    eventID: eventId,
    content_name: contentName,
    ...getMetaIdentifiers(),
  });
  return true;
};

export interface MetaEventContext {
  event_id: string;
  fbc?: string;
  fbp?: string;
  event_source_url: string;
}

/**
 * Build the Meta fields to send to the CRM with a lead, so the server can later
 * fire the matching Conversions API event.
 *
 * Empty cookies are omitted rather than sent as '' — Meta rejects blank fbc/fbp
 * values, and a visitor who never clicked an ad simply has no _fbc.
 */
export const buildMetaEventContext = (eventId: string): MetaEventContext => {
  const { fbc, fbp } = getMetaIdentifiers();
  return {
    event_id: eventId,
    ...(fbc ? { fbc } : {}),
    ...(fbp ? { fbp } : {}),
    event_source_url: typeof window !== 'undefined' ? window.location.href : 'https://asktalos.com',
  };
};
