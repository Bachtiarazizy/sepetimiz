"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface NameFormProps {
  initialData: {
    title: string;
  };
  shopId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Name is required",
  }),
});

export default function NameForm({ initialData, shopId }: NameFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/shops/${shopId}/update`, values);
      toast.success("Name Updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-900 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Shop's Name
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit name
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm">{initialData.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder="Enter shop" {...field} />
                  </FormControl>
                  <FormDescription>Enter name of the shop</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-4" type="submit" disabled={isSubmitting || !isValid}>
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
