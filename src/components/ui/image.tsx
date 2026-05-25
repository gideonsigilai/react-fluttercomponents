import * as React from "react";
import { cn } from "@/lib/utils";
import { BoxFit } from "./layout-types";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fit?: BoxFit;
  key?: React.Key;
}

/**
 * A widget that displays an image.
 * Equivalent to Flutter's Image() widget.
 */
export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, fit = BoxFit.cover, width, height, ...props }, ref) => {
    return (
      <img
        ref={ref}
        className={cn("max-w-full h-auto", fit, className)}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
        }}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";
