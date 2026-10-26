import { z } from "zod";

export interface PasswordRuleResult {
  id: string;
  label: string;
  satisfied: boolean;
}

export function checkPasswordRequirements(password: string): {
  rules: PasswordRuleResult[];
  allPassed: boolean;
  score: number; // 0 to 4
  strengthLabel: "Weak" | "Fair" | "Good" | "Strong";
  strengthColor: string;
} {
  const rules: PasswordRuleResult[] = [
    {
      id: "length",
      label: "8 to 18 characters",
      satisfied: password.length >= 8 && password.length <= 18,
    },
    {
      id: "uppercase",
      label: "At least one uppercase letter (A-Z)",
      satisfied: /[A-Z]/.test(password),
    },
    {
      id: "lowercase",
      label: "At least one lowercase letter (a-z)",
      satisfied: /[a-z]/.test(password),
    },
    {
      id: "number",
      label: "At least one number (0-9)",
      satisfied: /[0-9]/.test(password),
    },
    {
      id: "special",
      label: "At least one special character (!@#$%^&*...)",
      satisfied: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password),
    },
  ];

  const satisfiedCount = rules.filter((r) => r.satisfied).length;
  const allPassed = satisfiedCount === rules.length;

  let strengthLabel: "Weak" | "Fair" | "Good" | "Strong" = "Weak";
  let strengthColor = "bg-red-500";
  let score = 0;

  if (password.length === 0) {
    score = 0;
    strengthLabel = "Weak";
    strengthColor = "bg-gray-200";
  } else if (satisfiedCount <= 2) {
    score = 1;
    strengthLabel = "Weak";
    strengthColor = "bg-red-500";
  } else if (satisfiedCount === 3) {
    score = 2;
    strengthLabel = "Fair";
    strengthColor = "bg-amber-500";
  } else if (satisfiedCount === 4) {
    score = 3;
    strengthLabel = "Good";
    strengthColor = "bg-blue-500";
  } else if (allPassed) {
    score = 4;
    strengthLabel = "Strong";
    strengthColor = "bg-emerald-600";
  }

  return {
    rules,
    allPassed,
    score,
    strengthLabel,
    strengthColor,
  };
}

export const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(18, "Password cannot exceed 18 characters")
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Password must contain at least one number",
  })
  .refine(
    (val) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(val),
    {
      message: "Password must contain at least one special character",
    }
  );

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(60, "Full name must be under 60 characters"),
    email: z
      .string()
      .min(1, "Email address is required")
      .email("Please enter a valid email address"),
    phone: z
      .string()
      .min(8, "Please enter a valid contact phone number")
      .max(20, "Phone number is too long")
      .regex(
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
        "Please enter a valid phone number format"
      ),
    password: passwordValidation,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match. Please ensure both passwords match.",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match. Please ensure both passwords match.",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

