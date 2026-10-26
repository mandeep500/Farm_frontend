"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupSchema,
  SignupFormData,
  checkPasswordRequirements,
} from "../../schemas/auth.schema";
import { useAuth } from "../../hooks/useAuth";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { Input } from "../../components/ui/Input";
import { PasswordInput } from "../../components/ui/PasswordInput";
import { PasswordRequirements } from "../../components/ui/PasswordRequirements";
import { Button } from "../../components/ui/Button";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { SuccessMessage } from "../../components/ui/SuccessMessage";
import { User, Mail, Phone, ArrowRight, UserCheck } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { register: registerAuth } = useAuth();

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isExistingAccountError, setIsExistingAccountError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password", "");

  const onSubmit = async (data: SignupFormData) => {
    setServerError(null);
    setSuccessMsg(null);
    setIsExistingAccountError(false);

    // Strict frontend validation check before submission
    const pwdCheck = checkPasswordRequirements(data.password);
    if (!pwdCheck.allPassed) {
      setError("password", {
        type: "manual",
        message:
          "Please satisfy all password security requirements before submitting.",
      });
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match. Please ensure both passwords match.",
      });
      return;
    }

    try {
      await registerAuth(data);
      setSuccessMsg(
        "Your Sekhon Farm membership has been created successfully! Redirecting to test page..."
      );
      setTimeout(() => {
        router.push("/test");
      }, 1000);
    } catch (err: any) {
      const msg = err.message || "Failed to create account. Please try again.";
      setServerError(msg);

      // Requirement 29: Support backend error "Account already exists. Please login."
      if (
        err.statusCode === 409 ||
        msg.toLowerCase().includes("account already exists")
      ) {
        setIsExistingAccountError(true);
      }
    }
  };

  return (
    <AuthLayout
      title="Create Farm Membership"
      subtitle="Join our community of patrons, receive seasonal harvest alerts, and manage orders."
      sideQuote="Generational farming is a pact between the earth and the family table. We welcome you to our farm."
      sideAuthor="Sekhon Farm Founders"
    >
      <div className="space-y-6">
        {/* Backend / Server Error Banner */}
        {serverError && (
          <ErrorMessage
            title={
              isExistingAccountError ? "Account Already Exists" : "Registration Failed"
            }
            message={serverError}
            onDismiss={() => {
              setServerError(null);
              setIsExistingAccountError(false);
            }}
            action={
              isExistingAccountError
                ? {
                    label: "Go to Login Page →",
                    onClick: () => router.push("/login"),
                  }
                : undefined
            }
          />
        )}

        {/* Success Banner */}
        {successMsg && (
          <SuccessMessage
            title="Welcome to Sekhon Farm!"
            message={successMsg}
          />
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Full Name */}
          <Input
            label="Full Name"
            placeholder="e.g. Jaswinder Sekhon"
            isRequired
            leftIcon={<User className="w-4 h-4 text-farm-600" />}
            error={errors.name?.message}
            {...register("name")}
          />

          {/* Email Address */}
          <Input
            label="Email Address"
            type="email"
            placeholder="jaswinder@example.com"
            isRequired
            helperText="Test duplicate check: exists@sekhonfarm.com"
            leftIcon={<Mail className="w-4 h-4 text-farm-600" />}
            error={errors.email?.message}
            {...register("email")}
          />

          {/* Contact Phone */}
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 735-4661"
            isRequired
            leftIcon={<Phone className="w-4 h-4 text-farm-600" />}
            error={errors.phone?.message}
            {...register("phone")}
          />

          {/* Password with Live Requirements Checklist */}
          <div>
            <PasswordInput
              label="Password"
              placeholder="Create a strong password (8-18 chars)"
              isRequired
              error={errors.password?.message}
              {...register("password")}
            />

            {/* Live requirements checklist & strength meter */}
            <PasswordRequirements password={passwordValue} showAlways={true} />
          </div>

          {/* Confirm Password */}
          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter your password"
            isRequired
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          {/* Submit Button */}
          <div className="pt-3">
            <Button
              type="submit"
              size="lg"
              variant="primary"
              isLoading={isSubmitting}
              className="w-full font-semibold shadow-md shadow-farm-900/10"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Complete Registration
            </Button>
          </div>
        </form>

        {/* Existing account prompt */}
        <div className="text-center pt-2 border-t border-farm-100">
          <p className="text-xs text-farm-700">
            Already have a registered account?{" "}
            <Link
              href="/login"
              className="font-bold text-farm-800 hover:text-emerald-700 underline underline-offset-2 transition-colors ml-1"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

