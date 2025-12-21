'use client';

import React from 'react';
import { PackageOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description: string;
  className?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({ 
  title, 
  description, 
  className, 
  icon = <PackageOpen size={48} className="text-zinc-600" /> 
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-20 text-center space-y-4", className)}>
      <div className="p-6 rounded-full bg-white/5 border border-white/10">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-zinc-300">{title}</h3>
      <p className="text-zinc-500 max-w-xs">{description}</p>
    </div>
  );
}
