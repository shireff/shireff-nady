import React from "react";
import Skeleton from "@/components/ui/Skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export default function Loading() {
    return (
        <div className="pb-24 animate-pulse">
            {/* Hero Header Skeleton */}
            <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden bg-zinc-900">
                <div className="max-w-7xl mx-auto px-6 w-full relative z-10 pb-16 space-y-10">
                    <Skeleton className="h-10 w-32 rounded-full" />
                    <div className="space-y-6">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-20 md:h-28 w-3/4 rounded-lg" />
                    </div>
                </div>
            </section>

            {/* Content Skeleton */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                    <div className="lg:col-span-2 space-y-16">
                        <div className="space-y-8">
                            <Skeleton className="h-10 w-48 rounded" />
                            <div className="space-y-4">
                                <Skeleton className="h-6 w-full rounded" />
                                <Skeleton className="h-6 w-full rounded" />
                                <Skeleton className="h-6 w-4/5 rounded" />
                            </div>
                        </div>

                        <div className="space-y-8">
                            <Skeleton className="h-8 w-40 rounded" />
                            <div className="flex flex-wrap gap-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Skeleton key={i} className="h-12 w-32 rounded-lg" />
                                ))}
                            </div>
                        </div>
                    </div>

                    <aside className="space-y-10">
                        <Card className="border-white/5 bg-white/5 shadow-2xl">
                            <CardHeader>
                                <Skeleton className="h-4 w-32 rounded" />
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="flex items-center gap-5">
                                    <Skeleton className="w-14 h-14 rounded-2xl" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-20 rounded" />
                                        <Skeleton className="h-6 w-32 rounded" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-5">
                                    <Skeleton className="w-14 h-14 rounded-2xl" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-20 rounded" />
                                        <Skeleton className="h-6 w-32 rounded" />
                                    </div>
                                </div>
                                <div className="pt-8 space-y-4">
                                    <Skeleton className="h-16 w-full rounded-2xl" />
                                    <Skeleton className="h-16 w-full rounded-2xl" />
                                </div>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </section>
        </div>
    );
}
