import { createSlice, PayloadAction, createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { Project, Experience, StateComparison } from '@/types';
import { RootState } from '../index';

const projectsAdapter = createEntityAdapter<Project>();
const experiencesAdapter = createEntityAdapter<Experience>();
const comparisonsAdapter = createEntityAdapter<StateComparison>();

interface DataState {
  projects: EntityState<Project, string>;
  experiences: EntityState<Experience, string>;
  comparisons: EntityState<StateComparison, string>;
  lastUpdated: {
    projects: string | null;
    experiences: string | null;
    comparisons: string | null;
  };
  isLoading: {
    projects: boolean;
    experiences: boolean;
    comparisons: boolean;
  };
}

const initialState: DataState = {
  projects: projectsAdapter.getInitialState(),
  experiences: experiencesAdapter.getInitialState(),
  comparisons: comparisonsAdapter.getInitialState(),
  lastUpdated: {
    projects: null,
    experiences: null,
    comparisons: null,
  },
  isLoading: {
    projects: false,
    experiences: false,
    comparisons: false,
  },
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      projectsAdapter.setAll(state.projects, action.payload);
      state.lastUpdated.projects = new Date().toISOString();
      state.isLoading.projects = false;
    },
    setExperiences: (state, action: PayloadAction<Experience[]>) => {
      experiencesAdapter.setAll(state.experiences, action.payload);
      state.lastUpdated.experiences = new Date().toISOString();
      state.isLoading.experiences = false;
    },
    setComparisons: (state, action: PayloadAction<StateComparison[]>) => {
      comparisonsAdapter.setAll(state.comparisons, action.payload);
      state.lastUpdated.comparisons = new Date().toISOString();
      state.isLoading.comparisons = false;
    },
    setLoadingState: (state, action: PayloadAction<{ type: keyof DataState['isLoading']; loading: boolean }>) => {
      state.isLoading[action.payload.type] = action.payload.loading;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      projectsAdapter.addOne(state.projects, action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      projectsAdapter.updateOne(state.projects, {
        id: action.payload.id,
        changes: action.payload
      });
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      projectsAdapter.removeOne(state.projects, action.payload);
    },
    addExperience: (state, action: PayloadAction<Experience>) => {
      experiencesAdapter.addOne(state.experiences, action.payload);
    },
    updateExperience: (state, action: PayloadAction<Experience>) => {
      experiencesAdapter.updateOne(state.experiences, {
        id: action.payload.id,
        changes: action.payload
      });
    },
    deleteExperience: (state, action: PayloadAction<string>) => {
      experiencesAdapter.removeOne(state.experiences, action.payload);
    },
    addComparison: (state, action: PayloadAction<StateComparison>) => {
      comparisonsAdapter.addOne(state.comparisons, action.payload);
    },
    updateComparison: (state, action: PayloadAction<StateComparison>) => {
      comparisonsAdapter.updateOne(state.comparisons, {
        id: action.payload.id,
        changes: action.payload
      });
    },
    deleteComparison: (state, action: PayloadAction<string>) => {
      comparisonsAdapter.removeOne(state.comparisons, action.payload);
    },
  },
});

export const { 
  setProjects, 
  setExperiences, 
  setComparisons, 
  setLoadingState,
  addProject,
  updateProject,
  deleteProject,
  addExperience,
  updateExperience,
  deleteExperience,
  addComparison,
  updateComparison,
  deleteComparison
} = dataSlice.actions;

// Selectors
export const {
  selectAll: selectAllProjects,
  selectById: selectProjectById,
} = projectsAdapter.getSelectors((state: RootState) => state.data.projects);

export const {
  selectAll: selectAllExperiences,
  selectById: selectExperienceById,
} = experiencesAdapter.getSelectors((state: RootState) => state.data.experiences);

export const {
  selectAll: selectAllComparisons,
  selectById: selectComparisonById,
} = comparisonsAdapter.getSelectors((state: RootState) => state.data.comparisons);

export default dataSlice.reducer;
