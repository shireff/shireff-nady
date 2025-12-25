import React from "react";
import ProjectSkeleton from "@/components/features/projects/ProjectSkeleton";

export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            <div className="space-y-4 text-center max-w-3xl mx-auto">
                <div className="h-16 md:h-24 bg-zinc-800 animate-pulse rounded-lg w-3/4 mx-auto" />
                <div className="h-6 bg-zinc-800 animate-pulse rounded-md w-1/2 mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <ProjectSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}
