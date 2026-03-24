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
