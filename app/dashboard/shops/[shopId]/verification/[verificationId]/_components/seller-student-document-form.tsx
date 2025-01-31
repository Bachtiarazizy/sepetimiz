"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { File, Loader2, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

interface StudentDocumentFormProps {
  initialData: {
    studentDocument?: string;
    studentDocumentOriginalName?: string;
  };
  shopId: string;
  verificationId: string;
}

const formSchema = z.object({
  studentDocument: z.string().min(1, {
    message: "Document is required",
  }),
  studentDocumentOriginalName: z.string().optional(),
});

export default function StudentDocumentForm({ initialData, shopId, verificationId }: StudentDocumentFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentDocument: initialData?.studentDocument || "",
      studentDocumentOriginalName: initialData?.studentDocumentOriginalName || "",
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
              Add Document
            </>
          )}
          {!isEditing && initialData?.studentDocument && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Document
            </>
          )}
        </Button>
      </div>
      {!isEditing && initialData.studentDocument && (
        <div className="flex items-center p-3 w-full bg-slate-200 dark:bg-slate-900 rounded-md">
          <File className="h-6 w-6 text-blue-500 mr-2" />
          <a href={initialData.studentDocument} target="_blank" rel="noopener noreferrer" className="text-sm">
            {initialData.studentDocumentOriginalName || "Student Document"}
          </a>
        </div>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="studentDocument"
            onChange={(url, originalName) => {
              if (url) {
                onSubmit({
                  studentDocument: url,
                  studentDocumentOriginalName: originalName,
                });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">Upload a document that proves your student status</div>
        </div>
      )}
    </div>
  );
}
