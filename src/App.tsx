import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { TodoProvider } from "./context/TodoContext";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <TodoProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </TodoProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
