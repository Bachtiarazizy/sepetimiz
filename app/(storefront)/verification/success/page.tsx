import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const RequestSuccess = async () => {
  return (
    <div className=" flex h-screen justify-center items-center max-h-screen px-[5%]">
      <div className="success-img">
        <section className="flex flex-col items-center">
          <Image src="/assets/gifs/success.gif" height={300} width={280} alt="success" />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">verification</span> has been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/`}>Go to HomePage</Link>
        </Button>
      </div>
    </div>
  );
};

export default RequestSuccess;
