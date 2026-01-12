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
import TestimonialsTab from './components/TestimonialsTab';
import NotificationsTab from './components/NotificationsTab';

// Form Components
import ProjectForm from './components/ProjectForm';
import ExperienceForm from './components/ExperienceForm';
import ComparisonForm from './components/ComparisonForm';
import SettingsForm from './components/SettingsForm';
import TestimonialForm from './components/TestimonialForm';

// Services & Types
import { authService } from '@/services/auth';
import { Project, Experience, StateComparison } from '@/types';

type Tab = 'overview' | 'projects' | 'experiences' | 'comparisons' | 'testimonials' | 'settings' | 'notifications';

// Redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setActiveTab } from "@/store/slices/adminSlice";
import { selectAllProjects, selectAllExperiences, selectAllComparisons } from "@/store/slices/dataSlice";

// Hooks
import { useDashboardData } from '@/hooks/useDashboardData';

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { fetchData, deleteItem } = useDashboardData();
  const activeTab = useAppSelector((state) => state.admin.activeTab);

  const projects = useAppSelector(selectAllProjects);
  const experiences = useAppSelector(selectAllExperiences);
  const comparisons = useAppSelector(selectAllComparisons);
  const dataLoading = useAppSelector((state) => state.data.isLoading);
  const isLoading = dataLoading.projects || dataLoading.experiences || dataLoading.comparisons;

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

  const [refreshKey, setRefreshKey] = useState(0);

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async () => {
    const { id, type } = deleteState;
    if (!id || !type) return;

    const success = await deleteItem(id, type);
    if (success) {
      setDeleteState({ isOpen: false, id: null, type: null });
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
      <DashboardSidebar activeTab={activeTab} setActiveTab={(tab: any) => dispatch(setActiveTab(tab))} />

      <main className="flex-grow min-h-[70vh]">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter capitalize mb-2">{activeTab}</h1>
            <p className="text-zinc-500 font-medium uppercase tracking-[0.2em] text-[10px]">Managing your digital asset infrastructure</p>
          </div>
          {activeTab !== 'overview' && activeTab !== 'settings' && activeTab !== 'notifications' && (
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

          {activeTab === 'testimonials' && (
            <TestimonialsTab key={refreshKey} />
          )}

          {activeTab === 'notifications' && (
            <NotificationsTab />
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
            onSuccess={() => setModalState({ ...modalState, isOpen: false })}
            onCancel={() => setModalState({ ...modalState, isOpen: false })}
          />
        )}

        {modalState.type === 'experiences' && (
          <ExperienceForm
            initialData={modalState.editingData}
            onSuccess={() => setModalState({ ...modalState, isOpen: false })}
            onCancel={() => setModalState({ ...modalState, isOpen: false })}
          />
        )}
        {modalState.type === 'comparisons' && (
          <ComparisonForm
            initialData={modalState.editingData}
            onSuccess={() => setModalState({ ...modalState, isOpen: false })}
            onCancel={() => setModalState({ ...modalState, isOpen: false })}
          />
        )}
        {modalState.type === 'testimonials' && (
          <TestimonialForm
            initialData={modalState.editingData}
            onSuccess={() => {
              setModalState({ ...modalState, isOpen: false });
              setRefreshKey(prev => prev + 1);
            }}
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
