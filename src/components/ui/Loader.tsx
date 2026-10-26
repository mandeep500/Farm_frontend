"use client";

import React from "react";
import { Sprout } from "lucide-react";
import { cn } from "../../lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

export function Loader({
  size = "md",
  text,
  className,
  fullScreen = false,
}: LoaderProps) {
  const sizeMap = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const content = (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-farm-700",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="relative flex items-center justify-center">
        <div
          className={cn(
            "rounded-full border-2 border-farm-200 border-t-farm-700 animate-spin",
            sizeMap[size]
          )}
        />
        <Sprout
          className={cn(
            "absolute text-farm-600 animate-pulse-slow",
            size === "sm" && "w-2.5 h-2.5",
            size === "md" && "w-4 h-4",
            size === "lg" && "w-6 h-6"
          )}
        />
      </div>
      {text && (
        <p className="text-xs font-medium text-farm-800 tracking-wide">
          {text}
        </p>
      )}
      <span className="sr-only">Loading content...</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-farm-50/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
}

