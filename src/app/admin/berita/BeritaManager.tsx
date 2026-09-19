"use client";
import React, { useState, useTransition, useRef } from "react";
import { addRow, editRow, deleteRow, uploadImageToDrive } from "../actions";
import { Pencil, Trash2, Eye, X, UploadCloud, Link as LinkIcon } from "lucide-react";
import dynamic from 'next/dynamic';

const QuillEditor = dynamic(() => import('./QuillEditor'), { ssr: false });

export default function BeritaManager({ initialData }: { initialData: any[] }) {
  const [isPending, startTransition] = useTransition();
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [viewingRow, setViewingRow] = useState<any | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    Judul: "",
    Tanggal: "",
    Foto: "",
    Isi: ""
  });

  const handleEdit = (item: any) => {
    setEditingRow(item._rowIndex);
    setFormData({
      Judul: item.Judul || item.judul || "",
      Tanggal: item.Tanggal || item.tanggal || "",
      Foto: item.Foto || item.foto || "",
      Isi: item.Isi || item.isi || ""
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setFormData({ Judul: "", Tanggal: "", Foto: "", Isi: "" });
  };

  const handleDelete = (rowIndex: number, judul: string) => {
    if (confirm(`Yakin ingin menghapus Berita "${judul}"?`)) {
      startTransition(async () => {
        await deleteRow("Berita", rowIndex);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value as string));

    startTransition(async () => {
      if (editingRow) {
        await editRow("Berita", editingRow, data);
        setEditingRow(null);
      } else {
        await addRow("Berita", data);
      }
      setFormData({ Judul: "", Tanggal: "", Foto: "", Isi: "" });
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleQuillChange = (value: string) => {
    setFormData(prev => ({ ...prev, Isi: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (max 5MB to avoid GAS payload limits)
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran Foto terlalu besar. Maksimal 5MB.");
      return;
    }

    setUploadingImage(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Data = (reader.result as string).split(',')[1];
      
      try {
        const data = await uploadImageToDrive(base64Data, file.name, file.type);
        
        if (data.success && data.url) {
          setFormData(prev => ({ ...prev, Foto: data.url }));
        } else {
          alert("Gagal upload Foto: " + (data.error || "Unknown error"));
        }
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat mengunggah Foto. Pastikan Script GAS sudah di-deploy ulang dengan kode upload.");
      } finally {
        setUploadingImage(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
      
      {/* Modal View */}
      {viewingRow && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setViewingRow(null)} className="absolute top-4 right-4 text-gray-500 hover:text-black">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-2 pr-8">{viewingRow.Judul || viewingRow.judul}</h3>
            <p className="text-xs text-gray-500 mb-4">{viewingRow.Tanggal || viewingRow.tanggal}</p>
            
            {(viewingRow.Foto || viewingRow.Foto) && (
              <img 
                src={viewingRow.Foto || viewingRow.Foto} 
                alt="Foto Berita" 
                className="w-full h-48 object-cover rounded mb-4 border" 
              />
            )}
            
            {/* Render HTML Safely */}
            <div 
              className="space-y-3 text-sm text-gray-700 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: viewingRow.Isi || viewingRow.Isi }}
            />
            
            <button onClick={() => setViewingRow(null)} className="mt-6 w-full bg-gray-100 text-gray-800 py-2 rounded hover:bg-gray-200 font-bold">
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Form Area */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit lg:sticky lg:top-6">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">
          {editingRow ? "Edit Berita" : "Tambah Berita"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Berita</label>
            <input type="text" name="Judul" value={formData.Judul} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-[#0B315A]" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tanggal</label>
            <input type="date" name="Tanggal" value={formData.Tanggal} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-[#0B315A]" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Foto Utama</label>
            
            <div className="flex flex-col gap-2">
              {/* Manual URL Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  name="Foto" 
                  value={formData.Foto} 
                  onChange={handleChange} 
                  className="block w-full pl-9 rounded-md border-gray-300 shadow-sm border p-2 text-sm focus:ring-[#0B315A]" 
                  placeholder="Paste URL Google Drive di sini..." 
                />
              </div>

              <div className="relative flex items-center justify-center">
                <span className="bg-white px-2 text-xs text-gray-400">ATAU</span>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
              </div>

              {/* Upload Button */}
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="w-full flex justify-center items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 border border-gray-300 rounded text-sm font-medium transition-colors disabled:opacity-50"
              >
                <UploadCloud className="w-4 h-4" />
                {uploadingImage ? "Mengunggah ke Drive..." : "Upload Foto dari Komputer"}
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
            
            {formData.Foto && (
              <div className="mt-2 text-xs text-green-600 font-medium break-all">
                ✓ Foto terhubung
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Isi Berita</label>
            <div className="bg-white border rounded">
              <QuillEditor 
                value={formData.Isi} 
                onChange={handleQuillChange}
                className="h-48 mb-10"
              />
            </div>
          </div>
          
          <div className="pt-4 flex gap-2">
            <button type="submit" disabled={isPending || uploadingImage} className="flex-1 bg-[#0B315A] text-white py-2 px-4 rounded hover:bg-[#1a4b82] transition-colors font-bold disabled:opacity-50">
              {isPending ? "Menyimpan..." : (editingRow ? "Simpan Perubahan" : "Posting Berita")}
            </button>
            {editingRow && (
              <button type="button" onClick={handleCancelEdit} disabled={isPending} className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 font-bold transition-colors">
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabel Data Area */}
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Daftar Berita</h2>
        {initialData.length === 0 ? (
          <p className="text-gray-500 italic">Belum ada data berita di database. (Atau sheet 'Berita' belum dibuat)</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-gray-700 w-24">Tanggal</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">Judul</th>
                  <th className="px-4 py-3 text-right font-bold text-gray-700 w-24">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {initialData.map((item, idx) => {
                  const judul = item.Judul || item.judul;
                  const tgl = item.Tanggal || item.tanggal;
                  if (!judul) return null;

                  return (
                    <tr key={idx} className={isPending ? "opacity-50 hover:bg-gray-50" : "hover:bg-gray-50"}>
                      <td className="px-4 py-3 text-xs text-gray-500 align-top">{tgl}</td>
                      <td className="px-4 py-3 font-semibold text-[#0B315A] align-top">{judul}</td>
                      <td className="px-4 py-3 text-right align-top">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => setViewingRow(item)} disabled={isPending} className="text-blue-600 hover:bg-blue-50 p-1 rounded transition-colors" title="Lihat">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleEdit(item)} disabled={isPending} className="text-yellow-600 hover:bg-yellow-50 p-1 rounded transition-colors" title="Edit">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(item._rowIndex, judul)} disabled={isPending} className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors" title="Hapus">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
