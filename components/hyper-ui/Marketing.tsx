import { PackageOpen, Package, Truck } from "lucide-react";
import Link from "next/link";
import React from "react";
import { BorderBeam } from "../magicui/border-beam";
import { BentoDemo } from "../Animation/BentoDemo";

const Marketing = () => {
  return (
    <div className="mx-auto max-w-screen py-8 sm:py-12 lg:py-16 flex flex-col lg:flex-row justify-between items-center lg:items-start">
      <div className="relative w-full h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full lg:w-1/2">
        <BentoDemo />
      </div>

      <div className="lg:py-24 text-center lg:text-right lg:w-1/2 px-4 sm:px-6 lg:px-8 mt-8 lg:mt-0">
        <h2 className="text-3xl font-bold sm:text-4xl">Why Choose Sepetimiz</h2>

        <p className="mt-4 text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui hic atque tenetur quis eius quos ea neque sunt, accusantium soluta minus veniam tempora deserunt? Molestiae eius quidem quam repellat.
        </p>

        <a href="#" className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400">
          Get Started Today
        </a>
      </div>
    </div>
  );
};

export default Marketing;
