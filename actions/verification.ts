"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ZodStringDef, z } from "zod";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

export type State = {
  status: "error" | "success" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

const VerificationDataSchema = z.object({
  name: z.string().min(3, { message: "The name has to be a minimum character length of 3" }),
  photoUrl: z.array(z.string(), { message: "Images are required" }),
  email: z.string().email({ message: "Email is required" }),
  address: z.string().min(10, { message: "Address is required" }),
  studentDocument: z.array(z.string().min(10, { message: "Student ID is required" })),
  identityNumber: z.string().min(10, { message: "identity number is required" }),
  phoneNumber: z.string().min(10, { message: "Phone is required" }),
});

export async function verificationData(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Something went wrong");
  }

  const validateFields = VerificationDataSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    address: formData.get("address"),
    photoUrl: JSON.parse(formData.get("photoUrl") as string),
    identityNumber: formData.get("identityNumber"),
    studentDocument: JSON.parse(formData.get("studentDocument") as string),
    phoneNumber: formData.get("phoneNumber"),
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    };

    return state;
  }

  const data = await prisma.verificationData.create({
    data: {
      name: validateFields.data.name,
      email: validateFields.data.email,
      address: validateFields.data.address,
      photoUrl: validateFields.data.photoUrl,
      identityNumber: validateFields.data.identityNumber,
      studentDocument: validateFields.data.studentDocument,
      phoneNumber: validateFields.data.phoneNumber,
      userId: user.id,
    },
  });

  return redirect(`/verification/success`);
}
