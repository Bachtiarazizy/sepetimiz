import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  images: string[];
  name: string;
  price: string;
  id: string;
  location: string;
}

export function ProductCard({ images, id, price, name, location }: iAppProps) {
  return (
    <div className="rounded-lg group relative block overflow-hidden shadow-md">
      <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
        <span className="sr-only">Wishlist</span>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button>
      <Carousel className="w-full mx-auto ">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className=" transition duration-500 group-hover:scale-105 sm:h-72 relative h-[300px]">
                <Image src={image} alt={`Product Image ${index + 1}`} fill className="object-cover object-center w-full h-full rounded-t-lg" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

      <div className="relative border p-6 bg-background ">
        <h3 className="text-lg font-medium text-primary">{name}</h3>
        <div className="mt-2 flex flex-row items-center justify-between">
          <p className="text-lg font-medium text-primary">{price}</p>

          <p className=" text-sm text-primary">{location}</p>
        </div>

        <Button asChild className="flex mt-2 items-center justify-center w-full rounded  text-sm font-medium transition hover:scale-105">
          <Link href={`/product/${id}`}>Learn More!</Link>
        </Button>
      </div>
    </div>
  );
}

export function LoadingProductCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-[230px]" />
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="w-full h-6" />
      </div>

      <Skeleton className="w-full h-10 mt-5" />
    </div>
  );
}
