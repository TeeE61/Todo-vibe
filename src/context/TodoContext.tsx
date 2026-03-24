import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { Todo } from "../types/todo";
import * as api from "../api/todos";

interface TodoContextValue {
  todos: Todo[];
  loading: boolean;
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  editTodo: (id: number, title: string) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

const TodoContext = createContext<TodoContextValue | null>(null);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .getTodos()
      .then(({ data }) => setTodos(data))
      .catch((err) => console.error("Failed to fetch todos:", err))
      .finally(() => setLoading(false));
  }, []);

  const addTodo = useCallback(async (title: string) => {
    const { data } = await api.createTodo(title);
    setTodos((prev) => [data, ...prev]);
  }, []);

  const toggleTodo = useCallback(async (id: number) => {
    setTodos((prev) => {
      const todo = prev.find((t) => t.id === id);
      if (!todo) return prev;
      api
        .updateTodo(id, { completed: todo.completed ? 0 : 1 })
        .then(({ data }) =>
          setTodos((p) => p.map((t) => (t.id === id ? data : t))),
        );
      return prev;
    });
  }, []);

  const editTodo = useCallback(async (id: number, title: string) => {
    const { data } = await api.updateTodo(id, { title });
    setTodos((prev) => prev.map((t) => (t.id === id ? data : t)));
  }, []);

  const removeTodo = useCallback(async (id: number) => {
    await api.deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        addTodo,
        toggleTodo,
        editTodo,
        deleteTodo: removeTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
}
