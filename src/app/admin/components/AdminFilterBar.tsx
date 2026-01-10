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
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleCategorySelect = (cat: string) => {
        dispatch(setFilters({ category: cat }));
        setIsDropdownOpen(false);
    };

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
                <div className="relative min-w-[250px]" ref={dropdownRef}>
                    <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full glass-input pl-12 py-3 text-xs font-black tracking-widest uppercase cursor-pointer flex items-center justify-between select-none hover:bg-white/10 transition-colors"
                    >
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <span className={category === 'all' ? 'text-zinc-400' : 'text-white'}>
                            {category === 'all' ? 'ALL CLASSIFICATIONS' : category.toUpperCase()}
                        </span>
                        <div className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 p-2 glass-card bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-xl z-50 max-h-[300px] overflow-y-auto shadow-2xl">
                            <div
                                onClick={() => handleCategorySelect('all')}
                                className={`px-4 py-3 rounded-lg text-[10px] font-black tracking-widest uppercase cursor-pointer transition-all ${category === 'all' ? 'bg-blue-500/20 text-blue-400' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`}
                            >
                                ALL CLASSIFICATIONS
                            </div>
                            {categories.map((cat) => (
                                <div
                                    key={cat}
                                    onClick={() => handleCategorySelect(cat)}
                                    className={`px-4 py-3 rounded-lg text-[10px] font-black tracking-widest uppercase cursor-pointer transition-all ${category === cat ? 'bg-blue-500/20 text-blue-400' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`}
                                >
                                    {cat.toUpperCase()}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminFilterBar;
