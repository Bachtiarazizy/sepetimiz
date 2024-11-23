"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import { Product } from "@prisma/client";
import { FileUpload } from "@/components/ui/product-upload";

interface ProductImageFormProps {
  initialData: Product & { images: string[] };
  shopId: string;
  productId: string;
}

const MAX_IMAGES = 5;

const formSchema = z.object({
  images: z
    .array(z.string())
    .min(1, {
      message: "At least one image is required",
    })
    .max(MAX_IMAGES, {
      message: `Maximum ${MAX_IMAGES} images allowed`,
    }),
});

export default function ProductImageForm({ initialData, productId, shopId }: ProductImageFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: initialData?.images || [],
    },
  });

  const { isSubmitting } = form.formState;
  const currentImages = form.watch("images");

  const toggleEdit = () => setIsEditing((current) => !current);

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

  const handleImageDelete = async (indexToDelete: number) => {
    const currentImages = form.getValues("images");
    const newImages = currentImages.filter((_, index) => index !== indexToDelete);

    try {
      await onSubmit({ images: newImages });
      form.setValue("images", newImages);
      if (selectedImageIndex >= newImages.length) {
        setSelectedImageIndex(Math.max(0, newImages.length - 1));
      }
    } catch {
      toast.error("Failed to delete image");
    }
  };

  const handleUploadComplete = (urls: string[]) => {
    const currentImages = form.getValues("images");
    const newImages = [...currentImages, ...urls].slice(0, MAX_IMAGES);
    onSubmit({ images: newImages });
  };

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-900 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Product Images ({currentImages.length}/{MAX_IMAGES})
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && "Cancel"}
          {!isEditing && !currentImages.length && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Images
            </>
          )}
          {!isEditing && currentImages.length > 0 && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Images
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <div className="mt-4">
          {!currentImages.length ? (
            <div className="flex items-center justify-center h-60 bg-slate-200 dark:bg-slate-900 rounded-md">
              <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Main selected image */}
              <div className="md:col-span-2">
                <div className="relative aspect-square w-full">
                  <Image alt="Main product image" fill src={currentImages[selectedImageIndex]} className="object-contain rounded-md bg-slate-200 dark:bg-slate-800" priority />
                </div>
              </div>

              {/* Thumbnail gallery */}
              <div className="md:col-span-2 grid grid-cols-4 sm:grid-cols-5 gap-2">
                {currentImages.map((image, index) => (
                  <div
                    key={image}
                    className={`
                      relative aspect-square cursor-pointer
                      ${selectedImageIndex === index ? "ring-2 ring-blue-500" : ""}
                      group overflow-hidden rounded-md bg-slate-200 dark:bg-slate-800
                    `}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image alt={`Product image ${index + 1}`} fill src={image} className="object-contain rounded-md transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageDelete(index);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {isEditing && (
        <div className="mt-4">
          <FileUpload endpoint="imageUploader" onChange={handleUploadComplete} maxFiles={MAX_IMAGES - currentImages.length} />
          <div className="text-xs text-muted-foreground mt-4">
            <p>Image requirements:</p>
            <ul className="list-disc list-inside mt-1">
              <li>Square aspect ratio (1:1) recommended</li>
              <li>Minimum resolution: 800x800 pixels</li>
              <li>Maximum file size: 4MB</li>
              <li>White or transparent background preferred</li>
              <li>Up to {MAX_IMAGES} images allowed</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
