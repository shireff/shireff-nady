"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Github, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { Project } from "@/types";
import Link from "next/link";
import Script from "next/script";
import { normalizeCategory, getUniqueCategories } from "@/lib/utils";

interface ProjectListProps {
    initialProjects: Project[];
}

// Redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setProjects, selectAllProjects } from "@/store/slices/dataSlice";

// Modules
import ProjectFilters from "./ProjectFilters";
import ProjectCard from "./ProjectCard";

export default function ProjectList({ initialProjects }: ProjectListProps) {
    const dispatch = useAppDispatch();
    const projects = useAppSelector(selectAllProjects);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Derive dynamic filters from project data
    const [dynamicCategories, setDynamicCategories] = useState(["All"]);
    const [dynamicTags, setDynamicTags] = useState<string[]>([]);

    useEffect(() => {
        // Hydrate Redux store with server-side data if empty
        if (projects.length === 0 && initialProjects.length > 0) {
            dispatch(setProjects(initialProjects));
        }
    }, [dispatch, initialProjects, projects.length]);

    useEffect(() => {
        const sourceData = projects.length > 0 ? projects : initialProjects;

        const cats = getUniqueCategories(sourceData);
        setDynamicCategories(["All", ...cats]);

        const tags = Array.from(
            new Set(sourceData.flatMap((p) => p.tags || []))
        ).sort();
        setDynamicTags(tags);
    }, [initialProjects, projects]);

    const activeData = projects.length > 0 ? projects : initialProjects;

    const filteredProjects = activeData.filter((project) => {
        if (selectedCategory !== "All" && normalizeCategory(project.category) !== selectedCategory) return false;
        if (searchTerm && !project.title.toLowerCase().includes(searchTerm.toLowerCase()) && !project.desc.toLowerCase().includes(searchTerm.toLowerCase())) return false;
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))
                ) : (
                    <div className="col-span-full">
                        <EmptyState
                            title="No projects found"
                            description={`We couldn't find any projects matching your criteria.`}
                            icon={<Filter size={48} className="text-zinc-600" />}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
