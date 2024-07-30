import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

interface ProductListItemProps {
  product: Product;
}

export default function ProductListItem({ product: { id, name, price, category, location, images } }: ProductListItemProps) {
  return (
    <div className="rounded-lg">
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[330px]">
                <Image src={image} alt={`Product Image ${index + 1}`} fill className="object-cover object-center w-full h-full rounded-lg" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>
      <div className="relative border border-gray-100 bg-white p-6">
        <h3 className="mt-4 text-lg font-medium text-gray-900">{name}</h3>

        <p className="mt-4 text-lg font-medium text-gray-900 ">{price}</p>

        <p className="mt-1.5 text-sm text-gray-700">{location}</p>

        <Button asChild className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105">
          <Link href={`/product/${id}`}>Learn More!</Link>
        </Button>
      </div>
    </div>
  );
}
