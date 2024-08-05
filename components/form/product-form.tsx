"use client";

import { createProduct } from "@/actions/actions";
import { productSchema } from "@/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { useState } from "react";
import { useFormState } from "react-dom";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronLeft, XIcon } from "lucide-react";
import { parseWithZod } from "@conform-to/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select as CustomSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { categories } from "@/lib/categories";
import Image from "next/image";
import { UploadDropzone } from "@/lib/Uploadhing";
import { SubmitButton } from "./Submitbutton";
import { TipTapEditor } from "./Editor";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Select from "react-select";
import { cityOptions } from "@/constant/citi-lists";

const currencyOptions = [
  { value: "₺", label: "Lira" },
  { value: "$", label: "Dollar" },
  { value: "Rp", label: "Rupiah" },
];

interface CityOption {
  value: string;
  label: string;
}

interface CurrencyOption {
  value: string;
  label: string;
}

export default function ProductCreateRoute() {
  const [images, setImages] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [descriptionJson, setDescriptionJson] = useState(null);
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption | null>(null);
  const [lastResult, action] = useFormState(createProduct, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-4 mt-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/Dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-md font-semibold tracking-tight">My Product</h1>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>In this form you can create your product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input type="text" key={fields.name.key} name={fields.name.name} defaultValue={fields.name.initialValue} className="w-full" placeholder="Product Name" />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Location</Label>
              <Select<CityOption, false> options={cityOptions} value={selectedCity} onChange={(option) => setSelectedCity(option as CityOption | null)} placeholder="Select a city" className="w-full" />
              <input type="hidden" name="location" value={selectedCity?.value || ""} />
              <p className="text-red-500">{fields.location.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Whatsapp Number</Label>
              <PhoneInput international defaultCountry="TR" value={phoneNumber} onChange={(value: string | undefined) => setPhoneNumber(value || "")} className="w-full" placeholder="Enter phone number" />
              <input type="hidden" name="SellerPhone" value={phoneNumber || ""} />
              <p className="text-red-500">{fields.SellerPhone.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <TipTapEditor json={descriptionJson} setJson={setDescriptionJson} />
              <input type="hidden" name="description" value={JSON.stringify(descriptionJson)} />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Price</Label>
              <div className="flex gap-3">
                <Input key={fields.price.key} name={fields.price.name} defaultValue={fields.price.initialValue} type="text" placeholder="55" />
                <Select<CurrencyOption, false> options={currencyOptions} value={selectedCurrency} onChange={(option) => setSelectedCurrency(option as CurrencyOption | null)} placeholder="Select currency" className="w-full" />
              </div>
              <input type="hidden" name="currency" value={selectedCurrency?.value || ""} />
              <p className="text-red-500">{fields.price.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <CustomSelect key={fields.status.key} name={fields.status.name} defaultValue={fields.status.initialValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </CustomSelect>
              <p className="text-red-500">{fields.status.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Category</Label>
              <CustomSelect key={fields.category.key} name={fields.category.name} defaultValue={fields.category.initialValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </CustomSelect>
              <p className="text-red-500">{fields.category.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input type="hidden" value={images} key={fields.images.key} name={fields.images.name} defaultValue={fields.images.initialValue as any} />
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-[100px] h-[100px]">
                      <Image height={100} width={100} src={image} alt="Product Image" className="w-full h-full object-cover rounded-lg border" />
                      <button onClick={() => handleDelete(index)} type="button" className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white">
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImages(res.map((r) => r.url));
                  }}
                  onUploadError={() => {
                    alert("Something went wrong");
                  }}
                />
              )}
              <p className="text-red-500">{fields.images.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Create Product" />
        </CardFooter>
      </Card>
    </form>
  );
}
