# 🗄️ SIPOR-MA: Database Documentation

**Internal Team Documentation - ANTI elePHPhant**

Dokumen ini menjelaskan struktur data, skema Prisma, dan relasi antar tabel untuk sistem **SIPOR-MA**. Database menggunakan **MySQL** dengan **Prisma ORM** sebagai jembatan komunikasinya.

---

## 🏗️ Prisma Schema (Source of Truth)

```prisma
// 1. User & Auth
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  image         String?
  nim_nip       String?   @unique
  role          Role      @default(STUDENT)

  // Relations
  reports       Report[]      // Laporan yang dibuat mahasiswa
  assignments   Report[]      @relation("AdminAssignment") // Penugasan ke Admin
  shifts        Shift[]       // Jadwal piket Admin
  chatSessions  ChatSession[] // Riwayat chatbot

  createdAt     DateTime  @default(now())
}

enum Role {
  STUDENT
  ADMIN
}

// 2. Report: Jantung SIPOR-MA
model Report {
  id              String    @id @default(uuid())
  reportNumber    String    @unique // TAMBAHAN BARU: Buat nyimpen kode laporan kayak "#SPM-2026-001" -> fungsi khusus untuk generate
  title           String    // Nama fasilitas (e.g. Proyektor)
  description     String    @db.Text
  location        String    // Gedung/Lantai
  roomCode        String    // Mapping ke tabel Room (QR Code)
  category        String    // Diisi otomatis oleh AI Smart Categorization
  imageBefore     String    // URL Uploadthing
  imageAfter      String?   // Bukti perbaikan
  status          Status    @default(PENDING)
  priority        Priority  @default(MEDIUM)
  isVerified      Boolean   @default(false) // Hasil AI NSFW Validation

  // Relations
  userId          String
  user            User      @relation(fields: [userId], references: [id])

  adminId         String?
  admin           User?     @relation("AdminAssignment", fields: [adminId], references: [id])

  logs            AuditLog[] // Data untuk Real-time Tracker

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

enum Status {
  PENDING      // Laporan baru masuk
  VERIFIED     // Lolos filter AI/Admin
  IN_PROGRESS  // Sedang dalam perbaikan
  RESOLVED     // Selesai diperbaiki
  REJECTED     // Ditolak (Prank/NSFW/Data tidak valid)
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}

// 3. AuditLog: Timeline Perbaikan (Pusher Integration)
model AuditLog {
  id        String   @id @default(cuid())
  reportId  String
  report    Report   @relation(fields: [reportId], references: [id])
  status    String   // Status pada saat log dicatat
  note      String?  // Pesan/Catatan Admin (e.g. "Sparepart telah dipesan")
  createdAt DateTime @default(now())
}

// 4. Room: Master Data untuk QR Integration
model Room {
  id       String @id @default(cuid())
  code     String @unique // Kode unik yang tertanam di QR Code
  name     String // Nama Ruangan (e.g. Lab RPL 1)
  building String // Nama Gedung
}

// 5. Shift: Penjadwalan Admin Sarpras
model Shift {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  startTime DateTime
  endTime   DateTime
  day       String   // e.g. "Senin"
}

// 6. AI Chatbot History
model ChatSession {
  id        String    @id @default(cuid())
  userId    String
  user      User      @relation(fields: [userId], references: [id])
  messages  Message[]
  createdAt DateTime  @default(now())
}

model Message {
  id        String      @id @default(cuid())
  sessionId String
  session   ChatSession @relation(fields: [sessionId], references: [id])
  role      MessageRole // USER atau ASSISTANT
  content   String      @db.Text
  createdAt DateTime    @default(now())
}

enum MessageRole {
  USER
  ASSISTANT
}
```

## 🔗 Relasi Antar Tabel

Untuk menjaga integritas data, SIPOR-MA menerapkan beberapa tipe relasi database sebagai berikut:

### **1. One-to-Many (1:N)**

