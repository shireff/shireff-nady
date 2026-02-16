/**
 * SWR hook for fetching experiences with caching
 */

import useSWR from 'swr';
import { Experience } from '@/types';
import { experienceService } from '@/services/experiences';

export function useExperiences() {
  const { data, error, isLoading, mutate } = useSWR<Experience[]>(
    '/experiences',
    () => experienceService.getAll(),
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
    experiences: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useExperience(id: string) {
  const { data, error, isLoading, mutate } = useSWR<Experience>(
    id ? `/experiences/${id}` : null,
    () => experienceService.getById(id),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    experience: data,
    isLoading,
    isError: error,
    mutate,
  };
}
