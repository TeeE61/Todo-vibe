import express from "express";
import cors from "cors";
import todosRouter from "./routes/todos";
import subTodosRouter from "./routes/subTodos";

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/todos", todosRouter);
app.use("/api/todos", subTodosRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
