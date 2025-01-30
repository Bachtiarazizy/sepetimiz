import Link from "next/link";
import NavbarLinks from "./NavbarLinks";
import { ShoppingBag } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/provider/ModeToggle";

export default function Navbar() {
  return (
    <nav className="w-full justify-between flex items-center px-4 md:px-20 mx-auto py-4 sm:py-5 lg:py-8 border-b shadow-sm bg-background">
      <div className="md:col-span-3 pr-20">
        <Link href="/">
          <div className="text-2xl font-semibold flex flex-row items-center gap-2 text-primary">
            <ShoppingBag />
            <span className="text-base md:text-xl">Sepetimiz</span>
          </div>
        </Link>
      </div>
      <div>
        <NavbarLinks />
      </div>

      <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
        <div className="hidden md:flex">
          <ModeToggle />
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="secondary">Sign In</Button>
              </SignInButton>
            </SignedOut>
          </div>

          <div className="hidden md:flex">
            <SignedIn>
              <Link href={`/dashboard/shops`} className="mr-3">
                <Button variant="outline">Dashboard</Button>
              </Link>

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
