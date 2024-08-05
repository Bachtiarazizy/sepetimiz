"use client";

import { shopSchema } from "@/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { useState } from "react";
import { useFormState } from "react-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { parseWithZod } from "@conform-to/zod";
import { SubmitButton } from "./Submitbutton";
import { UploadDropzone } from "@/lib/Uploadhing";
import { XIcon } from "lucide-react";
import { createShop } from "@/actions/actions";
import Select from "react-select"; // Import react-select and rename to ReactSelect
import { cityOptions } from "@/constant/citi-lists";

interface CityOption {
  value: string;
  label: string;
}

export default function ShopForm() {
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const [shopImage, setShopImage] = useState<string>("");
  const [lastResult, action] = useFormState(createShop, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: shopSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Create Shop</CardTitle>
          <CardDescription>Fill out the form to create a new shop</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input type="text" key={fields.name.key} name={fields.name.name} defaultValue={fields.name.initialValue} className="w-full" placeholder="Shop Name" />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Input type="text" key={fields.description.key} name={fields.description.name} defaultValue={fields.description.initialValue} className="w-full" placeholder="Description" />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Location</Label>
              <Select<CityOption, false> options={cityOptions} value={selectedCity} onChange={(option) => setSelectedCity(option as CityOption | null)} placeholder="Select a city" className="w-full color" />
              <input type="hidden" name="location" value={selectedCity?.value || ""} />
              <p className="text-red-500">{fields.location.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Shop Image</Label>
              <input type="hidden" value={shopImage} key={fields.shopImage.key} name={fields.shopImage.name} defaultValue={fields.shopImage.initialValue as any} />
              {shopImage ? (
                <div className="relative w-[100px] h-[100px]">
                  <img src={shopImage} alt="Shop Image" className="w-full h-full object-cover rounded-lg border" />
                  <button onClick={() => setShopImage("")} type="button" className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white">
                    <XIcon className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setShopImage(res[0].url);
                  }}
                  onUploadError={() => {
                    alert("Something went wrong");
                  }}
                />
              )}
              <p className="text-red-500">{fields.shopImage.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Create Shop" />
        </CardFooter>
      </Card>
    </form>
  );
}
