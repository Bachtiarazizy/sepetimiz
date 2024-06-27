import { Button } from "@/components/ui/button";
import { unstable_noStore as noStore } from "next/cache";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import prisma from "@/lib/db";
import Link from "next/link"; // Correct Link import from next/link

async function getData(id: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: id,
    },
    select: {
      category: true,
      description: true,
      name: true,
      images: true,
      price: true,
      createdAt: true,
      SellerPhone: true, // Ensure this field is selected
      id: true,
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });
  return data;
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  noStore();
  const data = await getData(params.id);

  return (
    <section className="mx-auto px-4 lg:mt-10 max-w-7xl lg:px-8 lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
      <Carousel className="lg:row-end-1 lg:col-span-4">
        <div>
          {data?.images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                <Image src={item} alt={`Image ${index}`} fill className="object-cover w-full h-full rounded-lg" />
              </div>
            </CarouselItem>
          ))}
        </div>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

      <div className="max-w-2xl mx-auto mt-5 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{data?.name}</h1>
        <p className="mt-2 text-muted-foreground">{data?.description}</p>

        <div className="border-t border-gray-200 mt-10 pt-10">
          <div className="grid grid-cols-2 w-full gap-y-3">
            <h3 className="text-sm font-medium text-muted-foreground col-span-1">Released:</h3>
            <h3 className="text-sm font-medium col-span-1">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
              }).format(data?.createdAt)}
            </h3>

            <h3 className="text-sm font-medium text-muted-foreground col-span-1">Category:</h3>
            <h3 className="text-sm font-medium col-span-1">{data?.category}</h3>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 py-10">
          <Link href={`https://wa.me/${data?.SellerPhone}`} legacyBehavior passHref>
            <a target="_blank" rel="noopener noreferrer">
              <Button>Chat Now</Button>
            </a>
          </Link>
        </div>
      </div>

      <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4"></div>
    </section>
  );
}
