"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";

export default function KurikulumAccordion({ kurikulumData }: { kurikulumData: any[] }) {
  const [activeSemester, setActiveSemester] = useState<number | null>(1);

  return (
    <div className="space-y-4">
      {kurikulumData.map((semData) => {
        const sem = semData.semester;
        const isActive = activeSemester === sem;
        const mataKuliahList = semData.mataKuliah;
        const totalSKS = semData.totalSks;

        return (
          <div key={sem} className="border border-gray-200 rounded overflow-hidden shadow-sm">
            <button
              onClick={() => setActiveSemester(isActive ? null : sem)}
              className={`w-full flex justify-between items-center p-5 text-left font-bold transition-colors ${
                isActive ? "bg-[#0B315A] text-white" : "bg-white text-[#0B315A] hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <BookOpen className={`w-5 h-5 mr-3 ${isActive ? 'text-[#B48B36]' : 'text-[#0B315A]'}`} />
                <span>Semester {sem}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`text-sm ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>{totalSKS} SKS</span>
                {isActive ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>
            
            {isActive && (
              <div className="bg-white">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-3 text-left font-bold text-gray-700">Kode MK</th>
                        <th className="px-6 py-3 text-left font-bold text-gray-700">Nama Mata Kuliah</th>
                        <th className="px-6 py-3 text-center font-bold text-gray-700">SKS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {mataKuliahList.map((mk: any, idx: number) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-3 text-gray-600 font-mono text-xs">{mk.kode}</td>
                          <td className="px-6 py-3 text-gray-800 font-medium">{mk.nama}</td>
                          <td className="px-6 py-3 text-center text-[#0B315A] font-bold">{mk.sks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
