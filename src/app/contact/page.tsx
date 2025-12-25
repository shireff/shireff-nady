'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle, Smartphone, AlertCircle } from 'lucide-react';
import { useForm, ValidationError } from "@formspree/react";
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import ContactQRCode from '@/components/features/contact/ContactQRCode';


import { siteConfig } from '@/config/site';

import ContactForm from './components/ContactForm';
import ContactChannels from './components/ContactChannels';
import AvailabilityCard from './components/AvailabilityCard';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-20">
      {/* Header */}
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4"
        >
          <MessageSquare size={16} /> SECURE COMMUNICATION
        </motion.div>
        <h1 className="text-5xl md:text-9xl font-black italic tracking-tighter bg-gradient-to-b from-white to-zinc-800 bg-clip-text text-transparent text-center">HELLO.</h1>
        <p className="text-zinc-500 text-xl max-w-2xl mx-auto font-medium">
          Ready to initiate your next architectural breakthrough.
          Use the secure transmission form or reach out via direct link.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Direct Inlets */}
        <div className="space-y-8">
          <ContactChannels />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AvailabilityCard />
            {/* <ContactQRCode /> */}
          </div>
        </div>

        {/* Right Column: Transmission Form */}
        <ContactForm />
      </div>
    </div>
  );
}
