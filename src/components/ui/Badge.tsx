import React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "farm" | "harvest" | "earth" | "neutral" | "success" | "warning";
}

export function Badge({
  children,
  className,
  variant = "farm",
  ...props
}: BadgeProps) {
  const variantStyles = {
    farm: "bg-farm-100 text-farm-800 border-farm-200",
    harvest: "bg-harvest-100 text-harvest-800 border-harvest-200",
    earth: "bg-earth-100 text-earth-800 border-earth-200",
    neutral: "bg-gray-100 text-gray-800 border-gray-200",
    success: "bg-emerald-100 text-emerald-800 border-emerald-200",
    warning: "bg-amber-100 text-amber-800 border-amber-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border tracking-wide",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

