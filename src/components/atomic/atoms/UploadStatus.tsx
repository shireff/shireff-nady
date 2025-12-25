'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

const UploadStatus: React.FC = () => {
    return (
        <div className="flex flex-col items-center gap-4 py-8">
            <div className="relative">
                <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full animate-pulse" />
                <Loader2 className="w-12 h-12 text-blue-400 animate-spin relative z-10" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 animate-pulse">Syncing Binary</p>
        </div>
    );
};

export default UploadStatus;
