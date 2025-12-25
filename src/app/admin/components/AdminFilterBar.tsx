'use client';

import React from 'react';
import { Search, Filter } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilters } from '@/store/slices/adminSlice';

interface AdminFilterBarProps {
    categories?: string[];
}

const AdminFilterBar: React.FC<AdminFilterBarProps> = ({ categories = [] }) => {
    const dispatch = useAppDispatch();
    const { searchQuery, category } = useAppSelector((state) => state.admin.filters);

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => dispatch(setFilters({ searchQuery: e.target.value }))}
                    placeholder="SEARCH INFRASTRUCTURE..."
                    className="w-full glass-input pl-12 py-3 text-xs font-black tracking-widest uppercase focus:ring-2 ring-blue-500/20"
                />
            </div>

            {categories.length > 0 && (
                <div className="relative min-w-[200px]">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                    <select
                        value={category}
                        onChange={(e) => dispatch(setFilters({ category: e.target.value }))}
                        className="w-full glass-input pl-12 py-3 text-xs font-black tracking-widest uppercase appearance-none focus:ring-2 ring-blue-500/20"
                    >
                        <option value="all">ALL CLASSIFICATIONS</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default AdminFilterBar;
