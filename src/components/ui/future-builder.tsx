import React, { useEffect, useState } from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────
type AsyncSnapshot<T> = {
  connectionState: "none" | "waiting" | "active" | "done";
  data: T | null;
  error: Error | null;
  hasData: boolean;
  hasError: boolean;
};

interface FutureBuilderProps<T> {
  future: Promise<T> | null;
  builder: (snapshot: AsyncSnapshot<T>) => React.ReactNode;
  initialData?: T;
}

// ─── FutureBuilder ────────────────────────────────────────────────────────────
export function FutureBuilder<T>({
  future,
  builder,
  initialData,
}: FutureBuilderProps<T>) {
  const [snapshot, setSnapshot] = useState<AsyncSnapshot<T>>({
    connectionState: future ? "waiting" : "none",
    data: initialData ?? null,
    error: null,
    hasData: initialData !== undefined,
    hasError: false,
  });

  useEffect(() => {
    if (!future) {
      setSnapshot({ connectionState: "none", data: initialData ?? null, error: null, hasData: initialData !== undefined, hasError: false });
      return;
    }

    setSnapshot((prev) => ({ ...prev, connectionState: "waiting" }));

    let cancelled = false;
    future
      .then((data) => {
        if (!cancelled)
          setSnapshot({ connectionState: "done", data, error: null, hasData: true, hasError: false });
      })
      .catch((error) => {
        if (!cancelled)
          setSnapshot({ connectionState: "done", data: null, error, hasData: false, hasError: true });
      });

    return () => { cancelled = true; };
  }, [future]);

  return <>{builder(snapshot)}</>;
}

// ─── StreamBuilder ────────────────────────────────────────────────────────────
interface SimpleStream<T> {
  subscribe: (listener: (value: T) => void) => () => void;
}

interface StreamBuilderProps<T> {
  stream: SimpleStream<T> | null;
  builder: (snapshot: AsyncSnapshot<T>) => React.ReactNode;
  initialData?: T;
}

export function StreamBuilder<T>({
  stream,
  builder,
  initialData,
}: StreamBuilderProps<T>) {
  const [snapshot, setSnapshot] = useState<AsyncSnapshot<T>>({
    connectionState: stream ? "waiting" : "none",
    data: initialData ?? null,
    error: null,
    hasData: initialData !== undefined,
    hasError: false,
  });

  useEffect(() => {
    if (!stream) {
      setSnapshot({ connectionState: "none", data: initialData ?? null, error: null, hasData: initialData !== undefined, hasError: false });
      return;
    }

    setSnapshot((prev) => ({ ...prev, connectionState: "active" }));

    const unsubscribe = stream.subscribe((value) => {
      setSnapshot({ connectionState: "active", data: value, error: null, hasData: true, hasError: false });
    });

    return unsubscribe;
  }, [stream]);

  return <>{builder(snapshot)}</>;
}

// ─── createStream helper ──────────────────────────────────────────────────────
export function createStream<T>(initialValue?: T): {
  stream: SimpleStream<T>;
  add: (value: T) => void;
  close: () => void;
} {
  const listeners = new Set<(value: T) => void>();
  let closed = false;

  return {
    stream: {
      subscribe: (listener) => {
        listeners.add(listener);
        if (initialValue !== undefined) listener(initialValue);
        return () => listeners.delete(listener);
      },
    },
    add: (value: T) => {
      if (!closed) listeners.forEach((l) => l(value));
    },
    close: () => { closed = true; listeners.clear(); },
  };
}

// ─── ValueNotifier ────────────────────────────────────────────────────────────
export function useValueNotifier<T>(initialValue: T) {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    notifyListeners: (next: T) => setValue(next),
    addListener: (cb: (v: T) => void) => {
      // Simplified — in React use useEffect to react to value changes
      cb(value);
    },
  };
}
