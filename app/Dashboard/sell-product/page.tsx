import { unstable_noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import ProductCreateRoute from "@/components/form/product-form";
import VerificationAlert from "@/components/shared/VerificationAlert";

async function getShopData(userId: string) {
  const shop = await prisma.shop.findFirst({
    where: {
      userId: userId, // Match shop's userId with the current user's ID
    },
    select: {
      id: true,
      name: true,
    },
  });

  return shop;
}

export default async function SellProduct() {
  unstable_noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const shop = await getShopData(user.id);

  if (!shop) {
    redirect("/Dashboard/shop"); // Redirect to shop creation if no shop exists
  }

  return <ProductCreateRoute />;
}
