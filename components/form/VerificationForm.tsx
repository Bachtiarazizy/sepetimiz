"use client";

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
import { State, verificationData } from "@/actions/verification";

export default function VerificationForm() {
  const initalState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(verificationData, initalState);
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
        <CardTitle>Verication</CardTitle>
        <CardDescription>Please describe your personal information to start sell your product</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-2">
          <Label>Name</Label>
          <Input name="name" type="text" placeholder="Name of your Product" required minLength={3} />
          {state?.errors?.["name"]?.[0] && <p className="text-destructive">{state?.errors?.["name"]?.[0]}</p>}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Email Address</Label>
          <Input placeholder="example@gmail.com" type="string" name="email" required min={1} />
          {state?.errors?.["email"]?.[0] && <p className="text-destructive">{state?.errors?.["email"]?.[0]}</p>}
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Phone Number</Label>
          <Input placeholder="+90 544 255 2550" type="string" name="phoneNumber" required min={1} />
          {state?.errors?.["phoneNumber"]?.[0] && <p className="text-destructive">{state?.errors?.["phoneNumber"]?.[0]}</p>}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Address</Label>
          <Textarea name="address" placeholder="Pleae describe your address product " required minLength={10} />
          {state?.errors?.["address"]?.[0] && <p className="text-destructive">{state?.errors?.["description"]?.[0]}</p>}
        </div>

        <div className="flex flex-col gap-y-2">
          <input type="hidden" name="photoUrl" value={JSON.stringify(images)} />
          <Label>Your Photo</Label>
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

        <div className="flex flex-col gap-y-2">
          <input type="hidden" name="identityDocument" value={JSON.stringify(images)} />
          <Label>Identity Document</Label>
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

        <div className="flex flex-col gap-y-2">
          <input type="hidden" name="studentCard" value={JSON.stringify(images)} />
          <Label>Student Card</Label>
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
