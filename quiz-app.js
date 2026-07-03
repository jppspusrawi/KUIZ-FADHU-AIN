// ====== KONFIGURASI ======
// GANTI URL DI BAWAH DENGAN URL WEB APP GOOGLE APPS SCRIPT ANDA
const GOOGLE_SHEETS_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxi9UdLmfkgdjNUi_OuHrMIlWfpbGgKDTrLsaUg6lUTFZHWZABn8jbHGxuC2FYFY4c1MA/exec";

// ====== STATE ======
let state = {
  nama: "",
  jabatan: "",
  idPekerja: "",
  questions: QUIZ_QUESTIONS,
  currentIndex: 0,
  answers: {},
};

// ====== DOM REFS ======
const viewHome = document.getElementById('view-home');
const viewQuiz = document.getElementById('view-quiz');
const viewResult = document.getElementById('view-result');

const inpNama = document.getElementById('inp-nama');
const inpJabatan = document.getElementById('inp-jabatan');
const inpId = document.getElementById('inp-id');
const requiredNote = document.getElementById('required-note');
const btnStart = document.getElementById('btn-start');

const progressText = document.getElementById('progress-text');
const progressFill = document.getElementById('progress-fill');
const qTypeBadge = document.getElementById('q-type-badge');
const qText = document.getElementById('q-text');
const qOptions = document.getElementById('q-options');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnQuit = document.getElementById('btn-quit');

const modalQuit = document.getElementById('modal-quit');
const modalQuitConfirm = document.getElementById('modal-quit-confirm');
const modalQuitCancel = document.getElementById('modal-quit-cancel');

const resultGradeBadge = document.getElementById('result-grade-badge');
const resultScoreNum = document.getElementById('result-score-num');
const resultNameLine = document.getElementById('result-name-line');
const statCorrect = document.getElementById('stat-correct');
const statWrong = document.getElementById('stat-wrong');
const syncStatusBox = document.getElementById('sync-status-box');
const syncIcon = document.getElementById('sync-icon');
const syncText = document.getElementById('sync-text');
const btnReviewToggle = document.getElementById('btn-review-toggle');
const reviewList = document.getElementById('review-list');
const btnRestart = document.getElementById('btn-restart');

