import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { shopId: string; verificationId: string } }) {
  try {
    const { userId } = await auth();

    // Cek apakah user sudah login
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Cek apakah product terkait dengan shop yang diakses
    const verification = await prisma.verificationData.findUnique({
      where: {
        id: params.verificationId,
        shopId: params.shopId,
      },
    });

    if (!verification) {
      return new NextResponse("Verification not found", { status: 404 });
    }

    // Cek apakah semua field penting dari product sudah terisi
    if (!verification.title || !verification.email || !verification.address || !verification.phoneNumber || !verification.photoUrl) {
      const missingFields = [];
      if (!verification.title) missingFields.push("title");
      if (!verification.email) missingFields.push("email");
      if (!verification.address) missingFields.push("address");
      if (!verification.phoneNumber) missingFields.push("phoneNumber");
      if (!verification.photoUrl) missingFields.push("photoUrl");
      if (!verification.photoWithDocument) missingFields.push("photoWithDocument");
      if (!verification.identityNumber) missingFields.push("identityNumber");
      if (!verification.studentDocument) missingFields.push("studentDocument");

      return new NextResponse(`Missing required fields: ${missingFields.join(", ")}`, { status: 400 });
    }

    // Update status product menjadi published
    const publishedData = await prisma.verificationData.update({
      where: {
        id: params.verificationId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedData);
  } catch (error) {
    console.error("[VERIFICATION_PUBLISH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
