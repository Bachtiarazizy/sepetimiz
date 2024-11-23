import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  Image: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  Attachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  Video: f({ video: { maxFileSize: "8GB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),

  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 5 } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      // Consider adding image processing here if needed
      // - Ensure square aspect ratio
      // - Optimize file size
      // - Generate thumbnails if needed
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
