import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Banner = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2">
          <div className="relative p-8 md:p-12 lg:px-16 lg:py-24">
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0">
              <source src="https://videos.pexels.com/video-files/3108018/3108018-sd_640_360_25fps.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-slate-600 opacity-70 z-10"></div>
            <div className="relative z-20 p-8 md:p-12 lg:px-16 lg:py-24">
              <div className="mx-auto max-w-xl text-center">
                <h2 className="text-2xl font-bold text-white md:text-3xl">Check Out the Latest Products and Services</h2>
                <p className="hidden text-white/90 sm:mt-4 sm:block">Stay updated with our newest additions and explore the most recent innovations and offerings in the market. Be the first to discover what's new!</p>
                <div className="mt-4 md:mt-8">
                  <Link href="products">
                    <Button className="transition hover:bg-opacity-75">Browse New Arrivals</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-2">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1605902711834-8b11c3e3ef2f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNob3BwaW5nJTIwb25saW5lfGVufDB8fDB8fHww"
              className="h-40 w-full object-cover sm:h-56 md:h-full"
            />

            <img
              alt=""
              src="https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob3BwaW5nfGVufDB8fDB8fHww"
              className="h-40 w-full object-cover sm:h-56 md:h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
