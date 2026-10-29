"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/Button";
import { APP_CONFIG } from "../../lib/constants";
import {
  Sprout,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  Heart,
  Sun,
  Camera,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-farm-950 pt-28 pb-20">
      {/* Background Image with Dark Emerald & Warm Sun Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85"
          alt="Lush green organic farm fields at Sekhon Farm at sunrise"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-farm-950 via-farm-950/75 to-farm-900/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(12,32,21,0.85)_100%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Organic Certification & Harvest Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm font-medium shadow-xl backdrop-blur-md animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-harvest-300" />
          <span>Generations of Pure Organic Farming</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-emerald-100 font-semibold">100% Living Soil</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-lg max-w-4xl mx-auto">
          Rooted in Heritage.{" "}
          <span className="bg-gradient-to-r from-emerald-300 via-harvest-300 to-emerald-200 bg-clip-text text-transparent">
            Grown for Pure Living.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-farm-100/95 max-w-3xl mx-auto leading-relaxed font-light drop-shadow">
          Experience chemical-free heirloom produce from Sekhon Farm. Hand-harvested
          at sunrise, nourished by living soil biology, and delivered directly with complete transparency.
        </p>

        {/* Live Today's Harvest Ticker */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs text-farm-100 max-w-2xl mx-auto shadow-md">
          <span className="font-bold text-harvest-300 flex items-center gap-1">
            <Sun className="w-3.5 h-3.5 text-amber-400" /> Fresh Harvest:
          </span>
          <span className="text-emerald-200">🧅 Onions</span>
          <span className="text-gray-400">•</span>
          <span className="text-emerald-200">🥔 Living-Soil Potatoes</span>
          <span className="text-gray-400">•</span>
          <span className="text-emerald-200">🥕 Sweet Carrots</span>
          <span className="text-gray-400">•</span>
          <span className="text-emerald-200">🌿 Tender Lady Finger</span>
          <span className="text-gray-400">•</span>
          <span className="text-emerald-200">🥬 Fresh Spinach</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link href="#produce" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="primary"
              className="w-full sm:w-auto text-base font-semibold shadow-xl shadow-emerald-950/50 hover:scale-105 active:scale-95 transition-all duration-200 group bg-emerald-600 hover:bg-emerald-500"
              leftIcon={<ShoppingBag className="w-4 h-4 text-emerald-100" />}
              rightIcon={
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              }
            >
              Browse Today&apos;s Harvest
            </Button>
          </Link>

          <Link href="#farming-story" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base font-semibold border-white/30 text-white bg-white/10 hover:bg-white/20 hover:border-white/50 backdrop-blur-sm"
              leftIcon={<Camera className="w-4 h-4 text-emerald-300" />}
            >
              See Farming Photos
            </Button>
          </Link>
        </div>

        {/* High-Impact Stat Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-white/10 max-w-4xl mx-auto">
          {APP_CONFIG.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors text-center"
            >
              <div className="font-serif text-2xl sm:text-3xl font-bold text-harvest-300 mb-0.5">
                {stat.value}
              </div>
              <div className="text-xs text-farm-200/80 font-medium tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
