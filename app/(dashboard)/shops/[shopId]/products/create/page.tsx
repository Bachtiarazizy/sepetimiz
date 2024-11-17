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
  name: z.string().min(1, {
    message: "Product name is required",
  }),
});

export default function CreateProductPage() {
  const params = useParams();
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
      const response = await axios.post(`/api/shops/${params.shopId}/products`, values);
      router.push(`/shops/${params.shopId}/products/${response.data.id}/edit`);
      toast.success("Product created successfully");
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormDescription>Enter the name of the product</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mt-4" type="submit" disabled={isSubmitting || !isValid}>
            Create Product
          </Button>
        </form>
      </Form>
    </div>
  );
}
