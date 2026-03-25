import axios from "axios";
import type { Todo, SubTodo } from "../types/todo";

const API_URL = "http://localhost:3001/api/todos";

export const getTodos = () => axios.get<Todo[]>(API_URL);

export const createTodo = (
  title: string,
  description: string,
  priority: number,
) => axios.post<Todo>(API_URL, { title, description, priority });

export const updateTodo = (
  id: number,
  data: {
    title?: string;
    completed?: number;
    description?: string;
    priority?: number;
  },
) => axios.put<Todo>(`${API_URL}/${id}`, data);

export const deleteTodo = (id: number) => axios.delete(`${API_URL}/${id}`);

// Sub-todo API
export const getSubTodos = (todoId: number) =>
  axios.get<SubTodo[]>(`${API_URL}/${todoId}/sub-todos`);

export const createSubTodo = (todoId: number, title: string) =>
  axios.post<SubTodo>(`${API_URL}/${todoId}/sub-todos`, { title });

export const updateSubTodo = (
  todoId: number,
  subId: number,
  data: { title?: string; completed?: number },
) => axios.put<SubTodo>(`${API_URL}/${todoId}/sub-todos/${subId}`, data);

export const deleteSubTodo = (todoId: number, subId: number) =>
  axios.delete(`${API_URL}/${todoId}/sub-todos/${subId}`);
