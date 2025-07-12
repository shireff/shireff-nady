"use client";
import AdminHeader from "@/(components)/AdminHeader";
import AdminSidebar from "@/(components)/AdminSidebar";
import { useState } from "react";
import "./Layout.css";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="admin-layout">
      <AdminSidebar collapsed={isCollapsed} />
      <div className={`main-area ${isCollapsed ? "collapsed" : ""}`}>
        <AdminHeader
          onToggleSidebar={() => setIsCollapsed(!isCollapsed)}
          collapsed={isCollapsed}
        />
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
