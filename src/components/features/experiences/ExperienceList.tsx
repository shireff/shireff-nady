"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Terminal } from "lucide-react";
import { Experience } from "@/types";
import GlassEmptyState from "@/components/ui/GlassEmptyState";

interface ExperienceListProps {
    experiences: Experience[];
}

export default function ExperienceList({ experiences }: ExperienceListProps) {
    if (experiences.length === 0) {
        return (
            <div className="py-20">
                <GlassEmptyState
                    title="Still loading..."
                    description="I'm just getting my work history ready for you. It should only take a moment!"
                    icon={Briefcase}
                />
            </div>
        );
    }

    return (
        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[1px] before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
            {experiences.map((exp) => (
                <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                    {/* Dot */}
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-zinc-800 bg-black text-blue-400 absolute left-0 md:left-1/2 md:-ml-6 shadow-[0_0_20px_rgba(59,130,246,0.3)] z-10 transition-all duration-500 group-hover:scale-125 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-400">
                        <Briefcase size={20} />
                    </div>

                    {/* Content Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-card p-8 md:p-10 ml-auto md:ml-0 border-white/5 hover:border-blue-500/30 shadow-2xl transition-all duration-500 hover:shadow-blue-500/10">
                        <div className="flex flex-col gap-1 mb-6">
                            <div className="flex items-center justify-between">
                                <span className="text-blue-400 font-black tracking-[0.2em] text-[10px] uppercase">
                                    {exp.company}
                                </span>
                                <span className="flex items-center gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                                    <Calendar size={12} />
                                    {exp.period}
                                </span>
                            </div>
                            <h3 className="text-3xl font-black md:text-4xl text-white group-hover:text-blue-400 transition-colors">
                                {exp.position}
                            </h3>
                        </div>

                        <div className="space-y-4 mb-8">
                            {exp.description.map((point, idx) => (
                                <div
                                    key={idx}
                                    className="flex gap-4 text-zinc-400 text-base leading-relaxed group/item"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-2.5 shrink-0 group-hover/item:scale-150 transition-transform" />
                                    <span>{point}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2">
                            <Terminal size={14} className="text-zinc-600 mr-2 mt-1" />
                            {exp.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 rounded-full bg-blue-500/5 text-blue-400 text-[10px] font-bold uppercase tracking-widest border border-blue-500/10 hover:bg-blue-500/20 transition-colors"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
