import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col ">
      <Navbar />
      <main className="flex-1 px-5 md:px-12 md:my-10 my-3">{children}</main>
      <Footer />
    </div>
  );
}
