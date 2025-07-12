"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./AdminHeader.css";

export default function AdminHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    const storedMode = localStorage.getItem("currentMode") ?? "dark";
    setMode(storedMode);
  }, []);

  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(mode);
    localStorage.setItem("currentMode", mode);
  }, [mode]);

  const handleLogout = () => {
    logout();
    router.push("/admin");
  };

  return (
    <header className="admin-header">
      <h1 className="admin-title">Admin Panel</h1>

      <div className="admin-controls">
        {/* Toggle theme */}
        <button
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          className="theme-toggle"
          title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
        >
          {mode === "dark" ? (
            <span className="icon-moon-o text-lg" />
          ) : (
            <span className="icon-sun text-lg" />
          )}
        </button>

        {/* Email */}
        <span className="admin-email">{user?.email}</span>

        {/* Logout */}
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </header>
  );
}
