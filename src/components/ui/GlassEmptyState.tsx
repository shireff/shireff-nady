'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PackageOpen, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from './Button';

interface GlassEmptyStateProps {
    title: string;
    description: string;
    icon?: LucideIcon;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
}

export default function GlassEmptyState({
    title,
    description,
    icon: Icon = PackageOpen,
    actionLabel,
    onAction,
    className
}: GlassEmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className={cn(
                "glass-card-premium relative overflow-hidden flex flex-col items-center justify-center p-12 text-center max-w-2xl mx-auto border-white/5",
                className
            )}
        >
            {/* Background Decorative Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Icon with Neon Effect */}
            <div className="relative mb-8">
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 relative z-10"
                >
                    <Icon size={48} className="text-zinc-400" />
                </motion.div>
                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full scale-150 opacity-20" />
            </div>

            {/* Text Content */}
            <div className="space-y-4 relative z-10 max-w-sm">
                <h3 className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase text-white">
                    {title}
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                    {description}
                </p>
            </div>

            {/* Action Button */}
            {actionLabel && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-10 relative z-10"
                >
                    <Button
                        onClick={onAction}
                        className="px-10 py-6 rounded-2xl font-black italic shadow-xl shadow-blue-500/10 text-xs tracking-[0.2em]"
                    >
                        {actionLabel}
                    </Button>
                </motion.div>
            )}

            {/* Edge Light Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none" />
        </motion.div>
    );
}
