'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Cpu, Globe, Rocket, Github, ExternalLink, Download } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { projectService } from '@/services/projects';
import { Project } from '@/types';
import Skills from '@/components/sections/Skills';
import { settingsService } from '@/services/settings';

const DEFAULT_HERO_IMAGE = "https://media.licdn.com/dms/image/v2/D4E03AQHI2emfkXdeXQ/profile-displayphoto-shrink_800_800/B4EZaI2FxCHMAc-/0/1746052604728?e=1767830400&v=beta&t=-l4A36ias3qpuV4uIKc7q7V1vcZqMwuIceuT8hkYwag";

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO_IMAGE);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Shireff Nady Portfolio",
    "url": "https://shireff-nady.vercel.app",
    "description": "Portfolio of Shireff Nady, Senior Front-End Developer.",
    "publisher": {
      "@type": "Person",
      "name": "Shireff Nady"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://shireff-nady.vercel.app/projects?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Shireff Nady - Home",
    "url": "https://shireff-nady.vercel.app",
    "description": "Welcome to the official portfolio of Shireff Nady, a Senior Front-End Developer specialized in digital excellence.",
    "author": {
      "@type": "Person",
      "name": "Shireff Nady"
    }
  };

  useEffect(() => {
    projectService.getAll().then(projects => {
      const featured = projects.filter(p => p.isFeatured);
      setFeaturedProjects(featured.length > 0 ? featured.slice(0, 3) : projects.slice(0, 3));
    }).catch(() => {
      // Fallback for demo if API fails
      setFeaturedProjects([
        {
          id: '1',
          title: 'Quantum Dashboard',
          desc: 'A high-performance glassmorphism dashboard built with Next.js and Framer Motion.',
          category: 'Web App',
          img: '', // Test placeholder
          demo: 'https://example.com',
          git: 'https://github.com',
          tags: ['Next.js', 'Tailwind', 'Three.js'],
          isFeatured: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Neural Sync',
          desc: 'Real-time collaboration platform with neural network optimizations.',
          category: 'SaaS',
          img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
          demo: 'https://example.com',
          git: 'https://github.com',
          tags: ['React', 'Node.js', 'Socket.io'],
          isFeatured: true,
          createdAt: new Date().toISOString()
        }
      ]);
    });

    // Fetch Home Hero Image
    settingsService.getHomeImage().then(data => {
      if (data.heroImageUrl) {
        setHeroImage(data.heroImageUrl);
      }
    }).finally(() => {
      setIsImageLoading(false);
    });
  }, []);

  return (
    <div className="space-y-32 pb-24">
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center px-6 overflow-hidden">
        {/* Background Ambient Elements */}
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse transition-all -z-10" />
        <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-emerald-600/10 blur-[100px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* LEFT: Content Area */}
          <div className="space-y-10 order-2 lg:order-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-blue-500/20 text-blue-400 text-sm font-bold uppercase tracking-[0.2em]"
            >
              <Rocket size={16} className="animate-bounce" />
              <span>Front-End Developer</span>
            </motion.div>

            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter leading-[0.85] uppercase"
              >
                Engineering <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                  Digital <br /> Excellence
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-zinc-400 text-xl md:text-2xl max-w-2xl font-medium leading-relaxed mx-auto lg:mx-0"
              >
                Architecting high-performance web systems with meticulous
                visual design and state-of-the-art engineering.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4"
            >
              <Link href="/projects">
                <Button size="lg" className="h-16 px-10 gap-3 rounded-full font-black italic text-lg shadow-2xl shadow-blue-500/20 group">
                  EXPLORE LAB <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="glass" size="lg" className="h-16 px-10 rounded-full font-black italic text-lg border-white/5 hover:bg-white/10">
                  CONNECT
                </Button>
              </Link>
              <a
                href="https://drive.google.com/file/d/1R4OSPHV8ADIz1qNSaSDMQCIs6fZv85T3/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="h-16 px-10 rounded-full font-black italic text-lg border-white/10 hover:bg-white/5 flex items-center gap-2">
                  <Download size={20} />
                  DOWNLOAD CV
                </Button>
              </a>
            </motion.div>
          </div>

          {/* RIGHT: Visual Element */}
          <div className="relative flex justify-center items-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: 'circOut' }}
              className="relative z-10"
            >
              {/* Outer Glow Halo */}
              <div className="absolute -inset-10 bg-blue-500/20 blur-[80px] rounded-full animate-pulse transition-opacity" />

              {/* Profile Container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px]">
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-full rounded-full glass-card-premium p-4 md:p-6 shadow-[0_0_50px_rgba(59,130,246,0.3)] overflow-hidden"
                >
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10 group bg-zinc-900/50 flex items-center justify-center relative">
                    {isImageLoading && (
                      <div className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-900">
                        <div className="w-full h-full animate-pulse bg-gradient-to-br from-blue-500/10 to-emerald-500/10" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                        </div>
                      </div>
                    )}
                    <motion.img
                      key={heroImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isImageLoading ? 0 : 1 }}
                      transition={{ duration: 0.5 }}
                      src={heroImage}
                      alt="Shireff Nady"
                      onLoad={() => setIsImageLoading(false)}
                      onError={() => {
                        setHeroImage(DEFAULT_HERO_IMAGE);
                        setIsImageLoading(false);
                      }}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                    />
                  </div>

                </motion.div>

                {/* Animated Orbitals / Tech Icons (Decorative) */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-8 border border-dashed border-blue-500/20 rounded-full pointer-events-none"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-16 border border-dashed border-emerald-500/10 rounded-full pointer-events-none"
                />

                {/* Floating Indicators */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute top-[10%] -right-4 md:-right-8 px-4 py-2 glass-card-premium border-blue-500/30 shadow-xl"
                >
                  <span className="text-[10px] font-black tracking-widest text-blue-400 uppercase">React & Next Dev</span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-[20%] -left-4 md:-left-8 px-4 py-2 glass-card-premium border-emerald-500/30 shadow-xl"
                >
                  <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase">UI/UX Architect</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Code2, title: 'Clean Architecture', desc: 'Maintainable, scalable, and modular codebases.' },
            { icon: Cpu, title: 'High Performance', desc: 'Blazing fast load times and smooth interactions.' },
            { icon: Globe, title: 'Global Reach', desc: 'Accessible, SEO-optimized, and multilingual support.' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, translateY: -5 }}
              className="glass-card p-8 space-y-4 border-white/5 hover:border-blue-500/30 shadow-2xl"
            >
              <feature.icon className="text-blue-400" size={32} />
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-zinc-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <Skills />

      {/* Featured Projects */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex justify-between items-end">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">Featured Works</h2>
              <p className="text-zinc-400">Handpicked projects that showcase technical depth.</p>
            </div>
            <Link href="/projects" className="hidden md:flex items-center gap-2 text-blue-400 font-medium hover:underline">
              View All <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full group hover:border-blue-500/50">
                  <CardContent className="p-0">
                    <div className="relative aspect-video overflow-hidden rounded-lg mb-6">
                      {project.img ? (
                        <img
                          src={project.img}
                          alt={project.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-emerald-600/20 flex items-center justify-center p-6 text-center">
                          <span className="text-xl font-bold text-zinc-400">{project.title}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <Link href={`/projects/${project.id}`}>
                          <Button variant="glass" size="sm">Details</Button>
                        </Link>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">{project.category}</span>
                        <div className="flex gap-2">
                          {project.git && <a href={project.git} className="text-zinc-500 hover:text-white transition-colors"><Github size={16} /></a>}
                          {project.demo && <a href={project.demo} className="text-zinc-500 hover:text-white transition-colors"><ExternalLink size={16} /></a>}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                      <p className="text-zinc-400 text-sm line-clamp-2">{project.desc}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags?.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto glass-card p-12 md:p-24 text-center space-y-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-600/5 -z-10 group-hover:bg-blue-600/10 transition-colors" />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Rocket size={64} className="mx-auto text-blue-400" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black italic">LET&apos;S BUILD THE FUTURE.</h2>
          <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
            Currently open for select freelance opportunities and full-time senior roles.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="px-12 rounded-full font-bold">CONTACT ME</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
