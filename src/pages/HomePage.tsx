import { useTodos } from "../context/TodoContext";
import TodoList from "../components/TodoList";
import AddTodo from "../components/AddTodo";

export default function HomePage() {
  const { loading } = useTodos();

  return (
    <div className="w-screen h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 bg-dots text-gray-900">
      <div className="h-full flex flex-col justify-center mx-auto max-w-2xl px-4 ">
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
        <div className="card-glass rounded-2xl p-6 shadow-lg shadow-gray-300">
          <AddTodo />

          {loading ? (
            <div className="mt-16 text-center text-gray-400">⏳ Loading...</div>
          ) : (
            <TodoList />
          )}
        </div>

        {/* Footer */}
        <p className="mt-4 text-center text-xs text-gray-400">🚀 todo-web</p>
      </div>
    </div>
  );
}
