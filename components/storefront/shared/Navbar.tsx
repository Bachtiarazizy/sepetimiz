import Link from "next/link";
import NavbarLinks from "./NavbarLinks";
import { ShoppingBag, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/provider/ModeToggle";
import SearchBar from "@/components/search/search-bar";
import prisma from "@/lib/db";

export default async function Navbar() {
  const categories = await prisma.category.findMany();

  return (
    <>
      {/* Top Bar - Not Sticky */}
      <div className="hidden sm:block w-full bg-primary/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex h-10 items-center justify-between px-4 sm:px-6 text-sm">
            {/* Contact Information */}
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-2">
                <Link href={"mailto:sepetimiz.bk@gmail.com"} className="flex items-center gap-2 hover:text-primary">
                  <Mail className="h-4 w-4" />
                  <span>sepetimiz.bk@gmail.com</span>
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-primary">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="hover:text-primary">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="hover:text-primary">
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar - Upper Section (Sticky) */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-screen-xl mx-auto">
          <nav>
            <div className="flex h-16 items-center px-4 sm:px-6">
              {/* Left - Logo */}
              <div className="flex-shrink-0 w-auto">
                {" "}
                <Link href="/" className="flex items-center space-x-2">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                  <span className="font-bold text-xl">Sepetimiz</span>
                  <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Beta</span>
                </Link>
              </div>

              <div className="flex-1 flex justify-center items-center ">
                <div className="w-full max-w-xl hidden sm:block">
                  <NavbarLinks />
                </div>
              </div>
              {/* Right - Auth & Controls */}
              <div className="w-40 flex items-center justify-end gap-4">
                <div className="hidden sm:flex items-center gap-4">
                  <ModeToggle />

                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button variant="ghost" size="sm">
                        Sign In
                      </Button>
                    </SignInButton>
                  </SignedOut>

                  <SignedIn>
                    <Link href="/dashboard/shops">
                      <Button variant="outline" size="sm">
                        Dashboard
                      </Button>
                    </Link>
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8",
                        },
                      }}
                    />
                  </SignedIn>
                </div>

                {/* Mobile Menu Button */}
                <div className="sm:hidden">
                  <MobileMenu />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
