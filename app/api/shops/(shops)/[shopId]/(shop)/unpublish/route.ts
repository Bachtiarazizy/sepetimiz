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

    // Update status product menjadi unpublished
    const unpublishedProduct = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(unpublishedProduct);
  } catch (error) {
    console.error("[PRODUCT_UNPUBLISH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
