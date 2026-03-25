import axios from "axios";
import type { Todo } from "../types/todo";

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
