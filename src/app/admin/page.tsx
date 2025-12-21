'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  Code2, 
  Briefcase, 
  Split, 
  Plus, 
  Search, 
  LogOut,
  Trash2,
  Edit,
  ExternalLink,
  ChevronRight,
  Eye,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import ConfirmationDialog from '@/components/ui/ConfirmationDialog';
import ProjectForm from './components/ProjectForm';
import ExperienceForm from './components/ExperienceForm';
import ComparisonForm from './components/ComparisonForm';
import { authService } from '@/services/auth';
import { projectService } from '@/services/projects';
import { experienceService } from '@/services/experiences';
import { comparisonService } from '@/services/comparisons';
import { Project, Experience, StateComparison } from '@/types';
import SettingsForm from './components/SettingsForm';

type Tab = 'overview' | 'projects' | 'experiences' | 'comparisons' | 'settings';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [comparisons, setComparisons] = useState<StateComparison[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal States
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: Tab | null;
    editingData: any;
  }>({ isOpen: false, type: null, editingData: null });

  // Delete States
  const [deleteState, setDeleteState] = useState<{
    isOpen: boolean;
    id: string | null;
    type: Tab | null;
  }>({ isOpen: false, id: null, type: null });

  const router = useRouter();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    fetchData();
  }, [router]);

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

  const navItems = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'projects', name: 'Projects', icon: Code2 },
    { id: 'experiences', name: 'Experiences', icon: Briefcase },
    { id: 'comparisons', name: 'Comparisons', icon: Split },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  if (isLoading && projects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 space-y-2">
        <div className="p-6 mb-6 glass-card border-blue-500/10 bg-blue-500/5">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-1">Administrator</p>
           <h2 className="text-xl font-black text-white">System Control</h2>
        </div>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as Tab)}
            className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all group ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/40' 
                : 'text-zinc-500 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/5'
            }`}
          >
            <div className="flex items-center gap-4">
               <item.icon size={20} />
               <span className="font-bold uppercase tracking-widest text-xs">{item.name}</span>
            </div>
            <ChevronRight size={16} className={`transition-transform ${activeTab === item.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1'}`} />
          </button>
        ))}
        <div className="pt-8 mt-8 border-t border-white/5 space-y-2">
           <button 
             onClick={() => router.push('/')}
             className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-zinc-500 hover:bg-white/5 hover:text-white transition-all border border-transparent hover:border-white/5"
           >
             <Eye size={20} />
             <span className="font-bold uppercase tracking-widest text-xs">View Site</span>
           </button>
           <button 
             onClick={() => { authService.logout(); router.push('/admin/login'); }}
             className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-400/5 transition-all border border-transparent hover:border-red-400/10"
           >
             <LogOut size={20} />
             <span className="font-bold uppercase tracking-widest text-xs">Logout Session</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
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
            <motion.div 
              key="overview"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <Card className="hover:border-blue-500/30 transition-all cursor-default">
                <CardHeader>
                  <CardTitle className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Total Systems</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <p className="text-6xl font-black italic text-white">{projects.length}</p>
                  <Code2 className="text-blue-500/20" size={64} />
                </CardContent>
              </Card>
              <Card className="hover:border-blue-500/30 transition-all cursor-default">
                <CardHeader>
                  <CardTitle className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">History Nodes</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <p className="text-6xl font-black italic text-white">{experiences.length}</p>
                  <Briefcase className="text-blue-500/20" size={64} />
                </CardContent>
              </Card>
              <Card className="hover:border-blue-500/30 transition-all cursor-default">
                <CardHeader>
                  <CardTitle className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Active Compilers</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <p className="text-6xl font-black italic text-white">{comparisons.length}</p>
                  <Split className="text-blue-500/20" size={64} />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div 
              key="projects"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card overflow-hidden border-white/5 shadow-2xl"
            >
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10 text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">
                  <tr>
                    <th className="px-8 py-6">Project Metadata</th>
                    <th className="px-8 py-6">Classification</th>
                    <th className="px-8 py-6">Status</th>
                    <th className="px-8 py-6 text-right">Directives</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                             {proj.img ? (
                               <img src={proj.img} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                             ) : (
                               <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500">NO IMG</div>
                             )}
                          </div>
                          <div>
                             <p className="font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-widest">{proj.title}</p>
                             <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1 text-ellipsis overflow-hidden max-w-[200px] whitespace-nowrap">{proj.desc}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">{proj.category}</span>
                      </td>
                      <td className="px-8 py-6">
                        {proj.isFeatured ? (
                          <span className="flex items-center gap-2 text-blue-400 text-[9px] font-black uppercase tracking-widest">
                             <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                             FEATURED
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-zinc-600 text-[9px] font-black uppercase tracking-widest">
                             <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                             STANDARD
                          </span>
                        )}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => setModalState({ isOpen: true, type: 'projects', editingData: proj })}
                            className="p-3 bg-white/5 hover:bg-blue-600 hover:text-white rounded-xl text-zinc-400 transition-all"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => setDeleteState({ isOpen: true, id: proj.id, type: 'projects' })}
                            className="p-3 bg-white/5 hover:bg-red-600 hover:text-white rounded-xl text-zinc-400 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-black">No infrastructure detected. Initialize first project.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </motion.div>
          )}

          {activeTab === 'experiences' && (
             <motion.div 
               key="experiences"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="glass-card overflow-hidden border-white/5 shadow-2xl"
             >
               <table className="w-full text-left">
                 <thead className="bg-white/5 border-b border-white/10 text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">
                   <tr>
                     <th className="px-8 py-6">Company / Experience</th>
                     <th className="px-8 py-6">Timeline</th>
                     <th className="px-8 py-6 text-right">Directives</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                   {experiences.map((exp) => (
                     <tr key={exp.id} className="hover:bg-white/[0.02] transition-colors group">
                       <td className="px-8 py-6">
                          <p className="font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-widest">{exp.position}</p>
                          <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">{exp.company}</p>
                       </td>
                       <td className="px-8 py-6">
                          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{exp.period}</span>
                       </td>
                       <td className="px-8 py-6 text-right">
                         <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button 
                             onClick={() => setModalState({ isOpen: true, type: 'experiences', editingData: exp })}
                             className="p-3 bg-white/5 hover:bg-blue-600 hover:text-white rounded-xl text-zinc-400 transition-all"
                           >
                             <Edit size={16} />
                           </button>
                           <button 
                             onClick={() => setDeleteState({ isOpen: true, id: exp.id, type: 'experiences' })}
                             className="p-3 bg-white/5 hover:bg-red-600 hover:text-white rounded-xl text-zinc-400 transition-all"
                           >
                             <Trash2 size={16} />
                           </button>
                         </div>
                       </td>
                     </tr>
                   ))}
                   {experiences.length === 0 && (
                     <tr>
                       <td colSpan={3} className="px-8 py-20 text-center text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-black">No timeline data recorded.</td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </motion.div>
          )}

          {activeTab === 'comparisons' && (
             <motion.div 
               key="comparisons"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="glass-card overflow-hidden border-white/5 shadow-2xl"
             >
               <table className="w-full text-left">
                 <thead className="bg-white/5 border-b border-white/10 text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">
                   <tr>
                     <th className="px-8 py-6">Comparison Node</th>
                     <th className="px-8 py-6">Status</th>
                     <th className="px-8 py-6 text-right">Directives</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                   {comparisons.map((comp) => (
                     <tr key={comp.id} className="hover:bg-white/[0.02] transition-colors group">
                       <td className="px-8 py-6">
                          <p className="font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-widest">{comp.title}</p>
                          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{comp.category}</p>
                       </td>
                       <td className="px-8 py-6">
                          {comp.isActive ? (
                            <span className="text-emerald-400 text-[9px] font-black uppercase tracking-widest">ACTIVE</span>
                          ) : (
                            <span className="text-zinc-600 text-[9px] font-black uppercase tracking-widest">INACTIVE</span>
                          )}
                       </td>
                       <td className="px-8 py-6 text-right">
                         <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button 
                             onClick={() => setModalState({ isOpen: true, type: 'comparisons', editingData: comp })}
                             className="p-3 bg-white/5 hover:bg-blue-600 hover:text-white rounded-xl text-zinc-400 transition-all"
                           >
                             <Edit size={16} />
                           </button>
                           <button 
                             onClick={() => setDeleteState({ isOpen: true, id: comp.id, type: 'comparisons' })}
                             className="p-3 bg-white/5 hover:bg-red-600 hover:text-white rounded-xl text-zinc-400 transition-all"
                           >
                             <Trash2 size={16} />
                           </button>
                         </div>
                       </td>
                     </tr>
                   ))}
                   {comparisons.length === 0 && (
                     <tr>
                       <td colSpan={3} className="px-8 py-20 text-center text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-black">No evolution nodes found.</td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </motion.div>
          )}
           {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <SettingsForm />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Editor Modal */}
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

      {/* Delete Confirmation */}
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
