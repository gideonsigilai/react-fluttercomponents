/**
 * shared-preferences.ts — Flutter `shared_preferences` package equivalent for React
 * Mirrors: SharedPreferences, getBool, getInt, getDouble, getString, getStringList, setBool, etc.
 * Uses localStorage as the underlying store.
 */

const PREFIX = "sp_";

export class SharedPreferences {
  private static _instance: SharedPreferences | null = null;

  private constructor() {}

  /** Get the singleton SharedPreferences instance */
  static getInstance(): SharedPreferences {
    if (!this._instance) {
      this._instance = new SharedPreferences();
    }
    return this._instance;
  }

  // ─── Getters ─────────────────────────────────────────────────────────────
  getBool(key: string): boolean | null {
    const v = localStorage.getItem(PREFIX + key);
    if (v === null) return null;
    return v === "true";
  }

  getInt(key: string): number | null {
    const v = localStorage.getItem(PREFIX + key);
    if (v === null) return null;
    const n = parseInt(v, 10);
    return isNaN(n) ? null : n;
  }

  getDouble(key: string): number | null {
    const v = localStorage.getItem(PREFIX + key);
    if (v === null) return null;
    const n = parseFloat(v);
    return isNaN(n) ? null : n;
  }

  getString(key: string): string | null {
    return localStorage.getItem(PREFIX + key);
  }

  getStringList(key: string): string[] | null {
    const v = localStorage.getItem(PREFIX + key);
    if (v === null) return null;
    try {
      return JSON.parse(v) as string[];
    } catch {
      return null;
    }
  }

  // ─── Setters ─────────────────────────────────────────────────────────────
  async setBool(key: string, value: boolean): Promise<boolean> {
    localStorage.setItem(PREFIX + key, String(value));
    return true;
  }

  async setInt(key: string, value: number): Promise<boolean> {
    localStorage.setItem(PREFIX + key, String(Math.trunc(value)));
    return true;
  }

  async setDouble(key: string, value: number): Promise<boolean> {
    localStorage.setItem(PREFIX + key, String(value));
    return true;
  }

  async setString(key: string, value: string): Promise<boolean> {
    localStorage.setItem(PREFIX + key, value);
    return true;
  }

  async setStringList(key: string, value: string[]): Promise<boolean> {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  }

  // ─── Management ──────────────────────────────────────────────────────────
  async remove(key: string): Promise<boolean> {
    localStorage.removeItem(PREFIX + key);
    return true;
  }

  async clear(): Promise<bool> {
    const keysToRemove = Object.keys(localStorage).filter((k) => k.startsWith(PREFIX));
    keysToRemove.forEach((k) => localStorage.removeItem(k));
    return true;
  }

  containsKey(key: string): boolean {
    return localStorage.getItem(PREFIX + key) !== null;
  }

  getKeys(): Set<string> {
    return new Set(
      Object.keys(localStorage)
        .filter((k) => k.startsWith(PREFIX))
        .map((k) => k.slice(PREFIX.length))
    );
  }

  // ─── Static factory ───────────────────────────────────────────────────────
  static async getInstance_async(): Promise<SharedPreferences> {
    return SharedPreferences.getInstance();
  }
}

// ─── useSharedPreferences hook ────────────────────────────────────────────────
import { useState } from "react";

export function useSharedPreference<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const prefs = SharedPreferences.getInstance();
  
  const read = (): T => {
    if (typeof defaultValue === "boolean") return (prefs.getBool(key) ?? defaultValue) as T;
    if (typeof defaultValue === "number") {
      if (Number.isInteger(defaultValue)) return (prefs.getInt(key) ?? defaultValue) as T;
      return (prefs.getDouble(key) ?? defaultValue) as T;
    }
    if (Array.isArray(defaultValue)) return (prefs.getStringList(key) ?? defaultValue) as T;
    return (prefs.getString(key) ?? defaultValue) as T;
  };

  const [value, setValue] = useState<T>(read);

  const save = (v: T) => {
    setValue(v);
    if (typeof v === "boolean") prefs.setBool(key, v as boolean);
    else if (typeof v === "number") {
      if (Number.isInteger(v)) prefs.setInt(key, v as number);
      else prefs.setDouble(key, v as number);
    } else if (Array.isArray(v)) prefs.setStringList(key, v as string[]);
    else prefs.setString(key, String(v));
  };

  return [value, save];
}

// Fix TypeScript bool type
type bool = boolean;
