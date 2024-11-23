import ProductCard from "./product-card";

interface Product {
  id: string;
  title: string;
  price: number | null;
  currency: "IDR" | "USD" | "TRY";
  description: string | null;
  images: string[];
  location: string | null;
  phone: string | null;
  shop: {
    title: string;
    isVerified: boolean;
  };
  category: {
    title: string;
  } | null;
}

const ProductList = ({ products }: { products: Product[] }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
