# 🚀 SIPOR-MA (Sistem Pelaporan Kerusakan Fasilitas)

**SIPOR-MA** is a modern reporting platform designed to speed up and streamline the maintenance of campus facilities and infrastructure. Combining a streamlined user interface with artificial intelligence, this system automates workflows from the reporter (students) all the way to the staff management dashboard (Admin).

SIPOR-MA doesn’t just record reports; it also acts as a smart “gatekeeper” that ensures all incoming data is valid, secure, and on target, thanks to AI integration.

---

## ✨ Key Features & Innovations

### A. Advanced & Smart Features (AI Powered)

- **QR Code Integration & Auto-Lookup:** Users can scan the QR code in the room to automatically fill in their location data without having to select an option manually.
- **AI-Powered Smart Categorization:** Images and report descriptions are analyzed by AI (Gemini) to objectively determine the damage category and priority level.
- **NSFW Image Validation:** The automated AI system blocks inappropriate (NSFW) image uploads to prevent system abuse.
- **24/7 AI Chatbot Assistant:** Equipped with "Sipor-Assistant," an intelligent virtual assistant that understands campus SOPs to help answer users' questions at any time.
- **Anti-Duplicate Reporting:** A system for detecting duplicate reports at the same location to minimize data redundancy.

### B. Core Functional

- **Real-time Status Tracker:** Transparent monitoring of repair progress for reporters using WebSocket push notifications.
- **Automated Email Alerts:** Send email notifications whenever there is a change in a report's status using Nodemailer.
- **Comprehensive Admin Dashboard:** A control center for facilities and equipment staff to manage tasks, update report statuses, and synchronize work shift schedules.

---

## 🏗️ The Tech Stack

This system was built using a modern _full-stack_ ecosystem that focuses on scalability and security.

| Layer                | Technology                      | Purpose                          |
| :------------------- | :------------------------------ | :------------------------------- |
| **Framework**        | Next.js 15 (App Router)         | Core Fullstack Framework         |
| **Language**         | TypeScript                      | Type-safety & Scalability        |
| **Database & ORM**   | MySQL & Prisma                  | Data Persistence & Migrations    |
| **Authentication**   | NextAuth.js (Auth.js)           | OAuth Google & Role-Based Access |
| **State Management** | Zustand                         | Global Client-side State         |
| **Real-time**        | Pusher                          | WebSocket for Live Updates       |
| **Email**            | Nodemailer                      | Automatic Status Notifications   |
| **Storage**          | Uploadthing                     | Cloud Image Hosting              |
| **UI & Styling**     | Tailwind CSS, HeroUI, Shadcn/UI | Styling & Component Library      |
| **AI Engine**        | Vercel AI SDK + Gemini          | Smart Logic & Chatbot Bot        |

---

## 🧠 System Flow & AI Logic

### The "Sat-Set" (Seamless) Reporting Flow

1. **Scan QR:** Students scan the QR Code in the room; the system automatically retrieves the `roomCode` and performs an _auto-lookup_ for the building location.
2. **Input Data:** Students upload photo evidence via Uploadthing and provide a description of the issue.
3. **AI Gatekeeping:** Vercel AI SDK sends the data to the **Google Gemini 3.1 Flash-Lite** model to perform _Smart Categorization_ and _NSFW Validation_.
4. **Validation Check:**
   - If the content is inappropriate (`isSafe: false`), the report is instantly rejected.
   - If the content is valid (`isSafe: true`), the system saves the data to MySQL using Prisma.
5. **Real-time Broadcast:** Once the data is successfully saved, the system triggers _Pusher_ to update the Admin dashboard in _real-time_ without requiring a page _refresh_.

---

## 🗄️ Database Architecture

The SIPOR-MA database is designed to handle relational data integrity and detailed historical logging using Prisma ORM.

**Core Models:**

- **`User` & `Account`:** Manages authentication (Credentials & OAuth) alongside user roles (`STUDENT` and `ADMIN`).
- **`Report`:** The heart of the system that stores reporting details, image evidence, and AI validation status.
- **`AuditLog` & `ActivityLog`:** Records the entire journey of a report (Audit) and tracks general activities from the user's perspective (Activity) to ensure complete system transparency.
- **`Room` & `Shift`:** Master data for QR scan integration and admin shift scheduling.
- **`ChatSession` & `Message`:** Manages the conversation history of the intelligent virtual assistant.

---

## 💻 Getting Started

### Prerequisites

Make sure you have installed the following environments:

- Node.js (v24.15.0 or later)
- MySQL Server (Running locally or in the _cloud_)

### Installation

1. **Clone the repository**

```bash
  git clone https://github.com/sandysptra09/sipor-ma-app.git
  cd sipor-ma
```

2. **Install dependencies**

```bash
  npm install
```

3. **Environment Variable Configuration**
   Create a `.env` file in the _root_ folder and configure the variables based on `.env.example` (Database URL, Google OAuth, Pusher, Uploadthing, Gemini API Key, etc.).

4. **Setup Database**
   Run the Prisma migration to create the MySQL schema:

```bash
  npx prisma generate
  npx prisma db push
```

5. **Run Development Server**

```bash
  npm run dev
```

The app can be accessed at `http://localhost:3000`.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
_(Note: You are free to use, modify, and distribute this software, but please provide attribution)._

---

<br />
<p align="center">
  <b>Built with ❤️ by the ANTI elePHPhant Team &copy; 2026</b><br/>
  <i>"Empowering campus facilities with smart technology."</i>
</p>
