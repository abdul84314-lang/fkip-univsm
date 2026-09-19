import React from "react";
import KurikulumManager from "./KurikulumManager";

async function getKurikulumData() {
  const res = await fetch("https://script.google.com/macros/s/AKfycbzRqEUkz65sPk-JqExn2qRjKnjlrSBgzqqPZh8ibkQNvSuvxD-UvrtcvUBnJTHjz0qAKg/exec?sheet=Kurikulum", { cache: "no-store" });
  if (!res.ok) return [];
  try {
    const json = await res.json();
    return json.data || [];
  } catch (e) {
    return [];
  }
}

export default async function AdminKurikulumPage() {
  const kurikulumList = await getKurikulumData();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Manajemen Kurikulum PGSD</h1>
      <KurikulumManager initialData={kurikulumList} />
    </div>
  );
}
