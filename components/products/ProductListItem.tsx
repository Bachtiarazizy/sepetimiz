import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

interface ProductListItemProps {
  product: Product;
}

export default function ProductListItem({ product: { id, name, price, category, location, images, description } }: ProductListItemProps) {
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

      <div className="flex justify-between items-center mt-2">
        <h1 className="font-semibold text-xl">{name}</h1>
      </div>
      <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">${price}</h3>
      <p className="text-gray-600 text-sm mt-2 line-clamp-2">{description}</p>
      <p className="text-gray-600 text-sm mt-2 line-clamp-2">{location}</p>

      <Button asChild className="w-full mt-5">
        <Link href={`/product/${id}`}>Learn More!</Link>
      </Button>
    </div>
  );
}
