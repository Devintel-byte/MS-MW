import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  memoryImage: f({
    image: { 
      maxFileSize: "4MB",
      maxFileCount: 1,
    }
  })
  .onUploadComplete(() => {}), // No auth needed
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;