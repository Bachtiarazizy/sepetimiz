import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Faqs from "@/components/hyper-ui/Faqs";

export default function CustomerSevice() {
  return (
    <main className="flex  flex-col gap-y-5 text-center ly:p-20 md:py-10 py-5 lg:px-20 md:px-10 px-5">
      <h1 className="text-3xl font-semibold">Frequently Asked Questions</h1>
      <div>
        <Faqs />
        <div className="rounded-lg  p-8 shadow-lg lg:col-span-3 lg:p-12 flex flex-row gap-5 items-center justify-center">
          <input type="text" name="name" placeholder="Lets we help you" className="w-1/2 rounded-lg bg-gray-100 dark:bg-gray-800 p-3 text-sm" />
          <Button className="">Email Us</Button>
        </div>
      </div>
    </main>
  );
}
