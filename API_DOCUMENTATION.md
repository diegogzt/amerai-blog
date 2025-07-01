# Sistema de Artículos Dinámicos - Documentación API

## 🚀 Implementación Completa

He migrado el sistema de blog de archivos markdown estáticos a un sistema dinámico basado en API que permite crear y gestionar artículos desde la base de datos.

## 📋 Características Implementadas

### ✅ API Endpoints

#### 1. **GET /api/articles**

Obtiene todos los artículos

```javascript
fetch("/api/articles")
  .then((res) => res.json())
  .then((articles) => console.log(articles));
```

#### 2. **POST /api/articles**

Crea un nuevo artículo

```javascript
fetch("/api/articles", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Ejemplo IA",
    briefDescription: "Resumen del artículo",
    description: "Contenido completo...",
    cardImage: "https://tusitio.com/img/card.jpg",
    articleImage: "https://tusitio.com/img/articulo.jpg",
    publishedAt: "2025-07-01T09:00:00Z",
    category: "Noticias de IA",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
```

#### 3. **GET /api/articles/[id]**

Obtiene un artículo específico por ID o slug

```javascript
fetch("/api/articles/1"); // Por ID
fetch("/api/articles/mi-articulo-slug"); // Por slug
```

### ✅ Estructura de Datos

```javascript
{
  id: 1,
  title: "Título del artículo",
  briefDescription: "Resumen corto",
  description: "Contenido completo en Markdown",
  cardImage: "URL de imagen para tarjeta",
  articleImage: "URL de imagen del artículo",
  publishedAt: "2025-07-01T09:00:00Z",
  category: "Noticias de IA",
  slug: "titulo-del-articulo" // Auto-generado
}
```

### ✅ Páginas Actualizadas

- **`/blog`** - Lista de artículos dinámica desde API
- **`/blog/[slug]`** - Vista individual de artículo con diseño optimizado
- **`/admin`** - Panel para crear nuevos artículos

### ✅ Funcionalidades

1. **Creación automática de slug** desde el título
2. **Renderizado de Markdown** a HTML con estilos Tailwind
3. **Validación de datos** en el endpoint POST
4. **Manejo de errores** robusto
5. **Integración de AdSense** en todas las páginas
6. **Diseño responsive** y moderno

## 🛠 Configuración Técnica

### Server-Side Rendering (SSR)

```javascript
// astro.config.mjs
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  // ...
});
```

### Estructura de Archivos

```
src/
├── pages/
│   ├── api/
│   │   ├── articles.js          # GET & POST /api/articles
│   │   └── articles/[id].js     # GET /api/articles/[id]
│   ├── blog/
│   │   ├── index.astro          # Lista de artículos
│   │   └── [...slug].astro      # Vista individual
│   └── admin.astro              # Panel de administración
├── components/
│   └── ArticleCreator.jsx       # Formulario React para crear artículos
```

## 🧪 Cómo Probar

### 1. Acceder al Panel de Administración

```
http://localhost:4322/admin
```

### 2. Crear un Artículo de Prueba

```javascript
// Datos de ejemplo para el formulario
{
  title: "Mi Primer Artículo de IA",
  briefDescription: "Un resumen interesante sobre IA",
  description: `# Mi Primer Artículo

Este es el contenido principal del artículo.

## Subtítulo

- Punto importante 1
- Punto importante 2

**Texto en negrita** y *texto en cursiva*.`,
  category: "Noticias de IA"
}
```

### 3. Ver el Blog Actualizado

```
http://localhost:4322/blog
```

## 🚀 Ventajas del Nuevo Sistema

1. **Dinámico**: Los artículos se crean y actualizan sin rebuild
2. **Escalable**: Fácil conexión a base de datos real
3. **API-First**: Permite integración con otros sistemas
4. **Moderno**: SSR con Astro + React
5. **SEO Optimizado**: URLs amigables con slugs
6. **Monetización**: AdSense integrado en todas las páginas

## 🔄 Migración Completada

- ❌ Sistema anterior: Archivos `.md` estáticos con `getCollection('blog')`
- ✅ Sistema nuevo: API dinámica con fetch desde base de datos
- ✅ Compatibilidad: URLs y estructura preserved
- ✅ Funcionalidad mejorada: Categorías, imágenes, AdSense

El sistema ahora está listo para producción y puede conectarse fácilmente a cualquier base de datos real reemplazando la simulación en memoria por consultas reales.
