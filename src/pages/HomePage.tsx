import { useEffect, useState } from "react";
import type { Todo } from "../types/todo";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../api/todos";
import TodoList from "../components/TodoList";
import AddTodo from "../components/AddTodo";

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const { data } = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async (title: string) => {
    const { data } = await createTodo(title);
    setTodos((prev) => [data, ...prev]);
  };

  const handleToggle = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const { data } = await updateTodo(id, {
      completed: todo.completed ? 0 : 1,
    });
    setTodos((prev) => prev.map((t) => (t.id === id ? data : t)));
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEdit = async (id: number, title: string) => {
    const { data } = await updateTodo(id, { title });
    setTodos((prev) => prev.map((t) => (t.id === id ? data : t)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 bg-dots text-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-20">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="mb-3 text-5xl">📝</div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Todo Vibe
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            ✨ Keep it simple. Get things done.
          </p>
        </header>

        {/* Main Card */}
        <div className="card-glass rounded-2xl p-6 shadow-lg shadow-gray-200/60">
          <AddTodo onAdd={handleAdd} />

          {loading ? (
            <div className="mt-16 text-center text-gray-400">⏳ Loading...</div>
          ) : (
            <TodoList
              todos={todos}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-400">
          🚀 Built with React + SQLite
        </p>
      </div>
    </div>
  );
}
