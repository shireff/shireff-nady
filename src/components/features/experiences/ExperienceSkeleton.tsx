/**
 * Skeleton loading state for Experience items
 */

import React from 'react';
import Skeleton from '@/components/ui/Skeleton';
import { Card, CardContent } from '@/components/ui/Card';

export default function ExperienceSkeleton() {
  return (
    <Card className="border-white/5">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-48 rounded-md" />
            <Skeleton className="h-4 w-32 rounded-md" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
        </div>

        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-md" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
