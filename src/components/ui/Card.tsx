import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div 
      className={cn('glass-card p-6 overflow-hidden', className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

export function CardTitle({ children, className }: CardProps) {
  return <h3 className={cn('text-xl font-bold text-white', className)}>{children}</h3>;
}

export function CardDescription({ children, className }: CardProps) {
  return <p className={cn('text-zinc-400 text-sm', className)}>{children}</p>;
}

export function CardContent({ children, className }: CardProps) {
  return <div className={cn('relative', className)}>{children}</div>;
}

export function CardFooter({ children, className }: CardProps) {
  return <div className={cn('mt-6 flex items-center justify-between', className)}>{children}</div>;
}
