import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const shops = await prisma.shop.create({
      data: {
        title,
        userId,
      },
    });

    return NextResponse.json(shops);
  } catch (error) {
    console.log("[TITLE_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const shops = await prisma.shop.findMany({
      where: {
        userId,
        isPublished: true,
        ...(title && {
          title: {
            contains: title,
          },
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(shops);
  } catch (error) {
    console.log("[SHOPS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
