import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import RetroGrid from "@/components/magicui/retro-grid";
import TypingAnimation from "../magicui/typing-animation";
import BoxReveal from "../magicui/box-reveal";
import AnimatedShinyText from "../magicui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Banner = () => {
  return (
    <section className="relative flex flex-col items-start justify-center w-full h-fit">
      <RetroGrid className="absolute inset-0 z-0" />
      {/* <div className="absolute inset-0 z-10 bg-zinc-900 bg-opacity-15"></div> Dark overlay */}
      <div className="relative h-full w-full max-w-5xl px-8 sm:px-8 md:px-20 lg:px-32 items-center justify-center  py-20 sm:py-28 md:py-40 z-20">
        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <TypingAnimation className="text-2xl sm:text-3xl md:text-4xl font-medium text-black dark:text-white" text="Welcome to Sepetimiz" />
        </BoxReveal>
        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <p className="text-3xl sm:text-4xl md:text-5xl font-semibold mt-4">
            Discover and Support <br /> Indonesian Students in Turkey.
          </p>
        </BoxReveal>

        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <div className="mt-6">
            <p className="text-sm sm:text-base md:text-lg">
              -&gt; Experience a seamless e-commerce platform. <br />
              -&gt; Showcasing diverse products and services <span className="font-semibold text-[#5046e6]">talented students</span> pursuing their <span className="font-semibold text-[#5046e6]">dreams abroad.</span>
            </p>
          </div>
        </BoxReveal>

        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <div
            className={cn(
              "group rounded-full border mt-6 border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-2 sm:py-3 md:py-4 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Join Now and Start Exploring</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
        </BoxReveal>
      </div>
    </section>
  );
};

export default Banner;
