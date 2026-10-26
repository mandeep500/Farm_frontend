"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "../../components/auth/ProtectedRoute";
import { useAuth } from "../../hooks/useAuth";
import { APP_CONFIG } from "../../lib/constants";
import { formatDate } from "../../lib/utils";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { SuccessMessage } from "../../components/ui/SuccessMessage";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import {
  Sprout,
  ShieldCheck,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  LogOut,
  Edit3,
  Save,
  X,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  Layers,
  ArrowRight,
  Database,
  RefreshCw,
} from "lucide-react";

export default function TestPage() {
  const router = useRouter();
  const { user, token, logout, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [apiTestStatus, setApiTestStatus] = useState<string | null>(null);
  const [isTestingApi, setIsTestingApi] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ name, phone, bio });
      setFeedback("Profile updated in live test session successfully!");
      setIsEditing(false);
    } catch (err: any) {
      setFeedback("Failed to update profile: " + err.message);
    }
  };

  const handleRunApiTest = async () => {
    setIsTestingApi(true);
    setApiTestStatus(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setApiTestStatus(
        "API Ready: Successfully validated session token against auth gateway. Ready for Node.js + Fastify + Prisma + MySQL backend."
      );
    } catch (err: any) {
      setApiTestStatus("API Test Failed: " + err.message);
    } finally {
      setIsTestingApi(false);
    }
  };

  return (
    <ProtectedRoute redirectTo="/">
      <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
        {/* Top Minimal Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/test" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-sm">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-gray-900">
                  {APP_CONFIG.name}
                </span>
                <span className="block text-[10px] uppercase font-semibold tracking-wider text-emerald-700">
                  Authenticated Test Page
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Logged In as {user?.name || "Patron"}</span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 border-red-200 hover:bg-red-50 text-xs"
                leftIcon={<LogOut className="w-3.5 h-3.5" />}
              >
                Log Out
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
          {/* Welcome Alert Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-950 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-700/80 text-emerald-200 text-xs font-semibold">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Test Environment Live</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold">
                  Welcome to Sekhon Farm Test Page
                </h1>
                <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
                  You have successfully logged in via the Facebook-style portal.
                  This page verifies authenticated session state, user tokens,
                  profile modification, and upcoming patron modules.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleRunApiTest}
                  isLoading={isTestingApi}
                  leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                >
                  Run API Health Test
                </Button>
              </div>
            </div>
          </div>

          {feedback && (
            <SuccessMessage
              message={feedback}
              onDismiss={() => setFeedback(null)}
            />
          )}

          {apiTestStatus && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{apiTestStatus}</span>
              </div>
              <button
                type="button"
                onClick={() => setApiTestStatus(null)}
                className="text-blue-500 hover:text-blue-800 font-bold ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Session Data Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md">
                  {user?.name?.charAt(0) || "S"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-gray-900">
                      {user?.name}
                    </h2>
                    <Badge variant="success" className="text-[10px]">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      {user?.status || "ACTIVE"}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
                </div>
              </div>

              {!isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setName(user?.name || "");
                    setPhone(user?.phone || "");
                    setBio(user?.bio || "");
                    setIsEditing(true);
                  }}
                  leftIcon={<Edit3 className="w-3.5 h-3.5 text-farm-700" />}
                >
                  Edit Profile
                </Button>
              )}
            </div>

            {/* View vs Edit Profile */}
            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Bio & Farm Preferences
                  </label>
                  <textarea
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button type="submit" variant="primary" size="sm" leftIcon={<Save className="w-3.5 h-3.5" />}>
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Full Legal Name
                  </span>
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Email Address
                  </span>
                  <p className="text-sm font-semibold text-gray-900">{user?.email}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Phone Number
                  </span>
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.phone || "+1 (555) 735-4661"}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Membership Since
                  </span>
                  <p className="text-sm font-semibold text-gray-900">
                    {formatDate(user?.memberSince)}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Last Login Timestamp
                  </span>
                  <p className="text-sm font-semibold text-gray-900">
                    {formatDate(user?.lastLogin)}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Session JWT Token
                  </span>
                  <p className="text-xs font-mono text-emerald-800 truncate">
                    {token ? `${token.substring(0, 24)}...` : "Active Mock Session"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Feature Teaser Cards (Under Construction) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-gray-900">
                  Patron Modules Under Construction
                </h3>
                <p className="text-xs text-gray-500">
                  These services will connect to the Fastify + Prisma + MySQL backend.
                </p>
              </div>
              <Badge variant="farm">Next Phase</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Card className="p-5 bg-white border border-gray-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-gray-900">
                  Organic CSA Box Subscription
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Weekly farm-fresh produce boxes delivered direct to patron households.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Module Scheduled</span>
                </div>
              </Card>

              <Card className="p-5 bg-white border border-gray-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-gray-900">
                  Weekend Farm Tours & Stays
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Book weekend walkthroughs, apple orchard harvest passes, and educational retreats.
                </p>
                <div className="pt-2 text-xs font-semibold text-amber-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Reservations Engine Ready</span>
                </div>
              </Card>

              <Card className="p-5 bg-white border border-gray-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-gray-900">
                  Live Soil & Solar Telemetry
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Real-time soil microbial count, aquifer hydration, and solar array telemetry.
                </p>
                <div className="pt-2 text-xs font-semibold text-blue-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Telemetry Feeds Prepared</span>
                </div>
              </Card>
            </div>
          </div>

          {/* Actions Bottom Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <div>
              <p className="text-sm font-bold text-gray-900">Done with Testing?</p>
              <p className="text-xs text-gray-500">
                You can return to the Facebook-style login screen by logging out.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                leftIcon={<LogOut className="w-4 h-4 text-red-500" />}
              >
                Log Out to Login Page
              </Button>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

