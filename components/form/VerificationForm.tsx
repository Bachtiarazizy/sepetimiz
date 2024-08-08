"use client";

import { verificationSchema } from "@/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { useState } from "react";
import { useFormState } from "react-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { parseWithZod } from "@conform-to/zod";
import { SubmitButton } from "./Submitbutton";
import { UploadDropzone } from "@/lib/Uploadhing";
import { XIcon } from "lucide-react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Textarea } from "../ui/textarea";
import { handleVerificationForm } from "@/actions/actions";

interface CityOption {
  value: string;
  label: string;
}

export default function VerificationForm() {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [Image, setImage] = useState<string>("");
  const [ImageDoc, setImageDoc] = useState<string>("");
  const [lastResult, action] = useFormState(handleVerificationForm, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: verificationSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Verification</CardTitle>
          <CardDescription>Please verify your account to start selling on our platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input type="text" key={fields.name.key} name={fields.name.name} defaultValue={fields.name.initialValue} className="w-full" placeholder="Name" />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Email Address</Label>
              <Input type="text" key={fields.email.key} name={fields.email.name} defaultValue={fields.email.initialValue} className="w-full" placeholder="Email" />
              <p className="text-red-500">{fields.email.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Whatsapp Number</Label>
              <PhoneInput international defaultCountry="TR" value={phoneNumber} onChange={(value: string | undefined) => setPhoneNumber(value || "")} className="w-full" placeholder="Enter phone number" />
              <input type="hidden" name="phoneNumber" value={phoneNumber || ""} />
              <p className="text-red-500">{fields.phoneNumber.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Address</Label>
              <Textarea rows={5} key={fields.address.key} name={fields.address.name} defaultValue={fields.address.initialValue} className="w-full" placeholder="Description" />
              <p className="text-red-500">{fields.address.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Identity Number</Label>
              <Input type="text" key={fields.identityNumber.key} name={fields.identityNumber.name} defaultValue={fields.identityNumber.initialValue} className="w-full" placeholder="identity Number" />
              <p className="text-red-500">{fields.identityNumber.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Your Photo</Label>
              <input type="hidden" value={Image} key={fields.photoUrl.key} name={fields.photoUrl.name} defaultValue={fields.photoUrl.initialValue as any} />
              {Image ? (
                <div className="relative w-[100px] h-[100px]">
                  <img src={Image} alt="Photo Image" className="w-full h-full object-cover rounded-lg border" />
                  <button onClick={() => setImage("")} type="button" className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white">
                    <XIcon className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImage(res[0].url);
                  }}
                  onUploadError={() => {
                    alert("Something went wrong");
                  }}
                />
              )}
              <p className="text-red-500">{fields.photoUrl.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Photo Document</Label>
              <input type="hidden" value={ImageDoc} key={fields.studentDocument.key} name={fields.studentDocument.name} defaultValue={fields.studentDocument.initialValue as any} />
              {ImageDoc ? (
                <div className="relative w-[100px] h-[100px]">
                  <img src={ImageDoc} alt="Image Document" className="w-full h-full object-cover rounded-lg border" />
                  <button onClick={() => setImageDoc("")} type="button" className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white">
                    <XIcon className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImageDoc(res[0].url);
                  }}
                  onUploadError={() => {
                    alert("Something went wrong");
                  }}
                />
              )}
              <p className="text-red-500">{fields.studentDocument.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Submit" />
        </CardFooter>
      </Card>
    </form>
  );
}
