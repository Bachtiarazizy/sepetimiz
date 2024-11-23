"use client";

import * as z from "zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Product name is required",
  }),
});

export default function CreateProductPage() {
  const params = useParams();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`/api/shops/${params.shopId}/verification`, values);
      router.push(`/shops/${params.shopId}/verification/${response.data.id}/edit`);
      toast.success("Name created successfully");
    } catch (error) {
      // More detailed error handling with axios
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          toast.error("Shop not found");
        } else if (error.response?.status === 400) {
          toast.error(error.response.data || "Invalid input");
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your name" {...field} />
                </FormControl>
                <FormDescription>Enter Full Name</FormDescription>
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
