import { z } from "zod";

export const formSchema = z
  .object({
    fname: z
      .string()
      .min(2, { message: "First name must be at least 2 characters long" }),
    lname: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters long" }),
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 8 characters long" }),
    date: z.string().min(1, { message: "Date is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
