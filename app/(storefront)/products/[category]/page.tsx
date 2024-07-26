import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db";
import { Category } from "@prisma/client";
import { ProductCard } from "@/components/products/ProductCard";

const capitalizeFirstLetter = (string: string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

async function getData(category: string) {
  let input: Category | undefined;

  switch (category) {
    case "fashion":
      input = "fashion";
      break;
    case "food":
      input = "food";
      break;
    case "electronics":
      input = "electronics";
      break;
    case "baggages":
      input = "baggages";
      break;
    case "exchanges":
      input = "exchanges";
      break;
    case "all":
      input = undefined;
      break;
    default:
      return notFound();
  }

  const data = await prisma.product.findMany({
    where: {
      category: input,
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

  if (data === undefined) {
    return notFound();
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <h1 className="text-xl font-bold mb-4">{capitalizeFirstLetter(params.category)}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">
        {data.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          data.map((product) => <ProductCard key={product.id} images={product.images} price={product.price} name={product.name} id={product.id} description={product.description} location={product.location} />)
        )}
      </div>
    </section>
  );
}
