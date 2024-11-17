"use client";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProductActionProps {
  disabled: boolean;
  shopId: string;
  isPublished: boolean;
  productId: string;
}

export const ProductAction = ({ shopId, isPublished, disabled, productId }: ProductActionProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/shops/${shopId}/products/${productId}`);
      toast.success("Product Deleted");
      router.refresh();
      router.push(`/shops/${shopId}/products`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(`/api/shops/${shopId}/products/${productId}/unpublish`);
        toast.success("Product Unpublished");
        router.push(`/shops/${shopId}/products`);
      } else {
        await axios.patch(`/api/shops/${shopId}/products/${productId}/publish`);
        toast.success("Products Published");
        confetti.onOpen();
        router.push(`/shops/${shopId}/products`);
      }
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button onClick={onClick} disabled={disabled || isLoading} variant="outline" size="sm">
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
