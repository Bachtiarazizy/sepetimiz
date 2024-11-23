import React from "react";
import { Users, ShieldCheck, MessageCircle, Package, Target, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutUs = () => {
  const values = [
    {
      title: "Community",
      icon: <Users className="h-8 w-8 mb-4" />,
      description: "We're more than just a marketplace—we're a place where Indonesian students in Turkey come together, support each other, and grow their businesses.",
    },
    {
      title: "Trust",
      icon: <ShieldCheck className="h-8 w-8 mb-4" />,
      description: "Through our seller verification system and open communication channels, we're building a trustworthy and reliable community.",
    },
    {
      title: "Empowerment",
      icon: <Target className="h-8 w-8 mb-4" />,
      description: "We provide Indonesian students with the tools and community support they need to thrive in their entrepreneurial journey.",
    },
    {
      title: "Innovation",
      icon: <Package className="h-8 w-8 mb-4" />,
      description: "We constantly explore new ways to improve our platform and provide more opportunities for Indonesian students in Turkey.",
    },
  ];

  const features = [
    {
      title: "Trusted and Verified Sellers",
      description: "All our sellers are carefully verified Indonesian students in Turkey, ensuring a secure shopping experience.",
    },
    {
      title: "Direct Communication",
      description: "Chat directly with sellers before making a purchase for customized requests and detailed information.",
    },
    {
      title: "Diverse Products & Services",
      description: "From handmade goods to Indonesian cuisine and creative services, discover unique offerings from talented students.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2064&auto=format&fit=crop)",
            filter: "brightness(0.4)",
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
          <h1 className="text-6xl font-bold mb-6">Welcome to Sepetimiz</h1>
          <p className="text-2xl mb-8 opacity-90">Your Trusted Marketplace for Indonesian Students in Turkey</p>
          <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105">Join Our Community</button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Our Mission</h2>
          <Card className="p-8 shadow-xl">
            <CardContent>
              <p className="text-xl text-card-foreground leading-relaxed">
                Living and studying abroad can be challenging. That's why we created Sepetimiz—a platform where Indonesian students can promote their businesses and connect with customers across Turkey. We're committed to fostering
                entrepreneurship and supporting students in building their businesses in a trusted, secure environment.
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
            backgroundImage: "url(https://images.unsplash.com/photo-1464082354059-27db6ce50048?q=80&w=2070&auto=format&fit=crop)",
            filter: "brightness(0.1)",
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="backdrop-blur-lg bg-white/10 text-center p-6 hover:scale-105 transition-all duration-300">
                <CardContent>
                  <div className="flex justify-center text-white">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-4 text-white">{value.title}</h3>
                  <p className="text-white/80">{value.description}</p>
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
              <Card key={index} className="p-6 hover:scale-105 transition-all duration-300 shadow-lg">
                <CardContent>
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
            backgroundImage: "url(https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop)",
            filter: "brightness(0.2)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Our Story</h2>
          <Card className="backdrop-blur-lg bg-white/10 p-8">
            <CardContent>
              <p className="text-xl text-white leading-relaxed">
                Sepetimiz was created by a group of Indonesian students living in Turkey who faced a common challenge: finding a way to market their products and services while managing their studies. We came together to build a space where
                Indonesian students could easily showcase their work, connect with customers, and support one another's entrepreneurial journeys.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-background" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-primary">Join Our Community</h2>
          <p className="text-xl text-primary/90 mb-12">Whether you're a student entrepreneur or a customer looking for unique products and services, become part of our growing community today.</p>
          <div className="flex justify-center gap-6">
            <button className="bg-primary text-secondary px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105">Get Started</button>
            <button className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary/10 transition-all transform hover:scale-105">Learn More</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
