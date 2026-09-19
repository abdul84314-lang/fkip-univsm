"use server";

import { revalidatePath } from "next/cache";

const GAS_URL = "https://script.google.com/macros/s/AKfycbzRqEUkz65sPk-JqExn2qRjKnjlrSBgzqqPZh8ibkQNvSuvxD-UvrtcvUBnJTHjz0qAKg/exec";

export async function addRow(sheetName: string, formData: FormData) {
  const payload: any = {};
  formData.forEach((value, key) => {
    // We can exclude Next.js hidden fields if any, but GAS will just ignore unknown columns
    if (!key.startsWith("$ACTION")) {
      payload[key] = value;
    }
  });

  try {
    await fetch(`${GAS_URL}?action=create&sheet=${sheetName}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "text/plain;charset=utf-8" }
    });
    
    revalidatePath("/");
    revalidatePath(`/admin/${sheetName.toLowerCase()}`);
  } catch (error) {
    console.error("Failed to action:", error);
  }
}

export async function deleteRow(sheetName: string, rowIndex: number) {
  try {
    await fetch(`${GAS_URL}?action=delete&sheet=${sheetName}`, {
      method: "POST",
      body: JSON.stringify({ _rowIndex: rowIndex }),
      headers: { "Content-Type": "text/plain;charset=utf-8" }
    });
    
    revalidatePath("/");
    revalidatePath(`/admin/${sheetName.toLowerCase()}`);
    return { success: true };
  } catch (e) {
    console.error(`Failed to delete ${sheetName}:`, e);
    return { success: false };
  }
}

export async function editRow(sheetName: string, rowIndex: number, formData: FormData) {
  const payload: any = { _rowIndex: rowIndex };
  formData.forEach((value, key) => {
    if (!key.startsWith("$ACTION")) {
      payload[key] = value;
    }
  });

  try {
    await fetch(`${GAS_URL}?action=update&sheet=${sheetName}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "text/plain;charset=utf-8" }
    });
    
    revalidatePath("/");
    revalidatePath(`/admin/${sheetName.toLowerCase()}`);
  } catch (error) {
    console.error("Failed to edit action:", error);
  }
}
export async function uploadImageToDrive(base64Data: string, fileName: string, mimeType: string) {
  try {
    const formData = new FormData();
    formData.append('reqtype', 'fileupload');
    
    // Convert base64 to Blob
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: mimeType });
    
    formData.append('fileToUpload', blob, fileName || 'upload.jpg');

    const res = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: formData
    });
    
    const url = await res.text();
    if (url && url.startsWith('http')) {
      return { success: true, url: url };
    } else {
      return { success: false, error: "Gagal mengunggah ke server gambar Catbox: " + url };
    }
  } catch (error: any) {
    console.error("Failed to upload image:", error);
    return { success: false, error: error.toString() };
  }
}
