'use client';

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

export function useDashboardData() {
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    dispatch(setLoadingState({ type: 'projects', loading: true }));
    dispatch(setLoadingState({ type: 'experiences', loading: true }));
    dispatch(setLoadingState({ type: 'comparisons', loading: true }));

    try {
      const [proj, exp, comp] = await Promise.all([
        projectService.getAll(),
        experienceService.getAll(),
        comparisonService.getAll(),
      ]);
      dispatch(setProjects(proj));
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
  };

  const deleteItem = async (id: string, type: 'projects' | 'experiences' | 'comparisons' | string) => {
    try {
      if (type === 'projects') {
        await projectService.delete(id);
        dispatch(deleteProject(id));
      } else if (type === 'experiences') {
        await experienceService.delete(id);
        dispatch(deleteExperience(id));
      } else if (type === 'comparisons') {
        await comparisonService.delete(id);
        dispatch(deleteComparison(id));
      }

      dispatch(addNotification({
        type: 'success',
        message: `${type.slice(0, -1)} decommissioned successfully.`,
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
  };

  return { fetchData, deleteItem };
}
