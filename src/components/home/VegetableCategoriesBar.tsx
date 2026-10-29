"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { VEGETABLE_CATEGORIES, VegetableCategory } from "../../data/vegetables";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";

interface VegetableCategoriesBarProps {
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  className?: string;
}

export function VegetableCategoriesBar({
  selectedCategoryId,
  onSelectCategory,
  className,
}: VegetableCategoriesBarProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    checkScrollability();
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScrollability, { passive: true });
    window.addEventListener("resize", checkScrollability);
    return () => {
      el.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = 280;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div
      className={cn(
        "w-full bg-white border-b border-gray-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] sticky top-16 z-30 transition-all",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative">
        {/* Left Scroll Arrow */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Scroll left categories"
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 border border-gray-200 shadow-md items-center justify-center text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right Scroll Arrow */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Scroll right categories"
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 border border-gray-200 shadow-md items-center justify-center text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Scrollable Category Track (Exact Layout Matching User's Screenshot) */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-1 sm:gap-2.5 overflow-x-auto py-3 px-2 scrollbar-none scroll-smooth select-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {VEGETABLE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            const hasImgError = imageErrors[cat.id];

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={cn(
                  "group flex flex-col items-center justify-center min-w-[70px] sm:min-w-[84px] md:min-w-[92px] px-1.5 py-1.5 rounded-xl transition-all duration-200 relative shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
                  isSelected
                    ? "text-emerald-950 font-bold"
                    : "text-gray-700 hover:text-emerald-800"
                )}
              >
                {/* Visual Icon / Picture Container (Matching image box in user reference) */}
                <div
                  className={cn(
                    "relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-200",
                    isSelected
                      ? "bg-emerald-100/80 ring-2 ring-emerald-600/30 shadow-sm scale-105"
                      : "bg-gray-50/90 border border-gray-200/80 group-hover:bg-emerald-50/60 group-hover:border-emerald-200 group-hover:scale-105"
                  )}
                >
                  {!hasImgError ? (
                    <div className="relative w-full h-full p-1.5 flex items-center justify-center">
                      <Image
                        src={cat.iconImage}
                        alt={cat.name}
                        fill
                        sizes="60px"
                        onError={() => handleImageError(cat.id)}
                        className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Subtle organic shine overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none rounded-xl" />
                    </div>
                  ) : (
                    <span className="text-2xl sm:text-3xl select-none animate-fade-in">
                      {cat.emoji}
                    </span>
                  )}

                  {/* Corner Mini Emoji Tag for Instant Recognition */}
                  <span className="absolute bottom-0.5 right-0.5 text-[10px] sm:text-xs drop-shadow bg-white/90 rounded-full px-0.5 leading-none">
                    {cat.emoji}
                  </span>
                </div>

                {/* Category Label Below Icon (Matching screenshot typography) */}
                <div className="mt-1.5 text-center">
                  <span
                    className={cn(
                      "block text-[11px] sm:text-xs tracking-tight transition-colors whitespace-nowrap",
                      isSelected
                        ? "font-bold text-emerald-900"
                        : "font-medium text-gray-700 group-hover:text-emerald-800"
                    )}
                  >
                    {cat.name}
                  </span>
                  {cat.hindiName && (
                    <span className="block text-[9px] text-gray-400 group-hover:text-emerald-700/70 font-normal -mt-0.5">
                      {cat.hindiName}
                    </span>
                  )}
                </div>

                {/* Active Indicator Bar (Exact visual underline matching 'For You' in screenshot) */}
                {isSelected && (
                  <span className="absolute -bottom-3 left-3 right-3 h-[3px] bg-emerald-600 rounded-full animate-fade-in shadow-sm" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

