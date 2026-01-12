import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:pointer-events-none active:scale-95',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20',
        secondary: 'bg-zinc-800 hover:bg-zinc-700 text-white',
        outline: 'border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:bg-white/5',
        ghost: 'hover:bg-zinc-800 text-zinc-300',
        glass: 'bg-glass-bg hover:bg-glass-bg-hover backdrop-blur-std border border-glass-border shadow-glass-l1 text-foreground',
        premium: 'bg-glass-bg hover:bg-glass-bg-hover backdrop-blur-premium border border-glass-border shadow-glass-l3 text-foreground rounded-soft',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg font-medium',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
export default Button;
