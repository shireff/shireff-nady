'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    BarChart3,
    Code2,
    Briefcase,
    Split,
    Settings,
    Eye,
    LogOut,
    ChevronRight
} from 'lucide-react';
import { authService } from '@/services/auth';

type Tab = 'overview' | 'projects' | 'experiences' | 'comparisons' | 'settings';

interface SidebarProps {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
}

const DashboardSidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    const router = useRouter();

    const navItems = [
        { id: 'overview', name: 'Overview', icon: BarChart3 },
        { id: 'projects', name: 'Projects', icon: Code2 },
        { id: 'experiences', name: 'Experiences', icon: Briefcase },
        { id: 'comparisons', name: 'Comparisons', icon: Split },
        { id: 'settings', name: 'Settings', icon: Settings },
    ];

    return (
        <aside className="w-full lg:w-72 space-y-2">
            <div className="p-6 mb-6 glass-card border-blue-500/10 bg-blue-500/5">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-1">Administrator</p>
                <h2 className="text-xl font-black text-white">System Control</h2>
            </div>
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as Tab)}
                    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all group ${activeTab === item.id
                            ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/40'
                            : 'text-zinc-500 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/5'
                        }`}
                >
                    <div className="flex items-center gap-4">
                        <item.icon size={20} />
                        <span className="font-bold uppercase tracking-widest text-xs">{item.name}</span>
                    </div>
                    <ChevronRight size={16} className={`transition-transform ${activeTab === item.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1'}`} />
                </button>
            ))}
            <div className="pt-8 mt-8 border-t border-white/5 space-y-2">
                <button
                    onClick={() => router.push('/')}
                    className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-zinc-500 hover:bg-white/5 hover:text-white transition-all border border-transparent hover:border-white/5"
                >
                    <Eye size={20} />
                    <span className="font-bold uppercase tracking-widest text-xs">View Site</span>
                </button>
                <button
                    onClick={() => { authService.logout(); router.push('/admin/login'); }}
                    className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-400/5 transition-all border border-transparent hover:border-red-400/10"
                >
                    <LogOut size={20} />
                    <span className="font-bold uppercase tracking-widest text-xs">Logout Session</span>
                </button>
            </div>
        </aside>
    );
};

export default DashboardSidebar;
