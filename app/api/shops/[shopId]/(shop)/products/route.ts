import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { shopId: string } }) {
  try {
    const { shopId } = params;
    const body = await req.json();
    const { name } = body;

    if (!shopId) {
      return new NextResponse("Shop ID is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const shop = await prisma.shop.findUnique({
      where: {
        id: shopId,
      },
    });

    if (!shop) {
      return new NextResponse("Shop not found", { status: 404 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        shopId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
