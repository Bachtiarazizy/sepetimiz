import ProductCard from "./product-card";

interface Product {
  id: string;
  name: string;
  price: number | null;
  currency: "IDR" | "USD" | "EUR";
  description: string | null;
  images: string[];
  location: string | null;
  phone: string | null;
  shop: {
    name: string;
    isVerified: boolean;
  };
  category: {
    name: string;
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
