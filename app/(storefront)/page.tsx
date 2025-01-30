import { getNewArrivals } from "@/actions/new-arrivals";
import CategorySection from "@/components/category-section";
import NewArrivals from "@/components/products/new-arrival-section";
import ShopCarousel from "@/components/shop-carousel";
import JoinAsSeller from "@/components/storefront/join-as-seller";
import Testimonials from "@/components/storefront/testimonials";
import ValueProposition from "@/components/storefront/value-proposition";

export default async function Home() {
  const newArrivals = await getNewArrivals(8);
  return (
    <main className="flex min-h-screen flex-col w-full bg-primary-foreground ">
      <section className="px-8 md:px-10 mt-20">
        <ShopCarousel />
      </section>
      <CategorySection />
      <NewArrivals products={newArrivals} />
      <ValueProposition />
      <Testimonials />
      <JoinAsSeller />
    </main>
  );
}
