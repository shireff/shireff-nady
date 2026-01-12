"use client";

import React, { useState, useEffect } from "react";
import { useFCM } from "@/hooks/useFCM";
import { Bell, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const NotificationPrompt = () => {
    const { permission, requestPermission } = useFCM();
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        // Show prompt after 5 seconds if permission is default
        if (permission === "default") {
            const timer = setTimeout(() => {
                setShowPrompt(true);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [permission]);

    if (permission !== "default" || !showPrompt) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                className="fixed bottom-6 right-6 z-50 max-w-sm w-full"
            >
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 overflow-hidden relative">
                    <button
                        onClick={() => setShowPrompt(false)}
                        className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600 dark:text-blue-400">
                            <Bell size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                                Stay updated!
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                                Enable push notifications to receive daily reminders and important updates directly on your device.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={async () => {
                                        await requestPermission();
                                        setShowPrompt(false);
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
                                >
                                    Enable Notifications
                                </button>
                                <button
                                    onClick={() => setShowPrompt(false)}
                                    className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Maybe Later
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
