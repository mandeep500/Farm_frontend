"use client";

import React, { useMemo } from "react";
import { checkPasswordRequirements } from "../../schemas/auth.schema";
import { CheckCircle2, CircleDot, ShieldCheck, ShieldAlert } from "lucide-react";
import { cn } from "../../lib/utils";

interface PasswordRequirementsProps {
  password: string;
  showAlways?: boolean;
}

export function PasswordRequirements({
  password,
  showAlways = false,
}: PasswordRequirementsProps) {
  const result = useMemo(() => {
    return checkPasswordRequirements(password || "");
  }, [password]);

  if (!showAlways && !password) {
    return null;
  }

  return (
    <div className="mt-3 p-3.5 bg-farm-50/70 border border-farm-200/70 rounded-xl space-y-3 animate-fade-in text-xs">
      {/* Strength indicator */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-farm-900 flex items-center gap-1.5">
            {result.allPassed ? (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <ShieldAlert className="w-3.5 h-3.5 text-farm-600" />
            )}
            Password Strength:
          </span>
          <span
            className={cn(
              "font-semibold",
              result.score <= 1 && "text-red-600",
              result.score === 2 && "text-amber-600",
              result.score === 3 && "text-blue-600",
              result.score === 4 && "text-emerald-700"
            )}
          >
            {password ? result.strengthLabel : "Not Entered"}
          </span>
        </div>

        {/* 4-segment progress bar */}
        <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
          {[1, 2, 3, 4].map((step) => {
            const isFilled = result.score >= step;
            return (
              <div
                key={step}
                className={cn(
                  "rounded-full transition-all duration-300",
                  isFilled
                    ? result.score <= 1
                      ? "bg-red-500"
                      : result.score === 2
                      ? "bg-amber-500"
                      : result.score === 3
                      ? "bg-blue-500"
                      : "bg-emerald-600"
                    : "bg-gray-200"
                )}
              />
            );
          })}
        </div>
      </div>

      {/* Rules list */}
      <div className="space-y-1.5 pt-1 border-t border-farm-200/60">
        <p className="text-[11px] font-semibold text-farm-800 tracking-wide uppercase">
          Required Rules:
        </p>
        <ul className="space-y-1">
          {result.rules.map((rule) => (
            <li
              key={rule.id}
              className={cn(
                "flex items-center gap-2 text-xs transition-colors duration-150",
                rule.satisfied
                  ? "text-emerald-700 font-medium"
                  : "text-gray-500"
              )}
            >
              {rule.satisfied ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              ) : (
                <CircleDot className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              )}
              <span>{rule.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

