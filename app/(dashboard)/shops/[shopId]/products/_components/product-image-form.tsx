"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { ImageIcon, Pencil, PlusCircle, Trash } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Product } from "@prisma/client";
import { FileUpload } from "@/components/ui/file-upload";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";

interface ProductImageFormProps {
  initialData: Product;
  shopId: string;
  productId: string;
}

const formSchema = z.object({
  images: z.array(z.string()).max(5, { message: "Maximum of 5 images allowed" }).optional(),
});

export default function ProductImageForm({ initialData, productId, shopId }: ProductImageFormProps) {
  const initialImages = Array.isArray(initialData?.images) ? initialData.images : [];
  const [isEditing, setIsEditing] = useState(false);
  const [images, setImages] = useState<string[]>(initialImages);
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: initialImages,
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

  // Fungsi untuk menambahkan gambar
  const handleImageChange = (url: string | undefined) => {
    if (url && images.length < 5) {
      const updatedImages = [...images, url];
      setImages(updatedImages);
      form.setValue("images", updatedImages, { shouldValidate: true });
    }
  };

  // Fungsi untuk menghapus gambar
  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    form.setValue("images", updatedImages, { shouldValidate: true });
  };

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-900 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Product's Images
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !images.length && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Images
            </>
          )}
          {!isEditing && images.length > 0 && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Images
            </>
          )}
        </Button>
      </div>

      {/* Carousel/Slider */}
      {!isEditing && images.length > 0 && (
        <div className="relative mt-4">
          <Swiper modules={[Pagination, Navigation]} pagination={{ clickable: true }} navigation spaceBetween={10} slidesPerView={1} className="rounded-md">
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <Image alt={`Product Image ${index + 1}`} src={img} fill className="object-cover rounded-md" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* No Images Placeholder */}
      {!isEditing && images.length === 0 && (
        <div className="flex items-center justify-center h-60 bg-slate-200 dark:bg-slate-900 rounded-md">
          <ImageIcon className="h-10 w-10 text-slate-500" />
        </div>
      )}

      {/* Image Upload Section */}
      {isEditing && (
        <div>
          <FileUpload endpoint="Images" onChange={(url) => handleImageChange(url)} />
          <div className="text-xs text-muted-foreground mt-4">Maximum of 5 images allowed. Aspect ratio is recommended.</div>

          {/* Preview Uploaded Images */}
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <Image alt={`Uploaded Image ${index + 1}`} src={img} width={200} height={200} className="object-cover rounded-md" />
                  <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full">
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {images.length > 0 && (
            <div className="mt-4">
              <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting || !isValid}>
                Save Images
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
