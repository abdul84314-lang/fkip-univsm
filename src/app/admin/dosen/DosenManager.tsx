"use client";
import React, { useState, useTransition } from "react";
import { addRow, editRow, deleteRow } from "../actions";
import { Pencil, Trash2, Eye, X } from "lucide-react";

export default function DosenManager({ initialData }: { initialData: any[] }) {
  const [isPending, startTransition] = useTransition();
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [viewingRow, setViewingRow] = useState<any | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    No: "",
    Nama: "",
    NIDN: "",
    Pendidikan: "",
    Keterangan: ""
  });

  const handleEdit = (dosen: any) => {
    setEditingRow(dosen._rowIndex);
    setFormData({
      No: dosen.No || dosen.no || "",
      Nama: dosen.Nama || dosen.nama || "",
      NIDN: dosen.NIDN || dosen.nidn || dosen['NIDN/NUPTK'] || dosen['NUPTK'] || "",
      Pendidikan: dosen.Pendidikan || dosen.pendidikan || "",
      Keterangan: dosen.Keterangan || dosen.ket || dosen.Status || dosen.status || ""
    });
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setFormData({ No: "", Nama: "", NIDN: "", Pendidikan: "", Keterangan: "" });
  };

  const handleDelete = (rowIndex: number, nama: string) => {
    if (confirm(`Yakin ingin menghapus dosen ${nama}?`)) {
      startTransition(async () => {
        await deleteRow("Dosen", rowIndex);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value as string));

    startTransition(async () => {
      if (editingRow) {
        await editRow("Dosen", editingRow, data);
        setEditingRow(null);
      } else {
        await addRow("Dosen", data);
      }
      setFormData({ No: "", Nama: "", NIDN: "", Pendidikan: "", Keterangan: "" });
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
            <h3 className="text-xl font-bold mb-4 border-b pb-2">Detail Dosen</h3>
            <div className="space-y-3 text-sm">
              <p><span className="font-semibold w-24 inline-block">No. Urut:</span> {viewingRow.No || viewingRow.no}</p>
              <p><span className="font-semibold w-24 inline-block">Nama:</span> {viewingRow.Nama || viewingRow.nama}</p>
              <p><span className="font-semibold w-24 inline-block">NIDN:</span> {viewingRow.NIDN || viewingRow.nidn || viewingRow['NIDN/NUPTK'] || viewingRow.NUPTK || "-"}</p>
              <p><span className="font-semibold w-24 inline-block">Pendidikan:</span> {viewingRow.Pendidikan || viewingRow.pendidikan}</p>
              <p><span className="font-semibold w-24 inline-block">Jabatan:</span> {viewingRow.Keterangan || viewingRow.ket || viewingRow.Status || viewingRow.status}</p>
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
          {editingRow ? "Edit Data Dosen" : "Tambah Dosen Baru"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">No. Urut</label>
            <input type="number" name="No" value={formData.No} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-[#0B315A]" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Lengkap & Gelar</label>
            <input type="text" name="Nama" value={formData.Nama} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-[#0B315A]" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">NIDN / NUPTK</label>
            <input type="text" name="NIDN" value={formData.NIDN} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-[#0B315A]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pendidikan Terakhir</label>
            <input type="text" name="Pendidikan" value={formData.Pendidikan} onChange={handleChange} placeholder="S2 / S3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-[#0B315A]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Jabatan / Keterangan</label>
            <input type="text" name="Keterangan" value={formData.Keterangan} onChange={handleChange} placeholder="Dekan / Kaprodi / Dosen Homebase" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-[#0B315A]" />
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
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Daftar Dosen Saat Ini</h2>
        {initialData.length === 0 ? (
          <p className="text-gray-500 italic">Belum ada data dosen di database.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">No</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">Nama</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">NIDN</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">Jabatan</th>
                  <th className="px-4 py-3 text-right font-bold text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {initialData.map((dosen, idx) => {
                  const nidn = dosen.NIDN || dosen.nidn || dosen['NIDN/NUPTK'] || dosen.NUPTK || "-";
                  const nama = dosen.Nama || dosen.nama;
                  const ket = dosen.Keterangan || dosen.ket || dosen.Status || dosen.status;
                  
                  return (
                  <tr key={idx} className={isPending ? "opacity-50" : ""}>
                    <td className="px-4 py-3">{dosen.No || dosen.no}</td>
                    <td className="px-4 py-3 font-semibold">{nama}</td>
                    <td className="px-4 py-3 font-mono text-xs">{nidn}</td>
                    <td className="px-4 py-3">{ket}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setViewingRow(dosen)} disabled={isPending} className="text-blue-600 hover:bg-blue-50 p-1 rounded transition-colors" title="Lihat">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleEdit(dosen)} disabled={isPending} className="text-yellow-600 hover:bg-yellow-50 p-1 rounded transition-colors" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(dosen._rowIndex, nama)} disabled={isPending} className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors" title="Hapus">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
