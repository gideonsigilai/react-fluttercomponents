import React, { useState } from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface RatingBarProps {
  initialRating?: number;
  itemCount?: number;
  itemSize?: number;
  allowHalfRating?: boolean;
  onRatingUpdate?: (rating: number) => void;
  ignoreGestures?: boolean;
  direction?: "horizontal" | "vertical";
  glow?: boolean;
  glowColor?: string;
  ratingWidget?: {
    full: React.ReactNode;
    half: React.ReactNode;
    empty: React.ReactNode;
  };
  itemPadding?: number;
  unratedColor?: string;
  className?: string;
}

// ─── RatingBar ────────────────────────────────────────────────────────────────
export function RatingBar({
  initialRating = 0,
  itemCount = 5,
  itemSize = 28,
  allowHalfRating = false,
  onRatingUpdate,
  ignoreGestures = false,
  direction = "horizontal",
  glow = false,
  glowColor = "#f59e0b",
  ratingWidget,
  itemPadding = 2,
  unratedColor = "#d1d5db",
  className,
}: RatingBarProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const current = hoverRating ?? rating;

  const handleClick = (value: number) => {
    if (ignoreGestures) return;
    setRating(value);
    onRatingUpdate?.(value);
  };

  const getStarType = (index: number): "full" | "half" | "empty" => {
    const pos = index + 1;
    if (current >= pos) return "full";
    if (allowHalfRating && current >= pos - 0.5) return "half";
    return "empty";
  };

  const StarFull = () => (
    <svg width={itemSize} height={itemSize} viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth={1}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  const StarHalf = () => (
    <svg width={itemSize} height={itemSize} viewBox="0 0 24 24" strokeWidth={1}>
      <defs>
        <linearGradient id="half">
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor={unratedColor} />
        </linearGradient>
      </defs>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#half)" stroke="#f59e0b" />
    </svg>
  );

  const StarEmpty = () => (
    <svg width={itemSize} height={itemSize} viewBox="0 0 24 24" fill={unratedColor} stroke={unratedColor} strokeWidth={1}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  return (
    <div
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row",
        className
      )}
    >
      {Array.from({ length: itemCount }, (_, i) => {
        const type = getStarType(i);
        const fullValue = i + 1;
        const halfValue = i + 0.5;

        return (
          <div
            key={i}
            className="relative cursor-pointer"
            style={{
              filter: glow && type === "full" ? `drop-shadow(0 0 4px ${glowColor})` : undefined,
              padding: itemPadding,
            }}
          >
            {/* Full star button */}
            {allowHalfRating ? (
              <div className="relative flex">
                {/* Left half */}
                <div
                  className="absolute left-0 top-0 w-1/2 h-full z-10"
                  onMouseEnter={() => !ignoreGestures && setHoverRating(halfValue)}
                  onMouseLeave={() => setHoverRating(null)}
                  onClick={() => handleClick(halfValue)}
                />
                {/* Right half */}
                <div
                  className="absolute right-0 top-0 w-1/2 h-full z-10"
                  onMouseEnter={() => !ignoreGestures && setHoverRating(fullValue)}
                  onMouseLeave={() => setHoverRating(null)}
                  onClick={() => handleClick(fullValue)}
                />
                {type === "full"
                  ? ratingWidget?.full ?? <StarFull />
                  : type === "half"
                  ? ratingWidget?.half ?? <StarHalf />
                  : ratingWidget?.empty ?? <StarEmpty />}
              </div>
            ) : (
              <div
                onMouseEnter={() => !ignoreGestures && setHoverRating(fullValue)}
                onMouseLeave={() => setHoverRating(null)}
                onClick={() => handleClick(fullValue)}
              >
                {type === "full"
                  ? ratingWidget?.full ?? <StarFull />
                  : ratingWidget?.empty ?? <StarEmpty />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── RatingBarIndicator (read-only display) ───────────────────────────────────
interface RatingBarIndicatorProps extends Omit<RatingBarProps, "onRatingUpdate"> {
  rating: number;
}

export function RatingBarIndicator({ rating, ...props }: RatingBarIndicatorProps) {
  return <RatingBar {...props} initialRating={rating} ignoreGestures />;
}
