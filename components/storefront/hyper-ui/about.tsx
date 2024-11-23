import React from "react";
import { ArrowRight, Target, Shield, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutUs = () => {
  const features = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Our Mission",
      description: "Sepetimiz was created to support Indonesian students in Turkey by offering a secure and efficient platform for their small businesses (UMKM).",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Secure Platform",
      description: "We ensure secure transactions with strict verification processes, providing a trustworthy space to minimize fraud, particularly in the service sector.",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Community Focus",
      description: "We strengthen connections among Indonesian students in Turkey while promoting collaboration and trust within our growing community.",
    },
  ];

  return (
    <div className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">About Us</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Supporting Indonesian student entrepreneurs in Turkey through a secure and collaborative platform.</p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="backdrop-blur-lg bg-white/10 text-center p-6 hover:scale-105 transition-all duration-300">
                <CardContent className="flex flex-col items-center">
                  <div className="flex justify-center items-center text-primary w-16 h-16 bg-secondary rounded-full mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">{feature.title}</h3>
                  <p className="text-primary/80">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a className="group relative inline-flex items-center overflow-hidden rounded-full bg-foreground px-8 py-3 text-white dark:text-zinc-950 focus:outline-none focus:ring active:bg-indigo-500" href="/about-us">
              <span className="absolute -end-full transition-all group-hover:end-4">
                <svg className="size-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>

              <span className="text-sm font-medium transition-all group-hover:me-4"> Learn More </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
