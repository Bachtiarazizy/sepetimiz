"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ShopCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Welcome to StudentMarket",
      subtitle: "Your Trusted Student Marketplace",
      description: "Discover unique products and services from talented student entrepreneurs across Indonesia",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920",
    },
    {
      title: "Quality Driven",
      subtitle: "Verified Student Sellers",
      description: "Every product is crafted with care by our community of dedicated student entrepreneurs",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920",
    },
    {
      title: "Join Our Community",
      subtitle: "Safe • Trusted • Reliable",
      description: "Connect with student sellers and discover amazing products at great prices",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden mx-auto rounded-xl bg-background shadow-lg h-[400px] sm:h-[500px]">
      <div className="flex transition-transform duration-500 ease-out h-full" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full flex-shrink-0 h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
            <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="relative z-20 flex flex-col justify-center h-full px-8 md:px-16 text-white">
              <h2 className="text-sm md:text-lg font-medium mb-2 text-white/90">{slide.subtitle}</h2>
              <h1 className="text-2xl md:text-4xl font-bold mb-4">{slide.title}</h1>
              <p className="text-sm md:text-lg max-w-xl text-white/90">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button variant="ghost" className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 text-white" onClick={prevSlide}>
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button variant="ghost" className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 text-white" onClick={nextSlide}>
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, index) => (
          <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-white w-4" : "bg-white/50"}`} />
        ))}
      </div>
    </div>
  );
}
