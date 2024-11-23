// app/api/shops/[shopId]/route.ts
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { shopId: string } }) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in"));
    }

    const shop = await prisma.shop.findUnique({
      where: {
        id: params.shopId,
        userId: userId,
      },
    });

    if (!shop) {
      return NextResponse.redirect(new URL("/shops/create"));
    }

    return NextResponse.json(shop);
  } catch (error) {
    console.error("[SHOP_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
