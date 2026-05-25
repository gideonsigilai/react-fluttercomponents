import { useOverlayStore, closeOverlay } from "./overlay-service"; 

/**
 * A provider that renders global overlays (dialogs, bottom sheets, drawers, toasts).
 * Should be placed at the root of the application.
 */
export const OverlayProvider = () => {
  const { overlays, toasts } = useOverlayStore();

  return (
    <>
      {/* Overlays Container */}
      {overlays.length > 0 && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none">
          {overlays.map((overlay) => (
            <div
              key={overlay.id}
              className="absolute inset-0 flex items-center justify-center pointer-events-auto"
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer transition-opacity"
                onClick={() => overlay.isDismissible && closeOverlay(overlay.id)}
              />

              {/* Dialog Style */}
              {overlay.type === "dialog" && (
                <div className="relative bg-background border rounded-2xl shadow-2xl max-w-[90vw] max-h-[80vh] overflow-hidden">
                  {typeof overlay.content === "function" ? overlay.content(() => closeOverlay(overlay.id)) : overlay.content}
                </div>
              )}

              {/* Bottom Sheet Style */}
              {overlay.type === "bottomSheet" && (
                <div className="absolute bottom-0 w-full bg-background border-t rounded-t-3xl shadow-2xl max-h-[90vh] overflow-hidden">
                  <div className="w-12 h-1.5 bg-muted rounded-full mx-auto my-3" />
                  {typeof overlay.content === "function" ? overlay.content(() => closeOverlay(overlay.id)) : overlay.content}
                </div>
              )}

              {/* Drawer Style */}
              {overlay.type === "drawer" && (
                <div className="absolute left-0 h-full w-80 bg-background border-r shadow-2xl">
                  {typeof overlay.content === "function" ? overlay.content(() => closeOverlay(overlay.id)) : overlay.content}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Toasts Container */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-slate-900 text-white px-6 py-3 rounded-full shadow-lg text-sm font-medium pointer-events-auto"
          >
            {toast.message}
          </div>
        ))}
      </div>
    </>
  );
};
