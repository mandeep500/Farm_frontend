"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupSchema,
  SignupFormData,
  checkPasswordRequirements,
} from "../../schemas/auth.schema";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../ui/Input";
import { PasswordInput } from "../ui/PasswordInput";
import { PasswordRequirements } from "../ui/PasswordRequirements";
import { Button } from "../ui/Button";
import { ErrorMessage } from "../ui/ErrorMessage";
import { SuccessMessage } from "../ui/SuccessMessage";
import { X, User, Mail, Phone, ArrowRight } from "lucide-react";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

export function SignUpModal({ isOpen, onClose, onSwitchToLogin }: SignUpModalProps) {
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
    reset,
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

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
    setServerError(null);
    setSuccessMsg(null);
    setIsExistingAccountError(false);
    onClose();
  };

  const onSubmit = async (data: SignupFormData) => {
    setServerError(null);
    setSuccessMsg(null);
    setIsExistingAccountError(false);

    const pwdCheck = checkPasswordRequirements(data.password);
    if (!pwdCheck.allPassed) {
      setError("password", {
        type: "manual",
        message: "Please meet all password requirements before submitting.",
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
      await registerAuth(data);
      setSuccessMsg("Account created successfully! Redirecting to test page...");
      setTimeout(() => {
        handleClose();
        router.push("/test");
      }, 1000);
    } catch (err: any) {
      const msg = err.message || "Failed to create account. Please try again.";
      setServerError(msg);

      if (
        err.statusCode === 409 ||
        msg.toLowerCase().includes("account already exists")
      ) {
        setIsExistingAccountError(true);
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (Facebook Style) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50/50">
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Sign Up for Sekhon Farm
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              It&apos;s quick, easy, and connects you to 100% organic living.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-4">
          {serverError && (
            <ErrorMessage
              title={
                isExistingAccountError
                  ? "Account Already Exists"
                  : "Registration Issue"
              }
              message={serverError}
              onDismiss={() => {
                setServerError(null);
                setIsExistingAccountError(false);
              }}
              action={
                isExistingAccountError && onSwitchToLogin
                  ? {
                      label: "Log in instead →",
                      onClick: () => {
                        handleClose();
                        onSwitchToLogin();
                      },
                    }
                  : undefined
              }
            />
          )}

          {successMsg && (
            <SuccessMessage
              title="Welcome to Sekhon Farm!"
              message={successMsg}
            />
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
            <Input
              label="Full Name"
              placeholder="e.g. Jaswinder Sekhon"
              isRequired
              leftIcon={<User className="w-4 h-4 text-farm-600" />}
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com (try exists@sekhonfarm.com for test)"
              isRequired
              leftIcon={<Mail className="w-4 h-4 text-farm-600" />}
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Mobile Number"
              type="tel"
              placeholder="+1 (555) 735-4661"
              isRequired
              leftIcon={<Phone className="w-4 h-4 text-farm-600" />}
              error={errors.phone?.message}
              {...register("phone")}
            />

            <div>
              <PasswordInput
                label="New Password"
                placeholder="8 to 18 characters"
                isRequired
                error={errors.password?.message}
                {...register("password")}
              />
              <PasswordRequirements password={passwordValue} showAlways={true} />
            </div>

            <PasswordInput
              label="Confirm Password"
              placeholder="Re-enter your password"
              isRequired
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <p className="text-[11px] text-gray-500 leading-relaxed pt-1">
              By clicking Sign Up, you agree to Sekhon Farm&apos;s Organic Patron
              Terms, Privacy Policy and Sustainable Harvesting Guidelines.
            </p>

            <div className="pt-2">
              <Button
                type="submit"
                size="lg"
                variant="primary"
                isLoading={isSubmitting}
                className="w-full font-semibold shadow-md bg-emerald-700 hover:bg-emerald-800"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Sign Up
              </Button>
            </div>
          </form>

          {onSwitchToLogin && (
            <div className="text-center pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  onSwitchToLogin();
                }}
                className="text-xs text-farm-800 hover:underline font-semibold"
              >
                Already have an account? Log in
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

