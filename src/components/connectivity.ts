/**
 * connectivity.ts — Flutter `connectivity_plus` package equivalent for React
 * Mirrors: Connectivity, ConnectivityResult, onConnectivityChanged
 */

// ─── ConnectivityResult ───────────────────────────────────────────────────────
export enum ConnectivityResult {
  wifi = "wifi",
  mobile = "mobile",
  ethernet = "ethernet",
  bluetooth = "bluetooth",
  vpn = "vpn",
  other = "other",
  none = "none",
}

// ─── Connectivity ─────────────────────────────────────────────────────────────
export class Connectivity {
  private static listeners = new Set<(result: ConnectivityResult) => void>();
  private static unlistenCallbacks: (() => void)[] = [];

  /**
   * Get current connectivity result.
   * Uses Navigator.connection API when available.
   */
  static async checkConnectivity(): Promise<ConnectivityResult> {
    if (!navigator.onLine) return ConnectivityResult.none;

    const conn = (navigator as any).connection;
    if (!conn) return ConnectivityResult.wifi; // assume wifi if API unavailable

    const type = conn.type as string;
    if (type === "wifi") return ConnectivityResult.wifi;
    if (type === "ethernet") return ConnectivityResult.ethernet;
    if (type === "bluetooth") return ConnectivityResult.bluetooth;
    if (type === "cellular" || type === "wimax") return ConnectivityResult.mobile;
    if (type === "vpn") return ConnectivityResult.vpn;
    if (type === "none" || !navigator.onLine) return ConnectivityResult.none;
    return ConnectivityResult.other;
  }

  /**
   * Subscribe to connectivity changes.
   * Returns an unsubscribe function.
   */
  static onConnectivityChanged(callback: (result: ConnectivityResult) => void): () => void {
    const onOnline = () => callback(ConnectivityResult.wifi);
    const onOffline = () => callback(ConnectivityResult.none);

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }

  static isOnline(): boolean {
    return navigator.onLine;
  }

  static isOffline(): boolean {
    return !navigator.onLine;
  }

  /** Get effective connection type */
  static getEffectiveType(): string {
    const conn = (navigator as any).connection;
    return conn?.effectiveType ?? "unknown";
  }

  /** Get estimated downlink bandwidth in Mbps */
  static getDownlink(): number {
    const conn = (navigator as any).connection;
    return conn?.downlink ?? -1;
  }

  /** Get round-trip time estimate */
  static getRtt(): number {
    const conn = (navigator as any).connection;
    return conn?.rtt ?? -1;
  }
}

// ─── useConnectivity React hook ───────────────────────────────────────────────
import { useState, useEffect } from "react";

export function useConnectivity(): {
  isOnline: boolean;
  connectivityResult: ConnectivityResult;
  effectiveType: string;
} {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [result, setResult] = useState<ConnectivityResult>(
    navigator.onLine ? ConnectivityResult.wifi : ConnectivityResult.none
  );

  useEffect(() => {
    const check = async () => {
      const r = await Connectivity.checkConnectivity();
      setResult(r);
    };

    check();
    const unsub = Connectivity.onConnectivityChanged((r) => {
      setIsOnline(r !== ConnectivityResult.none);
      setResult(r);
    });

    return unsub;
  }, []);

  return { isOnline, connectivityResult: result, effectiveType: Connectivity.getEffectiveType() };
}
