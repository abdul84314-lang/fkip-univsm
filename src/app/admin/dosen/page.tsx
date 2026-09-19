import React from "react";
import DosenManager from "./DosenManager";

async function getDosenData() {
  const res = await fetch("https://script.google.com/macros/s/AKfycbzRqEUkz65sPk-JqExn2qRjKnjlrSBgzqqPZh8ibkQNvSuvxD-UvrtcvUBnJTHjz0qAKg/exec?sheet=Dosen", { cache: "no-store" });
  if (!res.ok) return [];
  try {
    const json = await res.json();
    return json.data || [];
  } catch (e) {
    return [];
  }
}

export default async function AdminDosenPage() {
  const dosenList = await getDosenData();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Manajemen Dosen</h1>
      <DosenManager initialData={dosenList} />
    </div>
  );
}
