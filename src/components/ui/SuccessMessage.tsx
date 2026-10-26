"use client";

import React from "react";
import { CheckCircle2, X } from "lucide-react";
import { cn } from "../../lib/utils";

interface SuccessMessageProps {
  title?: string;
  message: string;
  onDismiss?: () => void;
  className?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function SuccessMessage({
  title = "Success",
  message,
  onDismiss,
  className,
  action,
}: SuccessMessageProps) {
  if (!message) return null;

  return (
    <div
      role="status"
      className={cn(
        "p-4 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 shadow-sm animate-fade-in flex items-start gap-3",
        className
      )}
    >
      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
      <div className="flex-1 space-y-1">
        {title && <h4 className="text-sm font-semibold">{title}</h4>}
        <p className="text-xs text-emerald-800 leading-relaxed">{message}</p>
        {action && (
          <div className="pt-2">
            <button
              type="button"
              onClick={action.onClick}
              className="text-xs font-semibold text-emerald-800 underline hover:text-emerald-950 focus:outline-none"
            >
              {action.label}
            </button>
          </div>
        )}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-emerald-500 hover:text-emerald-800 p-1 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="Dismiss message"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

