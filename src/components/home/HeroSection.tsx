"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/Button";
import { APP_CONFIG } from "../../lib/constants";
import { Sprout, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-farm-950 pt-24 pb-16">
      {/* Background Image with Dark Emerald Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85"
          alt="Lush green organic farm fields at Sekhon Farm"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-farm-950 via-farm-950/70 to-farm-900/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(12,32,21,0.7)_100%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Organic Certification Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium mb-6 shadow-lg backdrop-blur-sm animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-harvest-400" />
          <span>Generations of Pure Organic Stewardship</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-emerald-200">100% Non-GMO</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-md">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-emerald-300 via-harvest-300 to-emerald-200 bg-clip-text text-transparent">
            {APP_CONFIG.name}
          </span>
        </h1>

        {/* Subtitle & Description */}
        <p className="text-base sm:text-xl text-farm-100/90 max-w-3xl mx-auto mb-10 leading-relaxed font-light drop-shadow">
          {APP_CONFIG.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="#highlights" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="primary"
              className="w-full sm:w-auto text-base font-semibold shadow-lg shadow-emerald-950/40 hover:scale-105 active:scale-95 transition-all duration-200 group"
              rightIcon={
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              }
            >
              Explore Our Farm
            </Button>
          </Link>

          <Link href="#contact" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base font-semibold border-white/30 text-white bg-white/10 hover:bg-white/20 hover:border-white/50 backdrop-blur-sm"
              leftIcon={<Sprout className="w-4 h-4 text-emerald-300" />}
            >
              Contact Our Team
            </Button>
          </Link>
        </div>

        {/* High-Impact Stat Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-white/10 max-w-4xl mx-auto">
          {APP_CONFIG.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
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

