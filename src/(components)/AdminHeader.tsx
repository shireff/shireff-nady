import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./AdminHeader.css";

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  collapsed: boolean;
}

export default function AdminHeader({
  onToggleSidebar,
  collapsed,
}: AdminHeaderProps) {
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
      <button onClick={onToggleSidebar} className="collapse-btn">
        {collapsed ? "☰" : "×"}
      </button>

      <h1 className="admin-title">Admin Panel</h1>

      <div className="admin-controls">
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

        <span className="admin-email">{user?.email}</span>

        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </header>
  );
}
