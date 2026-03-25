import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { Todo, PriorityFilter, SortOrder } from "../types/todo";
import * as api from "../api/todos";

interface TodoContextValue {
  todos: Todo[];
  loading: boolean;
  priorityFilter: PriorityFilter;
  setPriorityFilter: (filter: PriorityFilter) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  filteredTodos: Todo[];
  addTodo: (
    title: string,
    description: string,
    priority: number,
  ) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  editTodo: (
    id: number,
    data: { title?: string; description?: string; priority?: number },
  ) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

const TodoContext = createContext<TodoContextValue | null>(null);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  useEffect(() => {
    api
      .getTodos()
      .then(({ data }) => setTodos(data))
      .catch((err) => console.error("Failed to fetch todos:", err))
      .finally(() => setLoading(false));
  }, []);

  // Filter by priority, then sort by created_at
  const filteredTodos = todos
    .filter((t) => priorityFilter === "all" || t.priority === priorityFilter)
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  const addTodo = useCallback(
    async (title: string, description: string, priority: number) => {
      const { data } = await api.createTodo(title, description, priority);
      setTodos((prev) => [data, ...prev]);
    },
    [],
  );

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

  const editTodo = useCallback(
    async (
      id: number,
      data: { title?: string; description?: string; priority?: number },
    ) => {
      const { data: updated } = await api.updateTodo(id, data);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    },
    [],
  );

  const removeTodo = useCallback(async (id: number) => {
    await api.deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        priorityFilter,
        setPriorityFilter,
        sortOrder,
        setSortOrder,
        filteredTodos,
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
