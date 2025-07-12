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
    <section className="experience-section">
      <h2 className="section-title">Experience Dashboard</h2>

      <div className="project-form">
        <input
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
          className="input"
        />
        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          className="input"
        />
        <input
          name="period"
          placeholder="Period (e.g., Jan 2023 - Present)"
          value={form.period}
          onChange={handleChange}
          className="input"
        />

        <div>
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
            className="input"
          />

          <button onClick={handleAddDescription}>Add</button>
          <ul>
            {form.description.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>

        <div>
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
            className="input"
          />

          <button onClick={handleAddTechnology}>Add</button>
          <div className="experience-technologies">
            {form.technologies.map((tech, i) => (
              <span key={i} className="technology-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <button onClick={handleSubmit} className="create-button mt-3">
          Add Experience
        </button>
      </div>

      <div className="experience-container">
        <AnimatePresence>
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="experience-card"
            >
              <h3 className="experience-position">{exp.position}</h3>
              <h4 className="experience-company">{exp.company}</h4>
              <p className="experience-period">{exp.period}</p>
              <ul className="experience-description">
                {exp.description.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
              <div className="experience-technologies">
                {exp.technologies.map((tech, i) => (
                  <span key={i} className="technology-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleDelete(exp.id!)}
                className="create-button mt-3"
              >
                Delete
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ExperienceDashboard;
