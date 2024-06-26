import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavbarLinks from "./NavbarLinks";
import { ModeToggle } from "../provider/ModeToggle";
import { UserNav } from "./UserNav";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="w-full justify-between flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7 border-b">
      <div className="md:col-span-3">
        <Link href="/">
          <div className="text-2xl font-semibold flex flex-row items-center gap-2">
            <ShoppingBag />
            Sepetimiz
          </div>
        </Link>
      </div>
      <NavbarLinks />

      <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
        <div className="hidden md:flex">
          <ModeToggle />
        </div>
        {user ? (
          <UserNav email={user.email as string} firstName={user.given_name as string} lastName={user.given_name as string} userImage={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`} />
        ) : (
          <div className="hidden md:flex items-center gap-x-2">
            <Button asChild>
              <LoginLink>Login</LoginLink>
            </Button>
            <Button variant="secondary" asChild>
              <RegisterLink>Register</RegisterLink>
            </Button>
          </div>
        )}

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
