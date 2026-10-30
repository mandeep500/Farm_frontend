"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { APP_CONFIG } from "../../lib/constants";
import { Sprout, ArrowLeft, ShieldCheck, Sparkles, Star } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  sideQuote?: string;
  sideAuthor?: string;
}

export function AuthLayout({
  title,
  subtitle,
  children,
  sideQuote = "Nourishing our community with uncompromised organic integrity, living soil stewardship, and farm-to-table freshness.",
  sideAuthor = "The Sekhon Family Legacy",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-farm-50/50">
      {/* Left Column: Visual Farm Showcase (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 relative flex-col justify-between p-12 bg-farm-950 text-white overflow-hidden">
        {/* Background farm photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2560&q=95"
            alt="Sekhon Farm sunrise over agricultural fields in 4K"
            fill
            priority
            quality={95}
            sizes="50vw"
            className="object-cover object-center opacity-65 ultra-sharp"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-farm-950 via-farm-950/70 to-farm-900/60" />
        </div>

        {/* Top Header */}
        <div className="relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-farm-700/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                {APP_CONFIG.name}
              </span>
              <span className="block text-[10px] uppercase font-semibold tracking-widest text-emerald-300">
                Member Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Middle Testimonial / Story Quote */}
        <div className="relative z-10 max-w-lg space-y-6 my-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-harvest-400" />
            <span>Purity, Heritage & Trust</span>
          </div>

          <div className="flex items-center gap-1 text-harvest-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>

          <blockquote className="font-serif text-2xl xl:text-3xl font-normal leading-relaxed text-farm-100">
            “{sideQuote}”
          </blockquote>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-9 h-9 rounded-full bg-emerald-700/80 border border-white/30 flex items-center justify-center font-bold text-xs uppercase">
              SF
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{sideAuthor}</p>
              <p className="text-xs text-farm-300">Regenerative Farmland Estate</p>
            </div>
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div className="relative z-10 pt-8 border-t border-white/10 flex items-center gap-6 text-xs text-farm-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Certified Organic</span>
          </div>
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>Non-GMO Heirloom</span>
          </div>
        </div>
      </div>

      {/* Right Column: Auth Form Area */}
      <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center px-4 sm:px-8 md:px-16 py-12">
        <div className="max-w-md w-full mx-auto space-y-8">
          {/* Navigation Back */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-farm-700 hover:text-farm-900 group transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Sekhon Farm</span>
            </Link>

            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-2">
              <Sprout className="w-5 h-5 text-farm-700" />
              <span className="font-serif font-bold text-sm text-farm-950">
                {APP_CONFIG.name}
              </span>
            </div>
          </div>

          {/* Form Header */}
          <div className="space-y-2">
            <h1 className="font-serif text-3xl font-bold text-farm-950 tracking-tight">
              {title}
            </h1>
            <p className="text-sm text-farm-600 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Form Content */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-farm-200/80 shadow-md shadow-farm-900/5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

