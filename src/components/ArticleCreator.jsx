import { useState } from "react";

export default function ArticleCreator() {
  const [formData, setFormData] = useState({
    title: "",
    briefDescription: "",
    description: "",
    cardImage: "",
    articleImage: "",
    category: "Noticias de IA",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const articleData = {
        title: formData.title,
        content: formData.description,
        excerpt: formData.briefDescription,
        category: formData.category.toLowerCase().replace(/\s+/g, "-"),
        tags: [formData.category.toLowerCase().replace(/\s+/g, "-")],
      };

      const response = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(articleData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`¡Artículo creado exitosamente! Slug: ${result.slug}`);
        setFormData({
          title: "",
          briefDescription: "",
          description: "",
          cardImage: "",
          articleImage: "",
          category: "Noticias de IA",
        });
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Crear Nuevo Artículo
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Título del artículo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción Breve *
          </label>
          <textarea
            name="briefDescription"
            value={formData.briefDescription}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Resumen corto del artículo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contenido Completo * (Markdown)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            placeholder="# Título del artículo

Aquí va el contenido completo en formato Markdown...

## Subtítulo

- Lista de elementos
- Otro elemento

**Texto en negrita** y *texto en cursiva*"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Noticias de IA">Noticias de IA</option>
            <option value="Tutoriales de IA">Tutoriales de IA</option>
            <option value="Modelos Generativos">Modelos Generativos</option>
            <option value="General">General</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagen de Tarjeta (URL)
          </label>
          <input
            type="url"
            name="cardImage"
            value={formData.cardImage}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://ejemplo.com/imagen-tarjeta.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagen del Artículo (URL)
          </label>
          <input
            type="url"
            name="articleImage"
            value={formData.articleImage}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://ejemplo.com/imagen-articulo.jpg"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Creando..." : "Crear Artículo"}
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            message.includes("Error")
              ? "bg-red-100 text-red-700 border border-red-300"
              : "bg-green-100 text-green-700 border border-green-300"
          }`}
        >
          {message}
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-2">
          💡 Ejemplo de uso con JavaScript:
        </h3>
        <pre className="text-sm text-gray-600 overflow-x-auto">
          {`fetch('/api/articles', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: "Ejemplo IA",
    briefDescription: "Resumen del artículo",
    description: "Contenido completo...",
    cardImage: "https://tusitio.com/img/card.jpg",
    articleImage: "https://tusitio.com/img/articulo.jpg",
    publishedAt: "2025-07-01T09:00:00Z",
    category: "Noticias de IA"
  })
}).then(res => res.json())
  .then(data => console.log(data));`}
        </pre>
      </div>
    </div>
  );
}
