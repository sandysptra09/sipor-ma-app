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
  emailVerified DateTime? // Status verifikasi email (NextAuth)
  image         String?
  nim_nip       String?   @unique
  role          Role      @default(STUDENT)
  password      String?
  enrollmentYear Int?
  faculty        String?
  studyProgram   String?
  campusEmail    String?        @unique

  // Relations
  accounts      Account[]     // Relasi ke OAuth Provider (Google, dll)
  reports       Report[]      // Laporan yang dibuat mahasiswa
  assignments   Report[]      @relation("AdminAssignment") // Penugasan ke Admin
  shifts        Shift[]       // Jadwal piket Admin
  chatSessions  ChatSession[] // Riwayat chatbot
  notifications Notification[]// Notifikasi Real-time
  activityLogs   ActivityLog[] // Activity Log History

  createdAt     DateTime  @default(now())
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId], map: "Account_userId_fkey")
}

model PasswordResetToken {
  id        String   @id @default(cuid())
  email     String
  token     String   @unique
  expires   DateTime
  createdAt DateTime @default(now())

  @@unique([email, token])
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
  notifications   Notification[] // Notifikasi yang terkait dengan laporan ini

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  rejectionReason String?        @db.Text
  resolvedNote    String?        @db.Text

  @@index([adminId], map: "Report_adminId_fkey")
  @@index([userId], map: "Report_userId_fkey")
}

enum Status {
  PENDING      // Laporan baru masuk
  VERIFIED     // Lolos filter AI/Admin
  IN_PROGRESS  // Sedang dalam perbaikan
  RESOLVED     // Selesai diperbaiki
  REJECTED     // Ditolak (Prank/NSFW/Data tidak valid)
  CANCELED     // Dibatalkan
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

  @@index([reportId], map: "AuditLog_reportId_fkey")
}

model ActivityLog {
  id          String           @id @default(cuid())
  userId      String
  reportId    String?
  title       String
  description String?          @db.Text
  type        ActivityLog_type
  metadata    Json?
  createdAt   DateTime         @default(now())
  report      Report?          @relation(fields: [reportId], references: [id])
  user        User             @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([reportId])
  @@index([createdAt])
}

enum ActivityLog_type {
  REPORT_CREATED
  REPORT_UPDATED
  REPORT_IN_PROGRESS
  REPORT_VERIFIED
  REPORT_REJECTED
  REPORT_RESOLVED
  REPORT_CANCELED
  ROOM_UPDATED
  PROFILE_UPDATED
}

model Notification {
  id           String   @id @default(cuid())
  title        String
  message      String   @db.Text
  isRead       Boolean  @default(false)
  userId       String
  reportId     String?
  createdAt    DateTime @default(now())
  reportNumber String?

  report       Report?  @relation(fields: [reportId], references: [id], onDelete: Cascade)
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([reportId], map: "Notification_reportId_fkey")
  @@index([userId], map: "Notification_userId_fkey")
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
  id        String   @id @default(cuid())
  userId    String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  messages  Message[]

  @@index([userId], map: "ChatSession_userId_fkey")
}

model Message {
  id        String      @id @default(cuid())
  sessionId String
  session   ChatSession @relation(fields: [sessionId], references: [id])
  role      MessageRole // USER atau ASSISTANT
  content   String      @db.Text
  createdAt DateTime    @default(now())

  @@index([sessionId], map: "Message_sessionId_fkey")
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
- **`User` ↔ `Account`**: Satu pengguna dapat menautkan banyak metode login OAuth (Google, GitHub, dll).
- **`User` ↔ `Shift`**: Satu Admin memiliki banyak jadwal piket (`Shift`) dalam seminggu.
- **`User` ↔ `Notification`**: Satu pengguna memiliki banyak notifikasi masuk.
- **`User` ↔ `ChatSession`**: Satu pengguna dapat memulai banyak sesi percakapan dengan AI Chatbot.
- **`Report` ↔ `AuditLog`**: Satu laporan memiliki banyak catatan riwayat (`AuditLog`) yang mencatat setiap perubahan status dari awal sampai selesai.
- **`Report` ↔ `ActivityLog`**: Satu laporan dapat menjadi sumber dari banyak log aktivitas pelapor.
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

### **5. Tabel `Notification` (Real-Time Engine)**

Tabel ini adalah tulang punggung dari fitur notifikasi _real-time_ berbasis WebSockets:

- **State Persistence:** Menyimpan riwayat pemberitahuan di _database_. Jadi, kalau mahasiswa lagi _offline_ (tutup browser) saat status laporannya berubah, mereka tetep bisa melihat notifikasi tersebut di _dropdown_ lonceng saat login kembali.
- **Pusher Trigger:** Setiap kali ada data baru yang masuk ke tabel ini (via _helper_ `sendNotification`), sistem akan otomatis menembakkan _event_ ke **Pusher Channels** untuk memunculkan _pop-up toast_ dan _badge_ angka di layar _user_ target secara instan.

### **6. Tabel `Account` (NextAuth / OAuth Integration)**

Tabel khusus yang berkolaborasi dengan adapter Prisma dari Auth.js (NextAuth):

- **Seamless SSO (Single Sign-On):** Digunakan untuk mengelola sesi login dari pihak ketiga (misalnya **Google OAuth**). Tabel ini menyimpan `providerAccountId` dan _tokens_ dengan aman, memungkinkan _user_ untuk mengaitkan akun kampus/Google mereka tanpa mengganggu sistem otentikasi manual (_Credentials_).
