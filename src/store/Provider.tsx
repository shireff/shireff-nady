'use client';

import { Provider } from 'react-redux';
import { store } from './index';
import { useEffect } from 'react';
import { authService } from '@/services/auth';
import { setAuth, clearAuth } from './slices/authSlice';

export function StoreProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const user = authService.getCurrentUser();
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        if (user && token) {
            store.dispatch(setAuth({ user, token }));
        } else {
            store.dispatch(clearAuth());
        }
    }, []);

    return <Provider store={store}>{children}</Provider>;
}
