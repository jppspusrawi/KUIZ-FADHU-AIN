# Panduan — Kuiz Fardhu Ain (Versi 3 Fail Berasingan)

## Apa yang berubah daripada versi sebelum ini
- **3 HTML berasingan**: `fekah.html`, `akidah.html`, `akhlak.html` — setiap satu boleh diakses/dikongsi secara berasingan (tak perlu pilih kategori dulu)
- **Susunan soalan diperbaiki**: setiap kuiz kini **15 Objektif (MCQ) + 5 Betul/Salah = 20 soalan**, dan soalan yang bertindih makna antara TF & MCQ telah dibuang
- Semua 3 fail kongsi **satu fail logik** `quiz-app.js` (senang diselenggara — kalau nak ubah reka bentuk/logik markah, cukup edit satu fail sahaja)

## Fail dalam pakej ini
| Fail | Fungsi |
|---|---|
| `fekah.html` | Laman kuiz Fekah (berdiri sendiri) |
| `akidah.html` | Laman kuiz Akidah (berdiri sendiri) |
| `akhlak.html` | Laman kuiz Akhlak (berdiri sendiri) |
| `quiz-app.js` | Logik dikongsi ketiga-tiga (markah, navigasi, hantar Google Sheets) |
| `questions_fekah_data.js` | Bank 20 soalan Fekah |
| `questions_akidah_data.js` | Bank 20 soalan Akidah |
| `questions_akhlak_data.js` | Bank 20 soalan Akhlak |
| `google-apps-script.gs` | Skrip sedia ada (sama seperti sebelum ini) |

## PENTING — Cara Muat Naik ke GitHub
Semua fail (`fekah.html`, `akidah.html`, `akhlak.html`, `quiz-app.js`, dan ketiga-tiga fail `questions_*.js`) **mesti berada dalam folder/repo yang SAMA** (root sama), kerana setiap HTML memanggil `quiz-app.js` dan fail data soalannya sendiri menggunakan laluan relatif.

1. Muat naik SEMUA 8 fail dalam pakej ini ke repo `KUIZ-FADHU-AIN` (ganti fail lama)
2. Tunggu GitHub Pages selesai deploy (semak tab Actions)
3. Pautan akan jadi:
   - `https://jppspusrawi.github.io/KUIZ-FADHU-AIN/fekah.html`
   - `https://jppspusrawi.github.io/KUIZ-FADHU-AIN/akidah.html`
   - `https://jppspusrawi.github.io/KUIZ-FADHU-AIN/akhlak.html`

## URL Google Sheets
URL Web App yang Ustaz gunakan sebelum ini **sudah dimasukkan terus** dalam `quiz-app.js` — tak perlu isi semula. Kalau Ustaz buat deployment baharu di Google Apps Script pada masa hadapan, cari baris ini dalam `quiz-app.js` dan gantikan URL:
```
const GOOGLE_SHEETS_WEBAPP_URL = "https://script.google.com/macros/s/.../exec";
```

## Susunan Soalan Kini
Setiap kuiz: **15 Objektif (MCQ) + 5 Betul/Salah**, tiada pertindihan makna antara soalan.

## Nota
Fail `index.html` (versi lama satu-laman-pilih-kategori) masih boleh disimpan jika Ustaz mahu — tapi tidak lagi diperlukan jika Ustaz guna 3 pautan berasingan ini. Boleh padam atau simpan sahaja di GitHub.
