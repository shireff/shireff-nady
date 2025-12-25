import React from "react";
import Skeleton from "@/components/ui/Skeleton";
import { Card, CardContent } from "@/components/ui/Card";

export default function ProjectSkeleton() {
    return (
        <Card className="h-full border-white/5 flex flex-col">
            <CardContent className="p-0 flex flex-col h-full">
                <Skeleton className="relative aspect-video rounded-lg mb-6 w-full" />

                <div className="flex-grow space-y-4">
                    <div className="flex justify-between items-start">
                        <Skeleton className="h-6 w-20 rounded" />
                        <div className="flex gap-2">
                            <Skeleton className="h-5 w-5 rounded-full" />
                            <Skeleton className="h-5 w-5 rounded-full" />
                        </div>
                    </div>

                    <Skeleton className="h-8 w-3/4 rounded-md" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full rounded-md" />
                        <Skeleton className="h-4 w-full rounded-md" />
                        <Skeleton className="h-4 w-2/3 rounded-md" />
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-5 w-12 rounded-md" />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
