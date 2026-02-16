/**
 * SWR hook for fetching projects with caching
 */

import useSWR from 'swr';
import { Project } from '@/types';
import { projectService } from '@/services/projects';

interface UseProjectsOptions {
  category?: string;
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
}

export function useProjects(options: UseProjectsOptions = {}) {
  const { category, revalidateOnFocus = false, revalidateOnReconnect = false } = options;

  const { data, error, isLoading, mutate } = useSWR<Project[]>(
    category ? `/projects?category=${category}` : '/projects',
    async () => {
      const response = await projectService.getAll();
      // response is ProjectsResponse with data property
      const projects = response.data || [];
      if (category) {
        return projects.filter(p => p.category === category);
      }
      return projects;
    },
    {
      revalidateOnFocus,
      revalidateOnReconnect,
      dedupingInterval: 60000, // 1 minute
      revalidateIfStale: true,
      shouldRetryOnError: true,
      errorRetryCount: 3,
    }
  );

  return {
    projects: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useProject(id: string) {
  const { data, error, isLoading, mutate } = useSWR<Project>(
    id ? `/projects/${id}` : null,
    () => projectService.getById(id),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    project: data,
    isLoading,
    isError: error,
    mutate,
  };
}
