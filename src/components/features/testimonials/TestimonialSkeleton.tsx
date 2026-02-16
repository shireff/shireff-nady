/**
 * Skeleton loading state for Testimonial/Recommendation items
 */

import React from 'react';
import Skeleton from '@/components/ui/Skeleton';
import { Card, CardContent } from '@/components/ui/Card';

export default function TestimonialSkeleton() {
  return (
    <Card className="border-white/5">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start gap-4">
          <Skeleton className="h-16 w-16 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-40 rounded-md" />
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-3 w-24 rounded-md" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-2/3 rounded-md" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-3 w-24 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
