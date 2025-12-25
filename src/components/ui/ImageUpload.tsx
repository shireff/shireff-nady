'use client';

import React, { ChangeEvent, useEffect, useRef } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import api from "@/services/api";

// Atomic Components
import DropzoneIcon from "../atomic/atoms/DropzoneIcon";
import UploadStatus from "../atomic/atoms/UploadStatus";
import ImagePreview from "../atomic/molecules/ImagePreview";
import FileDetails from "../atomic/molecules/FileDetails";

interface ImageUploadProps {
    imageUpload: File | null;
    setImageUpload: React.Dispatch<React.SetStateAction<File | null>>;
    imageLoading: boolean;
    setImageLoading: React.Dispatch<React.SetStateAction<boolean>>;
    uploadImageUrl: string;
    setUploadImageUrl: React.Dispatch<React.SetStateAction<string>>;
    isEditMode?: boolean;
    isCustomStyle?: boolean;
    uploadEndpoint?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    imageUpload,
    setImageUpload,
    setUploadImageUrl,
    setImageLoading,
    imageLoading,
    uploadImageUrl,
    isEditMode,
    isCustomStyle = false,
    uploadEndpoint = "/projects/upload-image",
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

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isEditMode) return;

        const file = e.dataTransfer.files?.[0];
        if (file) {
            setImageUpload(file);
            setUploadImageUrl(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setUploadImageUrl("");
        setImageUpload(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const uploadImageToCloud = async (): Promise<string | null> => {
        if (!imageUpload) return null;
        setImageLoading(true);
        const data = new FormData();

        const fieldName = uploadEndpoint.includes('home') || uploadEndpoint.includes('settings') ? 'image' : 'img';
        data.append(fieldName, imageUpload);

        try {
            const res = await api.post(uploadEndpoint, data, { headers: { 'Content-Type': 'multipart/form-data' } });
            const finalUrl = res.data.result?.secure_url || res.data.result?.url || res.data.url;
            if (finalUrl) setUploadImageUrl(finalUrl);
            return finalUrl;
        } catch (err) {
            console.error("Upload Error:", err);
            return null;
        } finally {
            setImageLoading(false);
        }
    };

    useEffect(() => {
        if (imageUpload && !uploadImageUrl.startsWith('http')) {
            uploadImageToCloud();
        }
    }, [imageUpload]);

    return (
        <div className={twMerge(`w-full group/upload`, !isCustomStyle && "max-w-md mx-auto")}>
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !isEditMode && inputRef.current?.click()}
                className={clsx(
                    "relative border-2 border-dashed rounded-3xl p-8 transition-all duration-500 overflow-hidden",
                    "flex flex-col items-center justify-center gap-6 text-center cursor-pointer min-h-[200px]",
                    "border-white/10 hover:border-blue-500/40 bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-2xl shadow-2xl",
                    isEditMode && "opacity-50 cursor-not-allowed pointer-events-none"
                )}
            >
                <input
                    type="file"
                    ref={inputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                    disabled={isEditMode}
                />

                {imageLoading ? (
                    <UploadStatus />
                ) : uploadImageUrl ? (
                    <div className="w-full space-y-4 animate-in fade-in zoom-in-95 duration-500">
                        <ImagePreview url={uploadImageUrl} onRemove={handleRemoveImage} />
                        <FileDetails fileName={imageUpload?.name || 'Remote cloud asset'} />
                    </div>
                ) : (
                    <div className="py-6 space-y-4 group/inner">
                        <DropzoneIcon />
                        <div className="space-y-2">
                            <h3 className="text-lg font-black italic uppercase tracking-tighter text-white group-hover/upload:text-blue-400 transition-colors">Digital Entry</h3>
                            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.3em]">Drop Binary or Browse</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
