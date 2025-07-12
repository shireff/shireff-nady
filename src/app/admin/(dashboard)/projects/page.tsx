/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { projectsAPI } from "@/lib/api";
import "./Dashboard.css";
import ImageUpload from "@/(components)/ImageUpload";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const Dashboard = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    desc: "",
    demo: "",
    git: "",
    img: "",
  });
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (uploadImageUrl) {
      setFormData((prev) => ({ ...prev, img: uploadImageUrl }));
    }
  }, [uploadImageUrl]);

  const fetchProjects = async () => {
    try {
      const res = await projectsAPI.getProjects();
      console.log("res.data", res.data.data);
      setProjects(res.data.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async () => {
    if (!formData.img) {
      alert("Please upload an image first.");
      return;
    }

    try {
      setIsCreating(true);
      const res = await projectsAPI.createProject(formData);
      setProjects((prev) => [...prev, res.data.data]);
      setFormData({
        title: "",
        category: "",
        desc: "",
        demo: "",
        git: "",
        img: "",
      });
    } catch (err: any) {
      alert(err?.response?.data?.message || "Create failed");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await projectsAPI.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err?.response?.data?.message || "Delete failed");
    }
  };

  //   const handleUpdate = async (id: string, updatedTitle: string) => {
  //     try {
  //       await projectsAPI.updateProject(id, { title: updatedTitle });
  //       fetchProjects();
  //     } catch (err: any) {
  //       alert(err?.response?.data?.message || "Update failed");
  //     }
  //   };

  return (
    <main id="projects" className="flex">
      <div className="dashboard">
        <h1 className="dashboard-title">Projects Dashboard</h1>

        <div className="project-form">
          <h2 className="form-title">Add New Project</h2>

          <input
            type="text"
            name="title"
            placeholder="Project Title"
            className="input"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            className="input"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="UI">UI</option>
            <option value="React">React</option>
            <option value="Next.Js">Next.Js</option>
            <option value="Nodejs">Nodejs</option>
          </select>

          <textarea
            name="desc"
            placeholder="Project Description"
            className="input"
            value={formData.desc}
            onChange={handleChange}
            required
          />

          <input
            type="url"
            name="demo"
            placeholder="Demo URL (optional)"
            className="input"
            value={formData.demo}
            onChange={handleChange}
          />

          <input
            type="url"
            name="git"
            placeholder="GitHub Repo URL (optional)"
            className="input"
            value={formData.git}
            onChange={handleChange}
          />

          <ImageUpload
            imageLoading={imageLoading}
            setImageLoading={setImageLoading}
            imageUpload={imageUpload}
            setImageUpload={setImageUpload}
            uploadImageUrl={uploadImageUrl}
            setUploadImageUrl={setUploadImageUrl}
            isCustomStyle={true}
          />

          <button
            className="create-button mt-3"
            onClick={handleCreate}
            disabled={isCreating}
          >
            {isCreating ? "Creating..." : "Create Project"}
          </button>
        </div>

        {loading && <p className="status-text">Loading...</p>}
        {error && <p className="error-text">{error}</p>}

        <section className="pro-right flex">
          <AnimatePresence>
            {projects.map((item: any, index: number) => (
              <motion.article
                layout
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: "spring", damping: 8, stiffness: 50 }}
                key={index}
                className="card"
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
                    <button
                      className="w-fit px-5 py-3 rounded-md bg-red-600"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                    {/* <button
                      className="w-full"
                      onClick={() => handleUpdate(item._id)}
                    >
                      Edit
                    </button> */}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
