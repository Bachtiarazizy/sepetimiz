import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { verificationId: string } }) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const verification = await prisma.verificationData.findFirst({
      where: {
        id: params.verificationId,
        shop: {
          userId: userId,
        },
      },
      include: { shop: true },
    });

    if (!verification) {
      return new NextResponse("Unauthorized or verification not found", { status: 401 });
    }

    const deletedVerification = await prisma.verificationData.delete({
      where: {
        id: params.verificationId,
      },
    });

    return NextResponse.json(deletedVerification);
  } catch (error) {
    console.error("[verification_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { verificationId: string } }) {
  try {
    const { userId } = await auth();
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedVerification = await prisma.verificationData.update({
      where: { id: params.verificationId },
      data: {
        studentDocument: values.studentDocument,
        studentDocumentOriginalName: values.studentDocumentOriginalName,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedVerification);
  } catch (error) {
    console.error("[verification_UPDATE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