- **`User` ↔ `Report`**: Satu mahasiswa (`User`) dapat membuat banyak laporan kerusakan (`Report`). Namun, satu laporan hanya dimiliki oleh satu pelapor.
- **`User` ↔ `Report` (Admin Assignment)**: Satu Admin dapat menangani/ditugaskan ke banyak laporan.
- **`User` ↔ `Shift`**: Satu Admin memiliki banyak jadwal piket (`Shift`) dalam seminggu.
- **`User` ↔ `ChatSession`**: Satu pengguna dapat memulai banyak sesi percakapan dengan AI Chatbot.
- **`Report` ↔ `AuditLog`**: Satu laporan memiliki banyak catatan riwayat (`AuditLog`) yang mencatat setiap perubahan status dari awal sampai selesai.
- **`ChatSession` ↔ `Message`**: Satu sesi percakapan berisi banyak pesan (`Message`), baik dari pengguna maupun dari asisten AI.

### **2. Many-to-One (N:1)**

- **`Report` ↔ `User`**: Banyak laporan bisa merujuk ke satu pelapor yang sama.
- **`Message` ↔ `ChatSession`**: Banyak pesan tergabung dalam satu ID sesi yang sama agar konteks pembicaraan tidak hilang.

### **3. Logical Relation (Implicit)**

- **`Room` ↔ `Report`**: Menggunakan `roomCode`. Meskipun secara database berupa String, secara logika banyak laporan bisa terjadi di satu ruangan (`Room`) yang sama. Hal ini memudahkan proses filter laporan berdasarkan lokasi tanpa membebani performa join tabel yang berat.

## 📖 Penjelasan Tabel & Implementasi Fitur

### **1. Tabel `Report` & `AuditLog`**

Dua tabel ini bekerja sama untuk menciptakan transparansi proses sesuai dengan prinsip desain interaksi **SIPOR-MA**:

- **Anti-Duplicate Reporting:** Sebelum menyimpan data baru ke tabel `Report`, sistem akan melakukan validasi query: `where: { roomCode, status: { not: 'RESOLVED' } }`. Jika ditemukan laporan aktif di ruangan yang sama, user akan diberikan peringatan untuk menghindari penumpukan laporan yang redundan.
- **Real-time Status Tracker:** Setiap perubahan status yang dilakukan oleh Admin wajib memicu pembuatan entri baru di tabel `AuditLog`. Entri log ini yang akan di-_broadcast_ via **Pusher** agar dashboard mahasiswa terupdate secara otomatis (real-time) tanpa perlu melakukan _refresh_ halaman.

### **2. Tabel `Room` (QR Integration)**

Tabel ini berfungsi sebagai database referensi lokasi statis:

- **Auto-Fill Location:** Saat mahasiswa melakukan scan QR Code yang berisi `roomCode`, aplikasi akan melakukan _lookup_ ke tabel ini untuk mengambil data `name` dan `building`. Yang akan mendukung fitur pelaporan yang "Sat-Set" karena meminimalisir input manual dari pengguna.

### **3. Tabel `ChatSession` & `Message`**

Struktur ini digunakan untuk mengelola fitur **AI Chatbot Assistant** di halaman Help Center:

- **Persistent Context:** Dengan adanya `sessionId`, AI dapat mengingat konteks pertanyaan sebelumnya dalam satu sesi percakapan. Yang mana memungkinkan interaksi yang lebih natural dan cerdas.
- **Chat History:** Mahasiswa dapat melihat kembali riwayat bantuan atau instruksi yang diberikan oleh chatbot meskipun sesi browser telah berakhir atau halaman dimuat ulang.

### **4. Field Integritas AI (Kategorisasi & NSFW)**

Untuk menjaga kualitas dan integritas data, sistem memanfaatkan AI Engine (Gemini) yang hasilnya disimpan pada field berikut:

- **`category`**: String ini diisi secara otomatis oleh AI berdasarkan analisis visual foto bukti dan deskripsi teks yang diinput mahasiswa.
- **`isVerified`**: Merupakan flag keamanan utama. Secara _default_ bernilai `false`. Jika **AI NSFW Validation** menyatakan gambar aman (bukan pornografi/prank), status berubah menjadi `true`. Jika terdeteksi gambar tidak layak, status laporan akan otomatis dialihkan menjadi `REJECTED`.
