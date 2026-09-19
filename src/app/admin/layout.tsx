import React from "react";
import { GraduationCap, LogOut, BookOpen, FileText, Settings } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logoutAction } from "../login/actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_session");

  if (!isAdmin) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0B315A] text-white flex flex-col flex-shrink-0">
        <div className="p-6">
          <h2 className="text-2xl font-bold border-b border-white/20 pb-4">Admin CMS</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2 pb-4">
          <a href="/admin/dosen" className="flex items-center space-x-3 bg-white/10 p-3 rounded hover:bg-white/20 transition-colors">
            <GraduationCap className="w-5 h-5" />
            <span>Manajemen Dosen</span>
          </a>
          <a href="/admin/kurikulum" className="flex items-center space-x-3 bg-white/10 p-3 rounded hover:bg-white/20 transition-colors">
            <BookOpen className="w-5 h-5" />
            <span>Kurikulum (SKS)</span>
          </a>
          <a href="/admin/berita" className="flex items-center space-x-3 bg-white/10 p-3 rounded hover:bg-white/20 transition-colors">
            <FileText className="w-5 h-5" />
            <span>Berita & Pengumuman</span>
          </a>
          <a href="/admin/pengaturan" className="flex items-center space-x-3 bg-white/10 p-3 rounded hover:bg-white/20 transition-colors">
            <Settings className="w-5 h-5" />
            <span>Pengaturan Umum</span>
          </a>
          
          <div className="pt-4 mt-4 border-t border-white/20">
            <a href="/" className="flex items-center space-x-3 p-3 rounded hover:bg-white/10 transition-colors text-gray-300">
              <span>&larr; Ke Website Utama</span>
            </a>
          </div>
        </nav>
        <div className="p-4 border-t border-white/10">
          <form action={logoutAction}>
            <button type="submit" className="flex items-center space-x-2 text-red-300 hover:text-red-100 transition-colors w-full p-2">
              <LogOut className="w-4 h-4" />
              <span>Keluar (Logout)</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto min-w-0">
        {children}
      </main>
    </div>
  );
}
