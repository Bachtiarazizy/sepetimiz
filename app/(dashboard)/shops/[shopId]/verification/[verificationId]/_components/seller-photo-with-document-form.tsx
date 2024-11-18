"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Shop } from "@prisma/client";
import { FileUpload } from "@/components/ui/file-upload";

interface SellerPhotoWithDocumentFormProps {
  initialData: {
    photoWithDocument: string;
  };
  shopId: string;
  verificationId: string;
}

const formSchema = z.object({
  photoWithDocument: z.string().min(1, {
    message: "Photo is required",
  }),
});

export default function SellerPhotoWithDocumentForm({ initialData, shopId, verificationId }: SellerPhotoWithDocumentFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photoWithDocument: initialData?.photoWithDocument || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/shops/${shopId}/verification/${verificationId}`, values);
      toast.success("Photo Updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-900 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Your Photo With Identity Card
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData?.photoWithDocument && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Image
            </>
          )}
          {!isEditing && initialData?.photoWithDocument && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.photoWithDocument ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 dark:bg-slate-900 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image alt="Upload" fill src={initialData.photoWithDocument} className="object-cover rounded-md" />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="Image"
            onChange={(url) => {
              if (url) {
                onSubmit({ photoWithDocument: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4"> Jpeg format is recommended</div>
        </div>
      )}
    </div>
  );
}
