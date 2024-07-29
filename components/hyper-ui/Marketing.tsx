import { PackageOpen, Package, Truck } from "lucide-react";
import Link from "next/link";
import React from "react";
import { BorderBeam } from "../magicui/border-beam";

const Marketing = () => {
  return (
    <section className=" w-full">
      <div className="flex flex-col gap-8 items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold sm:text-2xl lg:text-3xl mb-9">Why Choose Sepetimiz?</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-8 justify-between">
          <div className="relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
              Border Beam
            </span>
            <BorderBeam size={250} duration={12} delay={9} />
          </div>
          <div className="relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
              Border Beam
            </span>
            <BorderBeam size={250} duration={12} delay={9} />
          </div>
          <div className="relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
              Border Beam
            </span>
            <BorderBeam size={250} duration={12} delay={9} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marketing;
