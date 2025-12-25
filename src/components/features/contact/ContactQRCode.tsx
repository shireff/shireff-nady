'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { MessageSquare, Smartphone, Linkedin, Github, QrCode } from 'lucide-react';

interface ContactQRCodeProps {
    baseUrl?: string;
}

const ContactQRCode: React.FC<ContactQRCodeProps> = ({
    baseUrl = 'https://shireff-nady.vercel.app'
}) => {
    // The QR code points to a specialized hub page for scanned users
    const hubUrl = `${baseUrl}/contact-hub`;

    const contactMethods = [
        { icon: MessageSquare, label: 'WhatsApp', color: 'text-emerald-400' },
        { icon: Smartphone, label: 'Call', color: 'text-blue-400' },
        { icon: Linkedin, label: 'LinkedIn', color: 'text-sky-400' },
        { icon: Github, label: 'GitHub', color: 'text-white' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group lg:max-w-md w-full"
        >
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="glass-card-premium p-8 border-white/5 relative overflow-hidden flex flex-col items-center text-center space-y-8">
                <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-2">
                        <QrCode size={14} /> Digital Signal
                    </div>
                    <h3 className="text-2xl font-black italic tracking-tighter text-white">SCAN TO CONNECT.</h3>
                    <p className="text-zinc-500 text-sm font-medium">Quick access to all professional nodes.</p>
                </div>

                {/* QR Code Container */}
                <div className="relative p-6 bg-white rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_70px_rgba(59,130,246,0.15)] transition-all duration-700">
                    <QRCodeSVG
                        value={hubUrl}
                        size={200}
                        level="H"
                        includeMargin={false}
                        imageSettings={{
                            src: "/logo.png", // Fallback if user has logo
                            x: undefined,
                            y: undefined,
                            height: 40,
                            width: 40,
                            excavate: true,
                        }}
                        className="rounded-lg"
                    />
                </div>

                {/* Platforms Indicator */}
                <div className="grid grid-cols-4 gap-4 w-full pt-4">
                    {contactMethods.map((method, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2 group/icon">
                            <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${method.color} group-hover/icon:bg-white/10 transition-colors`}>
                                <method.icon size={20} />
                            </div>
                            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 group-hover/icon:text-zinc-300 transition-colors">
                                {method.label}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="pt-4 w-full">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">
                        Secure Point-to-Point Encryption Enabled
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default ContactQRCode;
