import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "4MB",maxFileCount:1 } })
    .onUploadComplete(()=>{}),
    courseAttachment: f(["text","image","video","audio","pdf"])
    .onUploadComplete(()=>{}),
    ChapterVideo: f({ video: { maxFileSize: "128GB",maxFileCount:1 } })
    .onUploadComplete(()=>{}),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;