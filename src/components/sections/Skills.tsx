"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Terminal,
  Database,
  Layers,
  CheckCircle2,
  LineChart,
  Cpu,
  Globe,
  Link as LinkIcon
} from 'lucide-react';
import { Project } from '@/types';

const skillsData = [
  { name: 'React', category: 'Frontend', level: 95, icon: Code2 },
  { name: 'Next.js', category: 'Frontend', level: 90, icon: Globe },
  { name: 'TypeScript', category: 'Frontend', level: 90, icon: Code2 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 95, icon: Layers },
  { name: 'Redux', category: 'Frontend', level: 85, icon: Cpu },
  { name: 'JavaScript', category: 'Frontend', level: 95, icon: Code2 },
  { name: 'HTML5', category: 'Frontend', level: 98, icon: Globe },
  { name: 'CSS3', category: 'Frontend', level: 95, icon: Layers },
  { name: 'Sass', category: 'Frontend', level: 85, icon: Layers },
  { name: 'Bootstrap', category: 'Frontend', level: 80, icon: Layers },

  { name: 'Node.js', category: 'Backend', level: 88, icon: Terminal },
  { name: 'Express', category: 'Backend', level: 90, icon: Terminal },
  { name: 'MongoDB', category: 'Backend', level: 85, icon: Database },
  { name: 'Firebase', category: 'Backend', level: 85, icon: Database },

  { name: 'Jest', category: 'Testing', level: 85, icon: CheckCircle2 },
  { name: 'Cypress', category: 'Testing', level: 80, icon: CheckCircle2 },
  { name: 'Selenium', category: 'Testing', level: 70, icon: CheckCircle2 },

  { name: 'Git', category: 'Tools', level: 92, icon: Code2 },
  { name: 'Linux', category: 'Tools', level: 85, icon: Terminal },
  { name: 'Postman', category: 'Tools', level: 90, icon: Terminal },

  { name: 'Chart.js', category: 'Visualization', level: 85, icon: LineChart },
  { name: 'CanvasJS', category: 'Visualization', level: 80, icon: LineChart },
];

export default function Skills({ projects = [] }: { projects?: Project[] }) {
  const groupedSkills = useMemo(() => {
    const groups: Record<string, (typeof skillsData[0] & { linkedProjects: string[] })[]> = {};

    skillsData.forEach(skill => {
      // Find projects where this skill or its category is mentioned
      const linkedProjects = projects
        .filter(p => {
          const content = (p.title + p.desc + p.category).toLowerCase();
          return content.includes(skill.name.toLowerCase()) ||
            content.includes(skill.category.toLowerCase());
        })
        .map(p => p.title)
        .slice(0, 3); // Limit to top 3 for density

      if (!groups[skill.category]) groups[skill.category] = [];
      groups[skill.category].push({ ...skill, linkedProjects });
    });
    return groups;
  }, [projects]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden" id="skills">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto space-y-20">
        <div className="text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
              My Tech <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                Stack.
              </span>
            </h2>
            <p className="text-zinc-500 text-base md:text-lg max-w-xl">
              A breakdown of the tools and technologies I use to bring projects to life, backed by real examples.
            </p>
          </motion.div>
        </div>

        {/* High Density Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16"
        >
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <motion.div key={category} variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-[1px] flex-grow bg-gradient-to-r from-blue-500/50 to-transparent" />
                <h3 className="text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase whitespace-nowrap">
                  {category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group relative"
                  >
                    <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl glass-card border-white/5 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all duration-300">
                      <skill.icon size={14} className="text-zinc-500 group-hover:text-blue-400 transition-colors" />
                      <span className="text-xs font-bold tracking-tight text-zinc-300 group-hover:text-white transition-colors uppercase">
                        {skill.name}
                      </span>

                      {/* Evidence Tooltip */}
                      {skill.linkedProjects.length > 0 && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-zinc-900 border border-white/10 rounded-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-50 w-48 shadow-2xl">
                          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
                            <LinkIcon size={10} className="text-blue-500" />
                            <span className="text-[8px] font-black uppercase tracking-widest text-white">Used In</span>
                          </div>
                          <div className="space-y-1.5">
                            {skill.linkedProjects.map(p => (
                              <div key={p} className="flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-blue-500/50" />
                                <span className="text-[9px] text-zinc-400 font-bold truncate">{p}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Level Micro-Indicator */}
                      <div className="absolute -bottom-1 left-4 right-4 h-[1px] bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-blue-500/50"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background Marquee - Reduced Opacity */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden whitespace-nowrap py-10 opacity-[0.02] pointer-events-none select-none -z-10">
        <div className="inline-block animate-marquee whitespace-nowrap font-black italic uppercase text-[120px] tracking-tighter">
          {skillsData.map(s => s.name).join(' • ')} • {skillsData.map(s => s.name).join(' • ')}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 100s linear infinite;
        }
      `}</style>
    </section>
  );
}
