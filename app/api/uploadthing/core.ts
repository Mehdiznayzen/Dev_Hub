import {
  createUploadthing,
  type FileRouter,
} from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  profileAvatar: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  })
    .onUploadComplete(async ({ file }) => {
      console.log("=================================");
      console.log("UPLOADTHING UPLOAD COMPLETE");
      console.log("File:", file);
      console.log("URL:", file.ufsUrl);
      console.log("=================================");

      return {
        url: file.ufsUrl,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;