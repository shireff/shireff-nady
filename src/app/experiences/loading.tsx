import React from "react";
import ExperienceSkeleton from "@/components/features/experiences/ExperienceSkeleton";

export default function Loading() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-20 space-y-20">
            <div className="text-center space-y-6">
                <div className="h-16 md:h-24 bg-zinc-800 animate-pulse rounded-lg w-3/4 mx-auto" />
                <div className="h-6 bg-zinc-800 animate-pulse rounded-md w-1/2 mx-auto mt-4" />
            </div>

            <ExperienceSkeleton />
        </div>
    );
}
