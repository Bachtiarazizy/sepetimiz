import { CreditCard, Shield, Users } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../ui/card";

export default function ValueProposition() {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Sellers",
      description: "All student sellers are verified through their academic institutions",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Direct Connection",
      description: "Connect directly with student entrepreneurs across Indonesia",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Secure Transactions",
      description: "Safe and protected payment process for every purchase",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Why Choose StudentMarket</h2>
          <p className="text-muted-foreground text-sm sm:text-base">The trusted marketplace for student entrepreneurs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-background">
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-lg text-primary">{feature.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
