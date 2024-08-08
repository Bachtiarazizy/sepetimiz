import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, { message: "The name has to be a min character length of 5" }),
  description: z.string().min(10, { message: "Description is required" }),
  status: z.enum(["draft", "published", "archived"]),
  price: z.string().min(1, "Price is required"),
  currency: z.enum(["₺", "$", "Rp"]).refine((value) => value !== undefined, {
    message: "Currency is required",
  }), // Ensure currency is selected
  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.enum(["fashion", "electronics", "food", "others", "exchanges", "baggages"]),
  location: z.string().min(1, "Location is required"),
  SellerPhone: z.string().min(1, "Phone is required"),
});

export const verificationSchema = z.object({
  name: z.string().min(3, { message: "The name has to be a min character length of 5" }),
  address: z.string().min(10, { message: "Address is required" }),
  email: z.string().min(10, { message: "Email is required" }),
  identityNumber: z.string().min(10, { message: "identityNumber is required" }),
  photoUrl: z.array(z.string()).min(1, "At least one image is required"),
  studentDocument: z.array(z.string()).min(1, "At least one image is required"),
  phoneNumber: z.string().min(1, "Phone is required"),
});

export const shopSchema = z.object({
  name: z.string().min(1, "Shop name is required"),
  description: z.string().min(10, { message: "Description is required" }),
  location: z.string().min(1, "Location is required"),
  shopImage: z.array(z.string()).min(1, "At least one image is required"),
});

export const productFilterSchema = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
  category: z.enum(["fashion", "electronics", "food", "others", "exchanges", "baggages"]).optional(),
});

export type ProductFilterValues = z.infer<typeof productFilterSchema>;
