export interface Todo {
  id: number;
  title: string;
  description: string;
  priority: number; // 1=low, 2=medium, 3=high
  completed: number;
  created_at: string;
}

export interface SubTodo {
  id: number;
  todo_id: number;
  title: string;
  completed: number;
  created_at: string;
}

export type PriorityFilter = "all" | 1 | 2 | 3;

export type SortOrder = "newest" | "oldest";
