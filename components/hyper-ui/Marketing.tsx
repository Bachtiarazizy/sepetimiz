import { PackageOpen, Package, Truck } from "lucide-react";
import Link from "next/link";
import React from "react";

const Marketing = () => {
  return (
    <section className="py-16 w-full">
      <div className="container mx-auto ">
        <div className="flex flex-col gap-8 items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold sm:text-2xl lg:text-3xl mb-9">Why Choose Sepetimiz?</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 justify-between">
            <div className="block rounded-xl border  border-gray-200 p-4 shadow-md hover:border-gray-300 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
              <div className="flex flex-col items-center">
                <span className="inline-block bg-white dark:bg-primary-foreground rounded-lg p-3 text-center">
                  <PackageOpen size={24} className="text-primary" />
                </span>

                <h2 className="mt-2 font-bold ">Quality Products</h2>

                <p className="mt-1 text-sm text-gray-600 text-center dark:text-gray-400">Find high-quality products crafted by talented Indonesian students in Turkey.</p>
              </div>
            </div>
            <div className="block rounded-xl border  border-gray-200 p-4 shadow-md hover:border-gray-300 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
              <div className="flex flex-col items-center">
                <span className="inline-block bg-white dark:bg-primary-foreground rounded-lg p-3 text-center">
                  <PackageOpen size={24} className="text-primary" />
                </span>

                <h2 className="mt-2 font-bold ">Supporting Talents</h2>

                <p className="mt-1 text-sm text-gray-600 text-center dark:text-gray-400">Empower Indonesian students in Turkey by supporting their creative endeavors.</p>
              </div>
            </div>
            <div className="block rounded-xl border  border-gray-200 p-4 shadow-md hover:border-gray-300 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
              <div className="flex flex-col items-center">
                <span className="inline-block bg-white dark:bg-primary-foreground rounded-lg p-3 text-center">
                  <Truck size={24} className="text-primary" />
                </span>

                <h2 className="mt-2 font-bold ">Easy Transactions</h2>

                <p className="mt-1 text-sm text-gray-600 text-center dark:text-gray-400">Enjoy hassle-free transactions and a seamless shopping experience.</p>
              </div>
            </div>
          </div>
          <Link href="/sell-products" passHref>
            <button className="mt-8 bg-indigo-600 px-8 py-3 text-sm font-medium text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400 transition">Post a Product Now</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Marketing;
