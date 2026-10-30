"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GALLERY_ITEMS } from "../../lib/constants";
import { Badge } from "../ui/Badge";
import { ZoomIn, X, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import { cn } from "../../lib/utils";

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const categories = ["All", "Fields", "Harvest", "Orchards", "Sustainable"];

  const filteredItems =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const handleOpenLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedImageIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-white scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="farm" className="mb-3">
            Visual Journey
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-farm-950 tracking-tight">
            Life Across Sekhon Farm
          </h2>
          <p className="mt-4 text-base sm:text-lg text-farm-700 leading-relaxed">
            A glimpse into our golden fields, living soils, daily morning harvest,
            and eco-conscious farm life.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-farm-600",
                  activeCategory === cat
                    ? "bg-farm-700 text-white shadow-sm"
                    : "bg-farm-50 text-farm-800 hover:bg-farm-100 border border-farm-200/60"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(idx)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-farm-100 shadow-sm hover:shadow-xl transition-all duration-300 border border-farm-100"
            >
              <Image
                src={item.imageUrl}
                alt={item.alt}
                fill
                quality={95}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out ultra-sharp"
              />
              {/* Gradient & Caption Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-farm-950/80 via-farm-950/20 to-transparent opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 uppercase tracking-wider mb-1">
                  <Tag className="w-3 h-3" />
                  {item.category}
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-farm-100/90 line-clamp-2 mt-1">
                  {item.description}
                </p>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={handleCloseLightbox}
        >
          <button
            type="button"
            onClick={handleCloseLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 focus:outline-none"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 focus:outline-none"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 focus:outline-none"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Container */}
          <div
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[16/10] max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={filteredItems[selectedImageIndex].imageUrl}
                alt={filteredItems[selectedImageIndex].alt}
                fill
                quality={95}
                sizes="95vw"
                className="object-contain ultra-sharp"
              />
            </div>
            <div className="text-center mt-4 text-white">
              <h3 className="font-serif text-xl font-bold">
                {filteredItems[selectedImageIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl mx-auto">
                {filteredItems[selectedImageIndex].description}
              </p>
              <span className="text-[11px] text-gray-400 mt-2 block">
                {selectedImageIndex + 1} of {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

