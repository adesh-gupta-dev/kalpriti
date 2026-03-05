import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password is too long");

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verifyOtpSchema = z.object({
  otp: z.string().trim().min(4, "OTP is required").max(8, "Invalid OTP"),
});

export const projectCreateSchema = z.object({
  websiteName: z.string().trim().min(2, "Website name is required"),
  initialPrompt: z.string().trim().min(8, "Describe what you want to build"),
});

export const projectEditSchema = z.object({
  websiteName: z.string().trim().min(2, "Website name is required"),
  prompt: z.string().trim().optional(),
});

export const chatMessageSchema = z.object({
  content: z.string().trim().min(1, "Message is required"),
});

export const saveVersionSchema = z.object({
  description: z.string().trim().min(2, "Description is required"),
});
