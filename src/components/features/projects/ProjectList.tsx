"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Github, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import GlassEmptyState from "@/components/ui/GlassEmptyState";
import Pagination from "@/components/ui/Pagination";
import { Project, PaginationMeta } from "@/types";
import Link from "next/link";
import Script from "next/script";
import { normalizeCategory, getUniqueCategories, KNOWN_CATEGORIES, CATEGORY_SEARCH_TERMS } from "@/lib/utils";
import { projectService } from "@/services/projects";

interface ProjectListProps {
    initialProjects: Project[];
    initialPagination?: PaginationMeta;
}

// Redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setProjects, selectAllProjects } from "@/store/slices/dataSlice";

// Modules
import ProjectFilters from "./ProjectFilters";
import ProjectCard from "./ProjectCard";

export default function ProjectList({ initialProjects, initialPagination }: ProjectListProps) {
    const dispatch = useAppDispatch();
    const projects = useAppSelector(selectAllProjects);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Pagination State
    const [pagination, setPagination] = useState<PaginationMeta>(initialPagination || {
        page: 1,
        limit: 10,
        total: initialProjects.length,
        totalPages: 1,
        count: initialProjects.length
    });

    // Derive dynamic filters from project data and merge with Known Categories
    const [dynamicCategories, setDynamicCategories] = useState(KNOWN_CATEGORIES);
    const [dynamicTags, setDynamicTags] = useState<string[]>([]);

    useEffect(() => {
        // Hydrate Redux store with server-side data
        dispatch(setProjects(initialProjects));

        // Merge dynamic categories from current page with known ones
        const cats = getUniqueCategories(initialProjects);
        setDynamicCategories(prev => Array.from(new Set([...KNOWN_CATEGORIES, ...cats])).sort());

        const tags = Array.from(
            new Set(initialProjects.flatMap((p) => p.tags || []))
        ).sort();
        setDynamicTags(tags);
    }, [dispatch, initialProjects]);

    // Update pagination state if initialPagination changes (e.g. valid revalidation)
    useEffect(() => {
        if (initialPagination) {
            setPagination(initialPagination);
        }
    }, [initialPagination]);

    // Fetch projects on filter/page change
    const fetchProjects = useCallback(async (page: number, search: string, category: string) => {
        setIsLoading(true);
        try {
            const params: any = {
                page,
                limit: 10
            };
            if (search) params.search = search;

            // Map the display category (e.g., "Node.js") to backend search term (e.g., "node")
            if (category !== "All") {
                // Use mapping or fallback to lowercase of the category as best guess
                const backendTerm = CATEGORY_SEARCH_TERMS[category] || category.toLowerCase();
                params.category = backendTerm;
            }

            const response = await projectService.getAll(params);

            dispatch(setProjects(response.data));
            setPagination({
                page: response.page,
                limit: 10,
                total: response.total,
                totalPages: response.totalPages,
                count: response.count
            });

            // Optionally update dynamic categories if new ones are found, but keep known ones
            const newCats = getUniqueCategories(response.data);
            setDynamicCategories(prev => Array.from(new Set([...prev, ...newCats])).sort());

        } catch (error) {
            console.error("Failed to fetch projects", error);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            // Only fetch if different from initial load state to prevent double fetch on mount
            // However, since we are uncontrolled for mounting, let's just use strict dependency logic
            // We'll skip the very first fetch if it matches initial state, but it's complex to track.
            // Simpler: Just fetch when these change.

            // To avoid double-fetching on mount (since initialProjects is already there),
            // we can check if states differ from defaults. 
            const isInitialState = pagination.page === 1 && searchTerm === "" && selectedCategory === "All";

            // BUT: if user clicks "Page 2", page is 2.
            // If user types search, search is "foo".

            // Problem: On mount, this effect runs. We want to use initialProjects.
            // We can use a ref to track mount.
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm, selectedCategory]);

    // Actually, properly implementing the effect:
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true);
            return;
        }
        // Reset page to 1 if filters change
        // We need to distinguish between Page Change and Filter Change
        fetchProjects(pagination.page, searchTerm, selectedCategory);
    }, [pagination.page]);
    // Wait, if I put pagination.page in dependency, setPagination trigger re-run?
    // fetchProjects updates pagination.page (sometimes).

    // Let's separate "Page Change" and "Filter Change".

    const handlePageChange = (newPage: number) => {
        fetchProjects(newPage, searchTerm, selectedCategory);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFilterChange = () => {
        // Reset to page 1
        fetchProjects(1, searchTerm, selectedCategory);
    };

    // Effect for Filters (Debounced)
    useEffect(() => {
        if (!isMounted) return;
        const timer = setTimeout(() => {
            handleFilterChange();
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm, selectedCategory]);


    // Filter Logic for TAGS (Client side only for now, as API might not support it)
    const filteredProjects = projects.filter((project) => {
        if (selectedTag && !project.tags?.includes(selectedTag)) return false;
        return true;
    });

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: filteredProjects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "SoftwareApplication",
                name: project.title,
                description: project.desc,
                image: project.img || "https://shireff-nady.vercel.app/og-image.jpg",
                url: `https://shireff-nady.vercel.app/projects/${project.id}`,
                applicationCategory: project.category,
                operatingSystem: "Web",
                ...(project.git && { sameAs: project.git }),
                ...(project.demo && { url: project.demo }),
            },
        })),
    };

    return (
        <div className="space-y-12">
            {filteredProjects.length > 0 && (
                <Script
                    id="itemlist-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
                />
            )}

            <ProjectFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={dynamicCategories}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
                tags={dynamicTags}
            />

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${isLoading ? 'opacity-50' : ''}`}>
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))
                ) : (
                    <div className="col-span-full py-20">
                        <GlassEmptyState
                            title="I couldn&apos;t find anything"
                            description={`There are no projects that match your current search.`}
                            icon={Filter}
                            actionLabel="Clear Filters"
                            onAction={() => {
                                setSearchTerm("");
                                setSelectedCategory("All");
                                setSelectedTag(null);
                            }}
                        />
                    </div>
                )}
            </div>

            <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
