"use client";

import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ProductPage = ({ id }: { id: string }) => {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/product/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          throw new Error("Failed to fetch product");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // Render your component with product data
  return (
    <section className="mx-auto px-4 lg:mt-10 max-w-7xl lg:px-8 lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
      <div className="max-w-md mx-auto">
        <Slider dots infinite speed={500} slidesToShow={1} slidesToScroll={1}>
          {product.images.map((item: string, index: number) => (
            <div key={index} className="px-2">
              <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                <img src={item} alt={`Image ${index}`} className="object-cover rounded-lg" />
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="max-w-2xl mx-auto mt-5 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
        <p className="mt-2 text-muted-foreground">{product.description}</p>

        <div className="border-t border-gray-200 mt-10 pt-10">
          <div className="grid grid-cols-2 w-full gap-y-3">
            <h3 className="text-sm font-medium text-muted-foreground col-span-1">Released:</h3>
            <h3 className="text-sm font-medium col-span-1">{product.createdAt}</h3>

            <h3 className="text-sm font-medium text-muted-foreground col-span-1">Category:</h3>
            <h3 className="text-sm font-medium col-span-1">{product.category}</h3>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 py-10">
          <a href={`https://wa.me/${product.SellerPhone}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            Chat Now
          </a>
        </div>
      </div>

      <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4"></div>
    </section>
  );
};

export default ProductPage;
