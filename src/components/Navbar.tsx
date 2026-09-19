"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({ logoUrl }: { logoUrl?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img 
              src={logoUrl || "/logo-fkip-clean.png"} 
              alt="Logo FKIP" 
              className="h-[65px] w-auto object-contain drop-shadow-sm" 
            />
            <div className="hidden sm:block border-l-2 border-gray-300 pl-4">
              <h1 className="text-xl font-bold text-[#0B315A] tracking-tight leading-tight">Fakultas Keguruan dan Ilmu Pendidikan</h1>
              <p className="text-sm text-gray-600 font-medium">Universitas Sapta Mandiri</p>
            </div>
          </div>

          {/* Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#fakultas" className="text-gray-700 hover:text-[#0B315A] font-semibold text-sm transition-colors">Profil Fakultas</a>
            <a href="#sotk" className="text-gray-700 hover:text-[#0B315A] font-semibold text-sm transition-colors">SOTK</a>
            <a href="#pgsd" className="text-gray-700 hover:text-[#0B315A] font-semibold text-sm transition-colors">Prodi PGSD</a>
            <a href="#kurikulum" className="text-gray-700 hover:text-[#0B315A] font-semibold text-sm transition-colors">Kurikulum</a>
            <a href="#dosen" className="text-gray-700 hover:text-[#0B315A] font-semibold text-sm transition-colors">Dosen & Staff</a>
            <a href="#berita" className="text-gray-700 hover:text-[#0B315A] font-semibold text-sm transition-colors">Berita</a>
            <a href="#kontak" className="text-gray-700 hover:text-[#0B315A] font-semibold text-sm transition-colors">Kontak</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-[#0B315A] focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-100 pt-2">
            <a href="#fakultas" onClick={() => setIsMobileMenuOpen(false)} className="block px-2 py-2 text-gray-700 hover:bg-gray-50 font-semibold text-sm">Profil Fakultas</a>
            <a href="#sotk" onClick={() => setIsMobileMenuOpen(false)} className="block px-2 py-2 text-gray-700 hover:bg-gray-50 font-semibold text-sm">SOTK</a>
            <a href="#pgsd" onClick={() => setIsMobileMenuOpen(false)} className="block px-2 py-2 text-gray-700 hover:bg-gray-50 font-semibold text-sm">Prodi PGSD</a>
            <a href="#kurikulum" onClick={() => setIsMobileMenuOpen(false)} className="block px-2 py-2 text-gray-700 hover:bg-gray-50 font-semibold text-sm">Kurikulum</a>
            <a href="#dosen" onClick={() => setIsMobileMenuOpen(false)} className="block px-2 py-2 text-gray-700 hover:bg-gray-50 font-semibold text-sm">Dosen & Staff</a>
            <a href="#berita" onClick={() => setIsMobileMenuOpen(false)} className="block px-2 py-2 text-gray-700 hover:bg-gray-50 font-semibold text-sm">Berita</a>
            <a href="#kontak" onClick={() => setIsMobileMenuOpen(false)} className="block px-2 py-2 text-gray-700 hover:bg-gray-50 font-semibold text-sm">Kontak</a>
          </div>
        )}
      </div>
    </nav>
  );
}
