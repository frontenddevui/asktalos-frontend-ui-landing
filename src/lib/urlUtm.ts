// Shared helper for appending the current UTM parameters onto outbound links,
// so attribution survives the hop from this site to ai.asktalos.com.
import { getUtmParameters } from '@/services/leads.service';

/**
 * Append the visitor's captured UTM parameters (utm_source, utm_medium,
 * utm_campaign, utm_term, utm_content, utm_url) onto a URL as query params.
 * Returns the URL unchanged if no UTM parameters were ever captured.
 */
export const withUtmParams = (url: string): string => {
  const utm = getUtmParameters();
  const query = new URLSearchParams();

  if (utm.utm_source) query.set('utm_source', utm.utm_source);
  if (utm.utm_medium) query.set('utm_medium', utm.utm_medium);
  if (utm.utm_campaign) query.set('utm_campaign', utm.utm_campaign);
  if (utm.utm_term) query.set('utm_term', utm.utm_term);
  if (utm.utm_content) query.set('utm_content', utm.utm_content);
  if (utm.utm_url) query.set('utm_url', utm.utm_url);

  const queryString = query.toString();
  if (!queryString) return url;

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${queryString}`;
};
