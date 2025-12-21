'use client';

import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import Button from './Button';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorState({ 
  title = "Something went wrong", 
  message = "An error occurred while fetching the data. Please try again later.", 
  onRetry,
  className 
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-20 text-center space-y-6", className)}>
      <div className="p-6 rounded-full bg-red-500/10 border border-red-500/20">
        <AlertCircle size={48} className="text-red-400" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-zinc-300">{title}</h3>
        <p className="text-zinc-500 max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="gap-2">
          <RotateCcw size={16} /> Try Again
        </Button>
      )}
    </div>
  );
}
