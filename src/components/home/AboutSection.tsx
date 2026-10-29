"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "../ui/Badge";
import {
  HeartHandshake,
  Leaf,
  ShieldCheck,
  CheckCircle2,
  Trees,
} from "lucide-react";

export function AboutSection() {
  const values = [
    {
      icon: <Leaf className="w-5 h-5 text-emerald-600" />,
      title: "Soil Biology First",
      description:
        "We nourish live microbes, mycorrhizae fungi, and earthworms, creating living soil that produces naturally resilient, nutrient-dense crops.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      title: "Zero Synthetic Chemicals",
      description:
        "Every hectare at Sekhon Farm is nurtured without synthetic fertilizers, petroleum sprays, or artificial ripening hormones.",
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-emerald-600" />,
      title: "Fair Community Ethics",
      description:
        "Honoring our farm workers with equitable wages and fostering transparent, open relationships with every patron we feed.",
    },
    {
      icon: <Trees className="w-5 h-5 text-emerald-600" />,
      title: "Generational Heritage",
      description:
        "Blending timeless ancestral farming wisdom with modern water conservation and precision solar micro-irrigation.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-white text-farm-950 relative scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="farm" className="mb-3">
            Our Story & Heritage
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-farm-950 tracking-tight">
            Rooted in Nature, Grown with Purpose
          </h2>
          <p className="mt-4 text-base sm:text-lg text-farm-700/80 leading-relaxed">
            For more than three decades, Sekhon Farm has stood as a bastion of
            honest agriculture, nurturing generational land where pure food meets
            sustainable stewardship.
          </p>
        </div>

        {/* Content Grid: Image + Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-farm-100">
              <Image
                src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=2560&q=95"
                alt="Farmer working carefully at Sekhon Farm in 4K resolution"
                fill
                quality={95}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center hover:scale-[1.03] transition-transform duration-700 ultra-sharp"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-farm-950/70 via-transparent to-transparent" />

              {/* Floating Quality Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-farm-200/80 text-farm-950">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm">
                      100% Certified Organic
                    </h4>
                    <p className="text-xs text-farm-700">
                      Independently audited soil & zero-additive standard
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story & Mission Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-farm-950">
                From a Family Homestead to an Organic Sanctuary
              </h3>
              <p className="text-farm-800/90 leading-relaxed text-base">
                Sekhon Farm began with a simple conviction: the healthiest food
                comes from soils that are respected, never depleted. What started
                as a single family parcel has evolved into an expansive 250+ acre
                agro-ecological estate dedicated to regenerating the land we walk on.
              </p>
              <p className="text-farm-800/90 leading-relaxed text-base">
                We reject industrial shortcuts. While monoculture farming depletes
                soil nutrients and relies on artificial chemicals, our polyculture
                rotations, natural cover cropping, and biological pollinator
                sanctuaries allow biodiversity to flourish naturally.
              </p>
            </div>

            {/* Quality Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "Certified Organic Non-GMO Heirloom Seeds",
                "Deep Aquifer Well Water Filtration",
                "Cold-Chain Fresh Daily Farm Dispatch",
                "Solar-Assisted Smart Precision Irrigation",
                "Active Bee Apiaries & Pollinator Corridors",
                "Zero Artificial Preservatives or Wax Coatings",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-farm-900">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Core Farm Values */}
        <div className="border-t border-farm-100 pt-16">
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl font-bold text-farm-950">
              Our Core Philosophical Pillars
            </h3>
            <p className="text-sm text-farm-600 mt-1">
              The fundamental principles that guide every seed planted and every harvest gathered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-farm-50/60 border border-farm-100 hover:border-farm-300 transition-all duration-200 hover:-translate-y-1 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-farm-200 flex items-center justify-center mb-4 shadow-sm">
                  {v.icon}
                </div>
                <h4 className="font-serif font-bold text-base text-farm-950 mb-2">
                  {v.title}
                </h4>
                <p className="text-xs text-farm-700/90 leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

