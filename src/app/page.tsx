"use client";

import React, { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { HeroSection } from "../components/home/HeroSection";
import { VegetableCategoriesBar } from "../components/home/VegetableCategoriesBar";
import { ProduceShowcase } from "../components/home/ProduceShowcase";
import { FarmingStorySection } from "../components/home/FarmingStorySection";
import { HighlightsSection } from "../components/home/HighlightsSection";
import { AboutSection } from "../components/home/AboutSection";
import { GallerySection } from "../components/home/GallerySection";
import { ContactSection } from "../components/home/ContactSection";
import { Footer } from "../components/layout/Footer";
import { SignUpModal } from "../components/auth/SignUpModal";

export default function HomePage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    // Smooth scroll down to produce section if not in view
    const produceElement = document.getElementById("produce");
    if (produceElement) {
      const topOffset = produceElement.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 text-gray-900 flex flex-col font-sans">
      {/* Top Main Navigation Bar */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section with Warm Sunrise Farmland Imagery */}
        <HeroSection />

        {/* Horizontal Vegetable Category Bar (Matching User Screenshot with Onion, Potato, Carrot, Lady Finger & more) */}
        <VegetableCategoriesBar
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={handleSelectCategory}
        />

        {/* Daily Fresh Produce Harvest Grid */}
        <ProduceShowcase
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={handleSelectCategory}
        />

        {/* Farming Photo Showcase: Real Farming & Living Soil in Action */}
        <FarmingStorySection />

        {/* Core Farm Highlights */}
        <HighlightsSection />

        {/* Heritage Story & Living Soil Principles */}
        <AboutSection />

        {/* Comprehensive Photo Gallery */}
        <GallerySection />

        {/* Contact & Farm Visits */}
        <ContactSection />
      </main>

      {/* Farm Footer */}
      <Footer />

      {/* Sign Up Modal */}
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      />
    </div>
  );
}
