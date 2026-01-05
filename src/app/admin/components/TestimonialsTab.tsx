'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Linkedin, User, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Testimonial, testimonialService } from '@/services/testimonials';
import Button from '@/components/ui/Button';

export default function TestimonialsTab() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncStatus, setSyncStatus] = useState<{ success?: boolean; message?: string } | null>(null);

    const fetchTestimonials = async () => {
        setIsLoading(true);
        try {
            const data = await testimonialService.getAll();
            setTestimonials(data);
        } catch (err) {
            console.error("Failed to fetch testimonials:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleSync = async () => {
        setIsSyncing(true);
        setSyncStatus(null);
        try {
            const result: any = await testimonialService.sync();
            setSyncStatus({
                success: true,
                message: result.message // Backend now returns: "Sync Protocol Finished: Added X, Updated Y, Matched Z, Pruned W."
            });
            fetchTestimonials();
        } catch (err: any) {
            setSyncStatus({
                success: false,
                message: err.response?.data?.message || "Sync Protocol Failed. Check Node logs."
            });
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center bg-blue-500/5 border border-blue-500/10 p-8 rounded-[32px]">
                <div className="space-y-1">
                    <h3 className="text-xl font-black text-white italic tracking-tight uppercase">LinkedIn Sync Engine</h3>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Single Source of Truth Management</p>
                </div>
                <Button
                    onClick={handleSync}
                    isLoading={isSyncing}
                    className="gap-2 px-8 rounded-full font-black italic shadow-xl shadow-blue-600/20"
                >
                    {isSyncing ? <Loader2 className="animate-spin" size={18} /> : <RefreshCw size={18} />}
                    READY SYNC PROTOCOL
                </Button>
            </div>

            {syncStatus && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-2xl flex items-center gap-3 border ${syncStatus.success
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                        }`}
                >
                    {syncStatus.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <span className="text-[10px] font-black uppercase tracking-widest">{syncStatus.message}</span>
                </motion.div>
            )}

            <div className="glass-card overflow-hidden border-white/5 bg-white/[0.01]">
                {isLoading ? (
                    <div className="py-20 flex flex-col items-center gap-4">
                        <Loader2 className="animate-spin text-blue-500" size={32} />
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Scanning Database...</p>
                    </div>
                ) : testimonials.length > 0 ? (
                    <div className="grid grid-cols-1 gap-1">
                        {testimonials.map((test) => (
                            <div key={test.id} className="p-8 hover:bg-white/[0.02] transition-all flex items-start gap-6 group border-b border-white/5 last:border-0">
                                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 flex-shrink-0 relative">
                                    {test.avatar ? (
                                        <Image
                                            src={test.avatar.replace(/^http:\/\//, 'https://')}
                                            alt={test.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <User className="m-auto text-zinc-700" size={24} />
                                    )}
                                </div>
                                <div className="flex-grow space-y-4">
                                    <div className="flex justify-between">
                                        <div>
                                            <h4 className="font-black text-white uppercase tracking-widest group-hover:text-blue-400 transition-colors">{test.name}</h4>
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{test.role} @ {test.company}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                                <ShieldCheck size={12} className="text-emerald-500" />
                                                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Verified</span>
                                            </div>
                                            <a href={test.linkedinUrl} target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-blue-400 transition-colors">
                                                <Linkedin size={18} />
                                            </a>
                                        </div>
                                    </div>
                                    <p className="text-sm text-zinc-400 leading-relaxed font-medium italic">
                                        &ldquo;{test.content}&rdquo;
                                    </p>
                                    <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">
                                        Endorsed on {new Date(test.date).toLocaleDateString()} • {test.relationship}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center space-y-4">
                        <RefreshCw className="mx-auto text-zinc-800" size={48} />
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Local Cache Empty. Execute Sync to Fetch Real Data.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
