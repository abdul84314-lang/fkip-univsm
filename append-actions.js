const fs = require('fs');
const content = `
export async function editRow(sheetName: string, rowIndex: number, formData: FormData) {
  const payload: any = { _rowIndex: rowIndex };
  formData.forEach((value, key) => {
    if (!key.startsWith("$ACTION")) {
      payload[key] = value;
    }
  });

  try {
    await fetch(\`\${GAS_URL}?action=update&sheet=\${sheetName}\`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "text/plain;charset=utf-8" }
    });
    
    revalidatePath("/");
    revalidatePath(\`/admin/\${sheetName.toLowerCase()}\`);
  } catch (error) {
    console.error("Failed to edit action:", error);
  }
}
`;
fs.appendFileSync('src/app/admin/actions.ts', content);
