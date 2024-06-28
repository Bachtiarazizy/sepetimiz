"use client";

import { sendEmail } from "@/app/api/send/route";
import React from "react";
import { toast } from "sonner";
import { Submitbutton } from "./Submitbutton";
import { Button } from "../ui/button";

export default function ContactUs() {
  return (
    <div>
      <p className="text-gray-700 -mt-6 dark:text-white/80">
        Please contact me directly at{" "}
        <a className="underline" href="mailto:example@gmail.com">
          example@gmail.com
        </a>{" "}
        or through this form.
      </p>

      <form
        className="mt-10 flex flex-col dark:text-black"
        action={async (formData) => {
          const { data, error } = await sendEmail(formData);

          if (error) {
            toast.error(error);
            return;
          }

          toast.success("Email sent successfully!");
        }}
      >
        <input className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none" name="senderEmail" type="email" required maxLength={500} placeholder="Your email" />
        <textarea className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none" name="message" placeholder="Your message" required maxLength={5000} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
