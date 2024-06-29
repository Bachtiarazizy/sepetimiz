"use client";

import { SellProduct, State } from "@/actions/post-product";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/lib/Uploadhing";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { Submitbutton } from "./Submitbutton";
import { Textarea } from "../ui/textarea";
import { SelectCategory } from "./SelectCategory";

export default function SellForm() {
  const initalState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(SellProduct, initalState);
  const [images, setImages] = useState<null | string[]>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Sell your product with ease</CardTitle>
        <CardDescription>Please describe your product here in detail so that it can be sold</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-2">
          <Label>Name</Label>
          <Input name="name" type="text" placeholder="Name of your Product" required minLength={3} />
          {state?.errors?.["name"]?.[0] && <p className="text-destructive">{state?.errors?.["name"]?.[0]}</p>}
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Category</Label>
          <SelectCategory />
          {state?.errors?.["category"]?.[0] && <p className="text-destructive">{state?.errors?.["category"]?.[0]}</p>}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Price</Label>
          <Input placeholder="29$" type="string" name="price" required min={1} />
          {state?.errors?.["price"]?.[0] && <p className="text-destructive">{state?.errors?.["price"]?.[0]}</p>}
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Whatsapp number</Label>
          <Input placeholder="+90 544 255 2550" type="string" name="SellerPhone" required min={1} />
          {state?.errors?.["SellerPhone"]?.[0] && <p className="text-destructive">{state?.errors?.["SellerPhone"]?.[0]}</p>}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Small Summary</Label>
          <Textarea name="description" placeholder="Pleae describe your product shortly right here..." required minLength={10} />
          {state?.errors?.["description"]?.[0] && <p className="text-destructive">{state?.errors?.["description"]?.[0]}</p>}
        </div>

        <div className="flex flex-col gap-y-2">
          <input type="hidden" name="images" value={JSON.stringify(images)} />
          <Label>Product Images</Label>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImages(res.map((item) => item.url));
              toast.success("Your images have been uploaded");
            }}
            onUploadError={(error: Error) => {
              toast.error("Something went wrong, try again");
            }}
          />
          {state?.errors?.["images"]?.[0] && <p className="text-destructive">{state?.errors?.["images"]?.[0]}</p>}
        </div>
      </CardContent>
      <CardFooter className="mt-5">
        <Submitbutton title="Create your Product" />
      </CardFooter>
    </form>
  );
}
