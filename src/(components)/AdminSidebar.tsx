"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./AdminSidebar.css"; // custom sidebar CSS

const navItems = [
  { label: "Projects", href: "/admin/projects" },
  { label: "Experience", href: "/admin/experience" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-link ${pathname === item.href ? "active" : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
