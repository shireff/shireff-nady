'use client';

import React from 'react';
import { UploadCloud } from 'lucide-react';

const DropzoneIcon: React.FC = () => {
    return (
        <div className="relative mx-auto w-16 h-16">
            <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full opacity-0 group-hover/upload:opacity-100 transition-opacity duration-700" />
            <div className="relative w-full h-full rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-500 group-hover/upload:text-blue-400 group-hover/upload:border-blue-500/40 group-hover/upload:-translate-y-1 transition-all duration-500">
                <UploadCloud size={32} />
            </div>
        </div>
    );
};

export default DropzoneIcon;
