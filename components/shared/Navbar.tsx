import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavbarLinks from "./NavbarLinks";
import { MobileMenu } from "./MobileMenu";
import { ModeToggle } from "../provider/ModeToggle";
import { UserNav } from "./UserNav";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="w-full justify-between flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7 border-b">
      <div className="md:col-span-3">
        <Link href="/">
          <h1 className="text-2xl font-semibold ">
            Sepetimiz<span className="text-primary"></span>
          </h1>
        </Link>
      </div>
      <NavbarLinks />

      <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
        {user ? (
          <UserNav email={user.email as string} name={user.given_name as string} userImage={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`} />
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
        <ModeToggle />
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
