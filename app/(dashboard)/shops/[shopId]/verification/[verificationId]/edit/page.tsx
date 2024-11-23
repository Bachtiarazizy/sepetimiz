// app/shops/[shopId]/products/[productId]/edit/page.tsx
import { IconBadge } from "@/components/ui/icon-badge";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import { Banner } from "@/components/ui/banner";
import SellerNameForm from "../_components/seller-name-form";
import SellerEmailForm from "../_components/seller-email-form";
import SellerAddressForm from "../_components/seller-address-form";
import SellerPhoneNumberForm from "../_components/seller-phone-number-form";
import SellerIdentityNumberForm from "../_components/seller-identity-number-form";
import SellerPhotoForm from "../_components/seller-photo-form";
import SellerPhotoWithDocumentForm from "../_components/seller-photo-with-document-form";
import StudentDocumentForm from "../_components/seller-student-document-form";
import { VerificationAction } from "../_components/verification-action";

interface PageProps {
  params: {
    shopId: string;
    verificationId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const verification = await prisma.verificationData.findUnique({
    where: {
      id: params.verificationId,
      shopId: params.shopId,
    },
  });

  const categories = await prisma.category.findMany({
    orderBy: {
      title: "asc",
    },
  });

  if (!verification) {
    return redirect(`/shops/${params.shopId}/verification/create`);
  }

  const requiredFields = [verification.title, verification.email, verification.address, verification.phoneNumber, verification.identityNumber, verification.studentDocument, verification.photoUrl, verification.photoWithDocument];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields} / ${totalFields}) fields completed`;
  const isCompleted = requiredFields.every(Boolean);

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Verification Data</h1>
            <span className="text-sm text-slate-700">{completionText}</span>
          </div>
          <VerificationAction disabled={!isCompleted} verificationId={params.verificationId} shopId={params.shopId} />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Complete Your Information</h2>
            </div>

            <SellerNameForm initialData={{ title: verification.title ?? "" }} shopId={params.shopId} verificationId={verification.id} />
            <SellerEmailForm initialData={{ email: verification.email ?? "" }} shopId={params.shopId} verificationId={verification.id} />
            <SellerAddressForm initialData={{ address: verification.address ?? "" }} shopId={params.shopId} verificationId={verification.id} />
            <SellerPhoneNumberForm initialData={{ phoneNumber: verification.phoneNumber ?? "" }} shopId={params.shopId} verificationId={verification.id} />
            <SellerPhotoForm initialData={{ photoUrl: verification.photoUrl ?? "" }} shopId={params.shopId} verificationId={verification.id} />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Information Details</h2>
              </div>
              <SellerIdentityNumberForm initialData={{ identityNumber: verification.identityNumber ?? "" }} shopId={params.shopId} verificationId={verification.id} />
              <SellerPhotoWithDocumentForm initialData={{ photoWithDocument: verification.photoWithDocument ?? "" }} shopId={params.shopId} verificationId={verification.id} />
              <StudentDocumentForm initialData={{ studentDocument: verification.studentDocument ?? "" }} shopId={params.shopId} verificationId={verification.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
