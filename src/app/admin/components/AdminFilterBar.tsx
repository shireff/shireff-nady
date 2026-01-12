'use client';

import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilters } from '@/store/slices/adminSlice';
import Icon from '@/components/atomic/atoms/Icon';
import { cn } from '@/lib/utils';

interface AdminFilterBarProps {
    categories?: string[];
}

const AdminFilterBar: React.FC<AdminFilterBarProps> = ({ categories = [] }) => {
    const dispatch = useAppDispatch();
    const { searchQuery, category } = useAppSelector((state) => state.admin.filters);

    const handleCategorySelect = (cat: string) => {
        dispatch(setFilters({ category: cat }));
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
                <Icon name="Search" size="sm" className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => dispatch(setFilters({ searchQuery: e.target.value }))}
                    placeholder="SEARCH INFRASTRUCTURE..."
                    className="w-full glass-input pl-12 py-3 text-xs font-black tracking-widest uppercase focus:ring-2 ring-blue-500/20 bg-glass-bg border-glass-border rounded-xl"
                />
            </div>

            {categories.length > 0 && (
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <div className="relative min-w-[250px] glass-input pl-12 py-3 text-xs font-black tracking-widest uppercase cursor-pointer flex items-center justify-between select-none hover:bg-white/10 transition-colors border-glass-border rounded-xl">
                            <Icon name="Filter" size="sm" className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <span className={category === 'all' ? 'text-zinc-400' : 'text-white'}>
                                {category === 'all' ? 'ALL CLASSIFICATIONS' : category.toUpperCase()}
                            </span>
                            <Icon name="ChevronDown" size="xs" className="text-zinc-500 transition-transform dropdown-trigger-icon" />
                        </div>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            className="min-w-[250px] p-2 glass-card bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-xl z-50 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                            sideOffset={8}
                        >
                            <DropdownMenu.Item
                                onClick={() => handleCategorySelect('all')}
                                className={cn(
                                    "px-4 py-3 rounded-lg text-[10px] font-black tracking-widest uppercase cursor-pointer outline-none transition-all mb-1",
                                    category === 'all' ? 'bg-blue-500/20 text-blue-400' : 'text-zinc-500 hover:bg-white/5 hover:text-white'
                                )}
                            >
                                ALL CLASSIFICATIONS
                            </DropdownMenu.Item>

                            {categories.map((cat) => (
                                <DropdownMenu.Item
                                    key={cat}
                                    onClick={() => handleCategorySelect(cat)}
                                    className={cn(
                                        "px-4 py-3 rounded-lg text-[10px] font-black tracking-widest uppercase cursor-pointer outline-none transition-all mb-1",
                                        category === cat ? 'bg-blue-500/20 text-blue-400' : 'text-zinc-500 hover:bg-white/5 hover:text-white'
                                    )}
                                >
                                    {cat.toUpperCase()}
                                </DropdownMenu.Item>
                            ))}
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            )}
        </div>
    );
};

export default AdminFilterBar;
