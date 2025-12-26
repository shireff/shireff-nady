'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { settingsService } from '@/services/settings';
import { indexingService } from '@/services/indexing';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Save, RotateCcw, CheckCircle, AlertCircle, Search, Zap, Globe } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';

const DEFAULT_HERO_IMAGE = "https://media.licdn.com/dms/image/v2/D4E03AQHI2emfkXdeXQ/profile-displayphoto-shrink_800_800/B4EZaI2FxCHMAc-/0/1746052604728?e=1767830400&v=beta&t=-l4A36ias3qpuV4uIKc7q7V1vcZqMwuIceuT8hkYwag";

export default function SettingsForm() {
  const [heroUrl, setHeroUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isIndexing, setIsIndexing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [indexStatus, setIndexStatus] = useState<{
    isLoading: boolean;
    success?: boolean;
    stats?: { total: number; successful: number; failed: number };
  }>({ isLoading: false });

  // Image Upload Lifted States
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadImageUrl, setUploadImageUrl] = useState('');

  // Sync uploadImageUrl with heroUrl
  useEffect(() => {
    // ONLY trigger the "back to default" logic if we are NOT loading and the user explicitly cleared the URL
    if (!isLoading && uploadImageUrl === "") {
      setHeroUrl(DEFAULT_HERO_IMAGE);
      setUploadImageUrl(DEFAULT_HERO_IMAGE);
      // Explicitly sync the revert to backend only when user purges
      settingsService.updateHomeImage(DEFAULT_HERO_IMAGE).catch(console.error);
    } else if (uploadImageUrl && uploadImageUrl !== heroUrl) {
      setHeroUrl(uploadImageUrl);
    }
  }, [uploadImageUrl, isLoading]);



  useEffect(() => {
    fetchSettings();
  }, []);


  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const data = await settingsService.getHomeImage();
      const currentUrl = data.heroImageUrl || DEFAULT_HERO_IMAGE;
      setHeroUrl(currentUrl);
      setUploadImageUrl(currentUrl); // Initialize both to prevent mount mismatch
    } catch (error) {
      console.error('Failed to load settings', error);
      setHeroUrl(DEFAULT_HERO_IMAGE);
      setUploadImageUrl(DEFAULT_HERO_IMAGE);
    } finally {
      setIsLoading(false);
    }
  };


  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroUrl.trim()) return;

    setIsSaving(true);
    setStatus('idle');
    try {
      await settingsService.updateHomeImage(heroUrl);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Update failed', error);
      setStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    setIsSaving(true);
    setStatus('idle');
    try {
      // 1. Reset Backend
      await settingsService.updateHomeImage(DEFAULT_HERO_IMAGE);

      // 2. Reset Local State
      setHeroUrl(DEFAULT_HERO_IMAGE);
      setUploadImageUrl(DEFAULT_HERO_IMAGE);
      setImageUpload(null);

      // 3. Success Feedback
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Reset failed', error);
      setStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBulkIndexing = async () => {
    setIndexStatus({ isLoading: true });
    try {
      const response = await indexingService.indexAllPages();
      if (response.success) {
        setIndexStatus({
          isLoading: false,
          success: true,
          stats: response.stats
        });
        setTimeout(() => setIndexStatus({ isLoading: false }), 5000);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error('Indexing failed', error);
      setIndexStatus({ isLoading: false, success: false });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Loading Configuration...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-4xl">
      <div className="glass-card-premium p-8 md:p-12 space-y-10 border-white/5">
        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Settings size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tight">Home Page Configuration</h2>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Control hero elements and global visuals</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <label className="text-xs font-black uppercase tracking-widest text-zinc-500 pl-1">Primary Hero Asset</label>
              <button
                type="button"
                onClick={handleReset}
                className="text-[10px] font-black text-blue-400 hover:text-blue-300 uppercase tracking-widest flex items-center gap-2 transition-colors"
                title="Reset to default system image"
              >
                <RotateCcw size={12} /> Reset to Default
              </button>
            </div>

            <ImageUpload
              imageUpload={imageUpload}
              setImageUpload={setImageUpload}
              imageLoading={imageLoading}
              setImageLoading={setImageLoading}
              uploadImageUrl={uploadImageUrl}
              setUploadImageUrl={setUploadImageUrl}
              uploadEndpoint="/admin/home/image/upload"
            />


            <p className="text-[10px] text-zinc-600 font-medium italic">Preferred resolution: 800x800px or 1:1 Aspect Ratio for best results.</p>
          </div>


          {/* Preview State */}
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-500 pl-1">Live Preview</label>
            <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full opacity-50" />
              <div className="relative w-full h-full rounded-full glass-card-premium p-3 border-white/10 overflow-hidden shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden border border-white/5 bg-zinc-900 flex items-center justify-center">
                  <img
                    src={heroUrl}
                    alt="Preview"
                    onLoad={() => console.log('Preview image loaded')}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = DEFAULT_HERO_IMAGE;
                    }}
                    className="w-full h-full object-cover grayscale transition-all hover:grayscale-0 duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3 text-emerald-400 text-sm font-bold bg-emerald-400/10 p-4 rounded-xl border border-emerald-400/20"
              >
                <CheckCircle size={20} />
                <p>System parameters updated successfully. Home page is now synchronized.</p>
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3 text-red-400 text-sm font-bold bg-red-400/10 p-4 rounded-xl border border-red-400/20"
              >
                <AlertCircle size={20} />
                <p>Synchronization failed. Verify authentication or network connectivity.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            type="submit"
            size="lg"
            isLoading={isSaving}
            disabled={imageLoading}
            className="w-full py-8 rounded-2xl font-black italic text-xl shadow-xl shadow-blue-600/20 gap-3 group"
          >
            <Save size={24} className="group-hover:scale-110 transition-transform" />
            {imageLoading ? 'SYNCING...' : 'SAVE CORE CONFIG'}
          </Button>

        </form>
      </div>

      <div className="glass-card-premium p-8 md:p-12 space-y-10 border-white/5">
        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Globe size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tight">Search Indexing Strategy</h2>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Accelerate content discovery via Google & IndexNow APIs</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-blue-400">
                <Search size={18} />
                <h3 className="font-bold text-xs uppercase tracking-widest">Google Indexing</h3>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Directly notifies Google when a page is updated or created. Ideal for portfolio updates and new case studies.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-purple-400">
                <Zap size={18} />
                <h3 className="font-bold text-xs uppercase tracking-widest">IndexNow Pulse</h3>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Instant notification to Bing, Yandex, and other search engines. Ensures your latest work is crawled immediately.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleBulkIndexing}
              isLoading={indexStatus.isLoading}
              variant="outline"
              className="w-full py-8 rounded-2xl font-black italic text-lg border-white/10 hover:bg-white/5 gap-3 group"
            >
              <Zap size={20} className="text-yellow-400 group-hover:scale-125 transition-transform" />
              TRIGGER GLOBAL RE-INDEX
            </Button>

            <AnimatePresence>
              {indexStatus.success && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center"
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-1">Indexing Sequence Complete</p>
                  <p className="text-[10px] font-medium opacity-80">
                    Processed {indexStatus.stats?.total} URLs: {indexStatus.stats?.successful} Success, {indexStatus.stats?.failed} Errors.
                  </p>
                </motion.div>
              )}
              {indexStatus.success === false && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center"
                >
                  <p className="text-xs font-bold uppercase tracking-widest">Protocol Failure</p>
                  <p className="text-[10px] font-medium opacity-80">Check server logs and API credentials.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em] text-center">
            Note: Rate limits apply (Google: 200/day). Use sparingly.
          </p>
        </div>
      </div>
    </div>
  );
}

