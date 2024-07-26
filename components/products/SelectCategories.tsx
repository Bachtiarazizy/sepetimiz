import { PackageOpen, Package, Truck } from "lucide-react";
import Link from "next/link";
import React from "react";

const Marketing = () => {
  return (
    <section className="py-16 w-full">
      <div className="container mx-auto ">
        <div className="flex flex-col gap-8 items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold sm:text-2xl lg:text-3xl mb-9">browse by category</h2>
          </div>
          <div className="flex flex-row gap-6 justify-between">
            {[
              { label: "fashion", icon: <PackageOpen size={16} className="text-primary" /> },
              { label: "food", icon: <PackageOpen size={16} className="text-primary" /> },
              { label: "electronics", icon: <Truck size={16} className="text-primary" /> },
              { label: "baggage", icon: <Truck size={16} className="text-primary" /> },
              { label: "exchange", icon: <Truck size={16} className="text-primary" /> },
            ].map((item, index) => (
              <div key={index} className="flex-1 max-w-xs block rounded-xl border border-gray-200 p-4 shadow-md hover:border-gray-300 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
                <div className="flex flex-col items-center">
                  <span className="inline-block bg-white dark:bg-primary-foreground rounded-lg p-3 text-center">{item.icon}</span>
                  <h2 className="mt-2 font-bold">{item.label}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marketing;
