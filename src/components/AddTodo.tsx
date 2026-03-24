import { useState } from "react";
import { useTodos } from "../context/TodoContext";

export default function AddTodo() {
  const { addTodo } = useTodos();
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || submitting) return;
    setSubmitting(true);
    try {
      await addTodo(title.trim());
      setTitle("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="✏️ What needs to be done?"
        className="flex-1 rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm shadow-sm outline-none transition-all focus:border-gray-400 focus:bg-white focus:shadow-md"
        disabled={submitting}
      />
      <button
        type="submit"
        disabled={!title.trim() || submitting}
        className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-gray-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ➕ Add
      </button>
    </form>
  );
}
