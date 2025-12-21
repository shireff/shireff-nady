'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-2xl glass-card border-white/10 hover:border-blue-500/30 transition-all text-zinc-400 hover:text-white group relative"
      aria-label="Toggle Theme"
    >
      <div className="relative w-6 h-6 overflow-hidden">
        <motion.div
           animate={{ y: theme === 'dark' ? 0 : 30 }}
           className="absolute inset-0 flex items-center justify-center p-1"
        >
          <Moon size={20} />
        </motion.div>
        <motion.div
           initial={{ y: -30 }}
           animate={{ y: theme === 'light' ? 0 : -30 }}
           className="absolute inset-0 flex items-center justify-center p-1"
        >
          <Sun size={20} />
        </motion.div>
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
