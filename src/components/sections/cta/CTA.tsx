'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import Button from '@/components/ui/Button';

const CTA: React.FC = () => {
    return (
        <section className="px-6">
            <div className="max-w-7xl mx-auto glass-card p-8 md:p-24 text-center space-y-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-600/5 -z-10 group-hover:bg-blue-600/10 transition-colors" />
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    <Rocket size={48} className="mx-auto text-blue-400 md:w-16 md:h-16" />
                </motion.div>
                <h2 className="text-3xl md:text-6xl font-black italic">WANT TO WORK TOGETHER?</h2>
                <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
                    I&apos;m always looking for interesting projects and new opportunities. Drop me a line!
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/contact">
                        <Button size="lg" className="px-8 md:px-12 rounded-full font-bold">GET IN TOUCH</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTA;
