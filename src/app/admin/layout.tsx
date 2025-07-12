import AdminHeader from "@/(components)/AdminHeader";
import AdminSidebar from "@/(components)/AdminSidebar";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="main-area">
        <AdminHeader />
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
