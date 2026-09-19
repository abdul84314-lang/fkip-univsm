"use client";
import React, { useState, useTransition } from "react";
import { addRow, editRow, deleteRow } from "../actions";
import { Pencil, Trash2, Eye, X } from "lucide-react";

export default function KurikulumManager({ initialData }: { initialData: any[] }) {
  const [isPending, startTransition] = useTransition();
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [viewingRow, setViewingRow] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    Semester: "",
    Kode: "",
    Matakuliah: "",
    SKS: ""
  });

  const handleEdit = (item: any) => {
    setEditingRow(item._rowIndex);
    setFormData({
      Semester: item.Semester || item.semester || "",
      Kode: item.Kode || item.kode || "",
      Matakuliah: item.Matakuliah || item.MataKuliah || item.matakuliah || "",
      SKS: item.SKS || item.sks || ""
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setFormData({ Semester: "", Kode: "", Matakuliah: "", SKS: "" });
  };

  const handleDelete = (rowIndex: number, nama: string) => {
    if (confirm(`Yakin ingin menghapus Matakuliah ${nama}?`)) {
      startTransition(async () => {
        await deleteRow("Kurikulum", rowIndex);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value as string));

    startTransition(async () => {
      if (editingRow) {
        await editRow("Kurikulum", editingRow, data);
        setEditingRow(null);
      } else {
        await addRow("Kurikulum", data);
      }
      setFormData({ Semester: "", Kode: "", Matakuliah: "", SKS: "" });
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
      
      {/* Modal View */}
      {viewingRow && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button onClick={() => setViewingRow(null)} className="absolute top-4 right-4 text-gray-500 hover:text-black">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-4 border-b pb-2">Detail Matakuliah</h3>
            <div className="space-y-3 text-sm">
              <p><span className="font-semibold w-24 inline-block">Semester:</span> {viewingRow.Semester || viewingRow.semester}</p>
              <p><span className="font-semibold w-24 inline-block">Kode MK:</span> {viewingRow.Kode || viewingRow.kode}</p>
              <p><span className="font-semibold w-24 inline-block">Matakuliah:</span> {viewingRow.Matakuliah || viewingRow.MataKuliah || viewingRow.matakuliah}</p>
              <p><span className="font-semibold w-24 inline-block">SKS:</span> {viewingRow.SKS || viewingRow.sks}</p>
            </div>
            <button onClick={() => setViewingRow(null)} className="mt-6 w-full bg-gray-100 text-gray-800 py-2 rounded hover:bg-gray-200 font-bold">
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Form Area */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit sticky top-6">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">
          {editingRow ? "Edit Matakuliah" : "Tambah Matakuliah"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Semester</label>
            <input type="number" name="Semester" value={formData.Semester} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-[#0B315A]" placeholder="Contoh: 1" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Kode Matakuliah</label>
            <input type="text" name="Kode" value={formData.Kode} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-[#0B315A]" placeholder="Contoh: PGSD1101" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Matakuliah</label>
            <input type="text" name="Matakuliah" value={formData.Matakuliah} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-[#0B315A]" placeholder="Contoh: Konsep Dasar IPA SD" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Jumlah SKS</label>
            <input type="number" name="SKS" value={formData.SKS} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-[#0B315A]" placeholder="Contoh: 2" required />
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
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Daftar Kurikulum</h2>
        {initialData.length === 0 ? (
          <p className="text-gray-500 italic">Belum ada data kurikulum di database.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">Semester</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">Kode</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">Matakuliah</th>
                  <th className="px-4 py-3 text-center font-bold text-gray-700">SKS</th>
                  <th className="px-4 py-3 text-right font-bold text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {initialData.map((item, idx) => {
                  const semester = item.Semester || item.semester;
                  const kode = item.Kode || item.kode;
                  const mk = item.Matakuliah || item.MataKuliah || item.matakuliah;
                  const sks = item.SKS || item.sks;
                  
                  if (!kode && !mk) return null; // Skip empty rows

                  return (
                    <tr key={idx} className={isPending ? "opacity-50 hover:bg-gray-50" : "hover:bg-gray-50"}>
                      <td className="px-4 py-3 text-center font-bold text-[#0B315A]">{semester}</td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{kode}</td>
                      <td className="px-4 py-3 font-semibold">{mk}</td>
                      <td className="px-4 py-3 text-center font-bold">{sks}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => setViewingRow(item)} disabled={isPending} className="text-blue-600 hover:bg-blue-50 p-1 rounded transition-colors" title="Lihat">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleEdit(item)} disabled={isPending} className="text-yellow-600 hover:bg-yellow-50 p-1 rounded transition-colors" title="Edit">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(item._rowIndex, mk)} disabled={isPending} className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors" title="Hapus">
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