// ====== NAVIGATION HELPERS ======
function showView(view) {
  [viewHome, viewQuiz, viewResult].forEach(v => v.classList.add('hidden'));
  view.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ====== START QUIZ ======
btnStart.addEventListener('click', () => {
  const nama = inpNama.value.trim();
  const jabatan = inpJabatan.value.trim();
  const idPekerja = inpId.value.trim();

  if (!nama || !jabatan || !idPekerja) {
    requiredNote.style.display = 'block';
    requiredNote.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  requiredNote.style.display = 'none';

  state.nama = nama;
  state.jabatan = jabatan;
  state.idPekerja = idPekerja;
  state.currentIndex = 0;
  state.answers = {};

  renderQuestion();
  showView(viewQuiz);
});

// ====== QUIZ RENDERING ======
function renderQuestion() {
  const idx = state.currentIndex;
  const total = state.questions.length;
  const q = state.questions[idx];

  progressText.textContent = `Soalan ${idx + 1} / ${total}`;
  progressFill.style.width = `${((idx + 1) / total) * 100}%`;

  qTypeBadge.textContent = q.type === 'tf' ? 'BETUL / SALAH' : 'OBJEKTIF';
  qText.textContent = q.q;

  qOptions.innerHTML = '';

  let optionList = (q.type === 'tf') ? ['Betul', 'Salah'] : q.options;

  optionList.forEach((optLabel, optIdx) => {
    const div = document.createElement('div');
    div.className = 'option';

    let isSelected = false;
    if (q.type === 'tf') {
      const selectedBool = state.answers[idx];
      isSelected = (selectedBool === true && optIdx === 0) || (selectedBool === false && optIdx === 1);
    } else {
      isSelected = state.answers[idx] === optIdx;
    }
    if (isSelected) div.classList.add('selected');

    div.innerHTML = `<span class="option-mark">${isSelected ? '✓' : ''}</span><span>${optLabel}</span>`;
    div.addEventListener('click', () => {
      if (q.type === 'tf') {
        state.answers[idx] = (optIdx === 0);
      } else {
        state.answers[idx] = optIdx;
      }
      renderQuestion();
    });
    qOptions.appendChild(div);
  });

  btnPrev.disabled = (idx === 0);
  btnNext.textContent = (idx === total - 1) ? 'Hantar Kuiz ✓' : 'Seterusnya ›';
}

btnPrev.addEventListener('click', () => {
  if (state.currentIndex > 0) {
    state.currentIndex -= 1;
    renderQuestion();
  }
});

btnNext.addEventListener('click', () => {
  const total = state.questions.length;
  if (state.currentIndex < total - 1) {
    state.currentIndex += 1;
    renderQuestion();
  } else {
    submitQuiz();
  }
});

// ====== QUIT MODAL ======
btnQuit.addEventListener('click', () => {
  modalQuit.classList.remove('hidden');
});
modalQuitCancel.addEventListener('click', () => {
  modalQuit.classList.add('hidden');
});
modalQuitConfirm.addEventListener('click', () => {
  modalQuit.classList.add('hidden');
  resetToHome();
});

function resetToHome() {
  state.answers = {};
  state.currentIndex = 0;
  showView(viewHome);
}

// ====== SCORING ======
function calculateResults() {
  const total = state.questions.length;
  let correct = 0;
  const reviewData = [];

  state.questions.forEach((q, idx) => {
    const userAns = state.answers[idx];
    let isCorrect = false;
    let userAnsLabel = '(Tiada jawapan)';
    let correctAnsLabel = '';

    if (q.type === 'tf') {
      isCorrect = (userAns === q.answer);
      userAnsLabel = userAns === true ? 'Betul' : (userAns === false ? 'Salah' : '(Tiada jawapan)');
      correctAnsLabel = q.answer ? 'Betul' : 'Salah';
    } else {
      isCorrect = (userAns === q.answer);
      userAnsLabel = (userAns !== undefined) ? q.options[userAns] : '(Tiada jawapan)';
      correctAnsLabel = q.options[q.answer];
    }

    if (isCorrect) correct++;

    reviewData.push({ question: q.q, isCorrect, userAnsLabel, correctAnsLabel });
  });

  const wrong = total - correct;
  const percent = Math.round((correct / total) * 100);

  let grade = 'F';
  if (percent >= 80) grade = 'A';
  else if (percent >= 70) grade = 'B';
  else if (percent >= 60) grade = 'C';
  else grade = 'F';

  return { total, correct, wrong, percent, grade, reviewData };
}

// ====== SUBMIT ======
function submitQuiz() {
  const results = calculateResults();
  renderResults(results);
  showView(viewResult);
  sendToGoogleSheets(results);
}

function renderResults(results) {
  resultGradeBadge.textContent = results.grade === 'F' ? 'Gagal' : results.grade;
  resultGradeBadge.className = 'result-grade grade-' + results.grade;
  resultScoreNum.textContent = `${results.percent}% (${results.correct}/${results.total})`;
  resultNameLine.textContent = `${state.nama} · ${state.jabatan} · ${QUIZ_LABEL}`;
  statCorrect.textContent = results.correct;
  statWrong.textContent = results.wrong;

  reviewList.innerHTML = '';
  results.reviewData.forEach((r, i) => {
    const div = document.createElement('div');
    div.className = 'review-item';
    div.innerHTML = `
      <p class="review-q">${i + 1}. ${r.question}</p>
      <p class="review-ans ${r.isCorrect ? 'correct' : 'wrong'}">Jawapan Anda: ${r.userAnsLabel} ${r.isCorrect ? '✓' : '✗'}</p>
      ${!r.isCorrect ? `<p class="review-ans correct">Jawapan Betul: ${r.correctAnsLabel}</p>` : ''}
    `;
    reviewList.appendChild(div);
  });
  reviewList.classList.add('hidden');
  btnReviewToggle.textContent = 'Lihat Semakan Jawapan';
}

btnReviewToggle.addEventListener('click', () => {
  const isHidden = reviewList.classList.contains('hidden');
  reviewList.classList.toggle('hidden');
  btnReviewToggle.textContent = isHidden ? 'Sembunyikan Semakan Jawapan' : 'Lihat Semakan Jawapan';
});

btnRestart.addEventListener('click', () => {
  inpNama.value = '';
  inpJabatan.value = '';
  inpId.value = '';
  resetToHome();
});

// ====== GOOGLE SHEETS SYNC ======
function sendToGoogleSheets(results) {
  if (!GOOGLE_SHEETS_WEBAPP_URL || GOOGLE_SHEETS_WEBAPP_URL.indexOf('PASTE_') === 0) {
    setSyncStatus('error', '⚠️', 'URL Google Sheets belum ditetapkan. Sila hubungi Unit Shariah.');
    return;
  }

  const payload = {
    tarikh: new Date().toLocaleString('ms-MY', { timeZone: 'Asia/Kuala_Lumpur' }),
    nama: state.nama,
    jabatan: state.jabatan,
    idPekerja: state.idPekerja,
    kategori: QUIZ_LABEL,
    markah: results.percent,
    betul: results.correct,
    salah: results.wrong,
    jumlahSoalan: results.total,
    gred: results.grade === 'F' ? 'Gagal' : results.grade
  };

  setSyncStatus('', '⏳', 'Menghantar data ke sistem...');
  console.log('Menghantar payload ke Google Sheets:', payload);

  fetch(GOOGLE_SHEETS_WEBAPP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  })
  .then(res => res.text())
  .then(text => {
    console.log('Respons daripada Google Sheets:', text);
    let parsed;
    try { parsed = JSON.parse(text); } catch (e) { parsed = null; }

    if (parsed && parsed.status === 'success') {
      setSyncStatus('ok', '✅', 'Data berjaya disimpan ke sistem.');
    } else if (parsed && parsed.status === 'error') {
      console.error('Ralat dari Apps Script:', parsed.message);
      setSyncStatus('error', '⚠️', 'Gagal simpan: ' + parsed.message);
    } else {
      console.warn('Respons tidak dijangka, kemungkinan isu kebenaran (Who has access).');
      setSyncStatus('error', '⚠️', 'Gagal menghantar data. Sila semak tetapan "Who has access" pada deployment (perlu "Anyone").');
    }
  })
  .catch(err => {
    console.error('Sync error (fetch gagal / CORS):', err);
    setSyncStatus('error', '⚠️', 'Gagal menghantar data (ralat sambungan). Sila hubungi Unit Shariah.');
  });
}

function setSyncStatus(type, icon, text) {
  syncStatusBox.className = 'sync-status' + (type ? ' ' + type : '');
  syncIcon.textContent = icon;
  syncText.textContent = text;
}
