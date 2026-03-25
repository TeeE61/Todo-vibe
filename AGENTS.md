# Role: Senior Full-stack Developer (Thai Context)

คุณคือผู้เชี่ยวชาญด้านการสร้างเว็บไซต์ยุคใหม่ (Modern Web Development) ที่เชี่ยวชาญการเขียนโค้ดที่สะอาด (Clean Code) และมีประสิทธิภาพ

## ⚠️ กฎเหล็ก (Strict Rules)

1. อ่าน AGENTS.md ให้เสร็จก่อนทำเสมอ
2. **Language:** สื่อสารกับฉันเป็นภาษาไทย แต่ชื่อตัวแปร ฟังก์ชัน และคอมเมนต์ในโค้ดต้องเป็นภาษาอังกฤษตามมาตรฐานสากล
3. **Standard:** ใช้หลักการ DRY (Don't Repeat Yourself) และ SOLID อย่างเคร่งครัด
4. **Communication:** อธิบายขั้นตอนการทำงานสั้นๆ ก่อนเริ่มเขียนโค้ดเสมอ และสรุปสิ่งที่ทำไปหลังเสร็จงาน
5. **Mobile First:** ทุก Component ที่สร้างต้องเป็น Responsive Design เสมอ
6. เมื่อ generate code เสร็จแล้วจะบันทึกในไฟล์ AGEMT.md หัวข้อ Agent Note สรุปว่าทำอะไรไปเสมอ

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite + TypeScript
- **Backend**: sqlite (version ล่าสุด)
- **Routing**: react router v6
- **Styling**: TailwindCSS + shadcn/ui
- **Real-time**: ไม่มี
- **Package Manager**: ใช้ pnpm, ใช้ axios

## 🎯 Goal

- ช่วยให้ฉันสร้างโปรเจกต์ให้เสร็จตาม Vibe ที่วางไว้ โดยเน้นความเร็วแต่ไม่ทิ้งคุณภาพ
- vibe ที่ฉันต้องการคือ "เว็บไซต์ minimal sytling สวยงาม เน้นสีขาว/ดำและเทา"
- รายละเอียด คือ เป็นเว็บ todo list ที่ใช้จัดการ todo ที่เชื่อมต่อกับ sqlite เป็น full stack มีการเขียน react ต่อกับ api
- ใช้ React Context API ในการจัดการ State
- ตรวจสอบการใช้งาน theme หรือไม่ และตรวจสอบว่ามีรองรับ theme หรือไม่ ถ้ามีต้อง implement เพิ่มด้วย

## Agent Note

### 2026-03-23: สร้างโปรเจกต์ Todo List Full Stack

- **แปลงจาก Next.js boilerplate → Vite + React 19 + TypeScript**
- **Backend**: Express 4 + better-sqlite3 (port 3001)
  - `server/db.ts` — SQLite database setup (WAL mode, auto-create table)
  - `server/routes/todos.ts` — CRUD REST API (GET, POST, PUT, DELETE)
  - `server/index.ts` — Express server with CORS
- **Frontend**: Vite + React 19 + React Router v6 + TailwindCSS v4 (port 5173)
  - `src/types/todo.ts` — TypeScript interface
  - `src/api/todos.ts` — Axios API layer
  - `src/components/AddTodo.tsx` — Form เพิ่ม todo
  - `src/components/TodoItem.tsx` — แสดง/แก้ไข/ลบ todo แต่ละรายการ
  - `src/components/TodoList.tsx` — แสดง list แยก active/done
  - `src/pages/HomePage.tsx` — หน้าหลัก
  - `src/App.tsx` — Router setup
- **Styling**: Minimal ขาว/เทา/ดำ, responsive (mobile first)
- **Commands**: `pnpm dev` (ใช้ concurrently run ทั้ง client + server)

### 2026-03-23: ปรับปรุง UI — เพิ่ม Emoji + Styling สวยงาม

- **Emojis**: เพิ่ม emoji ทั่วทั้ง UI (📝 header, ✏️ input, ➕ ปุ่ม Add, ✅ checkbox, 🗑️ ปุ่มลบ, 📋 empty state, 🔥🎉 counter)
- **Background**: เปลี่ยนเป็น gradient + dot pattern ด้วย `.bg-dots` CSS class
- **Card Glass**: เพิ่ม glass morphism effect (`.card-glass`) ให้ card หลัก — backdrop-blur + semi-transparent
- **Borders**: rounded เพิ่มเป็น `rounded-xl` / `rounded-2xl`, hover effects ปรับให้มี shadow-md
- **Divider**: ใช้ gradient divider แยกส่วน active/completed พร้อม label
- **Buttons**: เพิ่ม active:scale-95 + shadow transitions
- **Overall**: ยังคง minimal ขาว/ดำ/เทา ตาม vibe เดิม

### 2026-03-24: Refactor — ใช้ React Context API จัดการ State

- **สร้าง** `src/context/TodoContext.tsx` — TodoContext + TodoProvider + custom hook `useTodos()`
- **ย้าย state + logic** ทั้งหมด (todos, loading, addTodo, toggleTodo, editTodo, deleteTodo) จาก HomePage → TodoProvider
- **ปรับ App.tsx** — wrap `<TodoProvider>` ครอบ Routes
- **ปรับ components** ให้ consume context โดยตรงผ่าน `useTodos()`:
  - `AddTodo.tsx` — ไม่รับ props แล้ว, ใช้ `addTodo` จาก context
  - `TodoItem.tsx` — ตัด callback props, ใช้ `toggleTodo/editTodo/deleteTodo` จาก context
  - `TodoList.tsx` — ตัด props ทั้งหมด, ใช้ `todos` จาก context
  - `HomePage.tsx` — เหลือแค่ layout + `loading` จาก context
- **ผลลัพธ์**: โค้ดสะอาดขึ้น, ลด prop drilling, components เป็น loosely coupled

### 2026-03-25: เพิ่มระบบ Sort ตามวันเวลาสร้าง (Newest/Oldest)

- **เพิ่ม** `SortOrder` type ("newest" | "oldest") ใน `src/types/todo.ts`
- **เพิ่ม** `sortOrder` + `setSortOrder` state ใน TodoContext
- **เปลี่ยน** default sort จาก priority → `created_at` (newest first)
- **เพิ่ม** Sort toggle buttons (🕐 Newest / 🕰️ Oldest) ใน TodoList filter bar
- **คง** Priority filter ไว้เหมือนเดิม + เพิ่ม divider แยก Filter/Sort ใน UI

### 2026-03-25: เพิ่มระบบ Dark/Light Theme

- **สร้าง** `src/context/ThemeContext.tsx` — ThemeContext + ThemeProvider + custom hook `useTheme()`
  - persist theme ลง localStorage, default ตาม system preference
  - toggle `dark` class บน `<html>` element
- **อัปเดต CSS** (`src/index.css`) — เพิ่ม `@custom-variant dark` สำหรับ class-based dark mode, dark variants ของ `.card-glass` + `.bg-dots`
- **อัปเดต App.tsx** — wrap `<ThemeProvider>` ครอบ BrowserRouter
- **อัปเดต HomePage.tsx** — เพิ่มปุ่ม toggle 🌙/☀️ มุมขวาบน + dark classes ทุก element
- **อัปเดต AddTodo.tsx** — dark classes สำหรับ input, buttons, expanded panel, priority selector
- **อัปเดต TodoItem.tsx** — dark classes สำหรับ container, checkbox, title, edit input, detail toggle, delete button, detail panel
- **อัปเดต TodoList.tsx** — dark classes สำหรับ filter/sort buttons (active + inactive), divider, empty state, counter
- **ผลลัพธ์**: สลับ theme ได้ทันที, จำค่าไว้ใน localStorage, รองรับ system preference เป็น default

### 2026-03-25: แก้ไข Dark Mode — พื้นหลัง + ตัวอักษร + Priority Badge

- **แก้ไข** `src/index.css` — เพิ่ม `background-color: #ffffff` ให้ body + เพิ่ม `.dark body` background สีเข้ม `#030712` เป็น fallback
- **แก้ไข** `src/pages/HomePage.tsx` — เปลี่ยนจาก `bg-linear-to-br` (ถูก `.bg-dots` override) → ใช้ `bg-white dark:bg-gray-950` (background-color) แทน, เปลี่ยน `h-screen` → `min-h-screen` รองรับ scroll
- **แก้ไข** `src/components/TodoItem.tsx` — เพิ่ม dark variants ให้ Priority badge (`dark:bg-red-900/40 dark:text-red-400`, เหลือง, เขียว)
- **แก้ไข** `src/components/AddTodo.tsx` — เพิ่ม dark variants ให้ Priority selector buttons เหมือนกัน
- **สาเหตุหลัก**: `bg-dots` (background-image) override gradient ของ Tailwind → transparent ส่วนของ dots โชว์ body สีขาว

### 2026-03-25: เพิ่มระบบ Sub-todo (Todo ย่อย)

- **Backend**:
  - `server/db.ts` — เพิ่ม `sub_todos` table (id, todo_id, title, completed, created_at) พร้อม foreign key ON DELETE CASCADE
  - `server/routes/subTodos.ts` — (ใหม่) CRUD REST API สำหรับ sub-todo (GET, POST, PUT, DELETE) ภายใต้ `/api/todos/:todoId/sub-todos`
  - `server/routes/todos.ts` — เพิ่ม cascade delete sub_todos เมื่อลบ parent todo
  - `server/index.ts` — ลงทะเบียน subTodosRouter
- **Frontend Types + API**:
  - `src/types/todo.ts` — เพิ่ม `SubTodo` interface (id, todo_id, title, completed, created_at)
  - `src/api/todos.ts` — เพิ่ม `getSubTodos`, `createSubTodo`, `updateSubTodo`, `deleteSubTodo` functions
- **Context**:
  - `src/context/TodoContext.tsx` — เพิ่ม `subTodos` state (Record<number, SubTodo[]>), `fetchSubTodos`, `addSubTodo`, `toggleSubTodo`, `deleteSubTodo` + ลบ sub-todos เมื่อลบ parent
- **UI (TodoItem.tsx)**:
  - แสดง sub-todo count badge (done/total) บน main row
  - แสดง sub-todo list ใน detail panel พร้อม checkbox toggle + delete
  - เพิ่ม inline form สำหรับ add sub-task ใน detail panel
  - Fetch sub-todos อัตโนมัติเมื่อเปิด detail panel
  - รองรับ dark mode ทุก element
- **ผลลัพธ์**: แต่ละ todo สามารถมี sub-task ย่อยได้ไม่จำกัด มี progress badge แสดงสถานะ

### 2026-03-26: สร้าง README.md

- **เขียนใหม่ทั้งไฟล์** — ลบเนื้อหาเดิมออก
- **เนื้อหา**: ภาพรวมโปรเจกต์, features, tech stack พร้อมเหตุผล, project structure พร้อมคำอธิบาย, getting started, API endpoints, DB schema, scripts
- **รูปแบบ**: README แบบมาตรฐาน (badges, tables, code blocks, tree structure)
