import { useTodos } from "../context/TodoContext";
import { useTheme } from "../context/ThemeContext";
import TodoList from "../components/TodoList";
import AddTodo from "../components/AddTodo";

export default function HomePage() {
  const { loading } = useTodos();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-screen min-h-screen bg-white dark:bg-gray-950 bg-dots text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="min-h-screen flex flex-col justify-center mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <header className="mb-10 text-center relative">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="absolute right-0 top-0 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 p-2.5 text-lg shadow-sm transition-all hover:shadow-md hover:scale-105 active:scale-95"
            title={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <div className="mb-3 text-5xl">📝</div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Todo Vibe
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            ✨ Keep it simple. Get things done.
          </p>
        </header>

        {/* Main Card */}
        <div className="card-glass rounded-2xl p-6 shadow-lg shadow-gray-300 dark:shadow-black/30">
          <AddTodo />

          {loading ? (
            <div className="mt-16 text-center text-gray-400">⏳ Loading...</div>
          ) : (
            <TodoList />
          )}
        </div>

        {/* Footer */}
        <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
          🚀 todo-web
        </p>
      </div>
    </div>
  );
}
