"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Terminal, 
  Database, 
  Layers, 
  CheckCircle2, 
  LineChart,
  Cpu,
  Globe,
  ZapOff
} from 'lucide-react';

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
  // { name: 'PostgreSQL', category: 'Backend', level: 80, icon: Database },
  // { name: 'Spring', category: 'Backend', level: 75, icon: Cpu },
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

const categories = ['All', 'Frontend', 'Backend', 'Testing', 'Tools', 'Visualization'];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = useMemo(() => {
    return skillsData.filter(skill => {
      return activeCategory === 'All' || skill.category === activeCategory;
    });
  }, [activeCategory]);

  return (
    <section className="py-24 px-6 relative overflow-hidden" id="skills">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase">
              Technical <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                Skills.
              </span>
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto">
              A meticulously curated stack for building high-performance, 
              scalable digital experiences.
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 pt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
                    : 'glass-card text-zinc-500 hover:text-white border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid with AnimatePresence */}
        <div className="relative min-h-[400px]">
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ translateY: -5 }}
                  transition={{ duration: 0.3, ease: 'circOut' }}
                  className="group"
                >
                  <div className="glass-card-premium p-6 flex flex-col items-center justify-center gap-4 text-center h-full border-white/5 group-hover:border-blue-500/30 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] transition-all duration-500 overflow-hidden relative">
                    <div className="p-3 rounded-2xl bg-white/5 text-blue-400 group-hover:text-white group-hover:bg-blue-600 transition-all duration-500">
                      <skill.icon size={24} />
                    </div>
                    <div className="space-y-1">
                      <span className="block text-[9px] font-black tracking-[0.2em] text-zinc-500 uppercase group-hover:text-blue-400 transition-colors">
                        {skill.category}
                      </span>
                      <h3 className="text-sm font-black italic tracking-tight uppercase">
                        {skill.name}
                      </h3>
                    </div>

                    {/* Level Indicator */}
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
                      />
                    </div>
                    
                    {/* Interaction Glow */}
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Background Marquee */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden whitespace-nowrap py-10 opacity-[0.03] pointer-events-none select-none -z-10">
        <div className="inline-block animate-marquee whitespace-nowrap">
          <span className="text-[120px] font-black italic uppercase tracking-tighter mx-4">
            {skillsData.map(s => s.name).join(' • ')}
          </span>
          <span className="text-[120px] font-black italic uppercase tracking-tighter mx-4">
            {skillsData.map(s => s.name).join(' • ')}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 80s linear infinite;
        }
      `}</style>
    </section>
  );
}
