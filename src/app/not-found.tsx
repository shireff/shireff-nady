"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, FileQuestion, MoveLeft } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background Ambient Elements - Matching Home Page Vibe */}
            <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse transition-all -z-10" />
            <div className="absolute bottom-[20%] right-[20%] w-[30%] h-[30%] bg-emerald-600/10 blur-[100px] rounded-full -z-10" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="glass-card-premium p-12 md:p-16 max-w-2xl w-full text-center space-y-8 relative overflow-hidden border-white/10"
            >
                {/* Decorative broken link/icon */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <motion.div
                            animate={{ rotate: 12 }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                            }}
                            className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md"
                        >
                            <FileQuestion size={64} className="text-blue-400" />
                        </motion.div>

                        {/* Floating particles */}
                        <motion.div
                            animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -top-4 -right-4 w-4 h-4 rounded-full bg-emerald-400/50 blur-sm"
                        />
                        <motion.div
                            animate={{ y: [10, -10, 10], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -bottom-2 -left-6 w-3 h-3 rounded-full bg-blue-400/50 blur-sm"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-400 to-zinc-600">
                        404
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        Page Could Not Be Found
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-md mx-auto leading-relaxed">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Link href="/">
                        <Button size="lg" className="w-full sm:w-auto px-8 rounded-full font-bold gap-2">
                            <Home size={18} />
                            Return Home
                        </Button>
                    </Link>
                    <button onClick={() => window.history.back()}>
                        <Button variant="glass" size="lg" className="w-full sm:w-auto px-8 rounded-full font-bold gap-2 border-white/5 hover:bg-white/10">
                            <MoveLeft size={18} />
                            Go Back
                        </Button>
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
