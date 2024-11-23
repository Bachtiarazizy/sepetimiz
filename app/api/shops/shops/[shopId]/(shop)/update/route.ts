import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { shopId: string } }) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const shop = await prisma.shop.findUnique({
      where: {
        id: params.shopId,
        userId: userId,
      },
    });

    if (!shop) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deletedShop = await prisma.shop.delete({
      where: {
        id: params.shopId,
      },
    });

    return NextResponse.json(deletedShop);
  } catch (error) {
    console.error("[SHOP_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { shopId: string } }) {
  try {
    const { userId } = await auth();
    const { shopId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const shop = await prisma.shop.update({
      where: {
        id: params.shopId,
        userId: userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(shop);
  } catch (error) {
    console.log("[SHOP_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
