/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { projectsAPI } from "@/lib/api";
import ImageUpload from "@/(components)/ImageUpload";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

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
  const [editId, setEditId] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!isAuthenticated && !isAdmin) {
      router.push("/admin");
    }
  }, [isAuthenticated, isAdmin, router]);

  useEffect(() => {
    if (uploadImageUrl) {
      setFormData((prev) => ({ ...prev, img: uploadImageUrl }));
    }
  }, [uploadImageUrl]);

  const fetchProjects = async () => {
    try {
      const res = await projectsAPI.getProjects();
      const normalized = res.data.data.map((item: any) => ({
        ...item,
        img: item.img?.replace("http://", "https://"),
      }));
      setProjects(normalized);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const clearForm = () => {
    setFormData({
      title: "",
      category: "",
      desc: "",
      demo: "",
      git: "",
      img: "",
    });
    setUploadImageUrl("");
    setImageUpload(null);
    setEditId(null);
  };

  const handleCreate = async () => {
    if (!formData.title || !formData.category || !formData.desc) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setIsCreating(true);
      const res = await projectsAPI.createProject(formData);
      setProjects((prev) => [...prev, res.data.data]);
      clearForm();
      setUploadImageUrl("");
      setImageUpload(null);
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

  const handleUpdate = async () => {
    if (!editId) return;

    try {
      setIsCreating(true);
      await projectsAPI.updateProject(editId, formData);
      fetchProjects();
      clearForm();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Update failed");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <main
      id="projects"
      className="min-h-screen p-4 md:p-8"
      style={{ backgroundColor: "var(--primaryBg)", color: "var(--title)" }}
    >
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
          style={{ color: "var(--title)" }}
        >
          Projects Dashboard
        </h1>

        <div
          className="mb-8 p-6 rounded-lg border shadow-lg"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border)",
          }}
        >
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--title)" }}
          >
            {editId ? "Edit Project" : "Add New Project"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border)",
                color: "var(--title)",
              }}
              value={formData.title}
              onChange={handleChange}
              required
            />

            <select
              name="category"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border)",
                color: "var(--title)",
              }}
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="ui">UI</option>
              <option value="React">React</option>
              <option value="next">Next.Js</option>
              <option value="node">Nodejs</option>
            </select>
          </div>

          <textarea
            name="desc"
            placeholder="Project Description"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors mb-4"
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--border)",
              color: "var(--title)",
              minHeight: "100px",
            }}
            value={formData.desc}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="url"
              name="demo"
              placeholder="Demo URL (optional)"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border)",
                color: "var(--title)",
              }}
              value={formData.demo}
              onChange={handleChange}
            />

            <input
              type="url"
              name="git"
              placeholder="GitHub Repo URL (optional)"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border)",
                color: "var(--title)",
              }}
              value={formData.git}
              onChange={handleChange}
            />
          </div>

          <ImageUpload
            imageLoading={imageLoading}
            setImageLoading={setImageLoading}
            imageUpload={imageUpload}
            setImageUpload={setImageUpload}
            uploadImageUrl={uploadImageUrl}
            setUploadImageUrl={setUploadImageUrl}
            isCustomStyle={true}
            isEditMode={!!editId}
          />

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              className="px-6 py-3 rounded-lg font-semibold text-white transition-colors hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: "var(--blue)" }}
              onClick={editId ? handleUpdate : handleCreate}
              disabled={isCreating}
            >
              {isCreating
                ? editId
                  ? "Updating..."
                  : "Creating..."
                : editId
                ? "Update Project"
                : "Create Project"}
            </button>

            {editId && (
              <button
                className="px-6 py-3 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                onClick={clearForm}
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {loading && (
          <p className="text-center py-8" style={{ color: "var(--subtitle)" }}>
            Loading...
          </p>
        )}
        {error && (
          <p
            className="text-center py-4 px-4 rounded-lg mb-4"
            style={{
              color: "#e63946",
              backgroundColor: "rgba(230, 57, 70, 0.1)",
            }}
          >
            {error}
          </p>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {projects.map((item: any, index: number) => (
              <motion.article
                layout
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: "spring", damping: 8, stiffness: 50 }}
                key={index}
                className="rounded-lg border overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--border)",
                }}
                whileHover={{ scale: 1.02 }}
              >
                {item.img ? (
                  <Image
                    src={item.img}
                    alt={item.title || "Project"}
                    width={400}
                    height={225}
                    priority={index < 4}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-48 flex items-center justify-center"
                    style={{ backgroundColor: "var(--card-hover-bg)" }}
                  >
                    <i
                      className="fas fa-image text-4xl"
                      style={{ color: "var(--subtitle)" }}
                    ></i>
                  </div>
                )}
                <div className="p-4">
                  <h1
                    className="text-lg font-semibold mb-2"
                    style={{ color: "var(--title)" }}
                  >
                    {item.title}
                  </h1>
                  <p
                    className="text-sm mb-4 line-clamp-3"
                    style={{ color: "var(--subtitle)" }}
                    title={item.desc.length > 150 ? item.desc : ""}
                  >
                    {item.desc.length > 150
                      ? `${item.desc.slice(0, 150)}...`
                      : item.desc}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      className="flex-1 px-4 py-2 rounded-md text-white font-medium transition-colors hover:opacity-90"
                      style={{ backgroundColor: "#e63946" }}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="flex-1 px-4 py-2 rounded-md text-white font-medium transition-colors hover:opacity-90"
                      style={{ backgroundColor: "#f1c40f" }}
                      onClick={() => {
                        setEditId(item.id);
                        setFormData({
                          title: item.title || "",
                          category: item.category || "",
                          desc: item.desc || "",
                          demo: item.demo || "",
                          git: item.git || "",
                          img: item.img || "",
                        });
                        setUploadImageUrl(item.img || "");
                        setImageUpload(null);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Edit
                    </button>
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
