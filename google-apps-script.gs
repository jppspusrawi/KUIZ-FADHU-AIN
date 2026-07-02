/**
 * SKRIP GOOGLE APPS SCRIPT — Kuiz Fardhu Ain Unit Shariah PUSRAWI
 * ------------------------------------------------------------------
 * CARA PASANG:
 * 1. Buka Google Sheet baharu (atau sedia ada) untuk simpan keputusan kuiz.
 * 2. Klik menu: Extensions > Apps Script
 * 3. Padam semua kod sedia ada, dan PASTE seluruh kod ini.
 * 4. Klik "Save" (ikon disket) dan namakan projek (cth: "Kuiz Fardhu Ain").
 * 5. Klik "Deploy" > "New deployment"
 *    - Klik ikon gear ⚙️ di sebelah "Select type" > pilih "Web app"
 *    - Description: Kuiz Fardhu Ain
 *    - Execute as: Me (akaun anda)
 *    - Who has access: Anyone
 *    - Klik "Deploy"
 * 6. Google akan minta kebenaran (Authorize access) — ikut langkah, pilih akaun anda,
 *    klik "Advanced" > "Go to [nama projek] (unsafe)" > "Allow"
 * 7. Selepas deploy berjaya, SALIN "Web app URL" yang diberikan
 *    (bentuknya: https://script.google.com/macros/s/XXXXXXXX/exec)
 * 8. Paste URL tersebut ke dalam fail app.js pada baris:
 *      const GOOGLE_SHEETS_WEBAPP_URL = "PASTE_GOOGLE_APPS_SCRIPT_URL_DI_SINI";
 *    Gantikan teks "PASTE_GOOGLE_APPS_SCRIPT_URL_DI_SINI" dengan URL sebenar.
 * ------------------------------------------------------------------
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Jika sheet kosong, tambah header dahulu
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Tarikh & Masa",
        "Nama",
        "Jabatan",
        "No. ID Pekerja",
        "Kategori Kuiz",
        "Markah (%)",
        "Jawapan Betul",
        "Jawapan Salah",
        "Jumlah Soalan",
        "Gred"
      ]);
    }

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.tarikh || new Date(),
      data.nama || "",
      data.jabatan || "",
      data.idPekerja || "",
      data.kategori || "",
      data.markah || "",
      data.betul || "",
      data.salah || "",
      data.jumlahSoalan || "",
      data.gred || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("Kuiz Fardhu Ain — Web App aktif. Sila gunakan borang kuiz untuk menghantar data.")
    .setMimeType(ContentService.MimeType.TEXT);
}
