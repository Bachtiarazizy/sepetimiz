import { cn } from "@/lib/utils";
import { Shield, MessageCircle, Store, MousePointer, GraduationCap, Users } from "lucide-react";

const features = [
  {
    Icon: Shield,
    name: "Trusted and Verified Sellers",
    description: "All our sellers are carefully verified Indonesian students in Turkey. Our strict verification system helps prevent fraud, providing you with a secure shopping experience.",
    className: "col-span-3 lg:col-span-2",
    backgroundImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    Icon: MessageCircle,
    name: "Direct Communication",
    description: "Chat directly with sellers before making a purchase. Get all the information you need, from pricing to product details, and even custom requests.",
    className: "col-span-3 lg:col-span-1",
    backgroundImage: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    Icon: Store,
    name: "Diverse Products & Services",
    description: "From unique handmade goods to delicious Indonesian food and creative services, Sepetimiz showcases the talents of Indonesian students across Turkey.",
    className: "col-span-3 lg:col-span-1",
    backgroundImage: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    Icon: MousePointer,
    name: "Easy-to-Use Platform",
    description: "Browse categories, find what you need, and make transactions with just a few clicks. Our platform is designed to be simple and intuitive.",
    className: "col-span-3 lg:col-span-2",
    backgroundImage: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    Icon: GraduationCap,
    name: "Support Student Entrepreneurs",
    description: "Every purchase helps strengthen our community and empowers Indonesian students to achieve their entrepreneurial goals in Turkey.",
    className: "col-span-3 lg:col-span-2",
    backgroundImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    Icon: Users,
    name: "Growing Community",
    description: "Join a community of like-minded Indonesian students in Turkey. Connect with individuals who share similar goals and values.",
    className: "col-span-3 lg:col-span-1",
    backgroundImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const BentoCard = ({ className, Icon, name, description, backgroundImage }: { className?: string; Icon?: any; name: string; description: string; backgroundImage: string }) => {
  return (
    <div className={cn("group relative overflow-hidden rounded-[--radius] border bg-card p-6", "transition-all duration-500 hover:shadow-xl", className)}>
      {/* Content overlay with backdrop blur */}
      <div className="relative z-10 h-full">
        <div className="flex items-center gap-2 transition-transform duration-300 group-hover:-translate-y-1">
          {Icon && (
            <div className="transition-transform duration-300 group-hover:scale-110">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          )}
          <h3 className="font-semibold text-card-foreground transition-colors duration-300 group-hover:text-primary">{name}</h3>
        </div>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed transition-opacity duration-300 group-hover:opacity-90">{description}</p>
      </div>

      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10 transition-transform duration-700 group-hover:scale-110">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-75" />
        <img src={backgroundImage} alt="" className="h-full w-full object-cover opacity-20 transition-opacity duration-300 group-hover:opacity-30" />
      </div>

      {/* Animated border gradient */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-primary/0 via-primary/25 to-primary/0 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
};

export function WhyChooseSepetimiz() {
  return (
    <div className="py-16 bg-background">
      <div className="text-center mb-12 transform transition-all duration-700 hover:scale-105">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Why Choose Sepetimiz?</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Discover the benefits of joining our trusted marketplace for Indonesian students in Turkey.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-4">
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhyChooseSepetimiz;
