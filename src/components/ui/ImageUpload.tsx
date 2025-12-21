'use client';

import React, { ChangeEvent, useEffect, useRef } from "react";
import { UploadCloud as UploadCloudIcon, File as FileIcon, X as XIcon, Loader2, Link as LinkIcon } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import api from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";

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

/**
 * Premium Glassmorphism Image Upload Component
 * Implements logic provided by user with high-fidelity UI
 */
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

    // Sync input value with state for consistency
    useEffect(() => {
        if (!imageUpload && inputRef.current) {
            inputRef.current.value = "";
        }
    }, [imageUpload]);

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageUpload(file);
            // Create local preview immediately
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

    //   const uploadImageToCloud = async () => {
    //     if (!imageUpload) return;

    //     setImageLoading(true);
    //     const data = new FormData();

    //     // Intelligent field selection based on route
    //     const fieldName = uploadEndpoint.includes('settings') || uploadEndpoint.includes('home/image') ? 'image' : 'img';
    //     data.append(fieldName, imageUpload);
    //     console.log("fieldName",fieldName);
    //     console.log("imageUpload",imageUpload);

    //     try {
    //       const response = await api.post(uploadEndpoint, data, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //       });

    //       // Handle different backend response formats
    //       const finalUrl = response.data.result?.secure_url || response.data.result?.url || response.data.url;

    //       if (finalUrl) {
    //         setUploadImageUrl(finalUrl);
    //       }
    //     } catch (error) {
    //       console.error("Failed to upload image:", error);
    //     } finally {
    //       setImageLoading(false);
    //     }
    //   };

    const uploadImageToCloud = async (): Promise<string | null> => {
        if (!imageUpload) return null;
        setImageLoading(true);
        const data = new FormData();

        // Dynamically choose field name based on endpoint to match backend expectations
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



    // Auto-trigger upload on file selection
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
                    <div className="flex flex-col items-center gap-4 py-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full animate-pulse" />
                            <Loader2 className="w-12 h-12 text-blue-400 animate-spin relative z-10" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 animate-pulse">Syncing Binary</p>
                    </div>
                ) : uploadImageUrl ? (
                    <div className="w-full space-y-4 animate-in fade-in zoom-in-95 duration-500">
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-xl group/preview">
                            <img src={uploadImageUrl} alt="Preview" className="w-full h-full object-cover transition-all duration-700 group-hover/preview:scale-105" />
                            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover/preview:opacity-100 transition-all duration-300 flex items-center justify-center flex-col gap-3">
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="p-3 rounded-full bg-red-500/20 border border-red-500/40 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-2xl shadow-red-500/20"
                                >
                                    <XIcon size={20} />
                                </button>
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Purge Asset</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-black/40 border border-white/5 px-4 py-2.5 rounded-xl backdrop-blur-md">
                            <div className="flex items-center gap-2 max-w-[70%]">
                                <FileIcon size={12} className="text-blue-400" />
                                <span className="text-[9px] font-bold text-zinc-300 uppercase truncate tracking-widest">
                                    {imageUpload?.name || 'Remote cloud asset'}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Live</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-6 space-y-4 group/inner">
                        <div className="relative mx-auto w-16 h-16">
                            <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full opacity-0 group-hover/upload:opacity-100 transition-opacity duration-700" />
                            <div className="relative w-full h-full rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-500 group-hover/upload:text-blue-400 group-hover/upload:border-blue-500/40 group-hover/upload:-translate-y-1 transition-all duration-500">
                                <UploadCloudIcon size={32} />
                            </div>
                        </div>
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

