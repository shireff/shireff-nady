'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Icon from '@/components/atomic/atoms/Icon';

/**
 * Enhanced Modal component following Headless UI patterns.
 * Designed for easy migration to @radix-ui/react-dialog.
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  size?: 'md' | 'lg' | 'full';
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = 'md'
}: ModalProps) {

  // Size mapping using theme tokens
  const sizes = {
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    full: 'max-w-[95vw] h-[90vh]'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay - Accessible Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Content Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={cn(
                "pointer-events-auto relative w-full glass-card p-0 overflow-hidden shadow-glass-l3 bg-background/50",
                sizes[size],
                className
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-glass-border">
                <h3 id="modal-title" className="text-xl font-bold tracking-tight text-foreground">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-glass-bg-hover transition-all text-muted-foreground hover:text-foreground active:scale-90"
                  aria-label="Close modal"
                >
                  <Icon name="X" size={20} variant="muted" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
