"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "../ui/Badge";
import {
  Sprout,
  Sun,
  Droplets,
  Heart,
  ShieldCheck,
  Trees,
  CheckCircle2,
  ArrowRight,
  Eye,
} from "lucide-react";

interface FarmingPhoto {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  tag: string;
}

export function FarmingStorySection() {
  const [activePhoto, setActivePhoto] = useState<FarmingPhoto | null>(null);

  const farmingPhotos: FarmingPhoto[] = [
    {
      id: "f-1",
      title: "Dawn Harvest in Living Fields",
      subtitle: "05:30 AM Daily Routine",
      description:
        "Our farmers step into the dew-covered fields at daybreak to harvest tender vegetables like lady finger, spinach, and red carrots before the sun stresses the crops.",
      image:
        "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=2560&q=95",
      badge: "Hand-Harvested",
      tag: "Field Operations",
    },
    {
      id: "f-2",
      title: "250+ Acres of Regenerative Soil",
      subtitle: "Chemical-Free Heritage Estate",
      description:
        "We treat soil as a living organism teeming with billions of beneficial mycorrhizae, bacteria, and earthworms that give our onions and potatoes deep nutritional density.",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2560&q=95",
      badge: "Living Soil",
      tag: "Land Stewardship",
    },
    {
      id: "f-3",
      title: "Solar Smart Micro-Irrigation",
      subtitle: "100% Clean Solar Power",
      description:
        "Deep mountain aquifer water is gently delivered directly to root zones with zero evaporation, saving 65% water compared to conventional flood irrigation.",
      image:
        "https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=2560&q=95",
      badge: "Zero Water Waste",
      tag: "Green Technology",
    },
    {
      id: "f-4",
      title: "Microclimate High-Tunnel Seedlings",
      subtitle: "Non-GMO Seed Propagation",
      description:
        "Every tomato, cauliflower, and pepper seedling begins life in our protected polyhouses using pure organic compost, ensuring strong root networks before field planting.",
      image:
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=2560&q=95",
      badge: "100% Non-GMO",
      tag: "Nursery Care",
    },
    {
      id: "f-5",
      title: "Rich Organic Compost & Bio-Fertilizer",
      subtitle: "Zero Synthetic Sprays Ever",
      description:
        "Prepared on-site from cow dung, aged mulch, and fermented plant extracts (Jeevamrut). We feed the soil microbes, and the microbes feed our crops.",
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=2560&q=95",
      badge: "Pure Jeevamrut",
      tag: "Soil Biology",
    },
    {
      id: "f-6",
      title: "Pollinator Apiaries & Wildflowers",
      subtitle: "Natural Pest Balance",
      description:
        "Border rows of sunflowers and marigolds host native honeybees and ladybugs that naturally consume crop pests without needing poisonous chemical sprays.",
      image:
        "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=2560&q=95",
      badge: "Bee Sanctuary",
      tag: "Biodiversity",
    },
  ];

  return (
    <section id="farming-story" className="py-20 bg-white text-gray-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="farm">Life at Sekhon Farm</Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Real Farming, <span className="text-emerald-700">Rooted in Purity</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Take a visual walkthrough of our organic farmland. Every photograph captures
            our day-to-day commitment to soil vitality, pure crops, and zero chemical interference.
          </p>
        </div>

        {/* 6-Photo Editorial Collage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {farmingPhotos.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group relative rounded-3xl overflow-hidden bg-gray-900 border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-end min-h-[380px]"
            >
              {/* Background Photo in 4K */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out ultra-sharp"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:via-black/50 transition-colors" />

              {/* Top Tag Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-emerald-950 font-bold text-[11px] shadow-sm">
                  {item.badge}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-gray-200 text-[10px] font-medium border border-white/20">
                  {item.tag}
                </span>
              </div>

              {/* Hover View Pill */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-lg backdrop-blur-sm scale-75 group-hover:scale-100 transition-transform">
                  <Eye className="w-6 h-6" />
                </div>
              </div>

              {/* Card Footer Content */}
              <div className="relative z-10 p-6 space-y-2 text-white">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-300 block">
                  {item.subtitle}
                </span>
                <h3 className="font-serif text-xl font-bold leading-snug group-hover:text-emerald-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Pillars Summary Band */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-farm-50/80 border border-farm-200/80 text-center">
          <div className="space-y-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-800">
              100%
            </span>
            <p className="text-xs font-semibold text-gray-700">Zero Synthetic Sprays</p>
            <p className="text-[11px] text-gray-500">Only organic bio-compost</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-800">
              05:30 AM
            </span>
            <p className="text-xs font-semibold text-gray-700">Dew-Fresh Picking</p>
            <p className="text-[11px] text-gray-500">Peak nutritional crispness</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-800">
              250+
            </span>
            <p className="text-xs font-semibold text-gray-700">Living Soil Acres</p>
            <p className="text-[11px] text-gray-500">Active microbial ecosystem</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-800">
              35+
            </span>
            <p className="text-xs font-semibold text-gray-700">Years Family Heritage</p>
            <p className="text-[11px] text-gray-500">Purity you can count on</p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Photo Inspection */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[16/10] bg-black">
              <Image
                src={activePhoto.image}
                alt={activePhoto.title}
                fill
                quality={95}
                sizes="(max-width: 1024px) 95vw, 1000px"
                className="object-cover ultra-sharp"
              />
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
              >
                ✕
              </button>
            </div>
            <div className="p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  {activePhoto.badge}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs font-semibold text-gray-500">
                  {activePhoto.subtitle}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-900">
                {activePhoto.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

