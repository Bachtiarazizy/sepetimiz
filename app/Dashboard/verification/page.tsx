import React from "react";
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Card } from "@/components/ui/card";
import VerificationForm from "@/components/form/VerificationForm";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return null;
}

export default async function dashboard() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }
  const data = await getData(user.id);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
      <Card>
        <VerificationForm />
      </Card>
    </section>
  );
}
