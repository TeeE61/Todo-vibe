# 📝 Todo Vibe

> Minimal full-stack todo app — สร้างด้วย React 19 + Express + SQLite  
> Vibe: ขาว/ดำ/เทา, glassmorphism, dark mode, sub-tasks

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)
![SQLite](https://img.shields.io/badge/SQLite-better--sqlite3-003B57?logo=sqlite)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)

---

## ✨ Features

- **CRUD Todo** — สร้าง, แก้ไข (double-click), toggle สำเร็จ, ลบ
- **Sub-tasks** — แต่ละ todo มี sub-task ย่อยได้ไม่จำกัด พร้อม progress badge
- **Priority** — 3 ระดับ (🔴 High / 🟡 Medium / 🟢 Low) + filter ตาม priority
- **Sort** — เรียงตามวันที่สร้าง (🕐 Newest / 🕰️ Oldest)
- **Dark/Light Theme** — สลับได้ทันที, จำค่าใน localStorage, รองรับ system preference
- **Responsive** — Mobile first design
- **Glassmorphism UI** — card-glass + dot pattern background

---

## 🛠️ Tech Stack

**Frontend:** React 19 + Vite 6 + TypeScript 5  
**Styling:** TailwindCSS 4 (class-based dark mode)  
**State Management:** React Context API  
**Routing:** React Router v6  
**HTTP Client:** Axios  
**Backend:** Express 4  
**Database:** sqlite3

---

## 📁 Project Structure

```
todo-vibe/
├── server/                        # ── Backend ──
│   ├── index.ts                   # Express server + CORS + route registration
│   ├── db.ts                      # SQLite setup (WAL mode, auto-create tables)
│   └── routes/
│       ├── todos.ts               # REST API: GET/POST/PUT/DELETE /api/todos
│       └── subTodos.ts            # REST API: CRUD /api/todos/:id/sub-todos
│
├── src/                           # ── Frontend ──
│   ├── main.tsx                   # React entry point
│   ├── App.tsx                    # Providers (Theme → Router → Todo) + Routes
│   ├── index.css                  # TailwindCSS + custom styles (glass, dots)
│   │
│   ├── pages/
│   │   └── HomePage.tsx           # Main layout: header + theme toggle + card
│   │
│   ├── components/
│   │   ├── AddTodo.tsx            # Form สร้าง todo (expandable + priority)
│   │   ├── TodoItem.tsx           # Card แต่ละ todo (edit/toggle/delete/sub-tasks)
│   │   └── TodoList.tsx           # List + filter bar + sort + divider
│   │
│   ├── context/
│   │   ├── TodoContext.tsx        # State กลาง: todos + sub-todos + CRUD
│   │   └── ThemeContext.tsx       # Dark/Light theme + localStorage
│   │
│   ├── api/
│   │   └── todos.ts              # Axios functions ต่อ backend
│   │
│   └── types/
│       └── todo.ts               # TypeScript interfaces (Todo, SubTodo)
│
├── index.html                     # HTML entry point
├── vite.config.ts                 # Vite + TailwindCSS plugin
├── tsconfig.json                  # TypeScript config
├── package.json                   # Dependencies + scripts
└── AGENTS.md                      # AI Agent instructions + development log
```

### ทำไมโครงสร้างแบบนี้?

- **แยก `server/` ออกจาก `src/`** — Backend กับ Frontend เป็นอิสระ, deploy แยกได้
- **`context/`** — State อยู่ที่เดียว ไม่กระจาย, component ไหนก็เรียกใช้ผ่าน hook ได้
- **`api/`** — แยก HTTP logic ออกจาก UI, เปลี่ยน endpoint ที่เดียว
- **`types/`** — Share TypeScript interfaces ใช้ร่วมกันทุก layer
- **`components/` vs `pages/`** — แยก reusable components กับ page layout ชัดเจน

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (v8+)

### Installation

```bash
# Clone repository
git clone https://github.com/TeeE61/Todo-vibe.git
cd Todo-vibe

# Install dependencies
pnpm install
```

### Development

```bash
# Run ทั้ง frontend (port 5173) + backend (port 3001) พร้อมกัน
pnpm dev
```

เปิดเบราว์เซอร์ที่ [http://localhost:5173](http://localhost:5173)

### Build

```bash
pnpm build
```

---

## 🔌 API Endpoints

**Base URL:** `http://localhost:3001/api`

| Method   | Endpoint                          | Description                                           |
| -------- | --------------------------------- | ----------------------------------------------------- |
| `GET`    | `/todos`                          | ดึง todo ทั้งหมด                                      |
| `POST`   | `/todos`                          | สร้าง todo ใหม่ (title, description, priority)        |
| `PUT`    | `/todos/:id`                      | อัปเดต todo (title, description, priority, completed) |
| `DELETE` | `/todos/:id`                      | ลบ todo + sub-todos ทั้งหมด                           |
| `GET`    | `/todos/:todoId/sub-todos`        | ดึง sub-task ของ todo                                 |
| `POST`   | `/todos/:todoId/sub-todos`        | สร้าง sub-task (title)                                |
| `PUT`    | `/todos/:todoId/sub-todos/:subId` | อัปเดต sub-task                                       |
| `DELETE` | `/todos/:todoId/sub-todos/:subId` | ลบ sub-task                                           |

---

## 🗄️ Database Schema

```sql
-- Main todos
CREATE TABLE todos (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  priority    INTEGER NOT NULL DEFAULT 2,    -- 1=Low, 2=Medium, 3=High
  completed   INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Sub-tasks (nested under a todo)
CREATE TABLE sub_todos (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  todo_id     INTEGER NOT NULL,
  title       TEXT NOT NULL,
  completed   INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE
);
```

---

## 📜 Scripts

| Command           | Description                                 |
| ----------------- | ------------------------------------------- |
| `pnpm dev`        | รัน client + server พร้อมกัน (concurrently) |
| `pnpm dev:client` | รัน Vite dev server เท่านั้น                |
| `pnpm dev:server` | รัน Express server เท่านั้น (tsx watch)     |
| `pnpm build`      | Build production (TypeScript + Vite)        |
| `pnpm preview`    | Preview production build                    |

---

## 🤖 Built with AI Agentic

โปรเจกต์นี้พัฒนาด้วย AI Agent (GitHub Copilot) โดยใช้ไฟล์ [AGENTS.md](AGENTS.md) เป็นคู่มือสั่งงาน — กำหนด role, กฎเหล็ก, tech stack, และบันทึก development log ทุกรอบ
