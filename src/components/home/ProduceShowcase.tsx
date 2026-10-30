"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  PRODUCE_ITEMS,
  VEGETABLE_CATEGORIES,
  ProduceItem,
} from "../../data/vegetables";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import {
  Sprout,
  Clock,
  MapPin,
  Star,
  Check,
  ShoppingBag,
  Info,
  X,
  Sparkles,
  ShieldCheck,
  Search,
} from "lucide-react";
import { cn } from "../../lib/utils";

interface ProduceShowcaseProps {
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
}

export function ProduceShowcase({
  selectedCategoryId,
  onSelectCategory,
}: ProduceShowcaseProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduce, setSelectedProduce] = useState<ProduceItem | null>(null);
  const [addedItems, setAddedItems] = useState<Record<string, number>>({});
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const activeCategory =
    VEGETABLE_CATEGORIES.find((c) => c.id === selectedCategoryId) ||
    VEGETABLE_CATEGORIES[0];

  // Filter produce by category & search
  const filteredProduce = PRODUCE_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategoryId === "all" || item.categoryId === selectedCategoryId;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.hindiName && item.hindiName.includes(searchQuery)) ||
      item.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item: ProduceItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedItems((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === item.id ? null : curr));
    }, 1500);
  };

  const totalCartCount = Object.values(addedItems).reduce((a, b) => a + b, 0);

  return (
    <section id="produce" className="py-14 bg-earth-50/60 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Direct From Sekhon Soil</span>
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              <span>Zero Middlemen</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              {activeCategory.id === "all"
                ? "Daily Fresh Harvest"
                : `${activeCategory.name} (${activeCategory.hindiName || ""})`}
            </h2>
            <p className="text-sm text-gray-600 max-w-xl mt-1">
              {activeCategory.shortDesc}
            </p>
          </div>

          {/* Search + Harvest Basket Count */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search onion, potato, bhindi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent placeholder:text-gray-400 shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {totalCartCount > 0 && (
              <div className="px-3.5 py-2 rounded-xl bg-emerald-700 text-white flex items-center gap-2 shadow-sm shrink-0 animate-fade-in text-xs font-bold">
                <ShoppingBag className="w-4 h-4" />
                <span>{totalCartCount} item(s)</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Produce Count / Filter Status */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            Showing <strong className="text-gray-800">{filteredProduce.length}</strong> produce item(s)
            {selectedCategoryId !== "all" && (
              <> in <span className="font-semibold text-emerald-800">{activeCategory.name}</span></>
            )}
          </span>
          {selectedCategoryId !== "all" && (
            <button
              type="button"
              onClick={() => onSelectCategory("all")}
              className="text-emerald-700 font-semibold hover:underline"
            >
              View All Vegetables →
            </button>
          )}
        </div>

        {/* Produce Cards Grid */}
        {filteredProduce.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-gray-300 max-w-lg mx-auto space-y-3">
            <Sprout className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="text-base font-bold text-gray-800">
              No produce matching “{searchQuery}”
            </h3>
            <p className="text-xs text-gray-500">
              Try searching for &quot;onion&quot;, &quot;potato&quot;, &quot;carrot&quot;, or &quot;lady finger&quot;.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                onSelectCategory("all");
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProduce.map((item) => {
              const countInBasket = addedItems[item.id] || 0;
              const isJustAdded = justAddedId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedProduce(item)}
                  className="group bg-white rounded-2xl border border-gray-200 hover:border-emerald-500/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  {/* Image Container with Badges */}
                  <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      quality={95}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ultra-sharp"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Quality Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-emerald-900 text-[10px] font-bold tracking-wide shadow-sm border border-emerald-100">
                        {item.badge}
                      </span>
                    </div>

                    {/* Freshness Clock Pill */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium">
                      <Clock className="w-3 h-3 text-harvest-300" />
                      <span>{item.harvestTime}</span>
                    </div>

                    {/* Quick View Pill (appears on hover) */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="w-8 h-8 rounded-full bg-white/90 text-gray-800 flex items-center justify-center shadow-md">
                        <Info className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-serif font-bold text-base sm:text-lg text-gray-900 group-hover:text-emerald-800 transition-colors">
                          {item.name}
                        </h3>
                        {item.hindiName && (
                          <span className="text-xs text-emerald-700 font-medium shrink-0">
                            {item.hindiName}
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        <span>{item.farmLocation}</span>
                      </p>

                      <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Price & Action Row */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 block -mb-1">
                          Direct Price
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-bold text-emerald-900">
                            {item.price}
                          </span>
                          <span className="text-[11px] text-gray-500 font-medium">
                            /{item.unit}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(item, e)}
                        className={cn(
                          "px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95",
                          isJustAdded
                            ? "bg-emerald-600 text-white"
                            : countInBasket > 0
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                            : "bg-emerald-700 hover:bg-emerald-800 text-white"
                        )}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : countInBasket > 0 ? (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>In Basket ({countInBasket})</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Produce Detail Modal / Drawer */}
      {selectedProduce && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedProduce(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header in 4K */}
            <div className="relative w-full h-72 bg-gray-900">
              <Image
                src={selectedProduce.image}
                alt={selectedProduce.name}
                fill
                quality={95}
                priority
                sizes="(max-width: 768px) 100vw, 650px"
                className="object-cover ultra-sharp"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <button
                type="button"
                onClick={() => setSelectedProduce(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                  {selectedProduce.badge}
                </span>
                <h3 className="font-serif text-2xl font-bold mt-1">
                  {selectedProduce.name}{" "}
                  {selectedProduce.hindiName && (
                    <span className="text-emerald-300 font-sans text-base">
                      ({selectedProduce.hindiName})
                    </span>
                  )}
                </h3>
                <p className="text-xs text-gray-300 flex items-center gap-2 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>{selectedProduce.farmLocation}</span>
                  <span>•</span>
                  <Clock className="w-3 h-3 text-harvest-300" />
                  <span>{selectedProduce.harvestTime}</span>
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Farm Story & Harvesting
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {selectedProduce.description}
                </p>
              </div>

              {/* Nutritional & Soil Benefits */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Key Nutritional Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedProduce.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-100 flex items-start gap-2 text-xs text-emerald-900 font-medium"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block">Direct Farm Rate</span>
                  <span className="text-2xl font-bold text-emerald-900">
                    {selectedProduce.price}{" "}
                    <span className="text-xs text-gray-500 font-normal">
                      /{selectedProduce.unit}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      handleAddToCart(selectedProduce, e);
                      setSelectedProduce(null);
                    }}
                    leftIcon={<ShoppingBag className="w-4 h-4" />}
                  >
                    Add to Fresh Basket
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

