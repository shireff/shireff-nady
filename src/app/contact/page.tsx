'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle, Smartphone, AlertCircle } from 'lucide-react';
import { useForm, ValidationError } from "@formspree/react";
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function ContactPage() {
  const [state, handleSubmit] = useForm("xqkrawrb");

  const whatsappNumber = "+201274068946";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}`;

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
        <h1 className="text-5xl md:text-9xl font-black italic tracking-tighter bg-gradient-to-b from-white to-zinc-800 bg-clip-text text-transparent">HELLO.</h1>
        <p className="text-zinc-500 text-xl max-w-2xl mx-auto font-medium">
          Ready to initiate your next architectural breakthrough. 
          Use the secure transmission form or reach out via direct link.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="space-y-12">
            <h2 className="text-3xl font-black italic border-l-4 border-blue-500 pl-6 uppercase tracking-wider text-zinc-300">Direct Channels</h2>
            
            <div className="space-y-6">
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noreferrer"
                className="block group"
              >
                <div className="glass-card p-8 flex items-center gap-6 border-white/5 group-hover:border-emerald-500/30 transition-all bg-emerald-500/5 group-hover:bg-emerald-500/10">
                  <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                    <Smartphone size={32} />
                  </div>
                  <div>
                    <p className="text-[10px] text-emerald-500 uppercase font-black tracking-widest mb-1">WhatsApp Instant</p>
                    <p className="font-bold text-white text-2xl tracking-tight">{whatsappNumber}</p>
                  </div>
                </div>
              </a>

              <a href="mailto:shireffn369@gmail.com" className="block group">
                <div className="glass-card p-8 flex items-center gap-6 border-white/5 group-hover:border-blue-500/30 transition-all bg-blue-500/5 group-hover:bg-blue-500/10">
                  <div className="p-4 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/20">
                    <Mail size={32} />
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-500 uppercase font-black tracking-widest mb-1">Email Node</p>
                    <p className="font-bold text-white text-2xl tracking-tight">shireffn369@gmail.com</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="glass-card p-10 border-white/5 space-y-6">
            <h3 className="text-xl font-black italic uppercase tracking-widest text-zinc-300">Availability</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2">Timezone</p>
                <p className="text-white font-bold">GMT+2 (Egypt)</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2">Status</p>
                <p className="text-emerald-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  AVAILABLE
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-[2.5rem] blur opacity-20 -z-10" />
          <Card className="p-8 md:p-12 border-white/5 bg-[#030712]/50 backdrop-blur-2xl rounded-[2rem] shadow-2xl h-full min-h-[600px] flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {state.succeeded ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  className="flex flex-col items-center justify-center text-center space-y-8"
                  role="status"
                  aria-live="polite"
                >
                  <div className="relative">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 12, stiffness: 200 }}
                      className="w-28 h-28 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.1)]"
                    >
                      <CheckCircle size={56} />
                    </motion.div>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -inset-4 bg-emerald-500/5 blur-2xl rounded-full -z-10"
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter">Transmission Successful.</h3>
                    <p className="text-zinc-400 text-lg max-w-sm mx-auto">
                      Your signal has been received by Shireff. Expect a response through your preferred node within 24 hours.
                    </p>
                  </div>
                  
                  <Button 
                    variant="glass" 
                    onClick={() => window.location.reload()} 
                    className="rounded-full px-10 h-14 font-black italic tracking-widest uppercase text-xs"
                  >
                    SEND ANOTHER SIGNAL
                  </Button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit} 
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 pl-1">Identifer (Name)</label>
                    <input 
                      id="name"
                      type="text" 
                      name="name" 
                      required 
                      className="w-full glass-input py-4 text-lg focus:ring-2 ring-blue-500/20 transition-all outline-none" 
                      placeholder="Enter your full name" 
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-xs font-bold mt-1 pl-1" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 pl-1">Electronic Mail</label>
                      <input 
                        id="email"
                        type="email" 
                        name="email" 
                        required 
                        className="w-full glass-input py-4 text-lg focus:ring-2 ring-blue-500/20 transition-all outline-none" 
                        placeholder="name@company.com" 
                      />
                      <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs font-bold mt-1 pl-1" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 pl-1">Signal Phone</label>
                      <input 
                        id="phone"
                        type="tel" 
                        name="phone" 
                        className="w-full glass-input py-4 text-lg focus:ring-2 ring-blue-500/20 transition-all outline-none" 
                        placeholder="+123..." 
                      />
                      <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-400 text-xs font-bold mt-1 pl-1" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 pl-1">Payload (Message)</label>
                    <textarea 
                      id="message"
                      name="message" 
                      required 
                      rows={5} 
                      className="w-full glass-input py-4 text-lg min-h-[150px] focus:ring-2 ring-blue-500/20 transition-all outline-none" 
                      placeholder="Describe your project vision..." 
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs font-bold mt-1 pl-1" />
                  </div>

                  <AnimatePresence>
                    {state.errors && !state.succeeded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-3 text-red-400 text-sm font-bold bg-red-400/10 p-4 rounded-xl border border-red-400/20"
                        role="alert"
                        aria-live="assertive"
                      >
                        <AlertCircle size={20} className="shrink-0" />
                        <p>Transmission failed. Resolve the validation errors or reach out directly.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={state.submitting}
                    isLoading={state.submitting}
                    className="w-full py-8 rounded-2xl font-black italic text-xl shadow-xl shadow-blue-600/20 gap-3 group overflow-hidden relative"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {state.submitting ? 'TRANSMITTING...' : 'START TRANSMISSION'}
                      {!state.submitting && <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />}
                    </span>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600"
                      initial={false}
                      animate={state.submitting ? { x: ['-100%', '100%'] } : { x: 0 }}
                      transition={state.submitting ? { duration: 1.5, repeat: Infinity, ease: "linear" } : { duration: 0 }}
                    />
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </div>
  );
}
