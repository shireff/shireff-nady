'use client';

import React, { useState } from 'react';
import { User, Briefcase, Linkedin, Quote, Link as LinkIcon, Calendar } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Testimonial } from '@/types';
import { testimonialService } from '@/services/testimonials';

interface TestimonialFormProps {
    initialData?: Testimonial;
    onSuccess: (testimonial: Testimonial) => void;
    onCancel: () => void;
}

export default function TestimonialForm({ initialData, onSuccess, onCancel }: TestimonialFormProps) {
    const [formData, setFormData] = useState<Partial<Testimonial>>(initialData || {
        name: '',
        role: '',
        company: '',
        relationship: '',
        content: '',
        linkedinUrl: '',
        avatar: '',
        date: new Date().toISOString().split('T')[0],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            let result;
            if (initialData?.id) {
                result = await testimonialService.update(initialData.id, formData);
            } else {
                result = await testimonialService.create(formData);
            }
            onSuccess(result as Testimonial);
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
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input
                            type="text"
                            className="w-full glass-input pl-10"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. John Doe"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">LinkedIn URL</label>
                    <div className="relative">
                        <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input
                            type="url"
                            className="w-full glass-input pl-10"
                            value={formData.linkedinUrl}
                            onChange={e => setFormData({ ...formData, linkedinUrl: e.target.value })}
                            placeholder="https://linkedin.com/in/..."
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Role</label>
                    <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input
                            type="text"
                            className="w-full glass-input pl-10"
                            value={formData.role}
                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                            placeholder="e.g. Senior Manager"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Company</label>
                    <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input
                            type="text"
                            className="w-full glass-input pl-10"
                            value={formData.company}
                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                            placeholder="e.g. Tech Corp"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Relationship</label>
                    <div className="relative">
                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input
                            type="text"
                            className="w-full glass-input pl-10"
                            value={formData.relationship}
                            onChange={e => setFormData({ ...formData, relationship: e.target.value })}
                            placeholder="e.g. Managed John directly"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Date</label>
                    <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input
                            type="date"
                            className="w-full glass-input pl-10"
                            value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Avatar URL</label>
                <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                    <input
                        type="text"
                        className="w-full glass-input pl-10"
                        value={formData.avatar}
                        onChange={e => setFormData({ ...formData, avatar: e.target.value })}
                        placeholder="Image URL"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Testimonial Content</label>
                <div className="relative">
                    <Quote className="absolute left-4 top-3 text-zinc-500" size={16} />
                    <textarea
                        className="w-full glass-input pl-10 min-h-[120px] py-3"
                        value={formData.content}
                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Enter the testimonial text..."
                        required
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
                <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
                <Button type="submit" isLoading={isSubmitting} className="min-w-[140px]">
                    {initialData ? 'Update Testimonial' : 'Add Testimonial'}
                </Button>
            </div>
        </form>
    );
}
