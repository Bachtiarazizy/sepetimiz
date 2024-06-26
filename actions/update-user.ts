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

const userSettingsSchema = z.object({
  firstName: z.string().min(3, { message: "Minimum length of 3 required" }).or(z.literal("")).optional(),

  lastName: z.string().min(3, { message: "Minimum length of 3 required" }).or(z.literal("")).optional(),
});

export async function UpdateUserSettings(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("something went wrong");
  }

  const validateFields = userSettingsSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    };

    return state;
  }

  const data = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName: validateFields.data.firstName,
      lastName: validateFields.data.lastName,
    },
  });

  const state: State = {
    status: "success",
    message: "Your Settings have been updated",
  };

  return state;
}
