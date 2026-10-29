"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../../schemas/auth.schema";
import { useAuth } from "../../hooks/useAuth";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { Input } from "../../components/ui/Input";
import { PasswordInput } from "../../components/ui/PasswordInput";
import { Button } from "../../components/ui/Button";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { Mail, ArrowRight, ShieldCheck, Sprout } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

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
    <AuthLayout
      title="Log In to Sekhon Farm"
      subtitle="Access your member dashboard, seasonal crop reservations, and harvest orders."
      sideQuote="Real farming is an honest relationship between the farmer, the living soil, and the families we nourish."
      sideAuthor="Sekhon Farm Founders"
    >
      <div className="space-y-6">
        {serverError && (
          <ErrorMessage
            title="Authentication Error"
            message={serverError}
            onDismiss={() => setServerError(null)}
          />
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Email input */}
          <Input
            label="Email Address or Patron ID"
            type="email"
            placeholder="patron@sekhonfarm.com"
            isRequired
            leftIcon={<Mail className="w-4 h-4 text-farm-600" />}
            error={errors.email?.message}
            {...register("email")}
          />

          {/* Password input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-emerald-700 hover:text-emerald-900 font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <PasswordInput
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              size="lg"
              variant="primary"
              isLoading={isSubmitting}
              className="w-full font-semibold shadow-md shadow-emerald-950/20 bg-emerald-700 hover:bg-emerald-800"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Farm Portal
            </Button>
          </div>
        </form>

        {/* Demo Credentials Quick Fill */}
        <div className="p-3.5 rounded-2xl bg-farm-50 border border-farm-200/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-farm-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-[11px] font-medium">Quick Test Demo:</span>
          </div>
          <button
            type="button"
            onClick={handleSetDemoCredentials}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline underline-offset-2"
          >
            Auto-fill Demo Patron
          </button>
        </div>

        {/* Registration Prompt */}
        <div className="text-center pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-600">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/signup"
              className="font-bold text-emerald-700 hover:text-emerald-900 underline underline-offset-2 ml-1"
            >
              Create free membership
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
