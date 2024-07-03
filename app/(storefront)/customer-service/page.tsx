import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Faqs from "@/components/hyper-ui/Faqs";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import ContactUs from "@/components/form/ContactUs";

export default function CustomerSevice() {
  return (
    <main className="flex  flex-col gap-y-5 text-center ly:p-20 md:py-10 py-5 lg:px-20 md:px-10 px-5 my-8">
      <div className="flex flex-col gap-10">
        <div className="flex-1 flex items-center flex-col gap-5">
          <h1 className="text-xl md:text-3xl font-semibold">Frequently Asked Questions</h1>

          <Faqs />
        </div>
        <div className="flex-1 flex flex-col gap-5 items-center">
          <h1 className="text-xl md:text-3xl font-semibold">Lets we Know Your Problem</h1>
          <div className="flex flex-col gap-5 items-start w-full">
            <ContactUs />
          </div>
        </div>
      </div>
    </main>
  );
}
