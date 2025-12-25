/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

// UI Components
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import ConfirmationDialog from '@/components/ui/ConfirmationDialog';

// Admin Tab Components
import DashboardSidebar from './components/DashboardSidebar';
import OverviewTab from './components/OverviewTab';
import ProjectsTab from './components/ProjectsTab';
import ExperiencesTab from './components/ExperiencesTab';
import ComparisonsTab from './components/ComparisonsTab';

// Form Components
import ProjectForm from './components/ProjectForm';
import ExperienceForm from './components/ExperienceForm';
import ComparisonForm from './components/ComparisonForm';
import SettingsForm from './components/SettingsForm';

// Services & Types
import { authService } from '@/services/auth';
import { projectService } from '@/services/projects';
import { experienceService } from '@/services/experiences';
import { comparisonService } from '@/services/comparisons';
import { Project, Experience, StateComparison } from '@/types';

type Tab = 'overview' | 'projects' | 'experiences' | 'comparisons' | 'settings';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [comparisons, setComparisons] = useState<StateComparison[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: Tab | null;
    editingData: any;
  }>({ isOpen: false, type: null, editingData: null });

  const [deleteState, setDeleteState] = useState<{
    isOpen: boolean;
    id: string | null;
    type: Tab | null;
  }>({ isOpen: false, id: null, type: null });

  const router = useRouter();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [proj, exp, comp] = await Promise.all([
        projectService.getAll(),
        experienceService.getAll(),
        comparisonService.getAll(),
      ]);
      setProjects(proj);
      setExperiences(exp || []);
      setComparisons(comp || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    fetchData();
  }, [router]);

  const handleDelete = async () => {
    const { id, type } = deleteState;
    if (!id || !type) return;

    try {
      if (type === 'projects') await projectService.delete(id);
      if (type === 'experiences') await experienceService.delete(id);
      if (type === 'comparisons') await comparisonService.delete(id);
      fetchData();
      setDeleteState({ isOpen: false, id: null, type: null });
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  const openEditModal = (type: Tab, data: any) => {
    setModalState({ isOpen: true, type, editingData: data });
  };

  const openDeleteConfirm = (type: Tab, id: string) => {
    setDeleteState({ isOpen: true, id, type });
  };

  if (isLoading && projects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow min-h-[70vh]">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter capitalize mb-2">{activeTab}</h1>
            <p className="text-zinc-500 font-medium uppercase tracking-[0.2em] text-[10px]">Managing your digital asset infrastructure</p>
          </div>
          {activeTab !== 'overview' && activeTab !== 'settings' && (
            <Button
              size="lg"
              className="gap-2 px-8 rounded-full font-bold shadow-xl shadow-blue-600/20"
              onClick={() => setModalState({ isOpen: true, type: activeTab, editingData: null })}
            >
              <Plus size={20} /> CREATE NEW
            </Button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <OverviewTab projects={projects} experiences={experiences} comparisons={comparisons} />
          )}

          {activeTab === 'projects' && (
            <ProjectsTab
              projects={projects}
              onEdit={(proj) => openEditModal('projects', proj)}
              onDelete={(id) => openDeleteConfirm('projects', id)}
            />
          )}

          {activeTab === 'experiences' && (
            <ExperiencesTab
              experiences={experiences}
              onEdit={(exp) => openEditModal('experiences', exp)}
              onDelete={(id) => openDeleteConfirm('experiences', id)}
            />
          )}

          {activeTab === 'comparisons' && (
            <ComparisonsTab
              comparisons={comparisons}
              onEdit={(comp) => openEditModal('comparisons', comp)}
              onDelete={(id) => openDeleteConfirm('comparisons', id)}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsForm />
          )}
        </AnimatePresence>
      </main>

      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.editingData ? `Edit ${modalState.type?.slice(0, -1)}` : `Initialize New ${modalState.type?.slice(0, -1)}`}
        className="max-w-3xl"
      >
        {modalState.type === 'projects' && (
          <ProjectForm
            initialData={modalState.editingData}
            existingProjects={projects}
            onSuccess={() => { setModalState({ ...modalState, isOpen: false }); fetchData(); }}
            onCancel={() => setModalState({ ...modalState, isOpen: false })}
          />
        )}

        {modalState.type === 'experiences' && (
          <ExperienceForm
            initialData={modalState.editingData}
            onSuccess={() => { setModalState({ ...modalState, isOpen: false }); fetchData(); }}
            onCancel={() => setModalState({ ...modalState, isOpen: false })}
          />
        )}
        {modalState.type === 'comparisons' && (
          <ComparisonForm
            initialData={modalState.editingData}
            onSuccess={() => { setModalState({ ...modalState, isOpen: false }); fetchData(); }}
            onCancel={() => setModalState({ ...modalState, isOpen: false })}
          />
        )}
      </Modal>

      <ConfirmationDialog
        isOpen={deleteState.isOpen}
        onClose={() => setDeleteState({ ...deleteState, isOpen: false })}
        onConfirm={handleDelete}
        title="COMMENCE DELETION PROTOCOL?"
        description="This action is irreversible. The data will be permanently purged from the production infrastructure."
        confirmLabel="PURGE DATA"
        cancelLabel="ABORT"
      />
    </div>
  );
}
