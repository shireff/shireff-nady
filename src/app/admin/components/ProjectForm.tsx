'use client';

import React, { useState, useEffect } from 'react';

import { Upload, X, Terminal, Link as LinkIcon, Github, Globe } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Project } from '@/types';
import { projectService } from '@/services/projects';
import ImageUpload from '@/components/ui/ImageUpload';
import { motion, AnimatePresence } from 'framer-motion';



const DEFAULT_FALLBACK_IMAGE = "https://media.licdn.com/dms/image/v2/D4E03AQHI2emfkXdeXQ/profile-displayphoto-shrink_800_800/B4EZaI2FxCHMAc-/0/1746052604728?e=1767830400&v=beta&t=-l4A36ias3qpuV4uIKc7q7V1vcZqMwuIceuT8hkYwag";

interface ProjectFormProps {

  initialData?: Project;
  existingProjects?: Project[];
  onSuccess: (project: Project) => void;
  onCancel: () => void;
}

export default function ProjectForm({ initialData, existingProjects = [], onSuccess, onCancel }: ProjectFormProps) {
  // Extract unique tags and categories from existing projects
  const uniqueTags = Array.from(new Set(existingProjects.flatMap(p => p.tags || []))).sort();
  const uniqueCategories = Array.from(new Set(existingProjects.map(p => p.category))).filter((c): c is string => !!c).sort();

  // Hardcoded defaults to ensure we always have some base options
  const defaultCategories = ['Next', 'Node', 'React', 'UI', 'Mobile'];
  const categories = Array.from(new Set([...defaultCategories, ...uniqueCategories]));

  const [formData, setFormData] = useState<Partial<Project>>({
    title: initialData?.title || '',
    desc: initialData?.desc || '',
    category: initialData?.category || categories[0],
    img: initialData?.img || '',
    tags: initialData?.tags || [],
    demo: initialData?.demo || '',
    git: initialData?.git || '',
    isFeatured: initialData?.isFeatured || false,
  });


  const [tagInput, setTagInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Image Upload Lifted States
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadImageUrl, setUploadImageUrl] = useState(formData.img || '');

  // Sync uploadImageUrl with formData
  useEffect(() => {
    if (uploadImageUrl && uploadImageUrl !== formData.img) {
      setFormData(prev => ({ ...prev, img: uploadImageUrl }));
    }
  }, [uploadImageUrl]);



  // Filter suggestions based on current input
  const suggestions = uniqueTags.filter(tag =>
    tag.toLowerCase().includes(tagInput.toLowerCase()) &&
    !formData.tags?.includes(tag)
  );

  const handleAddTag = (tag: string) => {
    if (tag.trim() && !formData.tags?.includes(tag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...(prev.tags || []), tag.trim()] }));
    }
    setTagInput('');
    setShowSuggestions(false);
  };


  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      handleAddTag(tagInput);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags?.filter(t => t !== tagToRemove) }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imageLoading) {
      alert('Image upload in progress. Please wait.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Step 2: Finalize metadata sync with fallback image support
      const submissionData = {
        ...formData,
        title: formData.title || "",
        desc: formData.desc || "",
        category: formData.category || "React",
        img: uploadImageUrl || formData.img || DEFAULT_FALLBACK_IMAGE,
        tags: formData.tags || [],
        demo: formData.demo || "",
        git: formData.git || "",
        isFeatured: !!formData.isFeatured
      };

      const result = initialData?.id
        ? await projectService.update(initialData.id, submissionData)
        : await projectService.create(submissionData);

      onSuccess(result as Project);
    } catch (err) {
      console.error(err);
      alert('Failed to save project. Verification error.');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Project Title</label>
          <input
            type="text"
            className="w-full glass-input"
            value={formData.title || ""}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g. Quantum Dashboard"
            required
          />

        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Classification (Category)</label>
          <div className="relative">
            <select
              className="w-full glass-input appearance-none bg-zinc-900 pr-10"
              value={formData.category}
              onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
              <option value="custom">+ Add New...</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
              <Terminal size={14} />
            </div>
          </div>
          {/* Support for custom category if needed - hidden for simplicity unless selected */}
          {formData.category === 'custom' && (
            <input
              type="text"
              className="w-full glass-input mt-2 border-blue-500/30"
              placeholder="Enter custom category name..."
              autoFocus
              onBlur={(e) => {
                if (e.target.value) setFormData(prev => ({ ...prev, category: e.target.value }));
                else setFormData(prev => ({ ...prev, category: 'React' }));
              }}
            />
          )}

        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Description</label>
        <textarea
          className="w-full glass-input min-h-[120px]"
          value={formData.desc || ""}
          onChange={e => setFormData(prev => ({ ...prev, desc: e.target.value }))}
          placeholder="Describe your project..."
          required
        />

      </div>

      <div className="space-y-4">
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Project Visual Asset</label>
        <ImageUpload
          imageUpload={imageUpload}
          setImageUpload={setImageUpload}
          imageLoading={imageLoading}
          setImageLoading={setImageLoading}
          uploadImageUrl={uploadImageUrl}
          setUploadImageUrl={setUploadImageUrl}
          uploadEndpoint="/projects/upload-image"
        />


      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Tags / Tech Stack</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {formData.tags?.map(tag => (
            <span key={tag} className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-400"><X size={12} /></button>
            </span>
          ))}
        </div>
        <div className="relative">
          <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input
            type="text"
            className="w-full glass-input pl-10"
            value={tagInput}
            onChange={e => {
              setTagInput(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={onKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Tech (e.g. Next.js) + Enter"

          />

          {/* Technical Suggestion Dropdown */}
          <AnimatePresence>
            {showSuggestions && (tagInput || suggestions.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-50 w-full mt-2 glass-card-premium border-white/10 max-h-48 overflow-y-auto overflow-x-hidden p-2"
              >
                <div className="px-2 py-1 mb-2 border-b border-white/5">
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Detected Dependencies</p>
                </div>
                <div className="space-y-1">
                  {suggestions.length > 0 ? (
                    suggestions.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleAddTag(tag)}
                        className="w-full text-left px-3 py-2 rounded-lg text-[10px] font-bold text-zinc-400 hover:bg-white/5 hover:text-blue-400 uppercase tracking-widest transition-all"
                      >
                        {tag}
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-[10px] text-zinc-600 italic uppercase tracking-widest">
                      New Tag Protocol Detected...
                    </div>
                  )}
                </div>
                {tagInput && !suggestions.includes(tagInput) && !formData.tags?.includes(tagInput) && (
                  <button
                    type="button"
                    onClick={() => handleAddTag(tagInput)}
                    className="w-full text-left px-3 py-2 mt-2 border-t border-white/5 text-[10px] font-black text-blue-400 uppercase tracking-widest"
                  >
                    + Initialize &quot;{tagInput}&quot;
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Demo URL</label>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input
              type="url"
              className="w-full glass-input pl-10"
              value={formData.demo || ""}
              onChange={e => setFormData(prev => ({ ...prev, demo: e.target.value }))}
              placeholder="https://..."
            />

          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">GitHub Link</label>
          <div className="relative">
            <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input
              type="url"
              className="w-full glass-input pl-10"
              value={formData.git || ""}
              onChange={e => setFormData(prev => ({ ...prev, git: e.target.value }))}
              placeholder="https://github.com/..."
            />

          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 py-4 px-6 glass-card border-blue-500/10 bg-blue-500/5">
        <input
          type="checkbox"
          id="isFeatured"
          className="w-6 h-6 rounded-lg border-white/10 bg-black text-blue-600 focus:ring-blue-500/50"
          checked={formData.isFeatured}
          onChange={e => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
        />

        <div className="space-y-0.5">
          <label htmlFor="isFeatured" className="text-sm font-bold text-white uppercase tracking-wider">Feature Project</label>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Pin this project to the home page carousel</p>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={imageLoading}
          className="min-w-[140px]"
        >
          {imageLoading ? 'Uploading...' : (initialData ? 'Update Project' : 'Publish Project')}
        </Button>

      </div>
    </form>
  );
}
