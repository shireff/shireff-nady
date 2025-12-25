import { configureStore } from '@reduxjs/toolkit';
import aiReducer from './slices/aiSlice';
import adminReducer from './slices/adminSlice';
import authReducer from './slices/authSlice';
import dataReducer from './slices/dataSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    ai: aiReducer,
    admin: adminReducer,
    auth: authReducer,
    data: dataReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
