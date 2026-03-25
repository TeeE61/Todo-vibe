import { Router } from "express";
import db from "../db";

interface SubTodo {
  id: number;
  todo_id: number;
  title: string;
  completed: number;
  created_at: string;
}

const router = Router();

// Get all sub-todos for a todo
router.get("/:todoId/sub-todos", (req, res) => {
  const todoId = Number(req.params.todoId);
  if (isNaN(todoId)) {
    res.status(400).json({ error: "Invalid todo ID" });
    return;
  }

  const subTodos = db
    .prepare(
      "SELECT * FROM sub_todos WHERE todo_id = ? ORDER BY created_at ASC",
    )
    .all(todoId);
  res.json(subTodos);
});

// Create a sub-todo
router.post("/:todoId/sub-todos", (req, res) => {
  const todoId = Number(req.params.todoId);
  if (isNaN(todoId)) {
    res.status(400).json({ error: "Invalid todo ID" });
    return;
  }

  const parent = db.prepare("SELECT id FROM todos WHERE id = ?").get(todoId);
  if (!parent) {
    res.status(404).json({ error: "Parent todo not found" });
    return;
  }

  const { title } = req.body;
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    res.status(400).json({ error: "Title is required" });
    return;
  }

  const result = db
    .prepare("INSERT INTO sub_todos (todo_id, title) VALUES (?, ?)")
    .run(todoId, title.trim());
  const subTodo = db
    .prepare("SELECT * FROM sub_todos WHERE id = ?")
    .get(result.lastInsertRowid);
  res.status(201).json(subTodo);
});

// Update a sub-todo (toggle completed or edit title)
router.put("/:todoId/sub-todos/:subId", (req, res) => {
  const subId = Number(req.params.subId);
  if (isNaN(subId)) {
    res.status(400).json({ error: "Invalid sub-todo ID" });
    return;
  }

  const existing = db
    .prepare("SELECT * FROM sub_todos WHERE id = ?")
    .get(subId) as SubTodo | undefined;
  if (!existing) {
    res.status(404).json({ error: "Sub-todo not found" });
    return;
  }

  const { title, completed } = req.body;
  const newTitle = title !== undefined ? String(title).trim() : existing.title;
  const newCompleted =
    completed !== undefined ? (completed ? 1 : 0) : existing.completed;

  if (title !== undefined && newTitle.length === 0) {
    res.status(400).json({ error: "Title cannot be empty" });
    return;
  }

  db.prepare("UPDATE sub_todos SET title = ?, completed = ? WHERE id = ?").run(
    newTitle,
    newCompleted,
    subId,
  );
  const updated = db.prepare("SELECT * FROM sub_todos WHERE id = ?").get(subId);
  res.json(updated);
});

// Delete a sub-todo
router.delete("/:todoId/sub-todos/:subId", (req, res) => {
  const subId = Number(req.params.subId);
  if (isNaN(subId)) {
    res.status(400).json({ error: "Invalid sub-todo ID" });
    return;
  }

  const existing = db
    .prepare("SELECT * FROM sub_todos WHERE id = ?")
    .get(subId);
  if (!existing) {
    res.status(404).json({ error: "Sub-todo not found" });
    return;
  }

  db.prepare("DELETE FROM sub_todos WHERE id = ?").run(subId);
  res.status(204).send();
});

export default router;
