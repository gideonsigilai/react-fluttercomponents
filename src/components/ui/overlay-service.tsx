import { create } from "zustand";
import * as React from "react";

type OverlayType = "dialog" | "bottomSheet" | "drawer";
type OverlayContent = React.ReactNode | ((close: () => void) => React.ReactNode);

interface OverlayItem {
  id: string;
  type: OverlayType;
  content: OverlayContent;
  isDismissible?: boolean;
}

interface ToastItem {
  id: string;
  message: string;
  duration?: number;
}

interface OverlayStore {
  overlays: OverlayItem[];
  toasts: ToastItem[];
  addOverlay: (overlay: Omit<OverlayItem, "id">) => string;
  removeOverlay: (id: string) => void;
  addToast: (message: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

const genId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

export const useOverlayStore = create<OverlayStore>((set) => ({
  overlays: [],
  toasts: [],

  addOverlay: (overlay) => {
    const id = genId();
    set((s) => ({ overlays: [...s.overlays, { ...overlay, id }] }));
    return id;
  },

  removeOverlay: (id) =>
    set((s) => ({ overlays: s.overlays.filter((o) => o.id !== id) })),

  addToast: (message, duration = 3000) => {
    const id = genId();
    set((s) => ({ toasts: [...s.toasts, { id, message, duration }] }));
    // Auto-remove after duration
    setTimeout(
      () => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
      duration
    );
  },

  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

/** Shows a material-style dialog. Equivalent to Flutter's showDialog(). */
export const showDialog = (content: OverlayContent, isDismissible = true) =>
  useOverlayStore.getState().addOverlay({ type: "dialog", content, isDismissible });

/** Shows a modal bottom sheet. Equivalent to Flutter's showModalBottomSheet(). */
export const showBottomSheet = (content: OverlayContent, isDismissible = true) =>
  useOverlayStore.getState().addOverlay({ type: "bottomSheet", content, isDismissible });

/** Shows a drawer. Equivalent to Flutter's showDrawer(). */
export const showDrawer = (content: OverlayContent, isDismissible = true) =>
  useOverlayStore.getState().addOverlay({ type: "drawer", content, isDismissible });

/** Shows a toast message. Equivalent to Flutter's Fluttertoast.showToast(). */
export const showToast = (message: string, duration?: number) =>
  useOverlayStore.getState().addToast(message, duration);

/** Closes an overlay by its ID. */
export const closeOverlay = (id: string) =>
  useOverlayStore.getState().removeOverlay(id);
