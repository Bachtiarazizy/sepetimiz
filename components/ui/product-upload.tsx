"use client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/Uploadhing";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (urls: string[]) => void; // Changed to accept array of URLs
  endpoint: keyof OurFileRouter;
  maxFiles?: number;
}

export const FileUpload = ({ onChange, endpoint, maxFiles = 1 }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res) {
          const urls = res.map((file) => file.url);
          onChange(urls);
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
