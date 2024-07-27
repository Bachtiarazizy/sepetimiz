import React from "react";
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Card } from "@/components/ui/card";
import VerificationForm from "@/components/form/VerificationForm";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

async function getData(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
}

export default async function Verification() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const dbUser = await getData(user.id);

  if (!dbUser) {
    redirect("/api/auth/login");
  }

  const isVerified = dbUser.isVerified;

  return (
    <section className="w-full mx-auto px-4 md:px-8 mb-14">
      {!isVerified && (
        <Card>
          <VerificationForm />
        </Card>
      )}
      {isVerified && (
        <div className="flex h-screen max-h-screen px-[5%]">
          <div className="success-img">
            <Link href="/">
              <Image src="/assets/icons/logo-full.svg" height={1000} width={1000} alt="logo" className="h-10 w-fit" />
            </Link>

            <section className="flex flex-col items-center">
              <Image src="/assets/gifs/success.gif" height={300} width={280} alt="success" />
              <h2 className="header mb-6 max-w-[600px] text-center">
                Your <span className="text-green-500">appointment request</span> has been successfully submitted!
              </h2>
              <p>We&apos;ll be in touch shortly to confirm.</p>
            </section>

            <Button variant="outline" className="shad-primary-btn" asChild>
              <Link href={`/`}>Go to HomePage</Link>
            </Button>

            <p className="copyright">© 2024 CarePluse</p>
          </div>
        </div>
      )}
    </section>
  );
}
