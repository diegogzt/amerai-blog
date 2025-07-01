import { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  title?: string;
}

export default function TodoList({ title = "Lista de Tareas" }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Cargar tareas del localStorage al montar el componente
    const savedTodos = localStorage.getItem("astro-todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    // Guardar tareas en localStorage cuando cambien
    localStorage.setItem("astro-todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        backgroundColor: "#f9fafb",
      }}
    >
      <h3
        style={{ textAlign: "center", marginBottom: "20px", color: "#374151" }}
      >
        {title}
      </h3>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Añadir nueva tarea..."
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #d1d5db",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Añadir
        </button>
      </div>

      <div>
        {todos.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#6b7280",
              fontStyle: "italic",
            }}
          >
            No hay tareas aún. ¡Añade una!
          </p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                marginBottom: "8px",
                backgroundColor: "white",
                borderRadius: "4px",
                border: "1px solid #e5e7eb",
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ cursor: "pointer" }}
              />
              <span
                style={{
                  flex: 1,
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#6b7280" : "#374151",
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  padding: "4px 8px",
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>

      {todos.length > 0 && (
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            Total: {todos.length} | Completadas:{" "}
            {todos.filter((t) => t.completed).length}
          </p>
        </div>
      )}
    </div>
  );
}
