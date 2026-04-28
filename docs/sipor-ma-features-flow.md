# 🚀 SIPOR-MA: Features & System Flow

**Internal Team Documentation - ANTI elePHPhant**

Dokumen ini menjelaskan alur kerja sistem **SIPOR-MA** dari sisi pengguna (mahasiswa) hingga ke dashboard admin, mengintegrasikan AI untuk validasi dan klasifikasi otomatis.

---

## 🛠️ Core Feature Flow

### Step 1: Scan & Inisialisasi (The "Sat-Set" Entry)

- **Scan QR Code:** Mahasiswa melakukan scan QR di pintu/dinding ruangan menggunakan kamera smartphone atau scanner di aplikasi.
- **Auto-Lookup:** Aplikasi menangkap `roomCode` dari URL parameter. Sistem melakukan query ke tabel `Room` untuk mengambil data `Nama Ruangan` dan `Gedung` secara otomatis.
- **Pre-filled Form:** Halaman laporan terbuka dengan lokasi yang sudah terisi. **User tidak perlu mengisi data lokasi secara manual atau memilih dropdown.**

### Step 2: Media & Description Input

- **Upload Foto:** Mahasiswa mengambil foto kerusakan secara langsung. Di sini **Uploadthing** mengunggah foto ke cloud dan mengembalikan sebuah `imageUrl`.
- **Deskripsi:** Mahasiswa mengetik penjelasan kerusakan (misal: "AC di Lab RPL 1 bunyinya berisik banget dan tidak dingin").

### Step 3: The "Brain" Process (AI Analysis)

Saat mahasiswa klik tombol "Kirim", aplikasi tidak langsung simpan ke database, tapi lewat "satpam" dulu::

- **Hit AI Endpoint:** Frontend mengirim `description` dan `imageUrl` ke `/api/analyze-report`.
- **Gemini + Zod Validation:**
  - AI men-scan foto (apakah beneran foto kerusakan atau cuma foto random/pornografi?).
  - AI menganalisis teks untuk menentukan kategori dan prioritas secara objektif.
- **The Result (JSON):** AI mengembalikan objek data terstruktur yang siap diproses oleh database.

### Step 4: Decision Point (Gatekeeping)

- **Case A (Laporan Tidak Valid):** Jika `isSafe: false`, aplikasi langsung stop. Munculkan pesan: "Maaf, laporan Anda terdeteksi tidak valid atau mengandung konten yang tidak pantas." (Laporan tidak masuk database).
- **Case B (Laporan Valid):** Jika `isSafe: true`, aplikasi lanjut ke tahap eksekusi.

### Step 5: Database Persistence (Prisma & Server Action)

- **Generate ID:** Sistem menjalankan fungsi untuk membuat `reportNumber` unik (misal: #SPM-2026-001).
- **Create Record:** Prisma menyimpan data ke MySQL menggunakan data dari hasil AI (`title` diambil dari `titleSuggestion` AI, `category` dan `priority` diisi otomatis dari hasil AI) dan sesi user (`userId`) diambil dari session login mahasiswa.
- **Initial Log:** Sistem otomatis membuat entri pertama di tabel `AuditLog` dengan status `PENDING`.

### Step 6: Real-time Notification (The "Final Touch")

- **Pusher Broadcast:** Sesaat setelah data tersimpan, sistem mengirim sinyal via **Pusher**.
- **Admin Alert:** Dashboard Admin menerima notifikasi _toast_ real-time tanpa perlu _refresh_ halaman untuk segera menindaklanjuti laporan.

---

## 🛡️ Flow 2: Anti-Duplicate Reporting (Pencegahan Spam)

Alur ini berjalan secara senyap di latar belakang saat mahasiswa baru saja melakukan scan QR atau membuka form pelaporan.

1. **Location Check:** Saat halaman form terbuka (berdasarkan `roomCode`), sistem melakukan _query_ cepat ke database.
2. **Validation:** Sistem mencari apakah ada laporan dengan `roomCode` yang sama dan statusnya masih `PENDING` atau `IN_PROGRESS`.
3. **Alert/Warning:** Jika ditemukan, UI akan menampilkan _modal atau alert_ peringatan (misal: _"Saat ini sedang ada perbaikan di ruangan ini"_). Ini mencegah mahasiswa membuat laporan berulang untuk kerusakan yang sama.

---

## 📡 Flow 3: Status Tracking & Email Notification (Update Progress)

Alur ini memastikan transparansi penuh kepada mahasiswa pelapor.

1. **Admin Action:** Admin Sarpras meninjau laporan di _dashboard_ dan menekan tombol "Verifikasi Laporan" dan "Tandai sedang Diproses" (Status berubah dari `PENDING` ke `IN_PROGRESS`). Admin juga bisa menambahkan catatan teknisi.
2. **Log Update:** Sistem menambahkan entri baru ke tabel `AuditLog`.
3. **Pusher Broadcast:** UI _tracker_ di _dashboard_ mahasiswa otomatis berubah warna/status secara _real-time_.
4. **Nodemailer Trigger:** Di saat yang sama, _backend_ memicu Nodemailer untuk mengirimkan email pemberitahuan ke email pelapor (misal: _"Halo, Laporan fasilitas Anda sedang dikerjakan oleh tim Sarpras"_).

---

## 💬 Flow 4: AI Chatbot Assistant (Pusat Bantuan 24/7)

Alur interaksi mahasiswa dengan asisten virtual di halaman Help Center.

1. **User Prompt:** Mahasiswa mengetik pertanyaan (misal: _"Berapa lama biasanya AC diperbaiki?"_).
2. **Contextual Engine:** Pesan dikirim ke `/api/chat` menggunakan `streamText`. Sistem menyisipkan _System Prompt_ (SOP Kampus dan data sesi mahasiswa) ke dalam _request_.
3. **AI Streaming:** Gemini memproses konteks dan mengetik jawaban secara langsung (huruf per huruf) di layar mahasiswa tanpa jeda _loading_ yang lama.
4. **Session Save:** Setelah percakapan selesai, riwayat obrolan (`Message`) disimpan ke tabel `ChatSession` agar konteks tidak hilang saat mahasiswa me-_refresh_ halaman.

---

## 👨‍💼 Flow 5: Admin Management & Shift Scheduling (Dapur Sarpras)

Alur kerja staf kampus (Admin) dalam mengelola tugas mereka.

1. **Shift Check:** Saat Admin _login_, sistem mengecek tabel `Shift` untuk memastikan apakah hari ini adalah jadwal piket mereka.
2. **Task Assignment:** Admin melihat daftar laporan baru (`PENDING`). Admin dapat mengambil alih (_assign_) laporan tersebut ke akun mereka (`adminId`).
3. **Log Management:** Admin memiliki akses untuk mengunggah `imageAfter` (foto bukti perbaikan selesai) dan mengubah status laporan menjadi `RESOLVED`.
4. **History Archiving:** Laporan yang sudah `RESOLVED` atau `REJECTED` akan dipindahkan ke arsip Log Riwayat Laporan untuk kebutuhan pelaporan rekapitulasi akhir bulan.
