import React from "react";
import Skeleton from "@/components/ui/Skeleton";

export default function ComparisonSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-2 w-full md:w-auto">
                    <Skeleton className="h-4 w-32 rounded" />
                    <Skeleton className="h-10 w-64 rounded-md" />
                </div>
                <Skeleton className="h-8 w-24 rounded-full" />
            </div>

            <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-3/4 rounded" />
            </div>

            <Skeleton className="relative rounded-[2rem] border border-white/5 aspect-[16/9] lg:aspect-[21/9] w-full" />
        </div>
    );
}
