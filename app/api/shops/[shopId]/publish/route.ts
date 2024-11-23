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
        userId: userId,
      },
    });

    if (!shop) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!shop.name || !shop.description || !shop.images || !shop.location) {
      const missingFields = [];
      if (!shop.name) missingFields.push("name");
      if (!shop.description) missingFields.push("description");
      if (!shop.images) missingFields.push("images");
      if (!shop.location) missingFields.push("location");

      return new NextResponse(`Missing required fields: ${missingFields.join(", ")}`, { status: 400 });
    }

    const publishedShop = await prisma.shop.update({
      where: {
        id: params.shopId,
        userId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedShop);
  } catch (error) {
    console.error("[COURSE_PUBLISH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
