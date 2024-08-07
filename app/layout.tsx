import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/Navbar";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import Footer from "@/components/shared/Footer";
import { extractRouterConfig } from "uploadthing/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: {
    default: "Sepetimiz",
    template: "%s | Sepetimiz",
  },
  description: "Tempat informasi jual-beli mahasiswa Indo di turki",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("bg-background min-h-screen font-sans flex flex-col antialiased", inter.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <Toaster richColors theme="light" toastOptions={{ duration: 3000 }} closeButton />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
