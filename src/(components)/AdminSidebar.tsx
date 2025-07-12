"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./AdminSidebar.css";
import { useEffect } from "react";

const navItems = [
  { label: "Projects", href: "/admin/projects", icon: "📁" },
  { label: "Experience", href: "/admin/experience", icon: "💼" },
];

interface AdminSidebarProps {
  collapsed: boolean;
  sidebarVisible: boolean;
  isMobile: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdminSidebar({
  collapsed,
  isMobile,
  sidebarVisible,
  setIsMobile,
  setSidebarVisible,
}: AdminSidebarProps) {
  const pathname = usePathname();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // initialize on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarClass = `
    admin-sidebar 
    ${collapsed ? "collapsed" : ""} 
    ${isMobile && sidebarVisible ? "show" : isMobile ? "hide" : ""}
  `;

  return (
    <aside className={sidebarClass.trim()}>
      <h2 className="sidebar-title">Admin Panel</h2>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-link ${pathname === item.href ? "active" : ""}`}
            onClick={() => isMobile && setSidebarVisible(false)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
