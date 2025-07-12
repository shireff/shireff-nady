/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useMemo, useState } from "react";
import "./Projects.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projectsAPI } from "@/lib/api";

interface Project {
  title: string;
  category: string;
  desc: string;
  img?: string;
  categ: string;
  demo?: string;
  git?: string;
}
export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectsAPI.getProjects();
        const normalized = res.data.data.map((item: any) => ({
          ...item,
          categ: item.category,
        }));
        setProjects(normalized);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return active === "all"
      ? projects
      : projects.filter((item) => item.categ === active);
  }, [active, projects]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <main id="projects" className="flex">
      {/* Filter Buttons */}
      <section className="pro-left flex">
        {["all", "ui", "React", "next", "node"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={active === cat ? "active" : undefined}
          >
            {cat === "all"
              ? "All Projects"
              : cat === "next"
              ? "Next.Js"
              : cat === "node"
              ? "NodeJs"
              : cat}
          </button>
        ))}
      </section>

      {/* Projects Grid */}
      <section className="pro-right flex">
        <AnimatePresence>
          {filteredProjects.map((item: Project, index: number) => (
            <motion.article
              layout
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", damping: 8, stiffness: 50 }}
              key={index}
              className="card"
              onClick={() => openModal(item)}
              style={{ cursor: "pointer" }}
            >
              {item.img ? (
                <Image
                  src={item.img}
                  alt={item.title || "Project"}
                  width={266}
                  height={150}
                  priority={index < 4}
                  style={{ borderRadius: "3px", objectFit: "cover" }}
                />
              ) : (
                <div className="placeholder">
                  <i
                    className="fas fa-image"
                    style={{ fontSize: "36px", color: "#888" }}
                  ></i>
                </div>
              )}
              <div className="box">
                <h1 className="title">{item.title}</h1>
                <p
                  className="subtitle"
                  title={item.desc.length > 215 ? item.desc : ""}
                >
                  {item.desc.length > 215
                    ? `${item.desc.slice(0, 215)}...`
                    : item.desc}
                </p>
                <div className="flex">
                  {item.demo ? (
                    <a
                      className="btn-4"
                      rel="noreferrer"
                      target="_blank"
                      href={item.demo}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Demo
                    </a>
                  ) : (
                    <p>No Demo</p>
                  )}
                  {item.git ? (
                    <a
                      className="btn-4"
                      rel="noreferrer"
                      target="_blank"
                      href={item.git}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Show Code
                    </a>
                  ) : (
                    <p>Private Repo</p>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{selectedProject.title}</h2>
              {selectedProject.img && (
                <Image
                  src={selectedProject.img}
                  alt={selectedProject.title}
                  width={400}
                  height={250}
                  style={{ borderRadius: "6px", objectFit: "cover" }}
                  priority
                />
              )}
              <p style={{ marginTop: "1rem" }}>{selectedProject.desc}</p>
              <div className="modal-links" style={{ marginTop: "1.5rem" }}>
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      marginRight: "1.5rem",
                      color: "#5dbcfc",
                      cursor: "pointer",
                    }}
                  >
                    Demo
                  </a>
                )}
                {selectedProject.git && (
                  <a
                    href={selectedProject.git}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#5dbcfc", cursor: "pointer" }}
                  >
                    Source Code
                  </a>
                )}
              </div>
              <button className="close-btn" onClick={closeModal}>
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
