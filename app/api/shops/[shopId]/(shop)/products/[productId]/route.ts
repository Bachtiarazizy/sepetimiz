import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// DELETE a product
export async function DELETE(req: Request, { params }: { params: { productId: string } }) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const product = await prisma.product.findFirst({
      where: {
        id: params.productId,
        shop: {
          userId: userId,
        },
      },
      include: { shop: true },
    });

    if (!product) {
      return new NextResponse("Unauthorized or Product not found", { status: 401 });
    }

    const deletedProduct = await prisma.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.error("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// PATCH (Update) a product
export async function PATCH(req: Request, { params }: { params: { productId: string } }) {
  try {
    const { userId } = await auth();
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const product = await prisma.product.findFirst({
      where: {
        id: params.productId,
        shop: {
          userId: userId,
        },
      },
    });

    if (!product) {
      return new NextResponse("Unauthorized or Product not found", { status: 401 });
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        ...values,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("[PRODUCT_UPDATE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// CREATE a product

// GET a single product
export async function GET(req: Request, { params }: { params: { productId: string } }) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const product = await prisma.product.findFirst({
      where: {
        id: params.productId,
        shop: {
          userId: userId,
        },
      },
      include: {
        shop: true,
        category: true,
      },
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
