'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { contactService } from '@/services/contact';

export default function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                setIsSuccess(false);
            }, 8000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setFieldErrors({});

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            message: formData.get('message') as string,
        };

        try {
            const response = await contactService.send(data);
            if (response.success) {
                setIsSuccess(true);
                // Reset form
                e.currentTarget.reset();
            } else {
                setError(response.message || 'Failed to send message');
            }
        } catch (err: any) {
            console.error('Contact form error:', err);
            
            // Check if it's a validation error
            if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
                const errors: Record<string, string> = {};
                err.response.data.errors.forEach((error: any) => {
                    if (error.path) {
                        errors[error.path] = error.msg;
                    }
                });
                setFieldErrors(errors);
                setError('Please fix the errors below');
            } else {
                // General error
                const errorMessage = err.response?.data?.message || err.message || 'Something went wrong. Please check your connection and try again.';
                setError(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-[2.5rem] blur opacity-20 -z-10" />
            <Card className="p-6 sm:p-8 md:p-12 border-white/5 bg-[#030712]/50 backdrop-blur-2xl rounded-[2rem] shadow-2xl h-full min-h-[500px] md:min-h-[600px] flex flex-col justify-center">

                <AnimatePresence mode="wait">
                    {isSuccess ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            className="flex flex-col items-center justify-center text-center space-y-8"
                            role="status"
                            aria-live="polite"
                        >
                            <div className="relative">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                                    className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.1)]"
                                >
                                    <CheckCircle size={48} className="md:w-14 md:h-14" />
                                </motion.div>
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute -inset-4 bg-emerald-500/5 blur-2xl rounded-full -z-10"
                                />
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-3xl md:text-4xl font-black italic text-white uppercase tracking-tighter">Message Sent!</h3>
                                <p className="text-zinc-400 text-base md:text-lg max-w-sm mx-auto">
                                    Thanks for reaching out! I&apos;ve received your message and will get back to you within 24 hours.
                                </p>
                            </div>

                            <Button
                                variant="glass"
                                onClick={() => window.location.reload()}
                                className="rounded-full px-8 md:px-10 h-12 md:h-14 font-black italic tracking-widest uppercase text-xs"
                            >
                                SEND ANOTHER MESSAGE
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onSubmit={handleSubmit}
                            className="space-y-6 md:space-y-8"
                        >
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 pl-1">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    required
                                    className={`w-full glass-input py-3 md:py-4 text-base md:text-lg focus:ring-2 transition-all outline-none ${
                                        fieldErrors.name ? 'ring-2 ring-red-500/50 border-red-500/50' : 'ring-blue-500/20'
                                    }`}
                                    placeholder="Enter your full name"
                                />
                                {fieldErrors.name && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-xs font-bold flex items-center gap-2 pl-1"
                                    >
                                        <AlertCircle size={14} />
                                        {fieldErrors.name}
                                    </motion.p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 pl-1">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        className={`w-full glass-input py-3 md:py-4 text-base md:text-lg focus:ring-2 transition-all outline-none ${
                                            fieldErrors.email ? 'ring-2 ring-red-500/50 border-red-500/50' : 'ring-blue-500/20'
                                        }`}
                                        placeholder="name@company.com"
                                    />
                                    {fieldErrors.email && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-xs font-bold flex items-center gap-2 pl-1"
                                        >
                                            <AlertCircle size={14} />
                                            {fieldErrors.email}
                                        </motion.p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 pl-1">Phone (Optional)</label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        className={`w-full glass-input py-3 md:py-4 text-base md:text-lg focus:ring-2 transition-all outline-none ${
                                            fieldErrors.phone ? 'ring-2 ring-red-500/50 border-red-500/50' : 'ring-blue-500/20'
                                        }`}
                                        placeholder="+123..."
                                    />
                                    {fieldErrors.phone && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-xs font-bold flex items-center gap-2 pl-1"
                                        >
                                            <AlertCircle size={14} />
                                            {fieldErrors.phone}
                                        </motion.p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 pl-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={5}
                                    className={`w-full glass-input py-3 md:py-4 text-base md:text-lg min-h-[120px] md:min-h-[150px] focus:ring-2 transition-all outline-none ${
                                        fieldErrors.message ? 'ring-2 ring-red-500/50 border-red-500/50' : 'ring-blue-500/20'
                                    }`}
                                    placeholder="Describe your project vision..."
                                />
                                {fieldErrors.message && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-xs font-bold flex items-center gap-2 pl-1"
                                    >
                                        <AlertCircle size={14} />
                                        {fieldErrors.message}
                                    </motion.p>
                                )}
                            </div>

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center gap-3 text-red-400 text-sm font-bold bg-red-400/10 p-4 rounded-xl border border-red-400/20"
                                        role="alert"
                                        aria-live="assertive"
                                    >
                                        <AlertCircle size={20} className="shrink-0" />
                                        <p>{error}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <Button
                                type="submit"
                                size="lg"
                                disabled={isLoading}
                                isLoading={isLoading}
                                className="w-full py-6 md:py-8 rounded-2xl font-black italic text-lg md:text-xl shadow-xl shadow-blue-600/20 gap-3 group overflow-hidden relative"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    {isLoading ? 'SENDING...' : 'SEND MESSAGE'}
                                    {!isLoading && <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />}
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600"
                                    initial={false}
                                    animate={isLoading ? { x: ['-100%', '100%'] } : { x: 0 }}
                                    transition={isLoading ? { duration: 1.5, repeat: Infinity, ease: "linear" } : { duration: 0 }}
                                />
                            </Button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </Card>
        </div>
    );
}

