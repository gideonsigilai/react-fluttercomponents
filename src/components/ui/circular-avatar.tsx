/**
 * CircularAvatar — a circular avatar widget.
 * Equivalent to Flutter's CircleAvatar() widget.
 *
 * Features:
 *  - Image avatar (backgroundImage / src)
 *  - Fallback initials derived from child text or explicit initials prop
 *  - Foreground child overlay (icon, badge, etc.)
 *  - backgroundColor / foregroundColor
 *  - radius (like Flutter's radius prop)
 *  - minRadius / maxRadius constraints
 *  - onTap for pressable avatars
 *  - Ring/border via ringColor + ringWidth
 *  - Status indicator dot (online, offline, away, busy)
 *  - Loading state with shimmer
 */
import * as React from "react";
import { cn } from "../utils";
import type { Color } from "./flutter-style";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
export type AvatarStatus = "online" | "offline" | "away" | "busy";

export interface CircularAvatarProps {
  /**
   * Image URL. Equivalent to Flutter's backgroundImage.
   * Falls back to initials / child if the image fails to load.
   */
  backgroundImage?: string;

  /**
   * Alt text for the image (accessibility).
   */
  alt?: string;

  /**
   * Explicit initials to show when no image is available.
   * If omitted, initials are derived from the first letter(s) of child text.
   */
  initials?: string;

  /**
   * Child widget rendered on top of the background (icon, text, etc.).
   * If a plain string is passed it is used as initials.
   */
  child?: React.ReactNode;

  /**
   * React children, acts exactly like the `child` prop.
   */
  children?: React.ReactNode;

  /**
   * Radius of the avatar in px. Equivalent to Flutter's radius.
   * Sets both width and height to radius * 2. Default 20 (40px diameter).
   */
  radius?: number;

  /** Minimum radius constraint. */
  minRadius?: number;

  /** Maximum radius constraint. */
  maxRadius?: number;

  /** Background color shown behind initials / icon. */
  backgroundColor?: Color;

  /** Color of the initials / icon child. */
  foregroundColor?: Color;

  /** Font size of the initials. Auto-derived from radius if omitted. */
  fontSize?: number;

  /** Font weight of the initials. Default 600. */
  fontWeight?: React.CSSProperties["fontWeight"];

  /** Ring (border) color around the avatar. */
  ringColor?: Color;

  /** Ring (border) width in px. Default 2 when ringColor is set. */
  ringWidth?: number;

  /**
   * Status indicator dot position.
   * Shows a colored dot at the bottom-right of the avatar.
   */
  status?: AvatarStatus;

  /** Custom color for the status dot (overrides the default per-status color). */
  statusColor?: Color;

  /** Called when the avatar is tapped. */
  onTap?: () => void;

  /** Whether to show a shimmer loading state. */
  isLoading?: boolean;

