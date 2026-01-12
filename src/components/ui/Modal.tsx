'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Icon from '@/components/atomic/atoms/Icon';

/**
 * Refactored Modal component using Radix UI for A11Y.
 * Preserves custom glassmorphism and Framer Motion animations.
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

  const sizes = {
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    full: 'max-w-[95vw] h-[90vh]'
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            {/* Overlay */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            {/* Content Container */}
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
                  className={cn(
                    "relative w-full glass-card p-0 overflow-hidden shadow-glass-l3 bg-background/50",
                    sizes[size],
                    className
                  )}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-glass-border">
                    <Dialog.Title className="text-xl font-bold tracking-tight text-foreground">
                      {title}
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        className="p-2 rounded-lg hover:bg-glass-bg-hover transition-all text-muted-foreground hover:text-foreground active:scale-90"
                        aria-label="Close modal"
                      >
                        <Icon name="X" size="sm" variant="muted" />
                      </button>
                    </Dialog.Close>
                  </div>

                  {/* Body */}
                  <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    {children}
                  </div>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
