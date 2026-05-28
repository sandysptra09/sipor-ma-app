# 🧠 SIPOR-MA: AI Logic & Prompt Engineering

**Internal Team Documentation - ANTI elePHPhant**

Dokumen ini mendefinisikan logika berpikir, instruksi prompt, dan alur integrasi AI (Gemini Model) di dalam sistem **SIPOR-MA** menggunakan **Vercel AI SDK**.

---

## 🤖 AI Engine Overview

- **Model:** Google Gemini 3.1 Flash-Lite (via Google AI SDK).
- **Integration:** Vercel AI SDK (`generateObject` & `streamText`).
- **Objective:** Automasi validasi, klasifikasi data, dan asisten bantuan cerdas.

---

## 🛠️ Logic 1: Smart Categorization & NSFW Validation

Logika ini dijalankan sesaat setelah mahasiswa mengunggah foto dan deskripsi di form pelaporan.

### **A. System Prompt (The Rules)**

AI diinstruksikan untuk bertindak sebagai **Facility Specialist & Safety Officer**.

> _"Tugas Anda adalah menganalisis foto dan deskripsi kerusakan fasilitas kampus. Berikan output dalam format JSON yang berisi kategori fasilitas dan status keamanan gambar (NSFW)."_

### **B. Output Structure (JSON)**

```typescript
{
  isSafe: boolean; // true jika bukan prank/pornografi
  category: string; // AC | Kelistrikan | Furniture & Interior | Sanitasi & Air | Infrastuktur Jalan
  reasoning: string; // Alasan singkat pemilihan kategori
  priority: string; // LOW | MEDIUM | HIGH (Opsional berdasarkan tingkat kerusakan)
}
```

### **C. Handling Logic**

- **IF `isSafe` == false:** Sistem otomatis membatalkan proses simpan laporan dan merubah status menjadi `REJECTED` dengan catatan sistem: "Konten tidak layak/NSFW".
- **IF `isSafe` == true:** Sistem mengisi field `category` dan `priority` secara otomatis berdasarkan saran AI, kemudian melanjutkan proses simpan data ke database MySQL.

---

## 💬 Logic 2: AI Chatbot Assistant (Help Center)

Menangani tanya-jawab mahasiswa terkait prosedur sarana prasarana kampus dan penggunaan aplikasi SIPOR-MA.

### **A. Knowledge Base Context**

AI dibekali data pendukung berupa:

- **SOP Sarpras:** Alur pelaporan, estimasi waktu perbaikan (1-3 hari kerja), dan jam operasional admin.
- **User Data:** Informasi nama user dan riwayat status laporan terakhir mereka yang ditarik dari database untuk memberikan jawaban yang personal.

### **B. Personality & Tone**

- **Nama:** "Sipor-Assistant".
- **Tone:** Ramah, informatif, dan "Sat-Set" (to-the-point).
- **Constraint:** Tidak diperbolehkan memberikan jawaban di luar topik fasilitas kampus. Jika mahasiswa bertanya hal umum/luar konteks, AI akan mengarahkan kembali secara sopan ke topik pelaporan.

---

## 🔍 Logic 3: Anti-Duplicate Semantic Check

_(Opsi Pengembangan)_ — AI mengecek kemiripan deskripsi jika terdapat dua laporan di dalam ruangan yang sama.

- **Logic:** Membandingkan deskripsi laporan baru dengan daftar laporan yang masih berstatus `PENDING` atau `IN_PROGRESS` pada `roomCode` yang sama.
- **Output:** Memberikan skor tingkat kemiripan (0-100%). Jika skor > 80%, sistem akan memberikan saran kepada user untuk memantau laporan yang sudah ada guna mengurangi spam laporan redundan.

---
