import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(["draft", "published", "archived"]),
  price: z.string().min(1),
  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.enum(["fashion", "electronics", "food", "others", "exchanges", "baggages"]),
  location: z.string().min(1),
  SellerPhone: z.string().min(1),
});
