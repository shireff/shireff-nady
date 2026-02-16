/**
 * SWR hook for fetching testimonials with caching
 */

import useSWR from 'swr';
import { Testimonial } from '@/services/testimonials';
import { testimonialService } from '@/services/testimonials';

export function useTestimonials() {
  const { data, error, isLoading, mutate } = useSWR<Testimonial[]>(
    '/testimonials',
    () => testimonialService.getAll(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1 minute
      revalidateIfStale: true,
      shouldRetryOnError: true,
      errorRetryCount: 3,
    }
  );

  return {
    testimonials: data,
    isLoading,
    isError: error,
    mutate,
  };
}
