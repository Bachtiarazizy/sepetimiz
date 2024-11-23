import { MarqueeDemo } from "@/components/storefront/Animation/Marquee";
import AboutUs from "@/components/storefront/hyper-ui/about";
import Banner from "@/components/storefront/hyper-ui/Banner";
import FAQSection from "@/components/storefront/hyper-ui/Faqs";
import Marketing, { WhyChooseSepetimiz } from "@/components/storefront/hyper-ui/Marketing";
import CustomerReviews from "@/components/storefront/hyper-ui/Review";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full ">
      <Banner />
      <MarqueeDemo />
      <AboutUs />

      <section className="px-8 sm:px-8 md:px-20 lg:px-32  mt-20">
        <CustomerReviews />
        <WhyChooseSepetimiz />
        <FAQSection />
      </section>
    </main>
  );
}
