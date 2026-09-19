import React from "react";
import BeritaManager from "./BeritaManager";

async function getBeritaData() {
  const res = await fetch("https://script.google.com/macros/s/AKfycbzRqEUkz65sPk-JqExn2qRjKnjlrSBgzqqPZh8ibkQNvSuvxD-UvrtcvUBnJTHjz0qAKg/exec?sheet=Berita", { cache: "no-store" });
  if (!res.ok) return [];
  try {
    const json = await res.json();
    return json.data || [];
  } catch (e) {
    return [];
  }
}

export default async function AdminBeritaPage() {
  const beritaList = await getBeritaData();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Manajemen Berita & Artikel</h1>
      <BeritaManager initialData={beritaList} />
    </div>
  );
}
