import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const RequestSuccess = async () => {
  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image src="/assets/icons/logo-full.svg" height={1000} width={1000} alt="logo" className="h-10 w-fit" />
        </Link>

        <section className="flex flex-col items-center">
          <Image src="/assets/gifs/success.gif" height={300} width={280} alt="success" />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/`}>Go to HomePage</Link>
        </Button>

        <p className="copyright">© 2024 CarePluse</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
