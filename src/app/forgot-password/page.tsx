"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from "../../schemas/auth.schema";
import { authService } from "../../services/auth.service";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { SuccessMessage } from "../../components/ui/SuccessMessage";
import { Mail, ArrowLeft, Send, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setServerError(null);
    try {
      await authService.forgotPassword(data);
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    } catch (err: any) {
      setServerError(
        err.message || "Unable to send reset email. Please try again."
      );
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter the email associated with your Sekhon Farm account to receive a secure recovery link."
      sideQuote="Trust and security are deeply woven into our family values, online and in the fields."
      sideAuthor="Sekhon Farm Patron Services"
    >
      <div className="space-y-6">
        {serverError && (
          <ErrorMessage
            title="Request Failed"
            message={serverError}
            onDismiss={() => setServerError(null)}
          />
        )}

        {isSubmitted ? (
          <div className="space-y-6 text-center py-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-xl font-bold text-farm-950">
                Recovery Link Dispatched
              </h2>
              <p className="text-xs sm:text-sm text-farm-700 leading-relaxed">
                We have generated a secure password reset link and transmitted it to:
                <br />
                <span className="font-semibold text-farm-950">{submittedEmail}</span>
              </p>
            </div>

            {/* Quick Demo Shortcut */}
            <div className="p-4 bg-farm-50 border border-farm-200/80 rounded-2xl text-left text-xs text-farm-800 space-y-2">
              <p className="font-semibold text-farm-900">
                Development Preview Helper:
              </p>
              <p className="text-farm-700">
                In production, clicking the email link navigates to the reset page.
                For frontend testing, you can proceed directly to:
              </p>
              <Link
                href="/reset-password?token=preview_reset_token"
                className="inline-block px-3 py-1.5 bg-farm-700 text-white font-medium rounded-lg hover:bg-farm-800 text-xs transition-colors"
              >
                Proceed to Reset Password Page →
              </Link>
            </div>

            <div className="pt-2">
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <Input
              label="Account Email Address"
              type="email"
              placeholder="e.g. patron@sekhonfarm.com"
              isRequired
              leftIcon={<Mail className="w-4 h-4 text-farm-600" />}
              error={errors.email?.message}
              {...register("email")}
            />

            <div className="pt-2">
              <Button
                type="submit"
                size="lg"
                variant="primary"
                isLoading={isSubmitting}
                className="w-full font-semibold shadow-md shadow-farm-900/10"
                rightIcon={<Send className="w-4 h-4" />}
              >
                Send Reset Link
              </Button>
            </div>

            <div className="text-center pt-3 border-t border-farm-100">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-farm-700 hover:text-farm-950 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Member Login</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}

