/**
 * device-info.ts — Flutter `device_info_plus` package equivalent for React
 * Mirrors: WebBrowserInfo, DeviceInfoPlugin, platform detection
 */

// ─── Types ────────────────────────────────────────────────────────────────────
export type PlatformType = "windows" | "macos" | "linux" | "android" | "ios" | "chromeos" | "unknown";
export type BrowserType = "chrome" | "firefox" | "safari" | "edge" | "opera" | "brave" | "unknown";
export type DeviceType = "mobile" | "tablet" | "desktop";

export interface WebBrowserInfo {
  browserName: BrowserType;
  appCodeName: string;
  appName: string;
  appVersion: string;
  deviceMemory: number | null;
  language: string;
  languages: string[];
  platform: PlatformType;
  product: string;
  productSub: string;
  userAgent: string;
  vendor: string;
  devicePixelRatio: number;
  hardwareConcurrency: number;
  maxTouchPoints: number;
  isOnline: boolean;
  cookiesEnabled: boolean;
  screenWidth: number;
  screenHeight: number;
  windowWidth: number;
  windowHeight: number;
  colorDepth: number;
  deviceType: DeviceType;
  isStandalone: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

// ─── DeviceInfoPlugin ─────────────────────────────────────────────────────────
export class DeviceInfoPlugin {
  static async webBrowserInfo(): Promise<WebBrowserInfo> {
    const ua = navigator.userAgent;
    const vendor = navigator.vendor ?? "";

    const browserName = (() => {
      if (/brave/i.test(ua) || (navigator as any).brave) return "brave";
      if (/edg/i.test(ua)) return "edge";
      if (/opr|opera/i.test(ua)) return "opera";
      if (/firefox/i.test(ua)) return "firefox";
      if (/safari/i.test(ua) && !/chrome/i.test(ua)) return "safari";
      if (/chrome/i.test(ua)) return "chrome";
      return "unknown";
    })() as BrowserType;

    const platform = (() => {
      const p = navigator.platform.toLowerCase();
      if (/android/i.test(ua)) return "android";
      if (/iphone|ipad|ipod/i.test(ua)) return "ios";
      if (/win/i.test(p)) return "windows";
      if (/mac/i.test(p)) return "macos";
      if (/linux/i.test(p)) return "linux";
      if (/cros/i.test(ua)) return "chromeos";
      return "unknown";
    })() as PlatformType;

    const isMobile = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua);
    const isTablet = /ipad|android(?!.*mobile)/i.test(ua) || (window.innerWidth >= 600 && window.innerWidth <= 1024);
    const isDesktop = !isMobile && !isTablet;

    const deviceType: DeviceType = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";

    return {
      browserName,
      appCodeName: navigator.appCodeName,
      appName: navigator.appName,
      appVersion: navigator.appVersion,
      deviceMemory: (navigator as any).deviceMemory ?? null,
      language: navigator.language,
      languages: Array.from(navigator.languages),
      platform,
      product: navigator.product,
      productSub: (navigator as any).productSub ?? "",
      userAgent: ua,
      vendor,
      devicePixelRatio: window.devicePixelRatio,
      hardwareConcurrency: navigator.hardwareConcurrency,
      maxTouchPoints: navigator.maxTouchPoints,
      isOnline: navigator.onLine,
      cookiesEnabled: navigator.cookieEnabled,
      screenWidth: screen.width,
      screenHeight: screen.height,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      colorDepth: screen.colorDepth,
      deviceType,
      isStandalone: (window.matchMedia("(display-mode: standalone)").matches),
      isMobile,
      isTablet,
      isDesktop,
    };
  }

  static getPlatform(): PlatformType {
    const ua = navigator.userAgent;
    const p = navigator.platform.toLowerCase();
    if (/android/i.test(ua)) return "android";
    if (/iphone|ipad|ipod/i.test(ua)) return "ios";
    if (/win/i.test(p)) return "windows";
    if (/mac/i.test(p)) return "macos";
    if (/linux/i.test(p)) return "linux";
    if (/cros/i.test(ua)) return "chromeos";
    return "unknown";
  }

  static isAndroid(): boolean { return DeviceInfoPlugin.getPlatform() === "android"; }
  static isIOS(): boolean { return DeviceInfoPlugin.getPlatform() === "ios"; }
  static isWindows(): boolean { return DeviceInfoPlugin.getPlatform() === "windows"; }
  static isMacOS(): boolean { return DeviceInfoPlugin.getPlatform() === "macos"; }
  static isLinux(): boolean { return DeviceInfoPlugin.getPlatform() === "linux"; }
  static isWeb(): boolean { return typeof window !== "undefined"; }
  static isDarkMode(): boolean { return window.matchMedia("(prefers-color-scheme: dark)").matches; }
  static prefersReducedMotion(): boolean { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
}

// ─── useDeviceInfo hook ───────────────────────────────────────────────────────
import { useState, useEffect } from "react";

export function useDeviceInfo(): { info: WebBrowserInfo | null; isLoading: boolean } {
  const [info, setInfo] = useState<WebBrowserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    DeviceInfoPlugin.webBrowserInfo().then((i) => {
      setInfo(i);
      setIsLoading(false);
    });
  }, []);

  return { info, isLoading };
}

// ─── Platform convenience ─────────────────────────────────────────────────────
export const Platform = {
  isAndroid: DeviceInfoPlugin.isAndroid(),
  isIOS: DeviceInfoPlugin.isIOS(),
  isWindows: DeviceInfoPlugin.isWindows(),
  isMacOS: DeviceInfoPlugin.isMacOS(),
  isLinux: DeviceInfoPlugin.isLinux(),
  isWeb: DeviceInfoPlugin.isWeb(),
  operatingSystem: DeviceInfoPlugin.getPlatform(),
};
