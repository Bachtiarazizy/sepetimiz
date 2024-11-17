import { PackageOpen, Package, Truck } from "lucide-react";
import Link from "next/link";
import React from "react";
import { BorderBeam } from "../magicui/border-beam";
import { BentoDemo } from "../Animation/BentoDemo";

const Marketing = () => {
  return (
    <div className="mx-auto w-full py-8 sm:py-12 lg:py-16 flex flex-col-reverse lg:flex-row justify-between items-center lg:items-start">
      <div className="w-full lg:w-auto mt-8 lg:mt-0">
        <BentoDemo />
      </div>
      <div className="lg:py-24 text-center lg:text-right lg:w-1/2  mt-8 lg:mt-0 sm:order-1">
        <h2 className="text-3xl font-bold sm:text-4xl">Why Choose Sepetimiz</h2>

        <p className="mt-4 text-gray-600 hidden md:flex">Your trusted partner for high-quality products and services. Discover why customers love Sepetimiz for its reliability, convenience, and customer-first approach!</p>

        {/* <a href="#" className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400">
          Get Started Today
          </a> */}
      </div>
    </div>
  );
};

export default Marketing;
