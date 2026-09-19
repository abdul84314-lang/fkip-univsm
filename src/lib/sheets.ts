import Papa from 'papaparse';

// These IDs will be replaced by the user's actual Google Sheet IDs
// Format of CSV export URL:
// https://docs.google.com/spreadsheets/d/<SHEET_ID>/gviz/tq?tqx=out:csv&sheet=<SHEET_NAME>

export async function fetchSheetData(sheetId: string, sheetName: string) {
  // Now we use the GAS Web App for all data fetching to guarantee consistency!
  const url = `https://script.google.com/macros/s/AKfycbzRqEUkz65sPk-JqExn2qRjKnjlrSBgzqqPZh8ibkQNvSuvxD-UvrtcvUBnJTHjz0qAKg/exec?sheet=${encodeURIComponent(sheetName)}`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 30 } });
    
    if (!res.ok) {
      console.error(`Failed to fetch sheet ${sheetName}: ${res.statusText}`);
      return [];
    }

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error(`Error fetching sheet ${sheetName}:`, error);
    return [];
  }
}

export function parseGoogleDriveImage(url: string | undefined): string {
  if (!url) return "";
  
  // Convert standard Drive share links to direct image links
  // e.g. https://drive.google.com/file/d/1abc.../view -> https://drive.google.com/uc?export=view&id=1abc...
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  
  return url;
}
