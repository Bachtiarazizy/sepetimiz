"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { shopSchema, productSchema, verificationSchema } from "@/lib/zodSchemas";
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

  const shop = await prisma.shop.findFirst({
    where: {
      userId: user.id,
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
      shop: { connect: { id: shop.id } },
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

  const shop = await prisma.shop.findFirst({
    where: {
      userId: user.id,
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

  const shop = await prisma.shop.findFirst({
    where: {
      userId: user.id,
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
      shopImage: submission.value.shopImage,
      owner: { connect: { id: user.id } },
    },
  });

  redirect("/Dashboard/sell-product");
}

export async function updateShop(prevState: unknown, formData: FormData) {
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

  const shopId = formData.get("shopId") as string;
  const existingShop = await prisma.shop.findUnique({
    where: {
      id: shopId,
    },
  });

  if (!existingShop) {
    throw new Error("Shop not found");
  }

  await prisma.shop.update({
    where: {
      id: shopId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      location: submission.value.location,
      shopImage: submission.value.shopImage,
    },
  });

  redirect("/Dashboard/shops");
}

export async function getShopData(shopId: string) {
  const data = await prisma.shop.findUnique({
    where: {
      id: shopId,
    },
    select: {
      name: true,
      description: true,
      location: true,
      owner: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      products: {
        select: {
          id: true,
          name: true,
          price: true,
          currency: true,
          description: true,
          location: true,
          images: true,
        },
      },
    },
  });

  if (!data) {
    throw new Error("Shop not found");
  }

  return data;
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
    console.error("Validation errors:", submission.error);
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
        userId: user.id,
      },
    });
    console.log("Verification data successfully created");
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }

  return redirect("/verification/success");
}
