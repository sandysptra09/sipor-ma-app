# 🗺️ SIPOR-MA: Project Planning & Tech Stack

**Internal Team Documentation - ANTI elePHPhant**

Dokumen ini berisi spesifikasi fitur dan teknologi final yang akan diimplementasikan pada proyek UAS SIPOR-MA.

---

## 🚀 Fitur Final SIPOR-MA

### **A. Core Functional (Dasar)**

- **Formulir Pelaporan Ringkas:** Formulir satu halaman yang didesain minimalis untuk mempercepat proses input data.
- **Modul Unggah Foto:** Fitur unggah gambar sebagai bukti valid kerusakan sarana di lapangan.
- **Real-time Status Tracker:** Pemantauan progres perbaikan secara transparan bagi pelapor.
- **Admin Management Dashboard:** Pusat kendali bagi staf Sarpras untuk mengelola log laporan secara efisien.
- **Email Notification:** Pengiriman pemberitahuan melalui email setiap ada perubahan status laporan.
- **Log Riwayat Laporan:** Fitur untuk melihat daftar dan sejarah seluruh laporan yang pernah dibuat.

### **B. Advanced & Smart Features (Inovasi AI)**

- **QR Code Integration:** Scan lokasi ruangan otomatis untuk mempercepat proses input.
- **AI Smart Categorization:** Klasifikasi kategori fasilitas secara otomatis menggunakan AI melalui foto bukti.
- **NSFW Image Validation:** Keamanan data melalui validasi gambar otomatis menggunakan AI guna mencegah penyalahgunaan sistem.
- **AI Chatbot Assistant:** Asisten pintar 24/7 di halaman Help Center untuk menjawab pertanyaan pengguna secara instan.
- **Anti-Duplicate Reporting:** Sistem deteksi laporan ganda di lokasi yang sama untuk meminimalisir redundansi data.
- **Sarpras Shift Scheduling:** Manajemen jadwal kerja tim Sarpras yang terintegrasi di dalam sistem.

---

## 🏗️ Tech Stack Final

| Layer           | Technology              | Purpose                            |
| :-------------- | :---------------------- | :--------------------------------- |
| **Framework**   | Next.js 15 (App Router) | Core Fullstack Framework           |
| **Language**    | TypeScript              | Type-safety & Scalability          |
| **Database**    | MySQL                   | Data Persistence                   |
| **ORM**         | Prisma                  | Database Mapping & Migrations      |
| **Auth**        | NextAuth.js (Auth.js)   | OAuth Google & Role-Based Access   |
| **State**       | Zustand                 | Global Client-side State           |
| **Real-time**   | **Pusher**              | **WebSocket for Live Updates**     |
| **Email**       | **Nodemailer**          | **Automatic Status Notifications** |
| **Storage**     | Uploadthing             | Cloud Image Hosting                |
| **Styling**     | Tailwind CSS            | Utility-first Styling              |
| **UI Comp**     | HeroUI & Shadcn/UI      | Component Library & Data Tables    |
| **AI Engine**   | Vercel AI SDK + Gemini  | Smart Logic & Bot                  |
| **HTTP Client** | Axios                   | External API Calls                 |

---
