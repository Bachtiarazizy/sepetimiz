import { StarIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db";
import { ImageSlider } from "@/components/shared/ImageSlider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JSONContent } from "@tiptap/react";
import TipTapRenderer from "@/components/form/TiptapRendered";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true, // Ensure this is the JSON representation
      name: true,
      id: true,
      SellerPhone: true,
      currency: true,
      shop: {
        select: {
          id: true, // Ensure the shop ID is included
          name: true,
          description: true,
          location: true,
          owner: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function ProductIdRoute({ params }: { params: { id: string } }) {
  noStore();
  const data = await getData(params.id);

  // Parse the description string into JSON
  const descriptionJson: JSONContent = JSON.parse(data.description);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-8 px-4 md:px-32">
        <ImageSlider images={data.images} />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">{data.name}</h1>
          <p className="text-3xl mt-2">
            {data.price} {data.currency}
          </p>
          <div className="mt-3 flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          </div>
          <div className="text-base mt-6">
            <TipTapRenderer json={descriptionJson} />
          </div>
          <div className=" mt-6 py-10">
            <Link href={`https://wa.me/${data.SellerPhone}`} legacyBehavior passHref>
              <a target="_blank" rel="noopener noreferrer">
                <Button>Chat Now</Button>
              </a>
            </Link>
          </div>
          <div className="border-t border-gray-200 mt-10 py-10">
            <h2 className="text-2xl font-bold">Shop Details</h2>
            <p className="mt-2">
              <strong>Name:</strong> {data.shop.name}
            </p>
            <p className="mt-2">
              <strong>Description:</strong> {data.shop.description}
            </p>
            <p className="mt-2">
              <strong>Location:</strong> {data.shop.location}
            </p>
            <p className="mt-2">
              <strong>Owner:</strong> {data.shop.owner.firstName} {data.shop.owner.lastName}
            </p>
            <Link href={`/shop/${data.shop.id}`} passHref>
              <Button className="mt-4">View Shop</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
