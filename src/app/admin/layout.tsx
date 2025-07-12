"use client";
import AdminHeader from "@/(components)/AdminHeader";
import AdminSidebar from "@/(components)/AdminSidebar";
import { useEffect, useState } from "react";
import "./Layout.css";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarVisible((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar
        collapsed={isCollapsed}
        sidebarVisible={sidebarVisible}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
      />
      <div className={`main-area ${isCollapsed ? "collapsed" : ""}`}>
        <AdminHeader
          onToggleSidebar={toggleSidebar}
          collapsed={isCollapsed}
          isMobile={isMobile}
          sidebarVisible={sidebarVisible}
        />
        <main
          className="main-content"
          onClick={() => isMobile && sidebarVisible && setSidebarVisible(false)}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
