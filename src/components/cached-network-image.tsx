/**
 * cached-network-image.ts
 * A React analog of Flutter's `cached_network_image` package.
 *
 * Features:
 *  - In-memory LRU image cache (avoids re-fetching already-loaded URLs)
 *  - Persistent sessionStorage cache (survives re-renders, not page refresh)
 *  - Loading placeholder support
 *  - Error widget / fallback support
 *  - Retry logic with exponential back-off
 *  - Progress tracking
 *  - Fade-in transition when image loads
 *  - `useNetworkImage` hook for headless usage
 *  - `CachedNetworkImage` drop-in component
 *  - `CacheManager` for manual cache control
 */

import React, { useEffect, useRef, useState, useCallback } from "react";

// ─── Cache Storage ────────────────────────────────────────────────────────────

type CacheEntry = {
  objectUrl: string;
  size: number;
  timestamp: number;
};

const MAX_MEMORY_ENTRIES = 150;
const SESSION_KEY_PREFIX = "cnimg_";

class ImageCacheManager {
  private memCache = new Map<string, CacheEntry>();
  private loading = new Map<string, Promise<CacheEntry>>();

  /** Check if URL is in memory or session cache. */
  has(url: string): boolean {
    return this.memCache.has(url) || this._hasSession(url);
  }

  /** Get cached object URL synchronously (memory only). */
  get(url: string): string | null {
    return this.memCache.get(url)?.objectUrl ?? null;
  }

  /** Evict a specific URL from all caches. */
  evict(url: string): void {
    const entry = this.memCache.get(url);
    if (entry) {
      URL.revokeObjectURL(entry.objectUrl);
      this.memCache.delete(url);
    }
    try { sessionStorage.removeItem(SESSION_KEY_PREFIX + btoa(url)); } catch { /* noop */ }
  }

  /** Clear all cached images. */
  clearAll(): void {
    this.memCache.forEach((e) => URL.revokeObjectURL(e.objectUrl));
    this.memCache.clear();
    // Clear session entries
    try {
      Object.keys(sessionStorage)
        .filter((k) => k.startsWith(SESSION_KEY_PREFIX))
        .forEach((k) => sessionStorage.removeItem(k));
    } catch { /* noop */ }
  }

  /** Fetch and cache an image URL. Returns a cached ObjectURL. */
  async fetch(
    url: string,
    onProgress?: (progress: number) => void,
    retries = 3,
  ): Promise<string> {
    // 1. In-memory hit
    const mem = this.memCache.get(url);
    if (mem) return mem.objectUrl;

    // 2. Deduplicate concurrent requests
    const inflight = this.loading.get(url);
    if (inflight) return (await inflight).objectUrl;

    // 3. Session hit — restore from base64
    const session = this._getSession(url);
    if (session) {
      const objectUrl = session;
      this._addToMemory(url, { objectUrl, size: 0, timestamp: Date.now() });
      return objectUrl;
    }

    // 4. Network fetch with retry
    const promise = this._fetchWithRetry(url, onProgress, retries);
    this.loading.set(url, promise);
    try {
      const entry = await promise;
      this._addToMemory(url, entry);
      this._setSession(url, entry.objectUrl);
      return entry.objectUrl;
    } finally {
      this.loading.delete(url);
    }
  }

  private async _fetchWithRetry(
    url: string,
    onProgress?: (p: number) => void,
    retriesLeft = 3,
  ): Promise<CacheEntry> {
    for (let attempt = 0; attempt < retriesLeft; attempt++) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const contentLength = res.headers.get("content-length");
        const total = contentLength ? parseInt(contentLength, 10) : 0;
        let received = 0;

        if (onProgress && res.body) {
          const reader = res.body.getReader();
          const chunks: Uint8Array[] = [];
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
            received += value.length;
            if (total > 0) onProgress(received / total);
          }
          const blob = new Blob(chunks as any);
          return { objectUrl: URL.createObjectURL(blob), size: blob.size, timestamp: Date.now() };
        }

