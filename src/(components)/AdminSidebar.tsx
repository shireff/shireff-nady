"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./AdminSidebar.css"; // custom sidebar CSS

const navItems = [
  { label: "Projects", href: "/admin/projects", icon: "📁" },
  { label: "Experience", href: "/admin/experience", icon: "💼" },
];

interface AdminSidebarProps {
  collapsed: boolean;
}

export default function AdminSidebar({ collapsed }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      <h2 className="sidebar-title">Admin Panel</h2>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-link ${pathname === item.href ? "active" : ""}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
