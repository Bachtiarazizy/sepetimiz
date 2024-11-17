import Footer from "@/components/storefront/shared/Footer";
import Navbar from "@/components/storefront/shared/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col ">
      <Navbar />
      <main className="flex-1 ">{children}</main>
      <Footer />
    </div>
  );
}
