"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"; // Corrected import
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export default async function CreateShopPage({ params }: { params: { shopId: string } }) {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/shops", values);
      router.push(`/shops/${response.data.id}/edit`);
      toast.success("Shop created");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of the shop</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormDescription>Enter the name of the shop</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-4" type="submit" disabled={isSubmitting || !isValid}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
