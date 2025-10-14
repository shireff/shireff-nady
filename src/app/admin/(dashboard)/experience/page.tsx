  "use client";
import React, { useEffect, useState } from "react";
import { experienceAPI } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import "./Experiences.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
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
      const res = await experienceAPI.createExperience(payload);
      setExperiences((prev) => [...prev, res.data.data]);

      setForm({
        company: "",
        position: "",
        period: "",
        description: [],
        technologies: [],
      });
      setDescriptionInput("");
      setTechnologyInput("");
    } catch (err) {
      alert("Error submitting experience");
      console.error("Error submitting experience", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await experienceAPI.deleteExperience(id);
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    } catch (err) {
      alert("Delete failed");
      console.log("Error deleting experience", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center" style={{ color: 'var(--title)' }}>
        Experience Dashboard
      </h1>

      <div className="mb-8 p-6 rounded-lg border shadow-lg" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--title)' }}>
          Add New Experience
        </h2>

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

        <button
          onClick={handleSubmit}
          className="w-full md:w-auto px-6 py-3 rounded-lg font-semibold text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: 'var(--blue)' }}
        >
          Add Experience
        </button>
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
              <button
                onClick={() => handleDelete(exp.id!)}
                className="w-full px-4 py-2 rounded-md text-white font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: '#e63946' }}
              >
                Delete
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExperienceDashboard;
