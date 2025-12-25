'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Root Error Boundary Captured:', error);
    }, [error]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="max-w-md w-full glass-card p-12 text-center space-y-8 border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.1)]">
                <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                        <AlertCircle size={48} />
                    </div>
                    <div className="absolute -inset-4 bg-red-500/5 blur-2xl rounded-full -z-10" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-black italic tracking-tighter uppercase">Circuit Failure.</h1>
                    <p className="text-zinc-400 font-medium">
                        An unexpected error occurred in the system core. The current transmission has been interrupted.
                    </p>
                    {error.digest && (
                        <p className="text-[10px] font-mono text-zinc-600 bg-black/40 py-2 px-3 rounded-lg overflow-hidden text-ellipsis">
                            SIG_ID: {error.digest}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <Button
                        onClick={() => reset()}
                        className="w-full h-14 rounded-xl font-black italic tracking-widest gap-3 shadow-xl shadow-red-500/10"
                    >
                        <RotateCcw size={20} /> REBOOT SECTION
                    </Button>
                    <Link href="/">
                        <Button
                            variant="glass"
                            className="w-full h-14 rounded-xl font-black italic tracking-widest border-white/5"
                        >
                            <Home size={20} className="mr-3" /> RETURN HOME
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
