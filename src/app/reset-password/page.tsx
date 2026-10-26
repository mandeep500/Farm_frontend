"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordFormData,
  checkPasswordRequirements,
} from "../../schemas/auth.schema";
import { authService } from "../../services/auth.service";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { PasswordInput } from "../../components/ui/PasswordInput";
import { PasswordRequirements } from "../../components/ui/PasswordRequirements";
import { Button } from "../../components/ui/Button";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { Loader } from "../../components/ui/Loader";
import { ArrowRight, CheckCircle2 } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "mock_token";

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password", "");

  const onSubmit = async (data: ResetPasswordFormData) => {
    setServerError(null);

    // Verify rules
    const pwdCheck = checkPasswordRequirements(data.password);
    if (!pwdCheck.allPassed) {
      setError("password", {
        type: "manual",
        message: "Please meet all password requirements before updating.",
      });
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match.",
      });
      return;
    }

    try {
      await authService.resetPassword({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      setIsSuccess(true);
    } catch (err: any) {
      setServerError(
        err.message || "Failed to reset password. Please request a new link."
      );
    }
  };

  return (
    <div className="space-y-6">
      {serverError && (
        <ErrorMessage
          title="Update Failed"
          message={serverError}
          onDismiss={() => setServerError(null)}
        />
      )}

      {isSuccess ? (
        <div className="space-y-6 text-center py-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-farm-950">
              Password Successfully Reset
            </h2>
            <p className="text-xs sm:text-sm text-farm-700 leading-relaxed">
              Your credentials have been securely updated. You may now sign in
              with your new password.
            </p>
          </div>

          <div className="pt-2">
            <Link href="/login">
              <Button
                size="lg"
                variant="primary"
                className="w-full shadow-md font-semibold"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Proceed to Login
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <PasswordInput
              label="New Password"
              placeholder="Enter 8-18 character secure password"
              isRequired
              error={errors.password?.message}
              {...register("password")}
            />
            <PasswordRequirements password={passwordValue} showAlways={true} />
          </div>

          <PasswordInput
            label="Confirm New Password"
            placeholder="Re-enter your new password"
            isRequired
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <div className="pt-3">
            <Button
              type="submit"
              size="lg"
              variant="primary"
              isLoading={isSubmitting}
              className="w-full font-semibold shadow-md shadow-farm-900/10"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Set New Password
            </Button>
          </div>

          <div className="text-center pt-2 border-t border-farm-100">
            <Link
              href="/login"
              className="text-xs font-semibold text-farm-700 hover:text-farm-950 transition-colors"
            >
              Cancel and return to Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Create New Password"
      subtitle="Ensure your new password complies with Sekhon Farm account security standards."
      sideQuote="We guard your account data with the same diligence we safeguard our organic heritage."
      sideAuthor="Sekhon Farm Security"
    >
      <Suspense fallback={<Loader text="Loading password reset..." />}>
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}

