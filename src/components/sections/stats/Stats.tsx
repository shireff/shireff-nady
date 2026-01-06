'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Globe } from 'lucide-react';

const stats = [
    { icon: Code2, title: 'Quality Code', desc: 'Code that is easy to read, grow, and maintain.' },
    { icon: Cpu, title: 'High Speed', desc: 'Built for quick loading and a smooth user experience.' },
    { icon: Globe, title: 'For Everyone', desc: 'Accessible, friendly, and built for a global audience.' }
];

const Stats: React.FC = () => {
    return (
        <section className="px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((feature, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.05, translateY: -5 }}
                        className="glass-card p-8 space-y-4 border-white/5 hover:border-blue-500/30 shadow-2xl"
                    >
                        <feature.icon className="text-blue-400" size={32} />
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <p className="text-zinc-400">{feature.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
