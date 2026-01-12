"use client";

import React, { useState } from "react";
import { notificationService } from "@/services/notifications";
import Button from "@/components/ui/Button";
import { Bell, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const NotificationsTab = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({ type: null, message: "" });

    const handleSendNotification = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: null, message: "" });

        try {
            // Only send title/body if they have values, otherwise backend will use defaults
            const data = await notificationService.sendNotification(
                title.trim() || undefined,
                body.trim() || undefined
            );

            if (data.success) {
                setStatus({
                    type: "success",
                    message: `Notification sent successfully to ${data.sentCount} devices.`,
                });
                setTitle("");
                setBody("");
            } else {
                setStatus({
                    type: "error",
                    message: data.message || "Failed to send notification.",
                });
            }
        } catch (error: any) {
            setStatus({
                type: "error",
                message: error.response?.data?.message || "An error occurred while sending notification.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="glass-card p-8 border-zinc-200/50 dark:border-zinc-800/50">
                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-blue-600/10 p-4 rounded-2xl">
                        <Bell className="text-blue-500" size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">Push Notifications</h2>
                        <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest">Broadcast messages to all subscribers</p>
                    </div>
                </div>

                <form onSubmit={handleSendNotification} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">
                            Notification Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Don’t forget to use the platform today 🚀"
                            className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-zinc-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">
                            Message Body
                        </label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Visit us and see what's new!"
                            rows={4}
                            className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-zinc-400 resize-none"
                        />
                    </div>

                    <Button
                        type="submit"
                        isLoading={isLoading}
                        className="w-full gap-2 py-6 rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20"
                    >
                        <Send size={20} />
                        SEND BROADCAST
                    </Button>
                </form>

                {status.type && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-6 p-4 rounded-2xl flex items-center gap-3 ${status.type === "success"
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                            : "bg-red-500/10 text-red-500 border border-red-500/20"
                            }`}
                    >
                        {status.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                        <p className="text-sm font-bold">{status.message}</p>
                    </motion.div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 border-zinc-200/50 dark:border-zinc-800/50">
                    <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100 mb-4">Best Practices</h3>
                    <ul className="space-y-3 text-sm text-zinc-500 font-medium">
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            Keep titles short and catchy (under 50 characters).
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            Ensure the body provides value or clear call-to-action.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            Avoid sending more than one notification per day.
                        </li>
                    </ul>
                </div>
                <div className="glass-card p-6 border-zinc-200/50 dark:border-zinc-800/50">
                    <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100 mb-4">Daily Reminders</h3>
                    <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                        The system automatically sends a daily reminder at 9:00 AM to all subscribed users. You can manually trigger an extra broadcast if needed.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default NotificationsTab;
