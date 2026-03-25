import { useTodos } from "../context/TodoContext";
import type { PriorityFilter, SortOrder } from "../types/todo";
import TodoItem from "./TodoItem";

const FILTER_OPTIONS: { value: PriorityFilter; label: string }[] = [
  { value: "all", label: "📋 All" },
  { value: 3, label: "🔴 High" },
  { value: 2, label: "🟡 Medium" },
  { value: 1, label: "🟢 Low" },
];

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "newest", label: "🕐 Newest" },
  { value: "oldest", label: "🕰️ Oldest" },
];

export default function TodoList() {
  const { filteredTodos, priorityFilter, setPriorityFilter, sortOrder, setSortOrder } = useTodos();

  if (filteredTodos.length === 0 && priorityFilter === "all") {
    return (
      <div className="mt-16 text-center text-gray-400">
        <div className="mb-3 text-5xl">📋</div>
        <p className="text-lg">No todos yet</p>
        <p className="mt-1 text-sm">Add one above to get started 👆</p>
      </div>
    );
  }

  const active = filteredTodos.filter((t) => !t.completed);
  const done = filteredTodos.filter((t) => t.completed);

  return (
    <div className="mt-6">
      {/* Filter bar */}
      <div className="mb-4 flex flex-wrap items-center gap-2 pb-1">
        {/* Priority filter */}
        <span className="shrink-0 text-xs text-gray-500">Filter:</span>
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={String(opt.value)}
            onClick={() => setPriorityFilter(opt.value)}
            className={`shrink-0 rounded-lg border px-3 py-1 text-xs font-medium transition-all ${
              priorityFilter === opt.value
                ? "border-gray-900 bg-gray-900 text-white shadow-sm"
                : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            {opt.label}
          </button>
        ))}

        {/* Divider */}
        <div className="mx-1 h-4 w-px bg-gray-200" />

        {/* Sort order */}
        <span className="shrink-0 text-xs text-gray-500">Sort:</span>
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSortOrder(opt.value)}
            className={`shrink-0 rounded-lg border px-3 py-1 text-xs font-medium transition-all ${
              sortOrder === opt.value
                ? "border-gray-900 bg-gray-900 text-white shadow-sm"
                : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Filtered empty state */}
      {filteredTodos.length === 0 && priorityFilter !== "all" && (
        <div className="mt-12 text-center text-gray-400">
          <p className="text-sm">No todos with this priority level</p>
        </div>
      )}

      {/* Active todos */}
      <div className="space-y-2">
        {active.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </div>

      {done.length > 0 && active.length > 0 && (
        <div className="flex items-center gap-3 py-3">
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-200 to-transparent" />
          <span className="text-xs text-gray-400">✅ Completed</span>
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-200 to-transparent" />
        </div>
      )}

      {/* Completed todos */}
      <div className="space-y-2">
        {done.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </div>

      <div className="pt-4 text-center text-xs text-gray-400">
        🔥 {active.length} remaining · 🎉 {done.length} completed
      </div>
    </div>
  );
}
