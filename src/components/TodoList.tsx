import { useTodos } from "../context/TodoContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos } = useTodos();
  if (todos.length === 0) {
    return (
      <div className="mt-16 text-center text-gray-400">
        <div className="mb-3 text-5xl">📋</div>
        <p className="text-lg">No todos yet</p>
        <p className="mt-1 text-sm">Add one above to get started 👆</p>
      </div>
    );
  }

  const active = todos.filter((t) => !t.completed);
  const done = todos.filter((t) => t.completed);

  return (
    <div className="mt-8 space-y-2">
      {active.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}

      {done.length > 0 && active.length > 0 && (
        <div className="flex items-center gap-3 py-3">
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-200 to-transparent" />
          <span className="text-xs text-gray-400">✅ Completed</span>
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-200 to-transparent" />
        </div>
      )}

      {done.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}

      <div className="pt-4 text-center text-xs text-gray-400">
        🔥 {active.length} remaining · 🎉 {done.length} completed
      </div>
    </div>
  );
}
