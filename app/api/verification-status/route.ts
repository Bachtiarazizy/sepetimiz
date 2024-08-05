import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Adjust import based on your project structure
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ status: "error", message: "User not authenticated" }, { status: 401 });
  }

  const userRecord = await prisma.user.findUnique({
    where: { id: user.id },
    select: { verificationStatus: true }, // Ensure this matches your schema
  });

  if (!userRecord) {
    return NextResponse.json({ status: "error", message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ status: userRecord.verificationStatus });
}
