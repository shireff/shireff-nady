'use client';

import React, { useState, useEffect } from 'react';

import { Upload, X, Split } from 'lucide-react';
import Button from '@/components/ui/Button';
import { StateComparison } from '@/types';
import { comparisonService } from '@/services/comparisons';
import { indexingService } from '@/services/indexing';
import ImageUpload from '@/components/ui/ImageUpload';

interface ComparisonFormProps {
  initialData?: StateComparison;
  onSuccess: (comparison: StateComparison) => void;
  onCancel: () => void;
}


// Redux
import { useAppDispatch } from '@/store/hooks';
import { addComparison, updateComparison } from '@/store/slices/dataSlice';

export default function ComparisonForm({ initialData, onSuccess, onCancel }: ComparisonFormProps) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Partial<StateComparison>>({
    title: initialData?.title || '',
    desc: initialData?.desc || '',
    category: initialData?.category || 'Architecture',
    beforeImg: initialData?.beforeImg || '',
    afterImg: initialData?.afterImg || '',
    isActive: initialData?.isActive ?? true,
    ...initialData
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Before Image States
  const [imageUploadBefore, setImageUploadBefore] = useState<File | null>(null);
  const [imageLoadingBefore, setImageLoadingBefore] = useState(false);
  const [uploadImageUrlBefore, setUploadImageUrlBefore] = useState(formData.beforeImg || '');

  // After Image States
  const [imageUploadAfter, setImageUploadAfter] = useState<File | null>(null);
  const [imageLoadingAfter, setImageLoadingAfter] = useState(false);
  const [uploadImageUrlAfter, setUploadImageUrlAfter] = useState(formData.afterImg || '');

  // Sync Before
  useEffect(() => {
    if (uploadImageUrlBefore && uploadImageUrlBefore !== formData.beforeImg) {
      setFormData(prev => ({ ...prev, beforeImg: uploadImageUrlBefore }));
    }
  }, [uploadImageUrlBefore]);

  // Sync After
  useEffect(() => {
    if (uploadImageUrlAfter && uploadImageUrlAfter !== formData.afterImg) {
      setFormData(prev => ({ ...prev, afterImg: uploadImageUrlAfter }));
    }
  }, [uploadImageUrlAfter]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let result;
      if (initialData?.id) {
        result = await comparisonService.update(initialData.id, formData);
        dispatch(updateComparison(result as StateComparison));
      } else {
        result = await comparisonService.create(formData);
        dispatch(addComparison(result as StateComparison));
      }

      // Trigger indexing for the state-comparisons page
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shireff-nady.vercel.app';
        indexingService.indexUrl(`${baseUrl}/state-comparisons`).catch(console.error);
      } catch (e) {
        console.error('Failed to trigger indexing:', e);
      }

      onSuccess(result as StateComparison);
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
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Comparison Title</label>
          <input
            type="text"
            className="w-full glass-input"
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g. Legacy Dashboard vs Next-Gen"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Category</label>
          <input
            type="text"
            className="w-full glass-input"
            value={formData.category}
            onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
            placeholder="e.g. Frontend Architecture"
            required
          />
        </div>

      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Description</label>
        <textarea
          className="w-full glass-input min-h-[100px]"
          value={formData.desc}
          onChange={e => setFormData(prev => ({ ...prev, desc: e.target.value }))}
          placeholder="Explain the transformation..."
          required
        />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Legacy State (Before)</label>
          <ImageUpload
            imageUpload={imageUploadBefore}
            setImageUpload={setImageUploadBefore}
            imageLoading={imageLoadingBefore}
            setImageLoading={setImageLoadingBefore}
            uploadImageUrl={uploadImageUrlBefore}
            setUploadImageUrl={setUploadImageUrlBefore}
            uploadEndpoint="/projects/upload-image"
          />

        </div>

        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Next-Gen Evolution (After)</label>
          <ImageUpload
            imageUpload={imageUploadAfter}
            setImageUpload={setImageUploadAfter}
            imageLoading={imageLoadingAfter}
            setImageLoading={setImageLoadingAfter}
            uploadImageUrl={uploadImageUrlAfter}
            setUploadImageUrl={setUploadImageUrlAfter}
            uploadEndpoint="/projects/upload-image"
          />

        </div>
      </div>


      <div className="flex items-center gap-4 py-4 px-6 glass-card border-blue-500/10 bg-blue-500/5">
        <input
          type="checkbox"
          id="isActive"
          className="w-6 h-6 rounded-lg border-white/10 bg-black text-blue-600 focus:ring-blue-500/50"
          checked={formData.isActive}
          onChange={e => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
        />

        <div className="space-y-0.5">
          <label htmlFor="isActive" className="text-sm font-bold text-white uppercase tracking-wider">Active Comparison</label>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Toggle visibility on the public comparisons page</p>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={imageLoadingBefore || imageLoadingAfter}
          className="min-w-[140px]"
        >
          {(imageLoadingBefore || imageLoadingAfter) ? 'Uploading...' : (initialData ? 'Update Comparison' : 'Publish Comparison')}
        </Button>

      </div>
    </form>
  );
}
