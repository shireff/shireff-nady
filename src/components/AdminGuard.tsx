'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authService } from '@/services/auth';
import { Loader2 } from 'lucide-react';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            // Always allow access to login page
            if (pathname === '/admin/login') {
                setIsAuthorized(true);
                setIsChecking(false);
                return;
            }

            // Check strictly for authentication
            const isAuthenticated = authService.isAuthenticated();

            if (!isAuthenticated) {
                setIsAuthorized(false);
                router.replace('/admin/login');
            } else {
                setIsAuthorized(true);
            }
            setIsChecking(false);
        };

        checkAuth();
    }, [pathname, router]);

    // If we are on the login page, render immediately to avoid flicker
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    // If checking or not authorized, show nothing or loader
    if (isChecking || !isAuthorized) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    // Render protected content
    return <>{children}</>;
}
