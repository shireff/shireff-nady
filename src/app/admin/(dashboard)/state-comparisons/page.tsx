/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ImageUpload from "@/(components)/ImageUpload";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Trash2 } from "lucide-react";
import axios from "axios";

interface StateComparison {
  id: string;
  title: string;
  category: string;
  description?: string;
  stateBefore: {
    label: string;
    image: string;
  };
  stateAfter: {
    label: string;
    image: string;
  };
  order: number;
  isActive: boolean;
}

const API_URL = "https://shireff-nady-server.vercel.app/api/state-comparisons";

export default function StateComparisonDashboard() {
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  const [comparisons, setComparisons] = useState<StateComparison[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "comparison",
    description: "",
    stateBefore: { label: "", image: "" },
    stateAfter: { label: "", image: "" },
    order: 0,
    isActive: true,
  });

  const [beforeImageFile, setBeforeImageFile] = useState<File | null>(null);
  const [afterImageFile, setAfterImageFile] = useState<File | null>(null);
  const [beforeImageUrl, setBeforeImageUrl] = useState("");
  const [afterImageUrl, setAfterImageUrl] = useState("");
  const [beforeImageLoading, setBeforeImageLoading] = useState(false);
  const [afterImageLoading, setAfterImageLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !isAdmin) {
      router.push("/admin");
    }
  }, [isAuthenticated, isAdmin, router]);

  useEffect(() => {
    fetchComparisons();
  }, []);

  useEffect(() => {
    if (beforeImageUrl) {
      setFormData((prev) => ({
        ...prev,
        stateBefore: { ...prev.stateBefore, image: beforeImageUrl },
      }));
    }
  }, [beforeImageUrl]);

  useEffect(() => {
    if (afterImageUrl) {
      setFormData((prev) => ({
        ...prev,
        stateAfter: { ...prev.stateAfter, image: afterImageUrl },
      }));
    }
  }, [afterImageUrl]);

  const fetchComparisons = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data.success) {
        setComparisons(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching comparisons:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (
      !formData.title ||
      !formData.stateBefore.label ||
      !formData.stateAfter.label
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (!beforeImageUrl || !afterImageUrl) {
      alert("Please upload both before and after images");
      return;
    }

    const payload = {
      ...formData,
      stateBefore: { ...formData.stateBefore, image: beforeImageUrl },
      stateAfter: { ...formData.stateAfter, image: afterImageUrl },
    };

    try {
      setIsCreating(true);
      const token = localStorage.getItem("token");

      if (editId) {
        await axios.put(`${API_URL}/${editId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(API_URL, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      fetchComparisons();
      clearForm();
    } catch (error: any) {
      alert(error?.response?.data?.message || "Operation failed");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComparisons((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const clearForm = () => {
    setFormData({
      title: "",
      category: "comparison",
      description: "",
      stateBefore: { label: "", image: "" },
      stateAfter: { label: "", image: "" },
      order: 0,
      isActive: true,
    });
    setBeforeImageUrl("");
    setAfterImageUrl("");
    setBeforeImageFile(null);
    setAfterImageFile(null);
    setEditId(null);
    setIsSheetOpen(false);
  };

  return (
    <main
      className="min-h-screen p-4 md:p-8"
      style={{ backgroundColor: "var(--primaryBg)", color: "var(--title)" }}
    >
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          style={{ color: "var(--title)" }}
        >
          State Comparisons Dashboard
        </h1>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <button
              className="px-6 py-3 mb-8 rounded-lg font-semibold text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "var(--blue)" }}
              onClick={() => setIsSheetOpen(true)}
            >
              Add New Comparison
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
              <SheetTitle style={{ color: "var(--title)" }}>
                {editId ? "Edit Comparison" : "Add New Comparison"}
              </SheetTitle>
              <SheetDescription style={{ color: "var(--subtitle)" }}>
                Create a state transformation showcase
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-4">
              {/* Title */}
              <input
                type="text"
                placeholder="Title *"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--border)",
                  color: "var(--title)",
                }}
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              {/* Category */}
              <select
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--border)",
                  color: "var(--title)",
                }}
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="comparison">Comparison</option>
                <option value="transformation">Transformation</option>
                <option value="evolution">Evolution</option>
                <option value="version">Version</option>
              </select>

              {/* Description */}
              <textarea
                placeholder="Description (optional)"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--border)",
                  color: "var(--title)",
                  minHeight: "100px",
                }}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              {/* Before State */}
              <div className="space-y-2">
                <h3 className="font-semibold">Before State *</h3>
                <input
                  type="text"
                  placeholder="Before Label (e.g., 'Initial', 'Version 1')"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border)",
                    color: "var(--title)",
                  }}
                  value={formData.stateBefore.label}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stateBefore: {
                        ...formData.stateBefore,
                        label: e.target.value,
                      },
                    })
                  }
                />
                <ImageUpload
                  imageUpload={beforeImageFile}
                  setImageUpload={setBeforeImageFile}
                  uploadImageUrl={beforeImageUrl}
                  setUploadImageUrl={setBeforeImageUrl}
                  imageLoading={beforeImageLoading}
                  setImageLoading={setBeforeImageLoading}
                  isCustomStyle={true}
                  isEditMode={false}
                />
              </div>

              {/* After State */}
              <div className="space-y-2">
                <h3 className="font-semibold">After State *</h3>
                <input
                  type="text"
                  placeholder="After Label (e.g., 'Final', 'Version 2')"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border)",
                    color: "var(--title)",
                  }}
                  value={formData.stateAfter.label}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stateAfter: {
                        ...formData.stateAfter,
                        label: e.target.value,
                      },
                    })
                  }
                />
                <ImageUpload
                  imageUpload={afterImageFile}
                  setImageUpload={setAfterImageFile}
                  uploadImageUrl={afterImageUrl}
                  setUploadImageUrl={setAfterImageUrl}
                  imageLoading={afterImageLoading}
                  setImageLoading={setAfterImageLoading}
                  isCustomStyle={true}
                  isEditMode={false}
                />
              </div>

              {/* Order */}
              <input
                type="number"
                placeholder="Display Order"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--border)",
                  color: "var(--title)",
                }}
                value={formData.order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    order: parseInt(e.target.value) || 0,
                  })
                }
              />

              {/* Active Toggle */}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                />
                <span>Active</span>
              </label>

              {/* Submit */}
              <button
                className="w-full px-6 py-3 rounded-lg font-semibold text-white transition-colors hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: "var(--blue)" }}
                onClick={handleSubmit}
                disabled={isCreating}
              >
                {isCreating
                  ? "Saving..."
                  : editId
                  ? "Update"
                  : "Create"}
              </button>
            </div>
          </SheetContent>
        </Sheet>

        {/* List */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {comparisons.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-lg border shadow-lg"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border)",
                  }}
                >
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p
                    className="text-sm mb-4"
                    style={{ color: "var(--subtitle)" }}
                  >
                    {item.category}
                  </p>

                  <div className="flex gap-2">
                    <button
                      className="flex-1 px-4 py-2 rounded-md text-white font-medium"
                      style={{ backgroundColor: "#f1c40f" }}
                      onClick={() => {
                        setEditId(item.id);
                        setFormData({
                          title: item.title,
                          category: item.category,
                          description: item.description || "",
                          stateBefore: item.stateBefore,
                          stateAfter: item.stateAfter,
                          order: item.order,
                          isActive: item.isActive,
                        });
                        setBeforeImageUrl(item.stateBefore.image);
                        setAfterImageUrl(item.stateAfter.image);
                        setIsSheetOpen(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="flex-1 px-4 py-2 rounded-md text-white font-medium"
                      style={{ backgroundColor: "#e63946" }}
                      onClick={() => {
                        setItemToDelete(item.id);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4 inline mr-2" />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Delete Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Confirm Deletion
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this comparison? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button
                className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                onClick={() => {
                  if (itemToDelete) {
                    handleDelete(itemToDelete);
                    setDeleteDialogOpen(false);
                    setItemToDelete(null);
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
}
