import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// File: /app/api/shops/[shopId]/products/[productId]/unpublish/route.ts
export async function PATCH(req: Request, { params }: { params: { shopId: string; productId: string } }) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const product = await prisma.product.update({
      where: {
        id: params.productId,
        shopId: params.shopId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_UNPUBLISH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
