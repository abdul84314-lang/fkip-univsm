"use client";
import React, { useState, useTransition } from "react";
import { addRow, editRow, deleteRow } from "../actions";
import { Pencil, Trash2, X } from "lucide-react";

export default function PengaturanManager({ initialData }: { initialData: any[] }) {
  const [isPending, startTransition] = useTransition();
  const [editingRow, setEditingRow] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    Kunci: "",
    Nilai: ""
  });

  const handleEdit = (item: any) => {
    setEditingRow(item._rowIndex);
    setFormData({
      Kunci: item.Kunci || item.kunci || "",
      Nilai: item.Nilai || item.nilai || ""
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setFormData({ Kunci: "", Nilai: "" });
  };

  const handleDelete = (rowIndex: number, kunci: string) => {
    if (confirm(`Yakin ingin menghapus pengaturan ${kunci}?`)) {
      startTransition(async () => {
        await deleteRow("Pengaturan", rowIndex);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value as string));

    startTransition(async () => {
      if (editingRow) {
        await editRow("Pengaturan", editingRow, data);
        setEditingRow(null);
      } else {
        await addRow("Pengaturan", data);
      }
      setFormData({ Kunci: "", Nilai: "" });
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Form Area */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit sticky top-6">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">
          {editingRow ? "Edit Pengaturan" : "Tambah Pengaturan"}
        </h2>
        
        {!editingRow && (
          <div className="mb-4 text-sm text-gray-600 bg-blue-50 p-4 rounded border border-blue-100">
            <p className="font-bold mb-2">Panduan Pengisian Kunci (Key):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-bold text-[#0B315A]">Logo</span>: Isi dengan URL gambar logo header</li>
              <li><span className="font-bold text-[#0B315A]">HeroText</span>: Teks besar di beranda</li>
              <li><span className="font-bold text-[#0B315A]">Sejarah</span>: Teks sejarah fakultas</li>
              <li><span className="font-bold text-[#0B315A]">Visi / Misi / VisiProdi</span>: Teks visi dan misi</li>
              <li><span className="font-bold text-[#0B315A]">Dekan / Wadek1 / Wadek2 / Kaprodi</span>: Nama lengkap Pimpinan</li>
              <li><span className="font-bold text-[#0B315A]">FotoDekan / FotoWadek1 / dsb</span>: Link Google Drive Foto</li>
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Kunci (Key)</label>
            <input type="text" name="Kunci" value={formData.Kunci} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-[#0B315A]" placeholder="Misal: Sejarah" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nilai (Value)</label>
            <textarea name="Nilai" value={formData.Nilai} onChange={handleChange} rows={5} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-[#0B315A]" placeholder="Masukkan teks atau URL di sini..." required></textarea>
          </div>
          
          <div className="pt-2 flex gap-2">
            <button type="submit" disabled={isPending} className="flex-1 bg-[#0B315A] text-white py-2 px-4 rounded hover:bg-[#1a4b82] transition-colors font-bold disabled:opacity-50">
              {isPending ? "Menyimpan..." : (editingRow ? "Simpan Perubahan" : "Simpan Data")}
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
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Daftar Pengaturan</h2>
        {initialData.length === 0 ? (
          <p className="text-gray-500 italic">Belum ada data pengaturan di database.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-gray-700 w-1/3">Kunci</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">Nilai</th>
                  <th className="px-4 py-3 text-right font-bold text-gray-700 w-24">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {initialData.map((item, idx) => {
                  const kunci = item.Kunci || item.kunci;
                  const nilai = item.Nilai || item.nilai;
                  if (!kunci) return null;

                  return (
                    <tr key={idx} className={isPending ? "opacity-50 hover:bg-gray-50" : "hover:bg-gray-50"}>
                      <td className="px-4 py-3 font-semibold text-[#0B315A] align-top">{kunci}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs">
                        <div className="max-h-24 overflow-y-auto pr-2">
                           {nilai.length > 150 ? nilai.substring(0, 150) + "..." : nilai}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right align-top">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleEdit(item)} disabled={isPending} className="text-yellow-600 hover:bg-yellow-50 p-1 rounded transition-colors" title="Edit">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(item._rowIndex, kunci)} disabled={isPending} className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors" title="Hapus">
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
