import { type CategoryTypes } from "@prisma/client";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db";
import { ProductCard } from "@/components/products/ProductCard";

async function getData(category: string) {
  let input;

  switch (category) {
    case "fashion": {
      input = "fashion";
      break;
    }
    case "electronics": {
      input = "electronics";
      break;
    }
    case "food": {
      input = "food";
      break;
    }
    case "exchanges": {
      input = "exchanges";
      break;
    }
    case "baggages": {
      input = "baggages";
      break;
    }
    case "others": {
      input = "others";
      break;
    }
    case "all": {
      input = undefined;
      break;
    }
    default: {
      return notFound();
    }
  }

  const data = await prisma.product.findMany({
    where: {
      category: input as CategoryTypes,
    },
    select: {
      id: true,
      images: true,
      description: true,
      name: true,
      price: true,
    },
  });

  return data;
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  noStore();
  const data = await getData(params.category);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">
        {data.map((product) => (
          <ProductCard key={product.id} images={product.images} price={product.price} name={product.name} id={product.id} description={product.description} />
        ))}
      </div>
    </section>
  );
}