        const blob = await res.blob();
        onProgress?.(1);
        return { objectUrl: URL.createObjectURL(blob), size: blob.size, timestamp: Date.now() };
      } catch (e) {
        if (attempt === retriesLeft - 1) throw e;
        await new Promise((r) => setTimeout(r, 300 * 2 ** attempt));
      }
    }
    throw new Error("Max retries exceeded");
  }

  private _addToMemory(url: string, entry: CacheEntry): void {
    if (this.memCache.size >= MAX_MEMORY_ENTRIES) {
      // Evict oldest
      const oldest = [...this.memCache.entries()].sort((a, b) => a[1].timestamp - b[1].timestamp)[0];
      if (oldest) {
        URL.revokeObjectURL(oldest[1].objectUrl);
        this.memCache.delete(oldest[0]);
      }
    }
    this.memCache.set(url, entry);
  }

  private _hasSession(url: string): boolean {
    try { return !!sessionStorage.getItem(SESSION_KEY_PREFIX + btoa(url)); } catch { return false; }
  }

  private _getSession(url: string): string | null {
    try { return sessionStorage.getItem(SESSION_KEY_PREFIX + btoa(url)); } catch { return null; }
  }

  private _setSession(url: string, objectUrl: string): void {
    try { sessionStorage.setItem(SESSION_KEY_PREFIX + btoa(url), objectUrl); } catch { /* quota exceeded */ }
  }
}

/** Singleton cache manager — equivalent to Flutter's DefaultCacheManager. */
export const CacheManager = new ImageCacheManager();

// ─── useNetworkImage hook ─────────────────────────────────────────────────────

export type NetworkImageStatus = "idle" | "loading" | "loaded" | "error";

export interface UseNetworkImageResult {
  src: string | null;
  status: NetworkImageStatus;
  progress: number;
  error: Error | null;
  reload: () => void;
}

export interface UseNetworkImageOptions {
  /** Number of retry attempts on failure. Default 3. */
  retries?: number;
  /** Delay in ms before the first load attempt (useful for priority queuing). */
  delay?: number;
  /** Skip the cache and always re-fetch. */
  forceRefresh?: boolean;
  /** Custom cache manager instance. */
  cacheManager?: ImageCacheManager;
}

/**
 * React hook that fetches and caches a network image.
 * Equivalent to flutter's `CachedNetworkImage` state.
 */
export function useNetworkImage(
  url: string | null | undefined,
  options: UseNetworkImageOptions = {},
): UseNetworkImageResult {
  const {
    retries = 3,
    delay = 0,
    forceRefresh = false,
    cacheManager = CacheManager,
  } = options;

  const [status, setStatus] = useState<NetworkImageStatus>(() =>
    url && !forceRefresh && cacheManager.has(url) ? "loaded" : url ? "loading" : "idle",
  );
  const [src, setSrc] = useState<string | null>(() =>
    url && !forceRefresh ? cacheManager.get(url) : null,
  );
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => {
    if (url) {
      cacheManager.evict(url);
      setReloadKey((k) => k + 1);
      setSrc(null);
      setStatus("loading");
      setError(null);
      setProgress(0);
    }
  }, [url, cacheManager]);

  useEffect(() => {
    if (!url) { setStatus("idle"); return; }

    if (!forceRefresh && cacheManager.has(url)) {
      setSrc(cacheManager.get(url));
      setStatus("loaded");
      return;
    }

    let cancelled = false;
    setStatus("loading");

    const run = async () => {
      if (delay > 0) await new Promise((r) => setTimeout(r, delay));
      if (cancelled) return;
      try {
        const objectUrl = await cacheManager.fetch(
          url,
          (p) => { if (!cancelled) setProgress(p); },
          retries,
        );
        if (!cancelled) { setSrc(objectUrl); setStatus("loaded"); }
      } catch (e) {
        if (!cancelled) { setError(e as Error); setStatus("error"); }
      }
    };

    run();
    return () => { cancelled = true; };
  }, [url, reloadKey, retries, delay, forceRefresh, cacheManager]);

  return { src, status, progress, error, reload };
}

