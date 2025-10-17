"use client";
import AdminHeader from "@/(components)/AdminHeader";
import AdminSidebar from "@/(components)/AdminSidebar";
import { useEffect, useState } from "react";
import "./Layout.css";

// Import fonts
import { Poppins, Roboto } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});
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
    <div className={`admin-layout ${poppins.variable} ${roboto.variable}`}>
      <AdminSidebar
        collapsed={isCollapsed}
        sidebarVisible={sidebarVisible}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
        setSidebarVisible={setSidebarVisible}
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
