import {
  useState, useRef, useEffect, useCallback,
  useContext, createContext, cloneElement,
} from "react";

// ╔══════════════════════════════════════════════════════════════╗
// ║            CUSTOM SCROLL VIEW — Flutter Port                ║
// ║  Drop-in React replica of Flutter's CustomScrollView API    ║
// ╚══════════════════════════════════════════════════════════════╝

// ─────────────────────────────────────────────
// INTERNAL CONTEXT  (shared between host + slivers)
// ─────────────────────────────────────────────
const ScrollCtx = createContext(null);

// ─────────────────────────────────────────────
// EDGE INSETS  (mirrors Flutter's EdgeInsets)
// ─────────────────────────────────────────────
export const EdgeInsets = {
  all:      (v)                             => ({ top: v, right: v, bottom: v, left: v }),
  symmetric:({ vertical=0, horizontal=0 }) => ({ top: vertical, right: horizontal, bottom: vertical, left: horizontal }),
  only:     ({ top=0, right=0, bottom=0, left=0 } = {}) => ({ top, right, bottom, left }),
  fromLTRB: (left, top, right, bottom)     => ({ top, right, bottom, left }),
  zero:     { top: 0, right: 0, bottom: 0, left: 0 },
};

function resolveInsets(p) {
  if (!p) return EdgeInsets.zero;
  if (typeof p === "number") return EdgeInsets.all(p);
  return p;
}

// ─────────────────────────────────────────────
// USE SCROLL CONTROLLER
// ─────────────────────────────────────────────
/** Mirrors Flutter's ScrollController. Pass to CustomScrollView's `controller` prop. */
export function useScrollController() {
  const ref = useRef(null);
  return {
    _ref:      ref,
    animateTo: (offset, { duration = 300 } = {}) =>
      ref.current?.scrollTo({ top: offset, behavior: "smooth" }),
    jumpTo:    (offset) => { if (ref.current) ref.current.scrollTop = offset; },
    get offset() { return ref.current?.scrollTop ?? 0; },
  };
}

// ═══════════════════════════════════════════════════════════════
// CUSTOM SCROLL VIEW
// ═══════════════════════════════════════════════════════════════
/**
 * @param {object}  props
 * @param {'vertical'|'horizontal'} props.scrollDirection
 * @param {boolean} props.reverse
 * @param {object}  props.controller          — from useScrollController()
 * @param {'bouncing'|'clamping'|'never'|'always'|'platform'} props.physics
 * @param {boolean} props.shrinkWrap
 * @param {number}  props.anchor              — 0.0–1.0
 * @param {'manual'|'onDrag'} props.keyboardDismissBehavior
 * @param {React.ReactNode} props.children    — sliver components
 * @param {object}  props.style               — escape-hatch style overrides
 */
export function CustomScrollView({
  scrollDirection          = "vertical",
  reverse                  = false,
  controller,
  physics                  = "platform",
  shrinkWrap               = false,
  anchor                   = 0.0,
  keyboardDismissBehavior  = "manual",
  children,
  style,
}) {
  const internalRef            = useRef(null);
  const containerRef           = controller?._ref ?? internalRef;

  const [scrollTop,        setScrollTop]        = useState(0);
  const [containerHeight,  setContainerHeight]  = useState(0);
  const [containerWidth,   setContainerWidth]   = useState(0);

  // Measure the container — containerRef is stable so [] is correct,
  // but we read .current inside the effect so this is safe.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { clientHeight, clientWidth } = entries[0].target;
      setContainerHeight(clientHeight);
      setContainerWidth(clientWidth);
    });
    ro.observe(el);
    setContainerHeight(el.clientHeight);
    setContainerWidth(el.clientWidth);
    return () => ro.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = useCallback((e) => {
    setScrollTop(e.currentTarget.scrollTop);
    if (keyboardDismissBehavior === "onDrag")
      document.activeElement?.blur?.();
  }, [keyboardDismissBehavior]);

  const isVertical  = scrollDirection === "vertical";
  const overflowVal = physics === "never" ? "hidden" : "auto";

  const ctx = {
    scrollTop, containerHeight, containerWidth,
    containerRef, scrollDirection, reverse, physics,
  };

  return (
    <ScrollCtx.Provider value={ctx}>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          position:   "relative",
          overflowY:  isVertical  ? overflowVal : "hidden",
          overflowX:  !isVertical ? overflowVal : "hidden",
          display:    "flex",
          flexDirection: isVertical
            ? (reverse ? "column-reverse" : "column")
            : (reverse ? "row-reverse"    : "row"),
          ...(shrinkWrap ? {} : { height: "100%", width: "100%" }),
          WebkitOverflowScrolling: physics === "bouncing" ? "touch" : undefined,
          boxSizing:  "border-box",
          ...style,
        }}
      >
        {children}
      </div>
    </ScrollCtx.Provider>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIVER APP BAR
