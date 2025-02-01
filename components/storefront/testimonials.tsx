"use client";

import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Card, CardContent } from "../ui/card";
import { Star } from "lucide-react";
import { Badge } from "../ui/badge";

export default function Testimonials() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 16,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3,
          spacing: 16,
        },
      },
    },
  });

  const testimonials = [
    {
      name: "Sarah Wijaya",
      role: "UI Design Student",
      university: "Cankaya University",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop",
      quote: "StudentMarket helped me turn my design skills into a profitable business while studying.",
      rating: 5,
    },
    {
      name: "Budi Santoso",
      role: "Engineering Student",
      university: "Middle East Technical University",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop",
      quote: "I've found amazing opportunities to showcase my tech projects and connect with real customers.",
      rating: 5,
    },
    {
      name: "Rina Putri",
      role: "Business Student",
      university: "Hacettepe University",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop",
      quote: "The platform made it easy to start my small business and reach students across Indonesia.",
      rating: 5,
    },
    {
      name: "Ahmad Rahman",
      role: "Marketing Student",
      university: "Gazi University",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=64&h=64&fit=crop",
      quote: "Through StudentMarket, I've learned practical marketing skills and built a loyal customer base.",
      rating: 5,
    },
    {
      name: "Maya Sari",
      role: "Fashion Design Student",
      university: "Koc University",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop",
      quote: "As a fashion student, I found the perfect platform to showcase and sell my designs to fellow students.",
      rating: 5,
    },
    {
      name: "Dian Kusuma",
      role: "Computer Science Student",
      university: "Istanbul Technical University",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop",
      quote: "The platform's tech community has been invaluable for networking and growing my freelance business.",
      rating: 5,
    },
  ];

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Student Success Stories</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Hear from our community of student entrepreneurs</p>
        </div>

        <div ref={sliderRef} className="keen-slider">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="keen-slider__slide">
              <Card
                className={`bg-background/40 backdrop-blur-sm backdrop-saturate-150 border border-white/10
                  shadow-lg cursor-pointer transition-all duration-300 dark:bg-gradient-to-tr dark:from-slate-500/20 dark:border-white/10 dark:bg-transparent h-full`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full ring-2 ring-primary/10" />
                    <div>
                      <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm">{testimonial.quote}</p>
                  <Badge variant="secondary" className="mt-4 bg-secondary/50 backdrop-blur-sm">
                    {testimonial.university}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
