import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { shopId: string; productId: string } }) {
  try {
    const { userId } = await auth();

    // Cek apakah user sudah login
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Cek apakah shop terkait dengan user
    const shop = await prisma.shop.findUnique({
      where: {
        id: params.shopId,
        userId,
      },
    });

    if (!shop) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Cek apakah product terkait dengan shop yang diakses
    const product = await prisma.product.findUnique({
      where: {
        id: params.productId,
        shopId: params.shopId,
      },
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    // Cek apakah semua field penting dari product sudah terisi
    if (!product.title || !product.description || !product.images || !product.price) {
      const missingFields = [];
      if (!product.title) missingFields.push("title");
      if (!product.description) missingFields.push("description");
      if (!product.images || product.images.length === 0) missingFields.push("images");
      if (!product.price) missingFields.push("price");
      if (!product.currency) missingFields.push("currency");
      if (!product.location) missingFields.push("location");
      if (!product.categoryId) missingFields.push("categoryId");
      if (!product.phone) missingFields.push("phone");

      return new NextResponse(`Missing required fields: ${missingFields.join(", ")}`, { status: 400 });
    }

    // Update status product menjadi published
    const publishedProduct = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedProduct);
  } catch (error) {
    console.error("[PRODUCT_PUBLISH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
