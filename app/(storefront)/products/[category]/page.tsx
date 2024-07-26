import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db";
import { Category } from "@prisma/client";
import { ProductCard } from "@/components/products/ProductCard";

async function getData(category: string) {
  let input;

  switch (category) {
    case "fashion": {
      input = "fashion";
      break;
    }
    case "food": {
      input = "food";
      break;
    }
    case "electronics": {
      input = "electronics";
      break;
    }
    case "baggage": {
      input = "baggage";
      break;
    }
    case "exchange": {
      input = "exchange";
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
      category: input as Category,
    },
    select: {
      id: true,
      images: true,
      description: true,
      name: true,
      price: true,
      location: true,
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
          <ProductCard key={product.id} images={product.images} price={product.price} name={product.name} id={product.id} description={product.description} location={product.location} />
        ))}
      </div>
    </section>
  );
}
