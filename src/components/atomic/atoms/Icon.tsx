import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

export type IconName = keyof typeof LucideIcons;

interface IconProps extends LucideProps {
    name: IconName;
    variant?: 'primary' | 'secondary' | 'muted' | 'foreground' | 'accent';
    className?: string;
}

/**
 * A unified Icon atom that wraps Lucide React icons.
 * Ensures consistent accessibility and styling capabilities.
 */
const Icon = ({ name, className, variant, size = 20, strokeWidth = 2, ...props }: IconProps) => {
    const LucideIcon = LucideIcons[name] as React.ElementType;

    if (!LucideIcon) {
        console.warn(`Icon "${name}" not found in lucide-react`);
        return null;
    }

    const variantClasses = {
        primary: 'text-primary',
        secondary: 'text-secondary',
        muted: 'text-muted-foreground',
        foreground: 'text-foreground',
        accent: 'text-blue-500',
    };

    return (
        <LucideIcon
            className={cn(
                'shrink-0 transition-all',
                variant && variantClasses[variant],
                className
            )}
            size={size}
            strokeWidth={strokeWidth}
            aria-hidden="true"
            {...props}
        />
    );
};

export default Icon;
