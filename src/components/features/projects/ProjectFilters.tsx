'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface ProjectFiltersProps {
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    selectedCategory: string;
    setSelectedCategory: (val: string) => void;
    categories: string[];
    selectedTag: string | null;
    setSelectedTag: (val: string | null) => void;
    tags: string[];
}

export default function ProjectFilters({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    selectedTag,
    setSelectedTag,
    tags
}: ProjectFiltersProps) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between glass-card p-4 md:p-6 border-white/5 shadow-2xl">
                <div className="relative w-full lg:w-96">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Search by title or description..."
                        className="w-full glass-input pl-12"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setSelectedCategory(cat);
                                setSelectedTag(null);
                            }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${selectedCategory === cat
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tag Cloud Filter */}
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start px-2">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest self-center mr-2">
                        Stack:
                    </span>
                    {tags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() =>
                                setSelectedTag(selectedTag === tag ? null : tag)
                            }
                            className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all border ${selectedTag === tag
                                ? "bg-blue-500/20 border-blue-500 text-blue-400"
                                : "bg-white/5 border-white/5 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
