import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project, Experience, StateComparison } from '@/types';

interface DataState {
  projects: Project[];
  experiences: Experience[];
  comparisons: StateComparison[];
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
  projects: [],
  experiences: [],
  comparisons: [],
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
      state.projects = action.payload;
      state.lastUpdated.projects = new Date().toISOString();
      state.isLoading.projects = false;
    },
    setExperiences: (state, action: PayloadAction<Experience[]>) => {
      state.experiences = action.payload;
      state.lastUpdated.experiences = new Date().toISOString();
      state.isLoading.experiences = false;
    },
    setComparisons: (state, action: PayloadAction<StateComparison[]>) => {
      state.comparisons = action.payload;
      state.lastUpdated.comparisons = new Date().toISOString();
      state.isLoading.comparisons = false;
    },
    setLoadingState: (state, action: PayloadAction<{ type: keyof DataState['isLoading']; loading: boolean }>) => {
      state.isLoading[action.payload.type] = action.payload.loading;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.unshift(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
    },
    addExperience: (state, action: PayloadAction<Experience>) => {
      state.experiences.unshift(action.payload);
    },
    updateExperience: (state, action: PayloadAction<Experience>) => {
      const index = state.experiences.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.experiences[index] = action.payload;
      }
    },
    deleteExperience: (state, action: PayloadAction<string>) => {
      state.experiences = state.experiences.filter(e => e.id !== action.payload);
    },
    addComparison: (state, action: PayloadAction<StateComparison>) => {
      state.comparisons.unshift(action.payload);
    },
    updateComparison: (state, action: PayloadAction<StateComparison>) => {
      const index = state.comparisons.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.comparisons[index] = action.payload;
      }
    },
    deleteComparison: (state, action: PayloadAction<string>) => {
      state.comparisons = state.comparisons.filter(c => c.id !== action.payload);
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

export default dataSlice.reducer;
