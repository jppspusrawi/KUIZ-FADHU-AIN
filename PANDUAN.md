# Panduan Pasang — Kuiz Fardhu Ain Unit Shariah PUSRAWI

## Fail dalam pakej ini
- `index.html` — Laman web utama (borang + kuiz + keputusan)
- `app.js` — Logik sistem (markah, navigasi, hantar ke Google Sheets)
- `questions_data.js` — Bank soalan (20 soalan setiap kategori: Fekah, Akidah, Akhlak)
- `google-apps-script.gs` — Skrip untuk disalin ke Google Apps Script

## LANGKAH 1 — Sediakan Google Sheet
1. Buka Google Sheets, cipta Sheet baharu, namakan "Keputusan Kuiz Fardhu Ain".
2. Klik menu **Extensions > Apps Script**.
3. Padam kod sedia ada, **salin-tampal** seluruh kandungan fail `google-apps-script.gs`.
4. Save projek (nama cth: "Kuiz Fardhu Ain").
5. Klik **Deploy > New deployment**:
   - Klik ikon gear ⚙️ → pilih **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Klik **Deploy**
6. Google akan minta kebenaran — ikut langkah **Authorize access**, pilih akaun,
   klik **Advanced > Go to [nama projek] (unsafe) > Allow**.
7. Selepas deploy, **salin "Web app URL"** (contoh: `https://script.google.com/macros/s/xxxxx/exec`)

## LANGKAH 2 — Sambungkan Laman Web ke Google Sheets
1. Buka fail `app.js` dengan editor teks.
2. Cari baris paling atas:
   ```
   const GOOGLE_SHEETS_WEBAPP_URL = "PASTE_GOOGLE_APPS_SCRIPT_URL_DI_SINI";
   ```
3. Gantikan `PASTE_GOOGLE_APPS_SCRIPT_URL_DI_SINI` dengan URL yang disalin tadi.
4. Simpan fail.

## LANGKAH 3 — Letak Laman Web Online (pilih salah satu)
**Pilihan A — Google Sites / Hosting hospital sedia ada**
Muat naik ketiga-tiga fail (`index.html`, `app.js`, `questions_data.js`) ke pelayan/hosting.

**Pilihan B — Percuma & mudah (GitHub Pages / Netlify Drop)**
1. Pergi ke https://app.netlify.com/drop
2. Seret masuk folder yang mengandungi `index.html`, `app.js`, `questions_data.js`
3. Netlify akan berikan pautan awam terus (cth: `https://xxxx.netlify.app`)
4. Kongsikan pautan itu kepada semua staf.

## LANGKAH 4 — Uji sebelum guna sebenar
1. Buka laman web, isi Nama/Jabatan/No ID contoh.
2. Pilih mana-mana kuiz, jawab semua soalan, hantar.
3. Semak Google Sheet — rekod baharu patut muncul secara automatik.

## Struktur Data di Google Sheet
| Tarikh & Masa | Nama | Jabatan | No. ID | Kategori | Markah (%) | Betul | Salah | Jumlah Soalan | Gred |

## Nota Penting
- Setiap kuiz mempunyai **tepat 20 soalan tetap** (10 Betul/Salah + 10 Objektif),
  dibina berdasarkan slaid rasmi Unit Shariah (Fiqh Ibadat, Tauhid, Akhlak/Tasauf).
- Gred: **A (80%+), B (70–79%), C (60–69%), Gagal (<60%)**
- Untuk kemas kini/tambah soalan, edit fail `questions_data.js` — ikut format sedia ada.
