import { unstable_noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import ProductCreateRoute from "@/components/form/product-form";
import VerificationAlert from "@/components/shared/VerificationAlert";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      isVerified: true,
      id: true,
    },
  });

  return data;
}

export default async function SellProduct() {
  unstable_noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const data = await getData(user.id);
  if (!data) {
    redirect("/error-page");
  }

  if (!data.isVerified) {
    return <VerificationAlert />;
  }

  return <ProductCreateRoute />;
}
