import { SettingsForm } from "@/components/form/SettingsForm";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
    },
  });

  return data;
}

export default async function SetttingsPage() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("Not Authorized");
  }

  const data = await getData(user.id);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
      <Card>
        <SettingsForm firstName={data?.firstName as string} lastName={data?.lastName as string} email={data?.email as string} />
      </Card>
    </section>
  );
}
