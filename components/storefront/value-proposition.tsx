import { CreditCard, Shield, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ValueProposition() {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Sellers",
      color: "dark:from-slate-500/20",
      description: "All student sellers are verified through their academic institutions",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Direct Connection",
      color: "dark:from-slate-500/20",
      description: "Connect directly with student entrepreneurs across Indonesia",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Secure Transactions",
      color: "dark:from-slate-500/20",
      description: "Safe and protected payment process for every purchase",
    },
  ];

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-accent/10 backdrop-blur-[2px]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Why Choose StudentMarket</h2>
          <p className="text-muted-foreground text-sm sm:text-base">The trusted marketplace for student entrepreneurs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index}>
              <Card
                className={`bg-background dark:bg-gradient-to-tr ${feature.color} dark:border-white/10 dark:bg-transparent backdrop-blur-sm backdrop-saturate-150 border border-white/10
                  shadow-lg cursor-pointer transition-all duration-300`}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-flex p-3 bg-primary/5 backdrop-blur-sm rounded-lg text-primary">{feature.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
