'use client';

import React from 'react';
import Link from 'next/link';
import { SearchX, Home, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="max-w-md w-full glass-card p-12 text-center space-y-8 border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                        <SearchX size={48} />
                    </div>
                    <div className="absolute -inset-4 bg-blue-500/5 blur-2xl rounded-full -z-10" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase">Node Not Found.</h1>
                    <p className="text-zinc-400 font-medium text-lg">
                        The requested digital coordinate does not exist in our infrastructure.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <Link href="/">
                        <Button
                            className="w-full h-14 rounded-xl font-black italic tracking-widest gap-3 shadow-xl shadow-blue-500/20"
                        >
                            <Home size={20} /> RETURN TO CORE
                        </Button>
                    </Link>
                    <Button
                        variant="glass"
                        onClick={() => window.history.back()}
                        className="w-full h-14 rounded-xl font-black italic tracking-widest border-white/5"
                    >
                        <ArrowLeft size={20} className="mr-3" /> BACK TO PREVIOUS
                    </Button>
                </div>

                <div className="pt-4">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mt-6">
                        ERROR CODE: 404_NULL_REFERENCE
                    </p>
                </div>
            </div>
        </div>
    );
}