// ─── CachedNetworkImage Component ─────────────────────────────────────────────

export interface CachedNetworkImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  /** The remote image URL. */
  imageUrl: string;
  /**
   * Widget shown while loading.
   * Receives a `progress` value (0–1) when Content-Length is available.
   */
  placeholder?: (progress: number) => React.ReactNode;
  /**
   * Widget shown when the image fails to load.
   * Receives the error and a `reload` callback.
   */
  errorWidget?: (error: Error, reload: () => void) => React.ReactNode;
  /** Fade-in duration in ms. Default 300. */
  fadeInDuration?: number;
  /** Fade-in curve: just maps to CSS easing. Default "ease-out". */
  fadeInCurve?: string;
  /** Whether to show a progress indicator. Default false. */
  useOldImageOnUrlChange?: boolean;
  /** Object-fit for the image. Default "cover". */
  fit?: React.CSSProperties["objectFit"];
  /** Hook options forwarded to useNetworkImage. */
  cacheOptions?: UseNetworkImageOptions;
  /** Container className wrapping the image + placeholder. */
  containerClassName?: string;
  /** Container style. */
  containerStyle?: React.CSSProperties;
}

/**
 * A drop-in component that fetches, caches, and displays a network image
 * with loading/error states and a fade-in transition.
 *
 * Equivalent to Flutter's `CachedNetworkImage()` widget.
 *
 * ```tsx
 * <CachedNetworkImage
 *   imageUrl="https://example.com/photo.jpg"
 *   placeholder={(p) => <SkeletonBox />}
 *   errorWidget={(err, reload) => <button onClick={reload}>Retry</button>}
 *   fit="cover"
 *   width={300}
 *   height={200}
 * />
 * ```
 */
export const CachedNetworkImage = React.forwardRef<HTMLDivElement, CachedNetworkImageProps>(
  (
    {
      imageUrl,
      placeholder,
      errorWidget,
      fadeInDuration = 300,
      fadeInCurve = "ease-out",
      fit = "cover",
      cacheOptions,
      containerClassName,
      containerStyle,
      className,
      style,
      alt,
      width,
      height,
      ...imgProps
    },
    ref,
  ) => {
    const { src, status, progress, error, reload } = useNetworkImage(imageUrl, cacheOptions);

    return (
      <div
        ref={ref}
        className={containerClassName}
        style={{ position: "relative", overflow: "hidden", ...containerStyle }}
      >
        {/* Placeholder layer */}
        {status !== "loaded" && status !== "error" && (
          <div
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {placeholder ? placeholder(progress) : (
              <div
                className="w-full h-full animate-pulse"
                style={{ backgroundColor: "hsl(var(--muted))" }}
              />
            )}
          </div>
        )}

        {/* Error layer */}
        {status === "error" && error && (
          <div
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {errorWidget ? errorWidget(error, reload) : (
              <div style={{ textAlign: "center", color: "hsl(var(--muted-foreground))", fontSize: 12 }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>⚠️</div>
                <button onClick={reload} style={{ textDecoration: "underline", cursor: "pointer", background: "none", border: "none", color: "inherit" }}>
                  Retry
                </button>
              </div>
            )}
          </div>
        )}

        {/* Image layer */}
        {src && (
          <img
            src={src}
            alt={alt ?? ""}
            className={className}
            style={{
              display: "block",
              width: typeof width === "number" ? `${width}px` : width ?? "100%",
              height: typeof height === "number" ? `${height}px` : height ?? "100%",
              objectFit: fit,
              opacity: status === "loaded" ? 1 : 0,
              transition: `opacity ${fadeInDuration}ms ${fadeInCurve}`,
              ...style,
            }}
            {...imgProps}
          />
        )}
      </div>
    );
  },
);

CachedNetworkImage.displayName = "CachedNetworkImage";
