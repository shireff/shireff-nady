import React from "react";

interface SkeletonProps {
    className?: string;
}

export default function Skeleton({ className = "" }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse bg-zinc-800/50 rounded-md ${className}`}
            style={{
                backgroundImage: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite linear"
            }}
        />
    );
}
