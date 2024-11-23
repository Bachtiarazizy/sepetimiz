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
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Product name is required",
  }),
});

export default function CreateProductPage() {
  const params = useParams();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  useEffect(() => {
    const checkShopStatus = async () => {
      try {
        const response = await axios.get(`/api/shops/${params.shopId}/check-status`);
        if (!response.data.isPublished) {
          setShowModal(true);
        }
      } catch (error) {
        toast.error("Error checking shop status");
        // Optionally redirect to shops page on error
        router.push("/shops");
      } finally {
        setIsLoading(false);
      }
    };

    checkShopStatus();
  }, [params.shopId, router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`/api/shops/${params.shopId}/products`, values);
      router.push(`/shops/${params.shopId}/products/${response.data.id}/edit`);
      toast.success("Product created successfully");
    } catch (error) {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <AlertDialog open={showModal} onOpenChange={setShowModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Shop Not Published</AlertDialogTitle>
            <AlertDialogDescription>You need to publish your shop before creating products. Would you like to go to your shops now?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                router.push("/shops");
                setShowModal(false);
              }}
            >
              Go to Shops
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
    </>
  );
}
