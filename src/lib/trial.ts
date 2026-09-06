// Shared "Start Free Trial" flow used by the pricing page and the home page
// CTAs, so every trial entry point behaves identically.
import { withUtmParams } from "./urlUtm";

const SIGNUP_URL = "https://ai.asktalos.com/signup";

// Encode a payload into an opaque, URL-safe base64url token so the flag is not
// human-readable in the address bar. A timestamp is included so the token
// varies each time (looks like a random referral code). The signup app decodes
// this with atob() + JSON.parse() and reads `is_trial`.
const encodePayload = (data: Record<string, unknown>) =>
  btoa(JSON.stringify(data)).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");

/**
 * Start the free-trial signup flow.
 * Mirrors the pricing page's trial CTA: marks the signup as a trial (via
 * localStorage for same-origin use and an obscured token so the signup app at
 * ai.asktalos.com can decode `is_trial: true`), then opens the signup page.
 *
 * @param src - where the trial was started from (for attribution), e.g. "home_hero"
 */
export const startFreeTrial = (src = "trial") => {
  try {
    localStorage.setItem("is_trial", "true");
  } catch {
    /* ignore storage errors (e.g. private mode) */
  }
  const token = encodePayload({ is_trial: true, src, ts: Date.now() });
  window.open(withUtmParams(`${SIGNUP_URL}?ref=${token}`), "_blank");
};
