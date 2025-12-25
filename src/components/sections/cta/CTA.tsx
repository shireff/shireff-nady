'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import Button from '@/components/ui/Button';

const CTA: React.FC = () => {
    return (
        <section className="px-6">
            <div className="max-w-7xl mx-auto glass-card p-12 md:p-24 text-center space-y-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-600/5 -z-10 group-hover:bg-blue-600/10 transition-colors" />
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    <Rocket size={64} className="mx-auto text-blue-400" />
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-black italic">LET&apos;S BUILD THE FUTURE.</h2>
                <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
                    Currently open for select freelance opportunities and full-time senior roles.
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/contact">
                        <Button size="lg" className="px-12 rounded-full font-bold">CONTACT ME</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTA;
