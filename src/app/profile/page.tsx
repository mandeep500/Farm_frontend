"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateProfileSchema,
  UpdateProfileFormData,
} from "../../schemas/user.schema";
import { ProtectedRoute } from "../../components/auth/ProtectedRoute";
import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../lib/utils";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { SuccessMessage } from "../../components/ui/SuccessMessage";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  Clock,
  LogOut,
  Edit3,
  X,
  CheckCircle2,
  LayoutDashboard,
  Sprout,
  Save,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    values: {
      name: user?.name || "",
      phone: user?.phone || "",
      bio: user?.bio || "",
    },
  });

  const onUpdateSubmit = async (data: UpdateProfileFormData) => {
    setServerError(null);
    setSuccessMsg(null);
    try {
      await updateProfile(data);
      setSuccessMsg("Profile details updated successfully!");
      setIsEditing(false);
    } catch (err: any) {
      setServerError(
        err.message || "Failed to update profile. Please try again."
      );
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-farm-50/50 pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-farm-200">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full mb-2">
                <Sprout className="w-3.5 h-3.5" />
                <span>Sekhon Farm Patron Member</span>
              </div>
              <h1 className="font-serif text-3xl font-bold text-farm-950">
                My Member Profile
              </h1>
              <p className="text-xs sm:text-sm text-farm-600 mt-1">
                Manage your agricultural membership details, contact preferences, and account status.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/under-construction">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<LayoutDashboard className="w-4 h-4 text-farm-700" />}
                >
                  Member Portal
                </Button>
              </Link>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 border-red-200 hover:bg-red-50"
                leftIcon={<LogOut className="w-4 h-4" />}
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Feedback Alerts */}
          {serverError && (
            <ErrorMessage
              message={serverError}
              onDismiss={() => setServerError(null)}
            />
          )}

          {successMsg && (
            <SuccessMessage
              message={successMsg}
              onDismiss={() => setSuccessMsg(null)}
            />
          )}

          {/* User Profile Card */}
          <div className="bg-white rounded-3xl border border-farm-200/80 shadow-md p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-farm-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-farm-700 to-farm-900 text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md">
                  {user?.name?.charAt(0) || "S"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-farm-950">
                      {user?.name}
                    </h2>
                    <Badge variant="success" className="text-[10px]">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      {user?.status || "ACTIVE"}
                    </Badge>
                  </div>
                  <p className="text-xs text-farm-600 mt-0.5">{user?.email}</p>
                </div>
              </div>

              {!isEditing && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  leftIcon={<Edit3 className="w-4 h-4" />}
                >
                  Edit Profile
                </Button>
              )}
            </div>

            {/* Profile Content: View Mode vs Edit Mode */}
            {isEditing ? (
              <form onSubmit={handleSubmit(onUpdateSubmit)} className="pt-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-farm-950">
                    Edit Account Details
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      reset();
                    }}
                    className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    isRequired
                    error={errors.name?.message}
                    leftIcon={<User className="w-4 h-4 text-farm-600" />}
                    {...register("name")}
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    isRequired
                    error={errors.phone?.message}
                    leftIcon={<Phone className="w-4 h-4 text-farm-600" />}
                    {...register("phone")}
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-farm-950"
                  >
                    Farm Patron Bio & Preferences
                  </label>
                  <textarea
                    id="bio"
                    rows={3}
                    placeholder="Tell us about your organic produce preferences, dietary requirements, or interest in farm events..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-farm-600"
                    {...register("bio")}
                  />
                  {errors.bio && (
                    <p className="text-xs text-red-600">{errors.bio.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setIsEditing(false);
                      reset();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                    leftIcon={<Save className="w-4 h-4" />}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            ) : (
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl bg-farm-50/60 border border-farm-100 space-y-1">
                  <span className="text-[11px] font-semibold text-farm-600 uppercase tracking-wide flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-farm-700" />
                    Full Legal Name
                  </span>
                  <p className="font-semibold text-farm-950 text-sm">
                    {user?.name}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-farm-50/60 border border-farm-100 space-y-1">
                  <span className="text-[11px] font-semibold text-farm-600 uppercase tracking-wide flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-farm-700" />
                    Verified Email Address
                  </span>
                  <p className="font-semibold text-farm-950 text-sm">
                    {user?.email}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-farm-50/60 border border-farm-100 space-y-1">
                  <span className="text-[11px] font-semibold text-farm-600 uppercase tracking-wide flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-farm-700" />
                    Contact Telephone
                  </span>
                  <p className="font-semibold text-farm-950 text-sm">
                    {user?.phone || "Not specified"}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-farm-50/60 border border-farm-100 space-y-1">
                  <span className="text-[11px] font-semibold text-farm-600 uppercase tracking-wide flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-farm-700" />
                    Account Status
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                    <p className="font-semibold text-farm-950 text-sm capitalize">
                      {user?.status?.toLowerCase() || "active"} Patron Account
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-farm-50/60 border border-farm-100 space-y-1">
                  <span className="text-[11px] font-semibold text-farm-600 uppercase tracking-wide flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-farm-700" />
                    Member Since
                  </span>
                  <p className="font-semibold text-farm-950 text-sm">
                    {formatDate(user?.memberSince)}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-farm-50/60 border border-farm-100 space-y-1">
                  <span className="text-[11px] font-semibold text-farm-600 uppercase tracking-wide flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-farm-700" />
                    Last Activity / Login
                  </span>
                  <p className="font-semibold text-farm-950 text-sm">
                    {formatDate(user?.lastLogin)}
                  </p>
                </div>

                {user?.bio && (
                  <div className="sm:col-span-2 p-4 rounded-2xl bg-farm-50/60 border border-farm-100 space-y-1">
                    <span className="text-[11px] font-semibold text-farm-600 uppercase tracking-wide">
                      Patron Biography & Notes
                    </span>
                    <p className="text-xs sm:text-sm text-farm-800 leading-relaxed">
                      {user.bio}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

