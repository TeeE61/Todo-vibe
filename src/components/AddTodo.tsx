import { useState } from "react";
import { useTodos } from "../context/TodoContext";

const PRIORITY_OPTIONS = [
  {
    value: 3,
    label: "🔴 High",
    color: "bg-red-100 text-red-700 border-red-200",
  },
  {
    value: 2,
    label: "🟡 Medium",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  {
    value: 1,
    label: "🟢 Low",
    color: "bg-green-100 text-green-700 border-green-200",
  },
];

export default function AddTodo() {
  const { addTodo } = useTodos();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(2);
  const [expanded, setExpanded] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || submitting) return;
    setSubmitting(true);
    try {
      await addTodo(title.trim(), description.trim(), priority);
      setTitle("");
      setDescription("");
      setPriority(2);
      setExpanded(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="✏️ What needs to be done?"
          className="flex-1 rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm shadow-sm outline-none transition-all focus:border-gray-400 focus:bg-white focus:shadow-md"
          disabled={submitting}
        />
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="rounded-xl border border-gray-200 bg-white/80 px-3 py-3 text-sm shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
          title="More options"
        >
          {expanded ? "🔽" : "⚙️"}
        </button>
        <button
          type="submit"
          disabled={!title.trim() || submitting}
          className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-gray-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ➕ Add
        </button>
      </div>

      {expanded && (
        <div className="space-y-3 rounded-xl border border-gray-100 bg-white/60 p-4">
          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="📝 Add details (optional)..."
            rows={2}
            className="w-full resize-none rounded-lg border border-gray-200 bg-white/80 px-3 py-2 text-sm outline-none transition-all focus:border-gray-400 focus:bg-white"
            disabled={submitting}
          />

          {/* Priority */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Priority:</span>
            {PRIORITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPriority(opt.value)}
                className={`rounded-lg border px-3 py-1 text-xs font-medium transition-all ${
                  priority === opt.value
                    ? opt.color + " shadow-sm scale-105"
                    : "border-gray-200 bg-white text-gray-400 hover:bg-gray-50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
