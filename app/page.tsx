import Banner from "@/components/hyper-ui/Banner";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-y-10 lg:py-10 md:py-10 py-5 lg:px-20 md:px-10 px-5 w-full">
      <Banner />
      <section className="w-full mx-auto px-4 md:px-8 mb-24">
        <div className="max-w-3xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center">
          <h1>Check Out the Latest</h1>
          <h1 className="text-primary">Products and Services</h1>
          <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base">
            Stay updated with our newest additions and explore the most recent innovations and offerings in the market. Be the first to discover what's new!
          </p>
        </div>
        {/* <ProductRow category="newest" />
        <ProductRow category="fashion" />
        <ProductRow category="electronics" />
        <ProductRow category="food" /> */}
      </section>
      {/* <Marketing />
      <Reviews /> */}
    </main>
  );
}
