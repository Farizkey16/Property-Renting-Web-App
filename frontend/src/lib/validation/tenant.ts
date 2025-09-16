import { z } from "zod";

export const registerTenantSchema = z.object({
  email: z.string().email("Invalid email"),
  company_name: z.string().min(3, "Company name must be at least 3 characters"),
  address: z.string().min(1, "Address is required"),
  phone_number: z
    .string()
    .regex(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits"),
  logo: z
    .instanceof(File, { message: "Logo is required" })
    .refine((file) => file.size > 0, "Logo file cannot be empty")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      "Logo must be a valid image (jpg, png, jpg)"
    ),
});

export type RegisterTenantSchema = z.infer<typeof registerTenantSchema>;
