import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(60, "Full name must be under 60 characters"),
  phone: z
    .string()
    .min(8, "Please enter a valid contact phone number")
    .max(20, "Phone number is too long")
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
      "Please enter a valid phone number format"
    ),
  bio: z
    .string()
    .max(250, "Bio cannot exceed 250 characters")
    .optional()
    .or(z.literal("")),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

