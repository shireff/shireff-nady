import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminFilters {
  searchQuery: string;
  category: string;
  status: string;
}

interface AdminState {
  activeTab: 'overview' | 'projects' | 'experiences' | 'comparisons' | 'testimonials' | 'settings';
  filters: AdminFilters;
  selectedIds: string[];
}

const initialState: AdminState = {
  activeTab: 'overview',
  filters: {
    searchQuery: '',
    category: 'all',
    status: 'all',
  },
  selectedIds: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<AdminState['activeTab']>) => {
      state.activeTab = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<AdminFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    toggleSelection: (state, action: PayloadAction<string>) => {
      if (state.selectedIds.includes(action.payload)) {
        state.selectedIds = state.selectedIds.filter(id => id !== action.payload);
      } else {
        state.selectedIds.push(action.payload);
      }
    },
    clearSelection: (state) => {
      state.selectedIds = [];
    }
  },
});

export const { 
  setActiveTab, 
  setFilters, 
  resetFilters, 
  toggleSelection, 
  clearSelection 
} = adminSlice.actions;

export default adminSlice.reducer;
