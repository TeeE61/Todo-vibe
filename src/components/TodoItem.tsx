import { useState, useEffect } from "react";
import { useTodos } from "../context/TodoContext";

const PRIORITY_CONFIG: Record<number, { label: string; badge: string }> = {
  3: {
    label: "High",
    badge:
      "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",
  },
  2: {
    label: "Med",
    badge:
      "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
  },
  1: {
    label: "Low",
    badge:
      "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
  },
};

interface TodoItemProps {
  id: number;
  title: string;
  description: string;
  priority: number;
  completed: number;
}

export default function TodoItem({
  id,
  title,
  description,
  priority,
  completed,
}: TodoItemProps) {
  const {
    toggleTodo,
    deleteTodo,
    editTodo,
    subTodos,
    fetchSubTodos,
    addSubTodo,
    toggleSubTodo,
    deleteSubTodo,
  } = useTodos();
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [showDetail, setShowDetail] = useState(false);
  const [subTitle, setSubTitle] = useState("");
  const [addingSub, setAddingSub] = useState(false);

  const prio = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG[2];
  const subs = subTodos[id] || [];
  const subDoneCount = subs.filter((s) => s.completed).length;

  // Fetch sub-todos when detail panel opens
  useEffect(() => {
    if (showDetail) {
      fetchSubTodos(id);
    }
  }, [showDetail, id, fetchSubTodos]);

  const handleSave = () => {
    if (editTitle.trim()) {
      editTodo(id, { title: editTitle.trim() });
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

  const handleAddSub = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subTitle.trim() || addingSub) return;
    setAddingSub(true);
    try {
      await addSubTodo(id, subTitle.trim());
      setSubTitle("");
    } finally {
      setAddingSub(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 shadow-sm transition-all hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md">
      {/* Main row */}
      <div className="group flex items-center gap-3 px-4 py-3.5">
        {/* Checkbox */}
        <button
          onClick={() => toggleTodo(id)}
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
            completed
              ? "border-gray-900 dark:border-white bg-gray-900 dark:bg-white shadow-inner"
              : "border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-400 hover:scale-110"
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
            className="flex-1 bg-transparent text-sm outline-none dark:text-gray-100"
            autoFocus
          />
        ) : (
          <span
            onDoubleClick={() => setEditing(true)}
            className={`flex-1 cursor-default select-none text-sm ${
              completed
                ? "text-gray-400 dark:text-gray-500 line-through"
                : "text-gray-900 dark:text-gray-100"
            }`}
          >
            {title}
          </span>
        )}

        {/* Sub-todo count badge */}
        {subs.length > 0 && (
          <span className="shrink-0 rounded-md bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 dark:text-gray-400">
            {subDoneCount}/{subs.length}
          </span>
        )}

        {/* Priority badge */}
        <span
          className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-semibold ${prio.badge}`}
        >
          {prio.label}
        </span>

        {/* Detail toggle */}
        <button
          onClick={() => setShowDetail(!showDetail)}
          className="shrink-0 rounded-lg p-1 text-gray-300 dark:text-gray-500 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300"
          title="Toggle details"
        >
          <span className="text-sm">{showDetail ? "🔼" : "📄"}</span>
        </button>

        {/* Delete button */}
        <button
          onClick={() => deleteTodo(id)}
          className="shrink-0 rounded-lg p-1.5 text-gray-300 dark:text-gray-500 opacity-0 transition-all hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 group-hover:opacity-100"
        >
          <span className="text-sm">🗑️</span>
        </button>
      </div>

      {/* Detail panel */}
      {showDetail && (
        <div className="border-t border-gray-100 dark:border-gray-700 px-4 py-3 text-sm space-y-3">
          {/* Description */}
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              📝 Description
            </p>
            {description ? (
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {description}
              </p>
            ) : (
              <p className="text-gray-400 dark:text-gray-500 italic">
                No description
              </p>
            )}
          </div>

          {/* Sub-todos */}
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              📋 Sub-tasks{" "}
              {subs.length > 0 && `(${subDoneCount}/${subs.length})`}
            </p>

            {/* Sub-todo list */}
            {subs.length > 0 && (
              <div className="space-y-1 mb-2">
                {subs.map((sub) => (
                  <div
                    key={sub.id}
                    className="group/sub flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <button
                      onClick={() => toggleSubTodo(id, sub.id)}
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
                        sub.completed
                          ? "border-gray-900 dark:border-white bg-gray-900 dark:bg-white"
                          : "border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-400"
                      }`}
                    >
                      {sub.completed ? (
                        <span className="text-[8px] text-white dark:text-gray-900">
                          ✓
                        </span>
                      ) : null}
                    </button>
                    <span
                      className={`flex-1 text-xs ${
                        sub.completed
                          ? "text-gray-400 dark:text-gray-500 line-through"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {sub.title}
                    </span>
                    <button
                      onClick={() => deleteSubTodo(id, sub.id)}
                      className="shrink-0 rounded p-0.5 text-gray-300 dark:text-gray-600 opacity-0 transition-all hover:text-red-500 group-hover/sub:opacity-100"
                    >
                      <span className="text-xs">✕</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add sub-todo form */}
            <form onSubmit={handleAddSub} className="flex gap-2">
              <input
                type="text"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                placeholder="➕ Add sub-task..."
                className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-3 py-1.5 text-xs outline-none transition-all focus:border-gray-400 dark:focus:border-gray-500 dark:text-gray-100 dark:placeholder-gray-500"
                disabled={addingSub}
              />
              <button
                type="submit"
                disabled={!subTitle.trim() || addingSub}
                className="shrink-0 rounded-lg bg-gray-900 dark:bg-white px-3 py-1.5 text-xs font-medium text-white dark:text-gray-900 transition-all hover:bg-gray-700 dark:hover:bg-gray-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
