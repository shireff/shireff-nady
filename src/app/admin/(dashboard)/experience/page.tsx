"use client";
import React, { useEffect, useState } from "react";
import { experienceAPI } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import "./Experiences.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlertTriangle, Edit, Plus, Trash2 } from "lucide-react";

interface Experience {
  id?: string;
  company: string;
  position: string;
  period: string;
  description: string[];
  technologies: string[];
}

const ExperienceDashboard = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [form, setForm] = useState<Experience>({
    company: "",
    position: "",
    period: "",
    description: [],
    technologies: [],
  });
  const [descriptionInput, setDescriptionInput] = useState("");
  const [technologyInput, setTechnologyInput] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !isAdmin) {
      router.push("/admin");
    }
  }, [isAuthenticated, isAdmin, router]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await experienceAPI.getExperience();
        setExperiences(res.data.data);
      } catch (err) {
        console.error("Failed to fetch experience", err);
      }
    };
    fetchExperiences();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddDescription = () => {
    if (descriptionInput.trim()) {
      setForm((prev) => ({
        ...prev,
        description: [...prev.description, descriptionInput.trim()],
      }));
      setDescriptionInput("");
    }
  };

  const handleAddTechnology = () => {
    if (technologyInput.trim()) {
      setForm((prev) => ({
        ...prev,
        technologies: [...prev.technologies, technologyInput.trim()],
      }));
      setTechnologyInput("");
    }
  };

  const handleSubmit = async () => {
    const updatedDescription = descriptionInput.trim()
      ? [...form.description, descriptionInput.trim()]
      : form.description;

    const updatedTechnologies = technologyInput.trim()
      ? [...form.technologies, technologyInput.trim()]
      : form.technologies;

    const payload = {
      ...form,
      description: updatedDescription,
      technologies: updatedTechnologies,
    };

    try {
      if (isEditing && editingExperience) {
        const res = await experienceAPI.updateExperience(editingExperience.id!, payload);
        setExperiences((prev) =>
          prev.map((exp) => (exp.id === editingExperience.id ? res.data.data : exp))
        );
      } else {
        const res = await experienceAPI.createExperience(payload);
        setExperiences((prev) => [...prev, res.data.data]);
      }

      setForm({
        company: "",
        position: "",
        period: "",
        description: [],
        technologies: [],
      });
      setDescriptionInput("");
      setTechnologyInput("");
      setSheetOpen(false);
      setIsEditing(false);
      setEditingExperience(null);
    } catch (err) {
      alert("Error submitting experience");
      console.error("Error submitting experience", err);
    }
  };

  const handleEdit = (exp: Experience) => {
    setForm({
      company: exp.company,
      position: exp.position,
      period: exp.period,
      description: exp.description,
      technologies: exp.technologies,
    });
    setDescriptionInput("");
    setTechnologyInput("");
    setIsEditing(true);
    setEditingExperience(exp);
    setSheetOpen(true);
  };

  const handleAddNew = () => {
    setForm({
      company: "",
      position: "",
      period: "",
      description: [],
      technologies: [],
    });
    setDescriptionInput("");
    setTechnologyInput("");
    setIsEditing(false);
    setEditingExperience(null);
    setSheetOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await experienceAPI.deleteExperience(id);
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    } catch (err) {
      alert("Delete failed");
      console.log("Error deleting experience", err);
    }
  };

  return (
    <main
      className="min-h-screen p-4 md:p-8"
      style={{ backgroundColor: "var(--primaryBg)", color: "var(--title)" }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center font-poppins" style={{ color: 'var(--title)' }}>
          Experience Dashboard
        </h1>

        <div className="mb-8">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button
                onClick={handleAddNew}
                className="px-6 py-3 rounded-lg font-semibold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: 'var(--blue)' }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Experience
              </button>
            </SheetTrigger>
            <SheetContent
              className="sm:max-w-[600px] overflow-y-auto"
              style={{
                backgroundColor: "var(--card-bg)",
                color: "var(--title)",
                borderColor: "var(--border)",
              }}
            >
              <SheetHeader>
                <SheetTitle style={{ color: 'var(--title)' }}>
                  {isEditing ? 'Edit Experience' : 'Add New Experience'}
                </SheetTitle>
                <SheetDescription style={{ color: 'var(--subtitle)' }}>
                  {isEditing ? 'Update the experience details below.' : 'Fill in the details to add a new experience.'}
                </SheetDescription>
              </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  name="position"
                  placeholder="Position"
                  value={form.position}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--border)',
                    color: 'var(--title)'
                  }}
                />
                <input
                  name="company"
                  placeholder="Company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--border)',
                    color: 'var(--title)'
                  }}
                />
                <input
                  name="period"
                  placeholder="Period (e.g., Jan 2023 - Present)"
                  value={form.period}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--border)',
                    color: 'var(--title)'
                  }}
                />
              </div>

              <div className="mb-4">
                <div className="flex gap-2 mb-2">
                  <input
                    placeholder="Add Description Bullet"
                    value={descriptionInput}
                    onChange={(e) => setDescriptionInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddDescription();
                      }
                    }}
                    className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
                    style={{
                      backgroundColor: 'var(--card-bg)',
                      borderColor: 'var(--border)',
                      color: 'var(--title)'
                    }}
                  />
                  <button
                    onClick={handleAddDescription}
                    className="px-4 py-3 rounded-lg font-medium transition-colors hover:opacity-90"
                    style={{ backgroundColor: 'var(--blue)', color: 'white' }}
                  >
                    Add
                  </button>
                </div>
                <ul className="list-disc list-inside space-y-1">
                  {form.description.map((d, i) => (
                    <li key={i} style={{ color: 'var(--subtitle)' }}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <div className="flex gap-2 mb-2">
                  <input
                    placeholder="Add Technology"
                    value={technologyInput}
                    onChange={(e) => setTechnologyInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTechnology();
                      }
                    }}
                    className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
                    style={{
                      backgroundColor: 'var(--card-bg)',
                      borderColor: 'var(--border)',
                      color: 'var(--title)'
                    }}
                  />
                  <button
                    onClick={handleAddTechnology}
                    className="px-4 py-3 rounded-lg font-medium transition-colors hover:opacity-90"
                    style={{ backgroundColor: 'var(--blue)', color: 'white' }}
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ backgroundColor: 'var(--blue)', color: 'var(--primaryBg)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <SheetFooter>
              <button
                onClick={handleSubmit}
                className="px-6 py-3 rounded-lg font-semibold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: 'var(--blue)' }}
              >
                {isEditing ? 'Update Experience' : 'Add Experience'}
              </button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-lg border shadow-lg hover:shadow-xl transition-all duration-300"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border)'
              }}
            >
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--title)' }}>
                {exp.position}
              </h3>
              <h4 className="text-lg font-semibold mb-1" style={{ color: 'var(--subtitle)' }}>
                {exp.company}
              </h4>
              <p className="text-sm mb-4 font-medium" style={{ color: 'var(--blue)' }}>
                {exp.period}
              </p>
              <ul className="list-disc list-inside space-y-1 mb-4">
                {exp.description.map((d, i) => (
                  <li key={i} className="text-sm" style={{ color: 'var(--subtitle)' }}>
                    {d}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mb-4">
                {exp.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: 'var(--blue)', color: 'var(--primaryBg)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="flex-1 px-4 py-2 rounded-md text-white font-medium transition-colors hover:opacity-90"
                  style={{ backgroundColor: 'var(--blue)' }}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setExperienceToDelete(exp.id!);
                    setDeleteDialogOpen(true);
                  }}
                  className="flex-1 px-4 py-2 rounded-md text-white font-medium transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#e63946' }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this experience? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition-colors"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
              onClick={() => {
                if (experienceToDelete) {
                  handleDelete(experienceToDelete);
                  setDeleteDialogOpen(false);
                  setExperienceToDelete(null);
                }
              }}
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </main>
  );
};

export default ExperienceDashboard;