// ═══════════════════════════════════════════════════════════════
/**
 * @param {React.ReactNode} props.title
 * @param {number}  props.expandedHeight     — height when fully expanded (default 200)
 * @param {number}  props.collapsedHeight    — height when fully collapsed (default 56)
 * @param {number}  props.toolbarHeight      — toolbar area height (default 56)
 * @param {boolean} props.pinned             — stays visible after collapsing
 * @param {boolean} props.floating           — re-appears on any upward scroll
 * @param {boolean} props.snap               — (requires floating) snaps to expanded/collapsed
 * @param {boolean} props.stretch            — overscroll stretches the bar
 * @param {React.ReactNode} props.leading    — leading widget (default: back arrow)
 * @param {React.ReactNode[]} props.actions  — trailing action widgets
 * @param {React.ReactNode} props.flexibleSpace — FlexibleSpaceBar or any node
 * @param {React.ReactNode} props.bottom     — bottom widget (e.g. TabBar)
 * @param {number}  props.bottomHeight       — height of the bottom widget
 * @param {string}  props.backgroundColor
 * @param {string}  props.foregroundColor
 * @param {number}  props.elevation
 * @param {string}  props.shadowColor
 * @param {boolean} props.forceElevated
 * @param {boolean} props.centerTitle
 * @param {boolean} props.automaticallyImplyLeading
 */
