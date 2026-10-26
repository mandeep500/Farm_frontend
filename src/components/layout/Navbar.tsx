"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import { APP_CONFIG } from "../../lib/constants";
import { Button } from "../ui/Button";
import {
  Menu,
  X,
  Sprout,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  Shield,
  ChevronDown,
} from "lucide-react";
import { cn } from "../../lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Farm Highlights", href: "/#highlights" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Contact", href: "/#contact" },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-farm-100 py-3"
          : "bg-gradient-to-b from-farm-950/60 to-transparent backdrop-blur-[2px] py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-farm-500 rounded-lg p-1"
            aria-label="Sekhon Farm Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-farm-600 to-farm-800 flex items-center justify-center text-white shadow-md shadow-farm-900/20 group-hover:scale-105 transition-transform duration-200">
              <Sprout className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <span
                className={cn(
                  "font-serif text-xl sm:text-2xl font-bold tracking-tight transition-colors",
                  isScrolled ? "text-farm-950" : "text-white drop-shadow-sm"
                )}
              >
                {APP_CONFIG.name}
              </span>
              <span
                className={cn(
                  "block text-[10px] uppercase font-semibold tracking-widest -mt-1 transition-colors",
                  isScrolled ? "text-farm-600" : "text-farm-200"
                )}
              >
                Organic & Sustainable
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-150",
                  isScrolled
                    ? "text-farm-900 hover:text-farm-700 hover:bg-farm-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <div className="w-20 h-9 bg-farm-100/30 animate-pulse rounded-xl" />
            ) : isAuthenticated && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-1.5 rounded-xl border transition-all text-sm font-medium",
                    isScrolled
                      ? "bg-farm-50/80 border-farm-200 text-farm-950 hover:bg-farm-100"
                      : "bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                  )}
                  aria-expanded={userDropdownOpen}
                >
                  <div className="w-7 h-7 rounded-lg bg-farm-700 text-white flex items-center justify-center text-xs font-bold uppercase shadow-sm">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[120px] truncate">{user.name}</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      userDropdownOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-farm-100 py-2 text-sm text-farm-950 animate-fade-in z-50">
                    <div className="px-4 py-2 border-b border-farm-100">
                      <p className="font-semibold truncate">{user.name}</p>
                      <p className="text-xs text-farm-600 truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-farm-50 text-farm-800 transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-farm-600" />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      href="/under-construction"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-farm-50 text-farm-800 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-farm-600" />
                      <span>Member Portal</span>
                    </Link>

                    <div className="border-t border-farm-100 mt-1 pt-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      isScrolled
                        ? "text-farm-900 hover:text-farm-700 hover:bg-farm-50"
                        : "text-white hover:bg-white/10 hover:text-white"
                    )}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    variant="primary"
                    size="sm"
                    className="shadow-sm"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-farm-500",
                isScrolled
                  ? "text-farm-900 hover:bg-farm-100"
                  : "text-white hover:bg-white/10"
              )}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-farm-100 px-4 pt-3 pb-6 shadow-xl animate-fade-in">
          <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-medium text-farm-900 hover:bg-farm-50 hover:text-farm-700 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-farm-100 mt-2 flex flex-col gap-2">
              {isAuthenticated && user ? (
                <>
                  <div className="px-4 py-2 bg-farm-50 rounded-xl mb-1">
                    <p className="text-xs text-farm-600">Logged in as</p>
                    <p className="font-semibold text-farm-900">{user.name}</p>
                    <p className="text-xs text-farm-500">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-farm-800 font-medium hover:bg-farm-50"
                  >
                    <UserIcon className="w-4 h-4 text-farm-600" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    href="/under-construction"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-farm-800 font-medium hover:bg-farm-50"
                  >
                    <LayoutDashboard className="w-4 h-4 text-farm-600" />
                    <span>Member Portal</span>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-red-600 border-red-200 hover:bg-red-50 mt-1"
                    leftIcon={<LogOut className="w-4 h-4" />}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button variant="primary" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

