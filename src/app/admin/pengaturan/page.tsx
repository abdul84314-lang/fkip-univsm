import React from "react";
import PengaturanManager from "./PengaturanManager";

// Fetch data directly from GAS for server-side rendering
async function getPengaturanData() {
  const res = await fetch("https://script.google.com/macros/s/AKfycbzRqEUkz65sPk-JqExn2qRjKnjlrSBgzqqPZh8ibkQNvSuvxD-UvrtcvUBnJTHjz0qAKg/exec?sheet=Pengaturan", { cache: "no-store" });
  if (!res.ok) return [];
  try {
    const json = await res.json();
    return json.data || [];
  } catch (e) {
    return [];
  }
}

export default async function AdminPengaturanPage() {
  const settingsData = await getPengaturanData();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Pengaturan Umum</h1>
      <PengaturanManager initialData={settingsData} />
    </div>
  );
}
