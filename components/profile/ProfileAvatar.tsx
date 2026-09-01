"use client";

import { useState } from "react";
import { Camera, Loader2 } from "lucide-react";

import { Input } from "../ui/input";
import { useUploadThing } from "@/lib/uploadthing";

interface ProfileAvatarProps {
  setAvatarUrl: (url: string | null) => void;
}

const ProfileAvatar = ({ setAvatarUrl }: ProfileAvatarProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const { startUpload } = useUploadThing("profileAvatar", {
    onClientUploadComplete: (res) => {
      console.log("Upload complete:", res);

      const uploadedFile = res?.[0];

      if (uploadedFile) {
        console.log("Uploaded URL:", uploadedFile.ufsUrl);
        setAvatarUrl(uploadedFile.ufsUrl);
      }

      setUploading(false);
    },

    onUploadError: (error) => {
      console.error("Upload error:", error);

      setUploading(false);
      setPreview(null);

      alert(error.message);
    },
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("1️⃣ File input changed");

    const file = event.target.files?.[0];

    if (!file) {
      console.log("❌ No file selected");
      return;
    }

    console.log("2️⃣ File selected:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be smaller than 2MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    try {
      console.log("3️⃣ Starting upload...");

      setUploading(true);

      const response = await startUpload([file]);

      console.log("4️⃣ Upload response:", response);
    } catch (error) {
      console.error("❌ Upload failed:", error);

      setUploading(false);
      setPreview(null);
    }
  };

  return (
    <div className="flex items-center gap-5">
      {/* Avatar */}
      <div className="relative group">
        <Input
          id="avatar-upload"
          type="file"
          accept="image/png,image/jpeg,image/gif"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />

        <label
          htmlFor="avatar-upload"
          className="flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-dashed border-border bg-secondary/40 transition-all duration-200 group-hover:border-primary/50 group-hover:bg-primary/5 "
        >
          {uploading ? (
            <Loader2
              className="h-6 w-6 animate-spin text-primary"
            />
          ) : preview ? (
            <img
              src={preview}
              alt="Profile preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <Camera
              className="
                h-6
                w-6
                text-muted-foreground
                transition-colors
                group-hover:text-primary
              "
            />
          )}
        </label>
      </div>

      {/* Information */}
      <div>
        <p className="mt-1 text-xs text-muted-foreground">
          PNG, JPG or GIF. Max 2MB.
        </p>
      </div>
    </div>
  );
};

export default ProfileAvatar;