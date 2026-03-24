import { useState } from "react";
import { useTodos } from "../context/TodoContext";

interface TodoItemProps {
  id: number;
  title: string;
  completed: number;
}

export default function TodoItem({ id, title, completed }: TodoItemProps) {
  const { toggleTodo, deleteTodo, editTodo } = useTodos();
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleSave = () => {
    if (editTitle.trim()) {
      editTodo(id, editTitle.trim());
      setEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditTitle(title);
      setEditing(false);
    }
  };

  return (
    <div className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-white/90 px-4 py-3.5 shadow-sm transition-all hover:border-gray-300 hover:shadow-md">
      {/* Checkbox */}
      <button
        onClick={() => toggleTodo(id)}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          completed
            ? "border-gray-900 bg-gray-900 shadow-inner"
            : "border-gray-300 hover:border-gray-500 hover:scale-110"
        }`}
      >
        {completed ? <span className="text-xs">✅</span> : null}
      </button>

      {/* Title */}
      {editing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-sm outline-none"
          autoFocus
        />
      ) : (
        <span
          onDoubleClick={() => setEditing(true)}
          className={`flex-1 cursor-default select-none text-sm ${
            completed ? "text-gray-400 line-through" : "text-gray-900"
          }`}
        >
          {title}
        </span>
      )}

      {/* Delete button */}
      <button
        onClick={() => deleteTodo(id)}
        className="shrink-0 rounded-lg p-1.5 text-gray-300 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
      >
        <span className="text-sm">🗑️</span>
      </button>
    </div>
  );
}
