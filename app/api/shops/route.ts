import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { name } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const shops = await prisma.shop.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(shops);
  } catch (error) {
    console.log("[NAME]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Dapatkan userId dari Clerk
    const { userId } = await auth();
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Cari toko pertama yang dimiliki pengguna
    const shop = await prisma.shop.findFirst({
      where: { userId },
      select: {
        id: true,
        name: true,
        images: true,
        description: true,
        location: true,
        isPublished: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Kembalikan data toko, atau null jika tidak ada
    res.status(200).json(shop || null);
  } catch (error) {
    console.error("Error fetching shop data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
