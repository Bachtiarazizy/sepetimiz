import React from "react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  images: string[];
  name: string;
  price: string;
  description: string;
  id: string;
  category: string;
}

export function ProductCard({ images, id, price, description, name, category }: iAppProps) {
  return (
    <div className="w-full h-full bg-zinc-100 dark:bg-gray-700 flex flex-col rounded">
      <Carousel className="w-full mx-auto rounded-t">
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[230px] rounded-t">
                <Image alt="Product image" src={item} fill className="object-cover w-full h-full" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-14 sm:ml-14 md:ml-14 lg:ml-16 h-4 w-4 sm:h-6 sm:w-6 md:h-6 md:w-6 lg:h-8 lg:w-8" />
        <CarouselNext className="mr-14 sm:mr-14 md:mr-14 lg:mr-16 h-4 w-4 sm:h-6 sm:w-6 md:h-6 md:w-6 lg:h-8 lg:w-8" />
      </Carousel>
      <div className="p-3 md:p-6 flex flex-col">
        <h3 className=" text-lg font-medium text-gray-900 dark:text-slate-100">{name}</h3>
        <div className="flex w-full justify-between items-center">
          <p className=" items-center mt-1.5 text-sm text-gray-700 dark:text-zinc-400">{price}</p>
          <p className=" items-center mt-1.5 text-sm text-gray-700 dark:text-zinc-400">{category}</p>
        </div>
        <p className="text-gray-600 dark:text-zinc-400 line-clamp-2 text-xs lg:text-sm mt-2 flex-grow hidden">{description}</p>
        <Button asChild className=" flex w-full rounded text-sm font-medium transition hover:scale-105 mt-1.5">
          <Link href={`/product/${id}`}>Learn More!</Link>
        </Button>
      </div>
    </div>
  );
}

export function LoadingProductCard() {
  return (
    <div className="flex flex-col h-full">
      <Skeleton className="w-full h-[230px]" />
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="w-full h-6" />
      </div>

      <Skeleton className="w-full h-10 mt-5" />
    </div>
  );
}
