"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../schemas/auth.schema";
import { useAuth } from "../hooks/useAuth";
import { APP_CONFIG } from "../lib/constants";
import { SignUpModal } from "../components/auth/SignUpModal";
import { PasswordInput } from "../components/ui/PasswordInput";
import { Button } from "../components/ui/Button";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import {
  Sprout,
  Mail,
  Heart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function FacebookStyleHomePage() {
  const router = useRouter();
  const { login, isAuthenticated, user, isLoading } = useAuth();

  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // If already logged in, offer quick jump to test page
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/test");
    }
  }, [isAuthenticated, router]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    try {
      await login(data);
      router.push("/test");
    } catch (err: any) {
      setServerError(
        err.message || "Invalid credentials. Please verify your email and password."
      );
    }
  };

  const handleSetDemoCredentials = () => {
    setValue("email", "demo@sekhonfarm.com");
    setValue("password", "Sekhon#2026");
    setServerError(null);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col justify-between">
      {/* Main Split Section (Exact Facebook Layout Structure) */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-10 lg:py-16">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Sekhon Farm Logo + Floating Collage Cards + Headline */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/20">
                <Sprout className="w-7 h-7" />
              </div>
              <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-emerald-800">
                {APP_CONFIG.name}
              </span>
            </div>

            {/* Collage Showcase (matching Facebook's visual cards) */}
            <div className="relative w-full max-w-lg aspect-[16/11] select-none">
              {/* Main Card: Fresh Organic Harvest */}
              <div className="absolute top-2 left-6 right-12 bottom-6 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-emerald-950">
                <Image
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=900&q=80"
                  alt="Sekhon Farm farmers in sunlight with organic produce"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Clock / Harvest Pill Badge in top right */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-800/90 text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-md backdrop-blur-sm">
                  <span>⏱️ 07:15 AM Fresh Harvest</span>
                </div>
              </div>

              {/* Floating Emoji Pill (top-left) */}
              <div className="absolute -top-2 left-0 px-3.5 py-2 rounded-2xl bg-white shadow-xl border border-gray-100 flex items-center gap-2 animate-bounce-slow">
                <span className="text-xl">🌾</span>
                <span className="text-xs font-bold text-gray-800">
                  100% Non-GMO
                </span>
              </div>

              {/* Overlapping Lower Card (left bottom): Heirloom Vegetables */}
              <div className="absolute -bottom-2 -left-2 w-48 h-36 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-farm-900">
                <Image
                  src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=500&q=80"
                  alt="Freshly harvested heirloom vegetables"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold">
                  Living Soil
                </div>
              </div>

              {/* Overlapping Circle Avatar with emerald ring */}
              <div className="absolute bottom-1 right-24 w-16 h-16 rounded-full overflow-hidden shadow-2xl border-4 border-white ring-4 ring-emerald-500 bg-white">
                <Image
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80"
                  alt="Happy patron of Sekhon Farm"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              {/* Floating Heart Reaction Pill */}
              <div className="absolute bottom-10 right-8 w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 shadow-xl border-2 border-white flex items-center justify-center text-white">
                <Heart className="w-5 h-5 fill-current" />
              </div>
            </div>

            {/* Headline (Matching Facebook: "Explore the things you love.") */}
            <div className="space-y-1">
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Cultivate
                <br />
                the purity{" "}
                <span className="text-emerald-700">you love.</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600 max-w-md pt-2">
                Connect with Sekhon Farm for chemical-free heirloom produce,
                regenerative soil nutrition, and generational trust.
              </p>
            </div>
          </div>

          {/* Right Column: Clean Login Card (Matching Facebook's Right Form) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto bg-white p-7 sm:p-9 rounded-2xl shadow-xl border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                Log in to Sekhon Farm
              </h2>

              {serverError && (
                <ErrorMessage
                  title="Login Error"
                  message={serverError}
                  onDismiss={() => setServerError(null)}
                  className="mb-4"
                />
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                {/* Email or Phone Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Email address or mobile number"
                    className="w-full px-4 py-3.5 text-base rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent placeholder:text-gray-400"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 font-medium mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Input with show/hide */}
                <div>
                  <PasswordInput
                    placeholder="Password"
                    className="py-3.5 text-base"
                    error={errors.password?.message}
                    {...register("password")}
                  />
                </div>

                {/* Solid Log In Button */}
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  isLoading={isSubmitting}
                  className="w-full py-3.5 text-base font-bold bg-emerald-700 hover:bg-emerald-800 shadow-md"
                >
                  Log In
                </Button>

                {/* Forgotten password link */}
                <div className="text-center pt-1">
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-emerald-800 hover:underline hover:text-emerald-950 transition-colors"
                  >
                    Forgotten password?
                  </Link>
                </div>

                {/* Subtle Divider Line */}
                <hr className="my-5 border-gray-200" />

                {/* Create New Account Button (Opens SignUpModal) */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsSignUpOpen(true)}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm"
                  >
                    Create new account
                  </button>
                </div>
              </form>

              {/* Demo Credentials Quick-Fill helper */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1 text-gray-600">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Testing credentials:
                </span>
                <button
                  type="button"
                  onClick={handleSetDemoCredentials}
                  className="text-emerald-700 font-bold hover:underline"
                >
                  Auto-fill Demo Patron
                </button>
              </div>
            </div>

            {/* Subtle branding tagline below card */}
            <p className="text-center text-xs text-gray-500 mt-6 max-w-sm mx-auto">
              🌱 <span className="font-semibold text-gray-700">Sekhon Farm</span> for Organic & Sustainable Living.
            </p>
          </div>
        </div>
      </main>

      {/* Facebook-Style Clean Footer */}
      <footer className="w-full bg-white border-t border-gray-200 py-6 px-4 sm:px-8 text-xs text-gray-500 space-y-2">
        <div className="max-w-6xl mx-auto">
          {/* Languages Row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-600 pb-2">
            <span className="font-semibold text-gray-800">English (US)</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">ਪੰਜਾਬੀ</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">हिन्दी</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Español</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Français (France)</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Deutsch</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Italiano</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Português (Brasil)</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">العربية</span>
            <span>·</span>
            <button
              type="button"
              className="px-2 py-0.5 rounded bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200 text-[10px] font-bold"
            >
              +
            </button>
          </div>

          <div className="border-t border-gray-200 pt-3 flex flex-wrap items-center justify-between gap-3 text-[11px]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <Link href="/login" className="hover:underline">Log In</Link>
              <button
                type="button"
                onClick={() => setIsSignUpOpen(true)}
                className="hover:underline text-left"
              >
                Sign Up
              </button>
              <Link href="/test" className="hover:underline font-semibold text-emerald-800">
                Test Page
              </Link>
              <Link href="/forgot-password" className="hover:underline">Password Recovery</Link>
              <span className="hover:underline cursor-pointer">Organic Standards</span>
              <span className="hover:underline cursor-pointer">Privacy Policy</span>
              <span className="hover:underline cursor-pointer">Terms of Service</span>
            </div>

            <p className="text-gray-400">
              {APP_CONFIG.name} © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>

      {/* Facebook-style Sign Up Modal */}
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      />
    </div>
  );
}
