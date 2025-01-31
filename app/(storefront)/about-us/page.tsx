import React, { Suspense } from "react";
import { Users, ShieldCheck, MessageCircle, Package, Target, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutUs = () => {
  const values = [
    {
      title: "Community",
      icon: <Users className="h-8 w-8 mb-4" />,
      description: "We foster a collaborative ecosystem where Indonesian students in Turkey unite, support each other's growth, and build thriving businesses together.",
    },
    {
      title: "Trust",
      icon: <ShieldCheck className="h-8 w-8 mb-4" />,
      description: "Our comprehensive verification system and transparent communication channels establish a foundation of trust and reliability.",
    },
    {
      title: "Empowerment",
      icon: <Target className="h-8 w-8 mb-4" />,
      description: "We equip Indonesian students with essential resources, mentorship, and community support to excel in their entrepreneurial endeavors.",
    },
    {
      title: "Innovation",
      icon: <Package className="h-8 w-8 mb-4" />,
      description: "Through continuous platform enhancement and market analysis, we create new opportunities for Indonesian students to succeed in Turkey.",
    },
  ];

  const features = [
    {
      title: "Verified Excellence",
      description: "Every seller undergoes thorough verification, ensuring authenticity and maintaining the highest standards of service quality.",
    },
    {
      title: "Seamless Communication",
      description: "Our integrated messaging system enables real-time collaboration between sellers and buyers for personalized solutions.",
    },
    {
      title: "Curated Marketplace",
      description: "Discover an expertly curated selection of authentic Indonesian products, services, and creative works from talented student entrepreneurs.",
    },
  ];

  return (
    <>
      <Suspense>
        <div className="min-h-screen bg-background">
          {/* Hero Section */}
          <section className="relative h-[90vh] flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop')",
                filter: "brightness(0.3)",
              }}
            />
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
              <h1 className="text-7xl font-bold mb-6 text-secondary">Sepetimiz</h1>
              <p className="text-2xl mb-8 text-secondary/90">Empowering Indonesian Student Entrepreneurs in Turkey</p>
              <button className="bg-primary text-primary-foreground px-8 py-4 rounded-md font-semibold hover:bg-primary/90 transition-all">Join Our Community</button>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-24 bg-secondary/10">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Our Mission</h2>
              <Card className="shadow-lg border border-border">
                <CardContent className="p-8">
                  <p className="text-xl text-card-foreground leading-relaxed">
                    At Sepetimiz, we bridge the gap between academic pursuit and entrepreneurial success. Our platform enables Indonesian students in Turkey to showcase their talents, build sustainable businesses, and create meaningful
                    connections within a trusted ecosystem. We're dedicated to transforming student entrepreneurship through innovation and community support.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Values Section */}
          <section className="relative py-24">
            <div
              className="absolute inset-0 bg-fixed bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')",
                filter: "brightness(0.15)",
              }}
            />
            <div className="relative z-10 max-w-6xl mx-auto px-4">
              <h2 className="text-4xl font-bold mb-16 text-center text-secondary">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <Card key={index} className="backdrop-blur-lg bg-card/5 border-border hover:bg-card/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-center text-secondary">{value.icon}</div>
                      <h3 className="text-xl font-semibold mb-4 text-secondary">{value.title}</h3>
                      <p className="text-secondary/80">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-24 bg-background">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-4xl font-bold mb-16 text-center text-foreground">Why Choose Sepetimiz?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="hover:shadow-xl transition-all duration-300 border border-border bg-card">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-semibold mb-4 text-card-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section className="relative py-24">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop')",
                filter: "brightness(0.15)",
              }}
            />
            <div className="relative z-10 max-w-4xl mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center text-secondary">Our Journey</h2>
              <Card className="backdrop-blur-lg bg-card/5 border-border">
                <CardContent className="p-8">
                  <p className="text-xl text-secondary leading-relaxed">
                    Born from the collective vision of Indonesian students in Turkey, Sepetimiz emerged as a solution to the unique challenges faced by student entrepreneurs. What began as a small initiative has evolved into a thriving
                    marketplace, connecting talented individuals with opportunities across Turkey. Our platform represents the culmination of dedication, innovation, and community spirit.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-secondary/10">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-6 text-foreground">Begin Your Journey</h2>
              <p className="text-xl text-muted-foreground mb-12">Join our thriving community of student entrepreneurs and discover unique opportunities.</p>
              <div className="flex justify-center gap-6">
                <button className="bg-primary text-primary-foreground px-8 py-4 rounded-md font-semibold hover:bg-primary/90 transition-all">Get Started</button>
                <button className="border-2 border-primary text-primary px-8 py-4 rounded-md font-semibold hover:bg-primary/10 transition-all">Learn More</button>
              </div>
            </div>
          </section>
        </div>
      </Suspense>
    </>
  );
};

export default AboutUs;
