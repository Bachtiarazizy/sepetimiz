import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import { extractRouterConfig } from "uploadthing/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import ConfettiProvider from "@/components/provider/confetti-provider";
import { ToasterProvider } from "@/components/provider/toaster-provider";
import { ourFileRouter } from "./api/uploadthing/core";

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
    <ClerkProvider>
      <html lang="en">
        <body className={cn("bg-background min-h-screen font-sans flex flex-col antialiased", inter.variable)}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ConfettiProvider />
            <ToasterProvider />
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <main>{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
