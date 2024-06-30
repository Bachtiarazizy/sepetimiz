"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ZodStringDef, z } from "zod";
import { redirect } from "next/navigation";
import { CategoryTypes } from "@prisma/client";
import prisma from "@/lib/db";

export type State = {
  status: "error" | "success" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

const productSchema = z.object({
  name: z.string().min(3, { message: "The name has to be a min charackter length of 5" }),
  category: z.string().min(1, { message: "Category is required" }),
  price: z.string().min(1, { message: "The Price has to be bigger then 1" }),
  description: z.string().min(10, { message: "Description is required" }),
  images: z.array(z.string(), { message: "Images are required" }),
  location: z.string().min(1, { message: "Location is required" }),
  SellerPhone: z.string().min(10, { message: "Phone is required" }),
});

export async function SellProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Something went wrong");
  }

  const validateFields = productSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    price: formData.get("price"),
    description: formData.get("description"),
    images: JSON.parse(formData.get("images") as string),
    location: formData.get("location"),
    SellerPhone: formData.get("SellerPhone"),
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    };

    return state;
  }

  const data = await prisma.product.create({
    data: {
      name: validateFields.data.name,
      category: validateFields.data.category as CategoryTypes,
      description: validateFields.data.description,
      price: validateFields.data.price,
      images: validateFields.data.images,
      SellerPhone: validateFields.data.SellerPhone,
      location: validateFields.data.location,
      userId: user.id,
    },
  });

  return redirect(`/product/${data.id}`);
}
