"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { productSchema, shopSchema, verificationSchema } from "@/lib/zodSchemas";
import { parseWithZod } from "@conform-to/zod";

export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) => urlString.split(",").map((url) => url.trim()));

  // Retrieve the shop associated with the user
  const shop = await prisma.shop.findFirst({
    where: {
      userId: user.id, // Use userId to find the shop
    },
    select: {
      id: true,
    },
  });

  if (!shop) {
    throw new Error("Shop not found for the user");
  }

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      currency: submission.value.currency,
      images: flattenUrls,
      category: submission.value.category,
      location: submission.value.location,
      SellerPhone: submission.value.SellerPhone,
      shop: { connect: { id: shop.id } }, // Connect to the shop
    },
  });

  redirect("/Dashboard/products");
}

export async function editProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) => urlString.split(",").map((url) => url.trim()));

  // Retrieve the shop associated with the user
  const shop = await prisma.shop.findFirst({
    where: {
      userId: user.id, // Use userId to find the shop
    },
    select: {
      id: true,
    },
  });

  if (!shop) {
    throw new Error("Shop not found for the user");
  }

  const productId = formData.get("productId") as string;
  const existingProduct = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!existingProduct) {
    throw new Error("Product not found");
  }

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      category: submission.value.category,
      price: submission.value.price,
      currency: submission.value.currency,
      location: submission.value.location,
      SellerPhone: submission.value.SellerPhone,
      status: submission.value.status,
      images: flattenUrls,
    },
  });

  redirect("/Dashboard/products");
}

export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  // Retrieve the shop associated with the user
  const shop = await prisma.shop.findFirst({
    where: {
      userId: user.id, // Use userId to find the shop
    },
    select: {
      id: true,
    },
  });

  if (!shop) {
    throw new Error("Shop not found for the user");
  }

  const productId = formData.get("productId") as string;
  const existingProduct = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!existingProduct) {
    throw new Error("Product not found");
  }

  await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  redirect("/Dashboard/products");
}

export async function createShop(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: shopSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.shop.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      location: submission.value.location,
      shopImage: submission.value.shopImage, // Ensure this is an array of strings
      owner: { connect: { id: user.id } }, // Use owner relation
    },
  });

  redirect("/Dashboard/sell-product");
}

export async function handleVerificationForm(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    console.error("User not authenticated");
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: verificationSchema,
  });

  if (submission.status !== "success") {
    console.error("Validation errors:", submission.error); // Use `submission.error` for errors
    return submission.reply();
  }

  const flattenPhotoUrls = submission.value.photoUrl.flatMap((urlString) => urlString.split(",").map((url) => url.trim()));
  const flattenStudentDocs = submission.value.studentDocument.flatMap((urlString) => urlString.split(",").map((url) => url.trim()));

  try {
    await prisma.verificationData.create({
      data: {
        name: submission.value.name,
        address: submission.value.address,
        email: submission.value.email,
        identityNumber: submission.value.identityNumber,
        photoUrl: flattenPhotoUrls,
        studentDocument: flattenStudentDocs,
        phoneNumber: submission.value.phoneNumber,
        userId: user.id, // Assuming you have a userId field in your verification table
      },
    });
    console.log("Verification data successfully created");
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }

  return redirect("/verification/success"); // Adjust the redirection as needed
}
