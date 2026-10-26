"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProtectedRoute } from "../../components/auth/ProtectedRoute";
import { useAuth } from "../../hooks/useAuth";
import { APP_CONFIG } from "../../lib/constants";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { SuccessMessage } from "../../components/ui/SuccessMessage";
import {
  Sprout,
  Construction,
  Clock,
  Sparkles,
  ShoppingBag,
  Calendar,
  Layers,
  ArrowRight,
  User,
  Mail,
  Home,
  CheckCircle2,
} from "lucide-react";

export default function UnderConstructionPage() {
  const { user } = useAuth();
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySuccess, setNotifySuccess] = useState(false);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail.trim()) {
      setNotifySuccess(true);
      setNotifyEmail("");
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-farm-50/60 pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Main Hero Card */}
          <div className="relative rounded-3xl overflow-hidden bg-farm-950 text-white shadow-2xl border border-farm-800">
            {/* Background farm scenery */}
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80"
                alt="Sekhon Farm rolling green hills"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center opacity-30 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-farm-950 via-farm-950/80 to-farm-900/60" />
            </div>

            <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-4xl">
              {/* Early Access & Welcome Badge */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-harvest-500/20 border border-harvest-400/40 text-harvest-300 text-xs font-semibold">
                  <Construction className="w-3.5 h-3.5" />
                  Website Under Construction
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-harvest-300" />
                  Patron Portal Early Access v1.0
                </span>
              </div>

              {/* Greeting */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
                Welcome to{" "}
                <span className="text-emerald-300">{APP_CONFIG.name}</span>
                {user?.name && (
                  <span className="block text-2xl sm:text-3xl text-farm-200 font-sans font-normal mt-2">
                    Hello, {user.name}!
                  </span>
                )}
              </h1>

              {/* Message */}
              <p className="text-base sm:text-lg text-farm-100/90 leading-relaxed mb-8 max-w-2xl font-light">
                Our digital farmgate and member portal are currently undergoing
                final agricultural calibration. Soon, you will be able to manage
                fresh farm CSA boxes, reserve guided orchard walking tours, and order
                direct-to-door heirloom crops.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/profile">
                  <Button
                    size="lg"
                    variant="primary"
                    className="font-semibold shadow-lg"
                    leftIcon={<User className="w-4 h-4" />}
                  >
                    View My Member Profile
                  </Button>
                </Link>

                <Link href="/test">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="font-semibold shadow-lg"
                    leftIcon={<Sparkles className="w-4 h-4" />}
                  >
                    Go to Test Page
                  </Button>
                </Link>

                <Link href="/#contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                    leftIcon={<Mail className="w-4 h-4 text-emerald-300" />}
                  >
                    Contact Farm Management
                  </Button>
                </Link>

                <Link href="/">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-farm-200 hover:text-white hover:bg-white/10"
                    leftIcon={<Home className="w-4 h-4" />}
                  >
                    Return to Homepage
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Coming Soon Feature Highlights */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-farm-200/80 pb-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-farm-950">
                  Upcoming Patron Services
                </h2>
                <p className="text-xs sm:text-sm text-farm-600 mt-1">
                  Features currently in active development for the Next.js + Fastify + Prisma release.
                </p>
              </div>
              <Badge variant="farm" className="self-start sm:self-center">
                Launch Phase Q4
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-white border border-farm-200 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-farm-100 border border-farm-200 flex items-center justify-center text-farm-700">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-farm-950">
                  Seasonal CSA Subscriptions
                </h3>
                <p className="text-xs sm:text-sm text-farm-700 leading-relaxed">
                  Curated weekly or bi-weekly farm boxes delivered straight from
                  our harvest fields to your doorstep.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Harvesting System Integrated</span>
                </div>
              </Card>

              <Card className="p-6 bg-white border border-farm-200 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-harvest-100 border border-harvest-200 flex items-center justify-center text-harvest-700">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-farm-950">
                  Estate Tour Bookings
                </h3>
                <p className="text-xs sm:text-sm text-farm-700 leading-relaxed">
                  Schedule weekend educational walkthroughs, honey extraction
                  workshops, and organic soil masterclasses.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Reservation Engine Ready</span>
                </div>
              </Card>

              <Card className="p-6 bg-white border border-farm-200 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-earth-100 border border-earth-200 flex items-center justify-center text-earth-800">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-farm-950">
                  Soil & Carbon Telemetry
                </h3>
                <p className="text-xs sm:text-sm text-farm-700 leading-relaxed">
                  Live transparency dashboards detailing soil organic matter,
                  rain capture stats, and solar irrigation logs.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Data Pipelines Configured</span>
                </div>
              </Card>
            </div>
          </div>

          {/* VIP Notification Signup Form */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-farm-200/80 shadow-md">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <div className="w-10 h-10 rounded-xl bg-farm-100 text-farm-700 flex items-center justify-center mx-auto">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-farm-950">
                Receive Launch Priority Notification
              </h3>
              <p className="text-xs sm:text-sm text-farm-600">
                Enter your preferred email address to be first in line when full CSA ordering and farm reservation opens.
              </p>

              {notifySuccess ? (
                <SuccessMessage
                  title="Priority Notification Registered"
                  message="Thank you! We've noted your email for immediate priority access on launch day."
                  onDismiss={() => setNotifySuccess(false)}
                />
              ) : (
                <form
                  onSubmit={handleNotifySubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2"
                >
                  <input
                    type="email"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-farm-600"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Notify Me
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

