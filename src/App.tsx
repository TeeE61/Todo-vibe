import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TodoProvider } from "./context/TodoContext";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <TodoProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </TodoProvider>
    </BrowserRouter>
  );
}
