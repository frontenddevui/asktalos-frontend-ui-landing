// Google Ads / GA4 tracking helpers.
// gtag.js is loaded globally in index.html (GA4 G-ZCN4ZBZMVC + Google Ads AW-17872775803).

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

// Google Ads "Request Demo — AI Voice" conversion action
const DEMO_CONVERSION_TARGET = 'AW-17872775803/DwBJCKDP4OIbEPvUs8pC';

/**
 * Fire the Google Ads "Request Demo" CONVERSION.
 * Call this ONLY on a real conversion (e.g. a demo request was successfully submitted)
 * — never on every click, or the conversion count and ad spend get corrupted.
 *
 * @param url Optional URL to navigate to after the conversion is recorded.
 */
export const reportDemoConversion = (url?: string): void => {
  const go = () => {
    if (url) window.location.href = url;
  };

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    console.log('[analytics] Google Ads conversion fired →', DEMO_CONVERSION_TARGET);
    window.gtag('event', 'conversion', {
      send_to: DEMO_CONVERSION_TARGET,
      event_callback: go,
    });
  } else {
    console.warn('[analytics] gtag not available — conversion NOT sent');
    // gtag unavailable (ad-blocker/SSR) — still honour navigation so UX isn't blocked
    go();
  }
};

/**
 * Push the "DemoFormSubmited" event to the GTM dataLayer when the Request a Free
 * Demo form is submitted. GTM's "DemoFormSubmited" Custom Event trigger catches it
 * and fires the configured conversion tag.
 */
export const reportDemoFormSubmitted = (details?: Record<string, unknown>): void => {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  console.log('[analytics] DemoFormSubmited pushed to dataLayer', details ?? {});
  window.dataLayer.push({
    event: 'DemoFormSubmited',
    form_name: 'request-a-free-demo',
    ...details,
  });
};

/**
 * Send a GA4 "click" event (NOT an Ads conversion). Safe to fire on any element.
 */
const trackClick = (params: {
  id: string;
  text?: string;
  href?: string;
  tag: string;
  page: string;
}): void => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    console.log('[analytics] click →', params.id, params);
    window.gtag('event', 'click', {
      element_id: params.id,
      element_text: params.text,
      element_href: params.href,
      element_tag: params.tag,
      page_path: params.page,
    });
  }
};

const slugify = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);

/**
 * Derive a stable tracking id for an element.
 * Priority: explicit data-track-id > id > aria-label > visible text > href > tag.
 */
const deriveId = (el: HTMLElement, tag: string, text: string, href?: string): string =>
  el.getAttribute('data-track-id') ||
  el.id ||
  el.getAttribute('aria-label') ||
  (text ? slugify(text) : '') ||
  href ||
  `${tag}-unknown`;

/**
 * Attach a single delegated listener that logs a GA4 click event for EVERY
 * button / link / role=button click across the app. Returns a cleanup fn.
 *
 * Each element is auto-assigned a tracking id (see deriveId); add a
 * `data-track-id="..."` attribute to any element to give it an explicit, stable id.
 */
export const initClickTracking = (): (() => void) => {
  if (typeof document === 'undefined') return () => {};

  const handler = (e: MouseEvent) => {
    const start = e.target as HTMLElement | null;
    const el = start?.closest?.('a, button, [role="button"]') as HTMLElement | null;
    if (!el) return;

    const tag = el.tagName.toLowerCase();
    const text = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 100);
    const href = el.getAttribute('href') || undefined;

    trackClick({
      id: deriveId(el, tag, text, href),
      text,
      href,
      tag,
      page: window.location.pathname,
    });
  };

  // Capture phase so we still record the click even if the handler stops propagation.
  document.addEventListener('click', handler, { capture: true });
  return () => document.removeEventListener('click', handler, { capture: true });
};
