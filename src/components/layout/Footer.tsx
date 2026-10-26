"use client";

import React from "react";
import Link from "next/link";
import { APP_CONFIG } from "../../lib/constants";
import {
  Sprout,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  ShieldCheck,
  Heart,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-farm-950 text-farm-100 border-t border-farm-900/60 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-farm-400 rounded-lg"
              aria-label="Sekhon Farm Home"
            >
              <div className="w-10 h-10 rounded-xl bg-farm-700 flex items-center justify-center text-white shadow-md">
                <Sprout className="w-6 h-6 text-emerald-300" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                {APP_CONFIG.name}
              </span>
            </Link>

            <p className="text-sm text-farm-200/80 leading-relaxed max-w-sm">
              {APP_CONFIG.description}
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-farm-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Certified Organic Practices & 100% Non-GMO Crops</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-3" aria-label="Social Media Links">
              <a
                href={APP_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-farm-900 hover:bg-farm-800 text-farm-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={APP_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-farm-900 hover:bg-farm-800 text-farm-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={APP_CONFIG.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-farm-900 hover:bg-farm-800 text-farm-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={APP_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-farm-900 hover:bg-farm-800 text-farm-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-farm-400">
              Explore Farm
            </h3>
            <ul className="space-y-2.5 text-sm">
              {APP_CONFIG.footerLinks.quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-farm-200/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sustainable Practices */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-farm-400">
              Practices & Heritage
            </h3>
            <ul className="space-y-2.5 text-sm">
              {APP_CONFIG.footerLinks.practices.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-farm-200/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {APP_CONFIG.footerLinks.legal.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-farm-300/60 hover:text-white transition-colors text-xs"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-farm-400">
              Contact & Visit
            </h3>
            <ul className="space-y-3 text-sm text-farm-200/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-farm-400 shrink-0 mt-1" />
                <span className="text-xs leading-relaxed">{APP_CONFIG.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-farm-400 shrink-0" />
                <a
                  href={`tel:${APP_CONFIG.contact.phone.replace(/\D/g, "")}`}
                  className="hover:text-white transition-colors text-xs"
                >
                  {APP_CONFIG.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-farm-400 shrink-0" />
                <a
                  href={`mailto:${APP_CONFIG.contact.email}`}
                  className="hover:text-white transition-colors text-xs"
                >
                  {APP_CONFIG.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-farm-400 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{APP_CONFIG.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 border-t border-farm-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-farm-300/70">
          <p>
            © {currentYear} {APP_CONFIG.name}. All rights reserved. Cultivating Purity,
            Heritage & Trust.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Grown sustainably with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>and regenerative farming</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

