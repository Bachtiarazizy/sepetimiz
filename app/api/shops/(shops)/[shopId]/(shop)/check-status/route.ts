// app/api/shops/[shopId]/check-status/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: Request, { params }: { params: { shopId: string } }) {
  try {
    const shop = await prisma.shop.findFirst({
      where: {
        id: params.shopId,
        isPublished: true,
      },
    });

    return NextResponse.json({ isPublished: shop !== null });
  } catch (error) {
    return NextResponse.json({ error: "Failed to check shop status" }, { status: 500 });
  }
}
