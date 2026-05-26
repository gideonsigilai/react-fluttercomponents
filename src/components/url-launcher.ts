/**
 * url-launcher.ts — Flutter `url_launcher` package equivalent for React
 * Mirrors: launchUrl, canLaunchUrl, closeInAppWebView, LaunchMode
 */

// ─── LaunchMode ───────────────────────────────────────────────────────────────
export enum LaunchMode {
  platformDefault = "platformDefault",
  inAppBrowserView = "inAppBrowserView",
  externalApplication = "externalApplication",
  externalNonBrowserApplication = "externalNonBrowserApplication",
}

// ─── launchUrl ────────────────────────────────────────────────────────────────
export interface LaunchUrlOptions {
  mode?: LaunchMode;
  webViewConfiguration?: { enableJavaScript?: boolean; enableDomStorage?: boolean };
  webOnlyWindowName?: string;
}

export async function launchUrl(url: string, options: LaunchUrlOptions = {}): Promise<boolean> {
  try {
    const { mode = LaunchMode.platformDefault, webOnlyWindowName = "_blank" } = options;

    if (mode === LaunchMode.inAppBrowserView) {
      window.open(url, "_self");
    } else {
      window.open(url, webOnlyWindowName, "noopener,noreferrer");
    }
    return true;
  } catch {
    return false;
  }
}

// ─── canLaunchUrl ─────────────────────────────────────────────────────────────
export async function canLaunchUrl(url: string): Promise<boolean> {
  try {
    const u = new URL(url);
    return ["http:", "https:", "mailto:", "tel:", "sms:"].includes(u.protocol);
  } catch {
    return false;
  }
}

// ─── Scheme helpers ───────────────────────────────────────────────────────────
export function mailtoUri(
  address: string,
  options: {
    subject?: string;
    body?: string;
    cc?: string;
    bcc?: string;
  } = {}
): string {
  const params = new URLSearchParams();
  if (options.subject) params.append("subject", options.subject);
  if (options.body) params.append("body", options.body);
  if (options.cc) params.append("cc", options.cc);
  if (options.bcc) params.append("bcc", options.bcc);
  const query = params.toString();
  return `mailto:${address}${query ? "?" + query : ""}`;
}

export function telUri(phoneNumber: string): string {
  return `tel:${phoneNumber.replace(/\s/g, "")}`;
}

export function smsUri(phoneNumber: string, body?: string): string {
  return `sms:${phoneNumber}${body ? `?body=${encodeURIComponent(body)}` : ""}`;
}

export async function launchEmail(
  address: string,
  options: { subject?: string; body?: string } = {}
): Promise<boolean> {
  return launchUrl(mailtoUri(address, options));
}

export async function launchPhone(phoneNumber: string): Promise<boolean> {
  return launchUrl(telUri(phoneNumber));
}

export async function launchSms(phoneNumber: string, body?: string): Promise<boolean> {
  return launchUrl(smsUri(phoneNumber, body));
}

// ─── closeInAppWebView ────────────────────────────────────────────────────────
export function closeInAppWebView(): void {
  window.close();
}
