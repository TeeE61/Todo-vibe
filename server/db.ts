import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "..", "todos.db");

const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    priority INTEGER NOT NULL DEFAULT 2,
    completed INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

// Migration: add columns if they don't exist yet
const columns = db.prepare("PRAGMA table_info(todos)").all() as {
  name: string;
}[];
const colNames = columns.map((c) => c.name);
if (!colNames.includes("description")) {
  db.exec("ALTER TABLE todos ADD COLUMN description TEXT NOT NULL DEFAULT ''");
}
if (!colNames.includes("priority")) {
  db.exec("ALTER TABLE todos ADD COLUMN priority INTEGER NOT NULL DEFAULT 2");
}

export default db;
