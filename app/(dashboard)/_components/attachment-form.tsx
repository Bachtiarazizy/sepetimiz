"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { Attachment, Course } from "@prisma/client";
import { FileUpload } from "@/components/ui/file-upload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1, {
    message: "Image is required",
  }),
});

export default function AttachmentForm({ initialData, courseId }: AttachmentFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const [deleteingId, setDeleteingId] = useState<string | null>(null);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: initialData?.imageUrl || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course Updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeleteingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment Deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeleteingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachment
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && <>{initialData.attachments.length === 0 && <p>No attachments yet</p>}</>}
      {initialData.attachments.length > 0 && (
        <div className="space-y-2">
          {initialData.attachments.map((attachment) => (
            <div key={attachment.id} className="flex items-center p-3 bg-sky-100 rounded-md border border-sky-200 text-sky-700">
              <File className="h-4 w-4 mr-2 flex-shrink-0" />
              <p className="text-xs line-clamp-1">{attachment.name}</p>
              {deleteingId === attachment.id && (
                <div>
                  <Loader2 className="animate-spin h-4 w-4" />
                </div>
              )}
              {deleteingId !== attachment.id && (
                <button onClick={() => onDelete(attachment.id)} className="ml-auto hover:opacity-75 transition">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">Add anything your student might need to completed the course</div>
        </div>
      )}
    </div>
  );
}
