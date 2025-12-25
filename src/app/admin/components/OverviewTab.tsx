'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Code2, Briefcase, Split } from 'lucide-react';
import { Project, Experience, StateComparison } from '@/types';

interface OverviewTabProps {
    projects: Project[];
    experiences: Experience[];
    comparisons: StateComparison[];
}

const OverviewTab: React.FC<OverviewTabProps> = ({ projects, experiences, comparisons }) => {
    return (
        <motion.div
            key="overview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
            <Card className="hover:border-blue-500/30 transition-all cursor-default">
                <CardHeader>
                    <CardTitle className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Total Systems</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <p className="text-6xl font-black italic text-white">{projects.length}</p>
                    <Code2 className="text-blue-500/20" size={64} />
                </CardContent>
            </Card>
            <Card className="hover:border-blue-500/30 transition-all cursor-default">
                <CardHeader>
                    <CardTitle className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">History Nodes</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <p className="text-6xl font-black italic text-white">{experiences.length}</p>
                    <Briefcase className="text-blue-500/20" size={64} />
                </CardContent>
            </Card>
            <Card className="hover:border-blue-500/30 transition-all cursor-default">
                <CardHeader>
                    <CardTitle className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Active Compilers</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <p className="text-6xl font-black italic text-white">{comparisons.length}</p>
                    <Split className="text-blue-500/20" size={64} />
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default OverviewTab;
