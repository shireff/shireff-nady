'use client';

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeNotification } from '@/store/slices/uiSlice';

const icons = {
    success: <CheckCircle className="text-emerald-400" size={18} />,
    error: <XCircle className="text-red-400" size={18} />,
    info: <Info className="text-blue-400" size={18} />,
    warning: <AlertTriangle className="text-amber-400" size={18} />,
};

const colors = {
    success: 'border-emerald-500/20 bg-emerald-500/5',
    error: 'border-red-500/20 bg-red-500/5',
    info: 'border-blue-500/20 bg-blue-500/5',
    warning: 'border-amber-500/20 bg-amber-500/5',
};

export default function NotificationManager() {
    const notifications = useAppSelector((state) => state.ui.notifications);
    const dispatch = useAppDispatch();

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
            <AnimatePresence mode="popLayout">
                {notifications.map((n) => (
                    <motion.div
                        key={n.id}
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        className={`pointer-events-auto glass-card p-4 min-w-[300px] flex items-center justify-between gap-4 border-white/5 shadow-2xl ${colors[n.type]}`}
                    >
                        <div className="flex items-center gap-3">
                            {icons[n.type]}
                            <p className="text-xs font-bold uppercase tracking-wider text-white">
                                {n.message}
                            </p>
                        </div>
                        <button
                            onClick={() => dispatch(removeNotification(n.id))}
                            className="text-zinc-500 hover:text-white transition-colors"
                        >
                            <X size={14} />
                        </button>
                        <NotificationTimer
                            duration={n.duration || 5000}
                            onComplete={() => dispatch(removeNotification(n.id))}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

function NotificationTimer({ duration, onComplete }: { duration: number; onComplete: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onComplete, duration);
        return () => clearTimeout(timer);
    }, [duration, onComplete]);

    return (
        <motion.div
            initial={{ width: '100%' }}
            animate={{ width: 0 }}
            transition={{ duration: duration / 1000, ease: 'linear' }}
            className="absolute bottom-0 left-0 h-0.5 bg-white/20"
        />
    );
}
