import { Router } from "express";
import db from "../db";

interface Todo {
  id: number;
  title: string;
  description: string;
  priority: number;
  completed: number;
  created_at: string;
}

const router = Router();

// Get all todos
router.get("/", (_req, res) => {
  const todos = db
    .prepare("SELECT * FROM todos ORDER BY created_at DESC")
    .all();
  res.json(todos);
});

// Create a todo
router.post("/", (req, res) => {
  const { title, description, priority } = req.body;
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    res.status(400).json({ error: "Title is required" });
    return;
  }
  const desc = typeof description === "string" ? description.trim() : "";
  const prio = [1, 2, 3].includes(Number(priority)) ? Number(priority) : 2;
  const stmt = db.prepare(
    "INSERT INTO todos (title, description, priority) VALUES (?, ?, ?)",
  );
  const result = stmt.run(title.trim(), desc, prio);
  const todo = db
    .prepare("SELECT * FROM todos WHERE id = ?")
    .get(result.lastInsertRowid);
  res.status(201).json(todo);
});

// Update a todo
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const { title, completed, description, priority } = req.body;
  const existing = db.prepare("SELECT * FROM todos WHERE id = ?").get(id) as
    | Todo
    | undefined;
  if (!existing) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  const newTitle = title !== undefined ? String(title).trim() : existing.title;
  const newCompleted =
    completed !== undefined ? (completed ? 1 : 0) : existing.completed;
  const newDescription =
    description !== undefined
      ? String(description).trim()
      : existing.description;
  const newPriority =
    priority !== undefined && [1, 2, 3].includes(Number(priority))
      ? Number(priority)
      : existing.priority;

  if (title !== undefined && newTitle.length === 0) {
    res.status(400).json({ error: "Title cannot be empty" });
    return;
  }

  db.prepare(
    "UPDATE todos SET title = ?, completed = ?, description = ?, priority = ? WHERE id = ?",
  ).run(newTitle, newCompleted, newDescription, newPriority, id);
  const todo = db.prepare("SELECT * FROM todos WHERE id = ?").get(id);
  res.json(todo);
});

// Delete a todo
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const existing = db.prepare("SELECT * FROM todos WHERE id = ?").get(id);
  if (!existing) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  db.prepare("DELETE FROM todos WHERE id = ?").run(id);
  res.status(204).send();
});

export default router;
