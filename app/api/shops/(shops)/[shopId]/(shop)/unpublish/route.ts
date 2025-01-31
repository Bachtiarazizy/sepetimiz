import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { shopId: string } }) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const shop = await prisma.shop.findUnique({
      where: {
        id: params.shopId,
        userId,
      },
    });

    if (!shop) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const unpublishedShop = await prisma.shop.update({
      where: { id: params.shopId },
      data: { isPublished: false },
    });

    return NextResponse.json(unpublishedShop);
  } catch (error) {
    console.error("[SHOP_UNPUBLISH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
