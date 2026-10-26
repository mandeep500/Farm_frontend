"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { cn } from "../../lib/utils";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onDismiss?: () => void;
  className?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function ErrorMessage({
  title = "An error occurred",
  message,
  onDismiss,
  className,
  action,
}: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className={cn(
        "p-4 rounded-xl bg-red-50/90 border border-red-200 text-red-900 shadow-sm animate-fade-in flex items-start gap-3",
        className
      )}
    >
      <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
      <div className="flex-1 space-y-1">
        {title && <h4 className="text-sm font-semibold">{title}</h4>}
        <p className="text-xs text-red-800 leading-relaxed">{message}</p>
        {action && (
          <div className="pt-2">
            <button
              type="button"
              onClick={action.onClick}
              className="text-xs font-semibold text-red-700 underline hover:text-red-900 focus:outline-none"
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
          className="text-red-400 hover:text-red-700 p-1 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label="Dismiss error"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

