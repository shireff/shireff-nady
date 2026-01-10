'use client';

import { useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { 
  setProjects, 
  setExperiences, 
  setComparisons, 
  setLoadingState,
  deleteProject,
  deleteExperience,
  deleteComparison
} from '@/store/slices/dataSlice';
import { addNotification } from '@/store/slices/uiSlice';
import { projectService } from '@/services/projects';
import { experienceService } from '@/services/experiences';
import { comparisonService } from '@/services/comparisons';

import { EntityType } from '@/types';

export function useDashboardData() {
  const dispatch = useAppDispatch();

  const fetchData = useCallback(async () => {
    dispatch(setLoadingState({ type: 'projects', loading: true }));
    dispatch(setLoadingState({ type: 'experiences', loading: true }));
    dispatch(setLoadingState({ type: 'comparisons', loading: true }));

    try {
      const [projResponse, exp, comp] = await Promise.all([
        projectService.getAll({ limit: 1000 }),
        experienceService.getAll(),
        comparisonService.getAll(),
      ]);
      dispatch(setProjects(projResponse.data)); 
      dispatch(setExperiences(exp || []));
      dispatch(setComparisons(comp || []));
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
      dispatch(setLoadingState({ type: 'projects', loading: false }));
      dispatch(setLoadingState({ type: 'experiences', loading: false }));
      dispatch(setLoadingState({ type: 'comparisons', loading: false }));
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to synchronize dashboard data.'
      }));
    }
  }, [dispatch]);

  const deleteItem = useCallback(async (id: string, type: EntityType | string) => {
    try {
      if (type === EntityType.PROJECTS) {
        await projectService.delete(id);
        dispatch(deleteProject(id));
      } else if (type === EntityType.EXPERIENCES) {
        await experienceService.delete(id);
        dispatch(deleteExperience(id));
      } else if (type === EntityType.COMPARISONS) {
        await comparisonService.delete(id);
        dispatch(deleteComparison(id));
      }

      dispatch(addNotification({
        type: 'success',
        message: `${String(type).slice(0, -1)} decommissioned successfully.`,
      }));
      return true;
    } catch (error) {
      console.error('Delete failed', error);
      dispatch(addNotification({
        type: 'error',
        message: `Decommissioning failed: Protocol error.`,
      }));
      return false;
    }
  }, [dispatch]);

  return { fetchData, deleteItem };
}
