import { Category } from "@prisma/client";
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, { message: "The name must be at least 3 characters long" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
  status: z.enum(["draft", "published", "archived"]),
  price: z.string().min(1, "Price is required"),
  currency: z.enum(["₺", "$", "Rp"], { message: "Currency is required" }), // Ensure currency is one of the provided options
  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.enum(["fashion", "electronics", "food", "others", "exchanges", "baggages"]),
  location: z.string().min(1, "Location is required"),
  SellerPhone: z.string().min(1, "Phone is required"),
});

export const verificationSchema = z.object({
  name: z.string().min(3, { message: "The name must be at least 3 characters long" }),
  address: z.string().min(10, { message: "Address must be at least 10 characters long" }),
  email: z.string().email("Invalid email address"), // Validate email format
  identityNumber: z.string().min(10, { message: "Identity number must be at least 10 characters long" }),
  photoUrl: z.array(z.string()).min(1, "At least one image is required"),
  studentDocument: z.array(z.string()).min(1, "At least one document is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
});

export const shopSchema = z.object({
  name: z.string().min(1, "Shop name is required"),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
  location: z.string().min(1, "Location is required"),
  shopImage: z.array(z.string()).min(1, "At least one image is required"),
});

export const productFilterSchema = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
});

export type ProductFilterValues = z.infer<typeof productFilterSchema>;
