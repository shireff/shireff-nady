'use client';

import React, { useState } from 'react';
import { Plus, X, Briefcase, Calendar, Terminal } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Experience } from '@/types';
import { experienceService } from '@/services/experiences';

interface ExperienceFormProps {
  initialData?: Experience;
  onSuccess: (experience: Experience) => void;
  onCancel: () => void;
}

// Redux
import { useAppDispatch } from '@/store/hooks';
import { addExperience, updateExperience } from '@/store/slices/dataSlice';

export default function ExperienceForm({ initialData, onSuccess, onCancel }: ExperienceFormProps) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Partial<Experience>>(initialData || {
    company: '',
    position: '',
    period: '',
    description: [],
    technologies: [],
  });
  const [bulletInput, setBulletInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddBullet = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && bulletInput.trim()) {
      e.preventDefault();
      setFormData({ ...formData, description: [...(formData.description || []), bulletInput.trim()] });
      setBulletInput('');
    }
  };

  const handleAddTech = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      if (!formData.technologies?.includes(techInput.trim())) {
        setFormData({ ...formData, technologies: [...(formData.technologies || []), techInput.trim()] });
      }
      setTechInput('');
    }
  };

  const removeBullet = (index: number) => {
    setFormData({ ...formData, description: formData.description?.filter((_, i) => i !== index) });
  };

  const removeTech = (tech: string) => {
    setFormData({ ...formData, technologies: formData.technologies?.filter(t => t !== tech) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let result;
      if (initialData?.id) {
        result = await experienceService.update(initialData.id, formData);
        dispatch(updateExperience(result as Experience));
      } else {
        result = await experienceService.create(formData);
        dispatch(addExperience(result as Experience));
      }
      onSuccess(result as Experience);
    } catch (error) {
      console.error('Submit failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Company Name</label>
          <div className="relative">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input
              type="text"
              className="w-full glass-input pl-10"
              value={formData.company}
              onChange={e => setFormData({ ...formData, company: e.target.value })}
              placeholder="e.g. Google"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Position</label>
          <input
            type="text"
            className="w-full glass-input"
            value={formData.position}
            onChange={e => setFormData({ ...formData, position: e.target.value })}
            placeholder="e.g. Senior Frontend Developer"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Employment Period</label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input
            type="text"
            className="w-full glass-input pl-10"
            value={formData.period}
            onChange={e => setFormData({ ...formData, period: e.target.value })}
            placeholder="e.g. June 2021 - Present"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Description (Key Achievements)</label>
        <div className="space-y-3 mb-3">
          {formData.description?.map((point, i) => (
            <div key={i} className="flex gap-3 group">
              <div className="flex-grow glass-input text-sm text-zinc-300 py-2">{point}</div>
              <button type="button" onClick={() => removeBullet(i)} className="p-2 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
        <div className="relative">
          <Plus className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input
            type="text"
            className="w-full glass-input pl-10"
            value={bulletInput}
            onChange={e => setBulletInput(e.target.value)}
            onKeyDown={handleAddBullet}
            placeholder="Technical achievement + Enter"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Technologies</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {formData.technologies?.map(tech => (
            <span key={tech} className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
              {tech}
              <button type="button" onClick={() => removeTech(tech)} className="hover:text-red-400"><X size={12} /></button>
            </span>
          ))}
        </div>
        <div className="relative">
          <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input
            type="text"
            className="w-full glass-input pl-10"
            value={techInput}
            onChange={e => setTechInput(e.target.value)}
            onKeyDown={handleAddTech}
            placeholder="Add technology + Enter"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" isLoading={isSubmitting} className="min-w-[140px]">
          {initialData ? 'Update Experience' : 'Add Experience'}
        </Button>
      </div>
    </form>
  );
}
