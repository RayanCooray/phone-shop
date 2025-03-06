import { z } from "zod";

export const signUpSchema = z
  .object({
    fullName: z.string().min(3, "Full name must be at least 3 characters."),
    email: z.string().email("Invalid email format."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
