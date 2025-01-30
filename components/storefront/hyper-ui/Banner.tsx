import React from "react";
import TypingAnimation from "../magicui/typing-animation";
import BoxReveal from "../magicui/box-reveal";
import RetroGrid from "../magicui/retro-grid";

const Banner = () => {
  return (
    <section className="relative flex flex-col items-start justify-center w-full h-full ">
      <RetroGrid className="absolute inset-0 z-0" />
      {/* <div className="absolute inset-0 z-10 bg-zinc-900 bg-opacity-15"></div> Dark overlay */}
      <div className="relative h-full w-full max-w-5xl px-8 sm:px-8 md:px-20 lg:px-32 items-center justify-center pt-24 pb-32 z-20">
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
              -&gt; Sepetimiz connects Indonesian students across Turkey, providing a safe and trusted platform to showcase their products and services. <br />
              -&gt; Whether you're a seller looking to grow your business or a customer seeking reliable services, <span className="font-semibold text-[#5046e6]">Sepetimiz is here</span> to{" "}
              <span className="font-semibold text-[#5046e6]">bridge the gap.</span>
            </p>
          </div>
        </BoxReveal>

        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <div className="mt-6 flex gap-5">
            <a className="group relative inline-flex items-center overflow-hidden rounded-full bg-foreground px-8 py-3 text-white dark:text-zinc-950 focus:outline-none focus:ring active:bg-indigo-500" href="/shops">
              <span className="absolute -end-full transition-all group-hover:end-4">
                <svg className="size-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>

              <span className="text-sm font-medium transition-all group-hover:me-4"> Sell Now </span>
            </a>

            {/* Border - Left */}

            <a className="group relative inline-flex items-center overflow-hidden rounded-full border border-current px-8 py-3 text-foreground focus:outline-none focus:ring active:text-indigo-500" href="/search">
              <span className="absolute -end-full transition-all group-hover:end-4">
                <svg className="size-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <span className="text-sm font-medium transition-all group-hover:me-4"> Shop Now </span>
            </a>
          </div>
        </BoxReveal>
      </div>
    </section>
  );
};

export default Banner;
