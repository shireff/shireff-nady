'use client';

import React from 'react';
import { X as XIcon } from 'lucide-react';
import Image from 'next/image';

interface ImagePreviewProps {
    url: string;
    onRemove: (e: React.MouseEvent) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ url, onRemove }) => {
    return (
        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-xl group/preview">
            <Image
                src={url}
                alt="Preview"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover transition-all duration-700 group-hover/preview:scale-105"
            />
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover/preview:opacity-100 transition-all duration-300 flex items-center justify-center flex-col gap-3">
                <button
                    type="button"
                    onClick={onRemove}
                    className="p-3 rounded-full bg-red-500/20 border border-red-500/40 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-2xl shadow-red-500/20"
                >
                    <XIcon size={20} />
                </button>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Purge Asset</p>
            </div>
        </div>
    );
};

export default ImagePreview;
