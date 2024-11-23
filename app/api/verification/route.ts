import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, shopId } = body; // Add shopId to destructuring

    if (!name || !shopId) {
      // Check for both name and shopId
      return new NextResponse("Name and Shop ID are required", { status: 400 });
    }

    const shop = await prisma.shop.findUnique({
      where: {
        id: shopId, // Now using the passed shopId
      },
    });

    if (!shop) {
      return new NextResponse("Shop not found", { status: 404 });
    }

    const verificationData = await prisma.verificationData.create({
      data: {
        name,
        shopId, // Using the passed shopId
      },
    });

    return NextResponse.json(verificationData);
  } catch (error) {
    console.log("[VERIFICATION_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