export function SliverAppBar({
  title,
  expandedHeight              = 200,
  collapsedHeight             = 56,
  toolbarHeight               = 56,
  pinned                      = false,
  floating                    = false,
  snap                        = false,
  stretch                     = false,
  leading,
  actions                     = [],
  flexibleSpace,
  bottom,
  bottomHeight                = 0,
  backgroundColor             = "#1565C0",
  foregroundColor             = "#ffffff",
  elevation                   = 4,
  shadowColor                 = "rgba(0,0,0,0.25)",
  forceElevated               = false,
  centerTitle                 = false,
  automaticallyImplyLeading   = true,
}) {
  const ctx            = useContext(ScrollCtx);
  const scrollTop      = ctx?.scrollTop ?? 0;
  const flexRange      = Math.max(1, expandedHeight - collapsedHeight);
  const collapseProgress = Math.min(1, Math.max(0, scrollTop / flexRange));

  // ── Floating: track direction ────────────────────────────────
  const lastScroll     = useRef(0);
  const [floatVisible, setFloatVisible] = useState(true);

  useEffect(() => {
    if (!floating || !ctx) return;
    const el = ctx.containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const st    = el.scrollTop;
      const delta = st - lastScroll.current;
      if (delta < -2)                          setFloatVisible(true);
      else if (delta > 2 && st > expandedHeight) setFloatVisible(false);
      lastScroll.current = st;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [floating, expandedHeight, ctx]);

  // ── Snap ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!snap || !floating || !ctx) return;
    const el = ctx.containerRef.current;
    if (!el) return;
    let tid;
    const onScroll = () => {
      clearTimeout(tid);
      tid = setTimeout(() => {
        const st = el.scrollTop;
        if (st > 0 && st < flexRange) {
          // Read current progress at snap time, not from closure
          const progress = Math.min(1, Math.max(0, st / flexRange));
          const target = progress > 0.5 ? flexRange : 0;
          el.scrollTo({ top: target, behavior: "smooth" });
        }
      }, 120);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => { el.removeEventListener("scroll", onScroll); clearTimeout(tid); };
  }, [snap, floating, flexRange, ctx]);

  // ── Shadow ───────────────────────────────────────────────────
  const showShadow = scrollTop > 0 || forceElevated;
  const shadow     = showShadow
    ? `0 ${elevation * 0.5}px ${elevation * 2}px ${shadowColor}`
    : "none";

  // ── Pinned: outer reserves expandedHeight, inner is sticky ──
  if (pinned) {
    const innerH = Math.max(collapsedHeight + bottomHeight, expandedHeight - scrollTop);
    return (
      <div style={{ height: expandedHeight, flexShrink: 0 }}>
        <div style={{
          position: "sticky", top: 0, zIndex: 200,
          height: innerH, overflow: "hidden",
          backgroundColor, color: foregroundColor,
          boxShadow: shadow,
          transition: "box-shadow 0.2s",
        }}>
          <AppBarContent
            title={title} leading={leading} actions={actions}
            flexibleSpace={flexibleSpace} bottom={bottom}
            bottomHeight={bottomHeight} toolbarHeight={toolbarHeight}
            foregroundColor={foregroundColor} centerTitle={centerTitle}
            automaticallyImplyLeading={automaticallyImplyLeading}
            collapseProgress={collapseProgress}
            expandedHeight={expandedHeight} collapsedHeight={collapsedHeight}
          />
        </div>
      </div>
    );
  }

  // ── Floating: sticky bar, translate in/out ───────────────────
  if (floating) {
    return (
      <div style={{
        position: "sticky", top: 0, zIndex: 200,
        height: collapsedHeight + bottomHeight,
        backgroundColor, color: foregroundColor,
        boxShadow: shadow, flexShrink: 0, overflow: "hidden",
        transform: `translateY(${floatVisible ? 0 : -(collapsedHeight + bottomHeight)}px)`,
        transition: "transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.2s",
      }}>
        <AppBarContent
          title={title} leading={leading} actions={actions}
          bottom={bottom} bottomHeight={bottomHeight}
          toolbarHeight={toolbarHeight}
          foregroundColor={foregroundColor} centerTitle={centerTitle}
          automaticallyImplyLeading={automaticallyImplyLeading}
          collapseProgress={1}
          expandedHeight={expandedHeight} collapsedHeight={collapsedHeight}
        />
      </div>
    );
  }

  // ── Neither: just scrolls away ───────────────────────────────
  const plainH = Math.max(0, expandedHeight + bottomHeight - scrollTop);
  return (
    <div style={{
      height: plainH, flexShrink: 0, overflow: "hidden",
      backgroundColor, color: foregroundColor,
      boxShadow: shadow,
    }}>
      <AppBarContent
        title={title} leading={leading} actions={actions}
        flexibleSpace={flexibleSpace} bottom={bottom}
        bottomHeight={bottomHeight} toolbarHeight={toolbarHeight}
        foregroundColor={foregroundColor} centerTitle={centerTitle}
        automaticallyImplyLeading={automaticallyImplyLeading}
        collapseProgress={collapseProgress}
        expandedHeight={expandedHeight} collapsedHeight={collapsedHeight}
      />
    </div>
  );
}

