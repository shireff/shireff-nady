"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export default function AIHelperButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      className="fixed bottom-6 right-6 z-[60] group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-label="Open AI Assistant"
    >
      <div className="relative w-16 h-16 rounded-3xl glass-card-premium border-blue-500/30 flex items-center justify-center p-0 overflow-hidden group-hover:border-blue-500/50 transition-colors shadow-[0_0_30px_rgba(59,130,246,0.2)]">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <Bot size={32} className="text-blue-400 group-hover:text-white transition-colors relative z-10" />
        
        {/* Notification dot */}
        <div className="absolute top-3 right-3 w-3 h-3 bg-blue-500 rounded-full border-2 border-slate-950 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
      </div>
    </motion.button>
  );
}
