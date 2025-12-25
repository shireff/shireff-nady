'use client';

import React from 'react';
import { File as FileIcon } from 'lucide-react';

interface FileDetailsProps {
    fileName: string;
}

const FileDetails: React.FC<FileDetailsProps> = ({ fileName }) => {
    return (
        <div className="flex items-center justify-between bg-black/40 border border-white/5 px-4 py-2.5 rounded-xl backdrop-blur-md">
            <div className="flex items-center gap-2 max-w-[70%]">
                <FileIcon size={12} className="text-blue-400" />
                <span className="text-[9px] font-bold text-zinc-300 uppercase truncate tracking-widest">
                    {fileName}
                </span>
            </div>
            <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Live</span>
            </div>
        </div>
    );
};

export default FileDetails;
