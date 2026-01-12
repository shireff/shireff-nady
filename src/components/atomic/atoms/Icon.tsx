import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const iconVariants = cva('shrink-0 transition-all', {
    variants: {
        variant: {
            primary: 'text-primary',
            secondary: 'text-secondary',
            muted: 'text-muted-foreground',
            foreground: 'text-foreground',
            accent: 'text-blue-500',
            success: 'text-emerald-500',
            destructive: 'text-destructive',
        },
        size: {
            xs: 'w-3 h-3',
            sm: 'w-4 h-4',
            md: 'w-5 h-5',
            lg: 'w-6 h-6',
            xl: 'w-8 h-8',
        },
    },
    defaultVariants: {
        variant: 'foreground',
        size: 'md',
    },
});

export type IconName = keyof typeof LucideIcons;

interface IconProps extends Omit<LucideProps, 'size'>, VariantProps<typeof iconVariants> {
    name: IconName;
}

/**
 * A unified Icon atom that wraps Lucide React icons.
 * Enforces consistent sizing, color, and accessibility.
 */
const Icon = ({ name, className, variant, size, ...props }: IconProps) => {
    const LucideIcon = LucideIcons[name] as React.ElementType;

    if (!LucideIcon) {
        console.warn(`Icon "${name}" not found in lucide-react`);
        return null;
    }

    return (
        <LucideIcon
            className={cn(iconVariants({ variant, size }), className)}
            aria-hidden="true"
            {...props}
        />
    );
};

export default Icon;
