"use client";

import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";

// Custom styles to override default PhoneInput styles
const phoneInputStyles = {
  "--PhoneInput-color--focus": "hsl(var(--ring))",
  "--PhoneInputInternationalIconPhone-opacity": "0.8",
  "--PhoneInputInternationalIconGlobe-opacity": "0.8",
  "--PhoneInputCountrySelect-marginRight": "0.5rem",
  "--PhoneInputCountrySelectArrow-opacity": "0.5",
  "--PhoneInputCountrySelectArrow-color": "currentColor",
  "--PhoneInputCountrySelectArrow-rotation": "45deg",
  "--PhoneInputCountryFlag-aspectRatio": "1.5",
  "--PhoneInputCountryFlag-height": "1rem",
  "--PhoneInputCountryFlag-borderWidth": "1px",
  "--PhoneInputCountryFlag-borderColor": "rgba(0,0,0,0.1)",
  "--PhoneInputCountrySelectArrow-marginLeft": "0.5rem",
  "--PhoneInputCountrySelect-paddingLeft": "0.5rem",
  "--PhoneInputCountrySelect-paddingRight": "0.5rem",
} as React.CSSProperties;

interface ProductSellerPhoneFormProps {
  initialData: {
    phone: string;
  };
  productId: string;
  shopId: string;
}

const formSchema = z.object({
  phone: z.string().min(1, { message: "Phone number is required" }),
});

export default function ProductSellerPhoneForm({ initialData, shopId, productId }: ProductSellerPhoneFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: initialData.phone || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/shops/${shopId}/products/${productId}`, values);
      toast.success("Phone number updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-900 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Seller&apos;s Phone Number
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit phone
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.phone}</p>}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative" style={phoneInputStyles}>
                      <PhoneInput
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="TR"
                        value={field.value}
                        onChange={(value) => field.onChange(value || "")}
                        disabled={isSubmitting}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Enter phone number with country code</FormDescription>
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
