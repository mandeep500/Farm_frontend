import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Full Name is required")
    .min(2, "Full Name must be at least 2 characters")
    .max(80, "Full Name must be under 80 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email Address is required")
    .email("Please enter a valid email address (e.g. name@example.com)"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone Number is required")
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number is too long")
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
      "Please enter a valid phone number (e.g. (555) 000-0000 or +91 98765 43210)"
    ),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters long")
    .max(2500, "Message cannot exceed 2500 characters"),
  // Anti-spam honeypot
  website: z.string().optional(),
  hp_field: z.string().optional(),
  _renderedAt: z.number().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
