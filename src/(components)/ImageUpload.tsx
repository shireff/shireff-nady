import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import clsx from "clsx";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import React, { ChangeEvent, useEffect, useRef } from "react";

interface ImageUploadProps {
  imageUpload: File | null;
  setImageUpload: React.Dispatch<React.SetStateAction<File | null>>;
  imageLoading: boolean;
  setImageLoading: React.Dispatch<React.SetStateAction<boolean>>;
  uploadImageUrl: string;
  setUploadImageUrl: React.Dispatch<React.SetStateAction<string>>;
  isEditMode?: boolean;
  isCustomStyle?: boolean;
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  imageUpload,
  setImageUpload,
  setUploadImageUrl,
  setImageLoading,
  imageLoading,
  isEditMode,
  isCustomStyle = false,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (!imageUpload && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [imageUpload]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUpload(file);
      setUploadImageUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setImageUpload(file);
      setUploadImageUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setUploadImageUrl("");
    setImageUpload(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const uploadImageToCloud = async () => {
    setImageLoading(true);
    const data = new FormData();
    data.append("file", imageUpload!);
    const response = await axios.post(
      "https://shireff-nady-server.vercel.app/api/projects/upload-image",
      data
    );
    if (response.data.success) {
      setUploadImageUrl(response.data.result.url);
      setImageLoading(false);
    } else {
      console.error("Failed to upload image");
    }
  };

  useEffect(() => {
    if (imageUpload) {
      uploadImageToCloud();
    }
  }, [imageUpload]);

  return (
    <div className={`w-full mt-5 ${isCustomStyle ? "" : "max-w-md mx-auto"}`}>
      {/* <Label className="text-ls font-semibold mb-2 block">Upload Image</Label> */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={clsx(
          "border border-dashed border-gray-300 rounded-lg p-4 h-[100px]",
          isEditMode && "opacity-50 cursor-not-allowed pointer-events-none"
        )}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageUpload}
          disabled={isEditMode}
          hidden
        />
        {!imageUpload ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop or Click to Upload</span>
          </Label>
        ) : imageLoading ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium">{imageUpload.name}</p>
            <Button
              className="text-muted-foreground hover:text-foreground"
              variant={"ghost"}
              size={"icon"}
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove Image</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
