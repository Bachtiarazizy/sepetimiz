"use client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/Uploadhing";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof OurFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res && res[0]) {
          onChange(res[0].url);
          toast.success("Upload complete!");
        }
      }}
      onUploadError={(error: Error) => {
        toast.error(`Error: ${error.message}`);
      }}
      onUploadBegin={(name: string) => {
        console.log("Uploading", name);
      }}
    />
  );
};
