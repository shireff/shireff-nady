'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';
import { Search, Filter, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { projectService } from '@/services/projects';
import { Project } from '@/types';
import Link from 'next/link';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Derive dynamic filters from project data
  const [dynamicCategories, setDynamicCategories] = useState(['All']);
  const [dynamicTags, setDynamicTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAll({
          category: selectedCategory === 'All' ? undefined : selectedCategory,
          search: searchTerm || undefined
        });
        setProjects(data);

        // Update dynamic filters only on first load or when base data might change
        if (selectedCategory === 'All' && !searchTerm) {
           const cats = Array.from(new Set(data.map(p => p.category))).filter((c): c is string => !!c).sort();
           setDynamicCategories(['All', ...cats]);
           
           const tags = Array.from(new Set(data.flatMap(p => p.tags || []))).sort();
           setDynamicTags(tags);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchProjects, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory]);

  // Client-side filtering for tags (optional, but requested for 'choices')
  const filteredProjects = selectedTag 
    ? projects.filter(p => p.tags?.includes(selectedTag)) 
    : projects;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Projects Portfolio - Shireff Nady",
    "description": "A showcase of high-performance web applications, SaaS platforms, and digital instruments built by Shireff Nady.",
    "url": "https://shireff-nady.vercel.app/projects",
    "publisher": {
      "@type": "Person",
      "name": "Shireff Nady"
    }
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": filteredProjects.map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": project.title,
        "description": project.desc,
        "image": project.img || "https://shireff-nady.vercel.app/og-image.jpg",
        "url": `https://shireff-nady.vercel.app/projects/${project.id}`,
        "applicationCategory": project.category,
        "operatingSystem": "Web",
        ...(project.git && { "sameAs": project.git }),
        ...(project.demo && { "url": project.demo })
      }
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <Script
        id="collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      {filteredProjects.length > 0 && (
        <Script
          id="itemlist-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-7xl font-black tracking-tight">PROJECTS.</h1>
        <p className="text-zinc-400 text-lg">
          A collection of digital instruments designed and built to solve complex problems.
        </p>
      </div>

      {/* Advanced Filters */}
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between glass-card p-4 md:p-6 border-white/5 shadow-2xl">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input
              type="text"
              placeholder="Search by title or description..."
              className="w-full glass-input pl-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {dynamicCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setSelectedTag(null); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tag Cloud Filter */}
        {dynamicTags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start px-2">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest self-center mr-2">Stack:</span>
            {dynamicTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all border ${
                  selectedTag === tag 
                    ? 'bg-blue-500/20 border-blue-500 text-blue-400' 
                    : 'bg-white/5 border-white/5 text-zinc-500 hover:border-white/20 hover:text-zinc-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>


      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="glass-card h-96 animate-pulse bg-white/5 border-white/5" />
          ))
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ translateY: -8 }}
            >
              <Card className="h-full group hover:border-blue-500/30 transition-all duration-500 flex flex-col">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative aspect-video overflow-hidden rounded-lg mb-6">
                    {project.img ? (
                      <img 
                        src={project.img} 
                        alt={project.title}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-900/40 to-emerald-900/40 flex items-center justify-center p-6 text-center">
                        <span className="text-xl font-bold text-zinc-300">{project.title}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <Link href={`/projects/${project.id}`}>
                        <Button variant="glass" size="sm">Explore</Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex-grow space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest px-2 py-1 rounded bg-blue-400/10 border border-blue-400/20">
                        {project.category}
                      </span>
                      <div className="flex gap-2">
                         {project.git && <a href={project.git} className="text-zinc-500 hover:text-white transition-colors" target="_blank"><Github size={18} /></a>}
                         {project.demo && <a href={project.demo} className="text-zinc-500 hover:text-white transition-colors" target="_blank"><ExternalLink size={18} /></a>}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">{project.desc}</p>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags?.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-zinc-500 font-bold uppercase tracking-wider border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
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

