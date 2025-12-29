'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authService } from '@/services/auth';
import { Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAuth, clearAuth } from '@/store/slices/authSlice';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

    useEffect(() => {
        const verifySession = async () => {
            // 1. Skip if specifically on login page
            if (pathname === '/admin/login') return;

            // 2. Check logic
            const hasHint = authService.isAuthenticated();

            if (!hasHint) {
                dispatch(clearAuth());
                router.replace('/admin/login');
                return;
            }

            // 3. Robust Verification with Backend
            if (!isAuthenticated) {
                try {
                    const response = await authService.verify();
                    if (response.success) {
                        dispatch(setAuth({
                            user: response.data,
                            token: 'session' // Placeholder since token is in HttpOnly cookie
                        }));
                    } else {
                        throw new Error('Verification failed');
                    }
                } catch (error) {
                    dispatch(clearAuth());
                    router.replace('/admin/login?expired=true');
                }
            }
        };

        verifySession();
    }, [pathname, router, isAuthenticated, dispatch]);

    // Bypass for login page to avoid recursion/flash
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    // Strict Guard: If loading OR not authenticated, show premium loader
    if (isLoading || !isAuthenticated) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[#030712] relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
                <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="relative">
                        <div className="w-16 h-16 border-2 border-blue-500/20 rounded-full animate-ping absolute inset-0" />
                        <Loader2 className="h-12 w-12 animate-spin text-blue-500 relative z-10" />
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 animate-pulse">
                            Synchronizing Neural Link
                        </p>
                        <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest mt-2">
                            Verifying Administrative Credentials
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
