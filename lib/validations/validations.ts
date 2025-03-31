import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3, "Name is required"),
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  universityId: z.coerce.number().min(1, "University id is required"),
  universityCard: z.string().nonempty("University card is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not be longer than 20 characters"),
});

export const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not be longer than 20 characters"),
});
