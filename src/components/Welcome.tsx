import { useState } from "react";

interface WelcomeProps {
  name?: string;
  theme?: "light" | "dark";
}

export default function Welcome({
  name = "Usuario",
  theme = "light",
}: WelcomeProps) {
  const [showMessage, setShowMessage] = useState(false);
  const [favoriteColor, setFavoriteColor] = useState("#3b82f6");

  const styles = {
    container: {
      padding: "20px",
      borderRadius: "8px",
      border: "2px solid",
      borderColor: theme === "light" ? "#e5e7eb" : "#374151",
      backgroundColor: theme === "light" ? "#ffffff" : "#1f2937",
      color: theme === "light" ? "#374151" : "#f9fafb",
      textAlign: "center" as const,
      margin: "20px 0",
    },
    button: {
      padding: "10px 20px",
      margin: "10px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      backgroundColor: favoriteColor,
      color: "white",
    },
    input: {
      padding: "8px",
      margin: "10px",
      borderRadius: "4px",
      border: theme === "light" ? "1px solid #d1d5db" : "1px solid #4b5563",
      backgroundColor: theme === "light" ? "#ffffff" : "#374151",
      color: theme === "light" ? "#374151" : "#f9fafb",
    },
  };

  return (
    <div style={styles.container}>
      <h3>¡Hola, {name}! 👋</h3>

      <div>
        <label htmlFor="color-picker">Elige tu color favorito: </label>
        <input
          id="color-picker"
          type="color"
          value={favoriteColor}
          onChange={(e) => setFavoriteColor(e.target.value)}
          style={styles.input}
        />
      </div>

      <button
        style={styles.button}
        onClick={() => setShowMessage(!showMessage)}
      >
        {showMessage ? "Ocultar" : "Mostrar"} Mensaje
      </button>

      {showMessage && (
        <div
          style={{
            marginTop: "15px",
            padding: "15px",
            backgroundColor: `${favoriteColor}20`,
            borderRadius: "4px",
            border: `2px solid ${favoriteColor}`,
          }}
        >
          <p>¡Este es un componente React funcionando en Astro! 🚀</p>
          <p>
            Tema actual: <strong>{theme}</strong>
          </p>
          <p>
            Color favorito:{" "}
            <span style={{ color: favoriteColor, fontWeight: "bold" }}>
              {favoriteColor}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
