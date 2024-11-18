"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { ImageIcon, Pencil, PlusCircle, Trash, XIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Product } from "@prisma/client";
import { FileUpload } from "@/components/ui/file-upload";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/lib/Uploadhing";

interface ProductImageFormProps {
  initialData: Product;
  shopId: string;
  productId: string;
}

const formSchema = z.object({
  images: z.string().min(1, {
    message: "Image is required",
  }),
});

export default function ProductImageForm({ initialData, productId, shopId }: ProductImageFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: initialData?.images || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/shops/${shopId}/products/${productId}`, values);
      toast.success("Images Updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-900 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Shop's Image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData?.images && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Image
            </>
          )}
          {!isEditing && initialData?.images && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.images ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 dark:bg-slate-900 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image alt="Upload" fill src={initialData.images} className="object-cover rounded-md" />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="Image"
            onChange={(url) => {
              if (url) {
                onSubmit({ images: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">16:9 aspect ratio is recommended</div>
        </div>
      )}
    </div>
  );
}