// Internal render helper — the actual AppBar DOM
function AppBarContent({
  title, leading, actions = [], flexibleSpace, bottom,
  bottomHeight, toolbarHeight, foregroundColor,
  centerTitle, automaticallyImplyLeading,
  collapseProgress, expandedHeight, collapsedHeight,
}) {
  return (
    <>
      {/* Flexible space (background + parallax title) */}
      {flexibleSpace && (
        <div style={{ position: "absolute", inset: 0, bottom: bottomHeight, zIndex: 0 }}>
          {cloneElement(flexibleSpace, { collapseProgress, expandedHeight, collapsedHeight })}
        </div>
      )}

      {/* Toolbar row */}
      <div style={{
        position: "absolute", bottom: bottomHeight, left: 0, right: 0,
        height: toolbarHeight,
        display: "flex", alignItems: "center",
        padding: "0 4px", zIndex: 2, gap: 4,
      }}>
        {/* Leading */}
        <div style={{ display: "flex", alignItems: "center", minWidth: 40 }}>
          {leading ?? (automaticallyImplyLeading
            ? <BarIconBtn color={foregroundColor}><ArrowBack /></BarIconBtn>
            : null)}
        </div>

        {/* Title */}
        <div style={{
          flex: 1,
          display: "flex",
          justifyContent: centerTitle ? "center" : "flex-start",
          opacity: flexibleSpace ? collapseProgress : 1,
          transition: "opacity 0.15s",
          fontSize: 20, fontWeight: 500,
          color: foregroundColor,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {title}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {actions.map((a, i) => <div key={i}>{a}</div>)}
        </div>
      </div>

      {/* Bottom slot (e.g. TabBar) */}
      {bottom && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: bottomHeight, zIndex: 2,
        }}>
          {bottom}
        </div>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// FLEXIBLE SPACE BAR
// ═══════════════════════════════════════════════════════════════
/**
 * Use inside SliverAppBar's flexibleSpace prop.
 * @param {React.ReactNode} props.title
 * @param {React.ReactNode} props.background
 * @param {'parallax'|'pin'|'none'} props.collapseMode
 * @param {boolean} props.centerTitle
 * @param {number}  props.expandedTitleScale — scale factor for title when expanded (default 1.5)
 * NOTE: collapseProgress / expandedHeight / collapsedHeight are injected by SliverAppBar via cloneElement
 */
export function FlexibleSpaceBar({
  title,
  background,
  collapseMode        = "parallax",
  centerTitle         = false,
  expandedTitleScale  = 1.5,
  // ↓ injected by SliverAppBar
  collapseProgress    = 0,
  expandedHeight      = 200,
  collapsedHeight     = 56,
}) {
  const flexRange       = expandedHeight - collapsedHeight;
  const parallaxShift   = collapseMode === "parallax" ? collapseProgress * flexRange * 0.4 : 0;
  const titleScale      = 1 + (1 - collapseProgress) * (expandedTitleScale - 1);
  const titleBottom     = 16 + collapseProgress * (collapsedHeight / 2 - 24);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Background */}
      {background && (
        <div style={{
          position: "absolute", inset: 0,
          transform: `translateY(${parallaxShift}px)`,
          pointerEvents: "none",
        }}>
          {background}
        </div>
      )}

      {/* Flexible title */}
      {title && (
        <div style={{
          position: "absolute",
          bottom: titleBottom,
          left:   centerTitle ? "50%" : 72,
          transform: centerTitle
            ? `translateX(-50%) scale(${titleScale})`
            : `scale(${titleScale})`,
          transformOrigin: centerTitle ? "center bottom" : "left bottom",
          color: "white",
          fontSize: 18, fontWeight: 500,
          letterSpacing: "0.15px",
          textShadow: "0 1px 6px rgba(0,0,0,0.5)",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          transition: "none",
        }}>
          {title}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIVER LIST
// ═══════════════════════════════════════════════════════════════
/**
 * @param {number}   props.itemCount
 * @param {function} props.itemBuilder  — (index: number) => ReactNode
 * @param {React.ReactNode} props.children  — alternative to itemBuilder
 * @param {boolean}  props.addAutomaticKeepAlives
 * @param {boolean}  props.addRepaintBoundaries
 * @param {boolean}  props.addSemanticIndexes
 */
export function SliverList({
  itemCount,
  itemBuilder,
  children,
  addAutomaticKeepAlives = true,
  addRepaintBoundaries   = true,
  addSemanticIndexes     = true,
}) {
  const items = children != null
    ? (Array.isArray(children) ? children : [children])
    : Array.from({ length: itemCount ?? 0 }, (_, i) => itemBuilder(i));

  return (
    <div style={{ display: "flex", flexDirection: "column", flexShrink: 0 }}>
      {items}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIVER GRID
// ═══════════════════════════════════════════════════════════════
/**
 * Supports both delegate variants:
 *   — SliverGridDelegateWithFixedCrossAxisCount  → crossAxisCount (default)
 *   — SliverGridDelegateWithMaxCrossAxisExtent   → maxCrossAxisExtent
 *
 * @param {number}   props.itemCount
 * @param {function} props.itemBuilder            — (index: number) => ReactNode
 * @param {React.ReactNode} props.children
 * @param {number}   props.crossAxisCount         — fixed column count
 * @param {number}   props.mainAxisSpacing        — row gap
 * @param {number}   props.crossAxisSpacing       — column gap
 * @param {number}   props.childAspectRatio       — width/height ratio (default 1)
 * @param {number}   props.mainAxisExtent         — fixed item height (overrides aspectRatio)
 * @param {number}   props.maxCrossAxisExtent     — max column width (auto-fill columns)
 */
export function SliverGrid({
  itemCount         = 0,
  itemBuilder,
  children,
  crossAxisCount    = 2,
  mainAxisSpacing   = 0,
  crossAxisSpacing  = 0,
  childAspectRatio  = 1,
  mainAxisExtent,
  maxCrossAxisExtent,
}) {
  const items = children != null
    ? (Array.isArray(children) ? children : [children])
    : Array.from({ length: itemCount }, (_, i) => itemBuilder(i));

  const gridCols = maxCrossAxisExtent
    ? `repeat(auto-fill, minmax(${maxCrossAxisExtent}px, 1fr))`
    : `repeat(${crossAxisCount}, 1fr)`;

  const itemSizeStyle = mainAxisExtent
    ? { height: mainAxisExtent }
    : { aspectRatio: String(childAspectRatio) };

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: gridCols,
      gap: `${mainAxisSpacing}px ${crossAxisSpacing}px`,
      flexShrink: 0,
    }}>
      {items.map((item, i) => (
        <div key={i} style={{ ...itemSizeStyle, minWidth: 0 }}>
          {item}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIVER TO BOX ADAPTER
// ═══════════════════════════════════════════════════════════════
/** Wraps any regular (box) widget so it can be used as a sliver. */
export function SliverToBoxAdapter({ children }) {
  return (
    <div style={{ flexShrink: 0 }}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIVER FILL REMAINING
// ═══════════════════════════════════════════════════════════════
/**
 * @param {boolean} props.hasScrollBody   — child itself scrolls (use flex grow)
 * @param {boolean} props.fillOverscroll  — fill overscroll area too
 */
export function SliverFillRemaining({
  children,
  hasScrollBody = false,
  fillOverscroll = false,
}) {
  const ctx = useContext(ScrollCtx);
  return (
    <div style={{
      flexGrow: 1,
      flexShrink: 0,
      minHeight: hasScrollBody ? 0 : (ctx?.containerHeight ?? "100vh"),
      overflow: hasScrollBody ? "auto" : "hidden",
    }}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIVER PADDING
// ═══════════════════════════════════════════════════════════════
/**
 * @param {EdgeInsets|number} props.padding
 * @param {React.ReactNode}   props.sliver   — sliver child (alias for children)
 */
export function SliverPadding({ padding, sliver, children }) {
  const p = resolveInsets(padding);
  return (
    <div style={{
      paddingTop:    p.top,
      paddingRight:  p.right,
      paddingBottom: p.bottom,
      paddingLeft:   p.left,
      flexShrink: 0,
    }}>
      {sliver ?? children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIVER FIXED EXTENT LIST
// ═══════════════════════════════════════════════════════════════
/**
 * Every item has the same main-axis extent (height for vertical scroll).
 * @param {number}   props.itemExtent
 * @param {number}   props.itemCount
 * @param {function} props.itemBuilder — (index) => ReactNode
 */
export function SliverFixedExtentList({
  itemExtent = 56,
  itemCount  = 0,
  itemBuilder,
  children,
}) {
  const items = children != null
    ? (Array.isArray(children) ? children : [children])
    : Array.from({ length: itemCount }, (_, i) => itemBuilder(i));

  return (
    <div style={{ display: "flex", flexDirection: "column", flexShrink: 0 }}>
      {items.map((item, i) => (
        <div key={i} style={{ height: itemExtent, flexShrink: 0, overflow: "hidden" }}>
          {item}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIVER FILL VIEWPORT
// ═══════════════════════════════════════════════════════════════
/**
 * Each child fills a fraction of the viewport (great for carousels/pagers).
 * @param {number}   props.itemCount
 * @param {function} props.itemBuilder      — (index) => ReactNode
 * @param {number}   props.viewportFraction — 0.0–1.0 (default 1.0)
 * @param {boolean}  props.padEnds          — centre first/last items
 */
export function SliverFillViewport({
  itemCount        = 0,
  itemBuilder,
  children,
  viewportFraction = 1.0,
  padEnds          = true,
}) {
  const ctx       = useContext(ScrollCtx);
  const vpH       = ctx?.containerHeight ?? 400;
  const itemH     = vpH * viewportFraction;
  const endPad    = padEnds ? (vpH - itemH) / 2 : 0;

  const items = children != null
    ? (Array.isArray(children) ? children : [children])
    : Array.from({ length: itemCount }, (_, i) => itemBuilder(i));

  return (
    <div style={{
      display: "flex", flexDirection: "column", flexShrink: 0,
      paddingTop: endPad, paddingBottom: endPad, gap: 8,
    }}>
      {items.map((item, i) => (
        <div key={i} style={{ height: itemH, flexShrink: 0, overflow: "hidden" }}>
          {item}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIVER PERSISTENT HEADER
// ═══════════════════════════════════════════════════════════════
/**
 * Fully custom collapsing/pinning header via a delegate object.
 * @param {{ minExtent: number, maxExtent: number,
 *           build: ({ shrinkOffset, overlapsContent, currentHeight }) => ReactNode
 *        }} props.delegate
 * @param {boolean} props.pinned
 * @param {boolean} props.floating
 */
export function SliverPersistentHeader({ delegate, pinned = false, floating = false }) {
  const ctx         = useContext(ScrollCtx);
  const ref         = useRef(null);
  const [shrinkOffset,    setShrinkOffset]    = useState(0);
  const [overlapsContent, setOverlapsContent] = useState(false);

  const { minExtent = 56, maxExtent = 200, build } = delegate ?? {};
  const flexRange = maxExtent - minExtent;

  useEffect(() => {
    if (!ctx) return;
    const el = ctx.containerRef.current;
    if (!el) return;
    const update = () => {
      const st     = el.scrollTop;
      const shrink = Math.min(flexRange, Math.max(0, st));
      setShrinkOffset(shrink);
      setOverlapsContent(st > maxExtent);
    };
    el.addEventListener("scroll", update, { passive: true });
    update();
    return () => el.removeEventListener("scroll", update);
  }, [flexRange, maxExtent, ctx]);

  const currentHeight = Math.max(minExtent, maxExtent - shrinkOffset);

  return (
    <div ref={ref} style={{
      position:  pinned ? "sticky" : "relative",
      top:       0,
      zIndex:    150,
      height:    currentHeight,
      flexShrink: 0,
      overflow:  "hidden",
    }}>
      {build?.({ shrinkOffset, overlapsContent, currentHeight })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIVER ANIMATED LIST  (simplified — no physics animation)
// ═══════════════════════════════════════════════════════════════
export function SliverAnimatedList({ itemCount = 0, itemBuilder }) {
  const items = Array.from({ length: itemCount }, (_, i) => itemBuilder(i, null));
  return (
    <div style={{ display: "flex", flexDirection: "column", flexShrink: 0 }}>
      {items}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIVER SAFE AREA  (web equivalent)
// ═══════════════════════════════════════════════════════════════
export function SliverSafeArea({ sliver, children, minimum }) {
  return (
    <div style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)", flexShrink: 0 }}>
      {sliver ?? children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIVER OPACITY
// ═══════════════════════════════════════════════════════════════
export function SliverOpacity({ opacity = 1.0, sliver, children }) {
  return (
    <div style={{ opacity, flexShrink: 0 }}>
      {sliver ?? children}
    </div>
  );
}

 
// Small internal bar icon button
function BarIconBtn({ children, color, onPress }) {
  return (
    <button onClick={onPress} style={{
      width: 40, height: 40, border: "none", background: "transparent",
      cursor: "pointer", borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center", color,
      transition: "background 0.15s",
    }}
      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
    >{children}</button>
  );
}

// ── SVG icon helpers ──────────────────────────────────────────
const ArrowBack = () => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
  </svg>
); 
 
