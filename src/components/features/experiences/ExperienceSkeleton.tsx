import React from "react";
import Skeleton from "@/components/ui/Skeleton";

export default function ExperienceSkeleton() {
    return (
        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[1px] before:bg-zinc-800">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse"
                >
                    {/* Dot */}
                    <Skeleton className="w-12 h-12 rounded-full absolute left-0 md:left-1/2 md:-ml-6 z-10" />

                    {/* Content Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-card p-8 md:p-10 ml-auto md:ml-0 border-white/5 space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-4 w-24 rounded" />
                                <Skeleton className="h-6 w-28 rounded" />
                            </div>
                            <Skeleton className="h-10 w-3/4 rounded-md" />
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <Skeleton className="w-1.5 h-1.5 rounded-full shrink-0" />
                                <Skeleton className="h-4 w-full rounded" />
                            </div>
                            <div className="flex gap-4">
                                <Skeleton className="w-1.5 h-1.5 rounded-full shrink-0" />
                                <Skeleton className="h-4 w-5/6 rounded" />
                            </div>
                            <div className="flex gap-4">
                                <Skeleton className="w-1.5 h-1.5 rounded-full shrink-0" />
                                <Skeleton className="h-4 w-4/5 rounded" />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2">
                            {[1, 2, 3, 4].map((j) => (
                                <Skeleton key={j} className="h-6 w-16 rounded-full" />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
