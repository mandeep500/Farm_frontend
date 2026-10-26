import React from "react";
import { cn } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverLift?: boolean;
}

export function Card({
  children,
  className,
  hoverLift = true,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-farm-100 shadow-sm transition-all duration-300",
        hoverLift &&
          "hover:-translate-y-1 hover:shadow-lg hover:shadow-farm-900/5 hover:border-farm-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Badge } from "./Badge";

