"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import Image from "next/image";

interface StudentDocumentFormProps {
  initialData: {
    studentDocument: string;
  };
  shopId: string;
  verificationId: string;
}

const formSchema = z.object({
  studentDocument: z.string().min(1, {
    message: "Image is required",
  }),
});

export default function StudentDocumentForm({ initialData, shopId, verificationId }: StudentDocumentFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const [deleteingId, setDeleteingId] = useState<string | null>(null);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentDocument: initialData?.studentDocument || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/shops/${shopId}/verification/${verificationId}`, values);
      toast.success("Document Updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-900 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Student Document
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData?.studentDocument && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add File
            </>
          )}
          {!isEditing && initialData?.studentDocument && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit File
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.studentDocument ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 dark:bg-slate-900 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image alt="Upload" fill src={initialData.studentDocument} className="object-cover rounded-md" />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="Image"
            onChange={(url) => {
              if (url) {
                onSubmit({ studentDocument: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">add anything that proves your student status</div>
        </div>
      )}
    </div>
  );
}
