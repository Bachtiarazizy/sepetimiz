import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db";
import { EditForm } from "@/components/form/EditForm";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EditRoute({ params }: { params: { id: string } }) {
  noStore();
  const data = await getData(params.id);
  return <EditForm data={data} />;
}