  className?: string;
  style?: React.CSSProperties;
  key?: React.Key;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
const STATUS_COLORS: Record<AvatarStatus, string> = {
  online: "#4CAF50",
  offline: "#9E9E9E",
  away: "#FFC107",
  busy: "#F44336",
};

/** Derive up to 2 initials from a string (e.g. "John Doe" → "JD"). */
function toInitials(text: string): string {
  const parts = text.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "";
  return (
    (parts[0][0] ?? "") + (parts[parts.length - 1][0] ?? "")
  ).toUpperCase();
}

/** Generate a deterministic hue from a string for consistent avatar colors. */
function stringToHue(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

function autoBackgroundColor(seed: string): string {
  const hue = stringToHue(seed);
  return `hsl(${hue}, 55%, 48%)`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export const CircularAvatar = React.forwardRef<
  HTMLDivElement,
  CircularAvatarProps
>(
  (
    {
      backgroundImage,
      alt,
      initials,
      child,
      children,
      radius = 20,
      minRadius,
      maxRadius,
      backgroundColor,
      foregroundColor,
      fontSize,
      fontWeight = 600,
      ringColor,
      ringWidth = 2,
      status,
      statusColor,
      onTap,
      isLoading = false,
      className,
      style,
    },
    ref,
  ) => {
    const [imgError, setImgError] = React.useState(false);

    // Diameter
    const diameter = radius * 2;
    const minD = minRadius !== undefined ? minRadius * 2 : undefined;
    const maxD = maxRadius !== undefined ? maxRadius * 2 : undefined;

    const resolvedChild = children ?? child;

    // Resolve initials
    const resolvedInitials = React.useMemo(() => {
      if (initials) return initials.slice(0, 2).toUpperCase();
      if (typeof resolvedChild === "string") return toInitials(resolvedChild);
      return "";
    }, [initials, resolvedChild]);

    // Auto background color from initials seed
    const isMutedBg = !backgroundColor && !resolvedInitials;
    const resolvedBg =
      backgroundColor ??
      (resolvedInitials
        ? autoBackgroundColor(resolvedInitials)
        : "var(--muted)");

    const resolvedFg =
      foregroundColor ?? (isMutedBg ? "var(--muted-foreground)" : "#ffffff");
    const resolvedFontSize =
      fontSize ?? Math.max(10, Math.round(radius * 0.55));

    const showImage = !!backgroundImage && !imgError;
    const showInitials =
      !showImage &&
      !!resolvedInitials &&
      (!resolvedChild || typeof resolvedChild === "string");
    const showChild =
      !showImage && !!resolvedChild && typeof resolvedChild !== "string";

    // Status dot size
    const dotSize = Math.max(8, Math.round(radius * 0.38));
    const dotOffset = Math.round(dotSize * 0.1);

    const containerStyle: React.CSSProperties = {
      width: diameter,
      height: diameter,
      minWidth: minD,
      maxWidth: maxD,
      minHeight: minD,
      maxHeight: maxD,
      borderRadius: "50%",
      backgroundColor: showImage ? "transparent" : resolvedBg,
      outline: ringColor ? `${ringWidth}px solid ${ringColor}` : undefined,
      outlineOffset: ringColor ? `${ringWidth}px` : undefined,
      cursor: onTap ? "pointer" : undefined,
      flexShrink: 0,
      ...style,
    };

    const inner = isLoading ? (
      // Shimmer skeleton
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{ backgroundColor: "var(--muted)" }}
      />
    ) : showImage ? (
      <img
        src={backgroundImage}
        alt={alt ?? resolvedInitials ?? "avatar"}
        onError={() => setImgError(true)}
        className="absolute inset-0 w-full h-full rounded-full object-cover"
        draggable={false}
      />
    ) : showInitials ? (
      <span
        className="absolute inset-0 flex items-center justify-center select-none"
        style={{
          fontSize: resolvedFontSize,
          fontWeight,
          color: resolvedFg,
          letterSpacing: "0.02em",
        }}
        aria-label={resolvedInitials}
      >
        {resolvedInitials}
      </span>
    ) : showChild ? (
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={{ color: resolvedFg }}
      >
        {resolvedChild}
      </span>
    ) : null;

    const avatar = (
      <div
        ref={ref}
        role={onTap ? "button" : undefined}
        tabIndex={onTap ? 0 : undefined}
        aria-label={alt ?? resolvedInitials ?? "avatar"}
        onClick={onTap}
        onKeyDown={
          onTap
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") onTap();
              }
            : undefined
        }
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden select-none",
          "transition-transform duration-150",
          onTap &&
            "hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className,
        )}
        style={containerStyle}
      >
        {inner}

        {/* Status dot */}
        {status && (
          <span
            className="absolute rounded-full ring-2 ring-background"
            style={{
              width: dotSize,
              height: dotSize,
              bottom: dotOffset,
              right: dotOffset,
              backgroundColor: statusColor ?? STATUS_COLORS[status],
            }}
            aria-label={status}
          />
        )}
      </div>
    );

    return avatar;
  },
);

CircularAvatar.displayName = "CircularAvatar";

// ─────────────────────────────────────────────────────────────────────────────
// AvatarGroup — stacked row of CircularAvatars
// ─────────────────────────────────────────────────────────────────────────────
export interface AvatarGroupProps {
  /** Array of avatar props to render. */
  avatars: CircularAvatarProps[];
  /** Max number of avatars to show before showing a "+N" overflow. Default 4. */
  max?: number;
  /** Overlap between avatars in px. Default radius * 0.6. */
  overlap?: number;
  /** Radius passed to each avatar. Default 18. */
  radius?: number;
  /** Called when the overflow "+N" avatar is tapped. */
  onOverflowTap?: () => void;
  className?: string;
  key?: React.Key;
}

export const AvatarGroup = React.memo(
  ({
    avatars,
    max = 4,
    overlap,
    radius = 18,
    onOverflowTap,
    className,
  }: AvatarGroupProps) => {
    const resolvedOverlap = overlap ?? Math.round(radius * 0.6);
    const visible = avatars.slice(0, max);
    const overflow = avatars.length - max;

    return (
      <div
        className={cn("flex items-center", className)}
        style={{ paddingLeft: resolvedOverlap }}
      >
        {visible.map((props, i) => (
          <div
            key={props.key ?? i}
            style={{ marginLeft: -resolvedOverlap, zIndex: visible.length - i }}
            className="relative"
          >
            <CircularAvatar
              {...props}
              radius={radius}
              ringColor="var(--background)"
              ringWidth={2}
            />
          </div>
        ))}
        {overflow > 0 && (
          <div
            style={{ marginLeft: -resolvedOverlap, zIndex: 0 }}
            className="relative"
          >
            <CircularAvatar
              radius={radius}
              initials={`+${overflow}`}
              backgroundColor="var(--muted)"
              foregroundColor="var(--muted-foreground)"
              ringColor="var(--background)"
              ringWidth={2}
              onTap={onOverflowTap}
              fontSize={Math.max(9, Math.round(radius * 0.45))}
            />
          </div>
        )}
      </div>
    );
  },
);

AvatarGroup.displayName = "AvatarGroup";
