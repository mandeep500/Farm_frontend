"use client";

import React from "react";
import { FARM_HIGHLIGHTS } from "../../lib/constants";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { Award, Sprout, ShieldCheck, Sun, ArrowUpRight } from "lucide-react";

export function HighlightsSection() {
  const iconMap: Record<string, React.ReactNode> = {
    Award: <Award className="w-6 h-6 text-emerald-600" />,
    Sprout: <Sprout className="w-6 h-6 text-emerald-600" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
    Sun: <Sun className="w-6 h-6 text-harvest-600" />,
  };

  return (
    <section
      id="highlights"
      className="py-24 bg-farm-50/70 border-y border-farm-100 scroll-mt-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="harvest" className="mb-3">
            Why Sekhon Farm
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-farm-950 tracking-tight">
            Distinction in Every Single Harvest
          </h2>
          <p className="mt-4 text-base sm:text-lg text-farm-700 leading-relaxed">
            Four unbreakable commitments form the cornerstone of everything we grow,
            pack, and deliver to your table.
          </p>
        </div>

        {/* 4 Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FARM_HIGHLIGHTS.map((item) => (
            <Card
              key={item.id}
              className="p-7 flex flex-col justify-between bg-white border border-farm-200/80 hover:border-farm-400 group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-farm-50 border border-farm-200/70 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm">
                    {iconMap[item.icon] || <Sprout className="w-6 h-6 text-emerald-600" />}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-farm-100/70 text-farm-800 border border-farm-200/50">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-farm-950 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-harvest-600 mb-3">
                  {item.tagline}
                </p>
                <p className="text-sm text-farm-700/85 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-farm-100 flex items-center justify-between text-xs font-semibold text-farm-800 group-hover:text-farm-600">
                <span>Verified Agricultural Standard</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

