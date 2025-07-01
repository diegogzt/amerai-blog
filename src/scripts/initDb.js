import { getArticlesCollection } from "../lib/mongodb.js";

// Artículos de ejemplo para inicializar la base de datos
const sampleArticles = [
  {
    title: "Primera publicación en MongoDB",
    briefDescription: "Esta es la primera publicación almacenada en MongoDB.",
    description: `# Mi Primera Publicación en MongoDB

¡Bienvenido a nuestro blog con MongoDB! Esta es tu primera publicación almacenada en la base de datos.

## Lo que aprenderás

En esta publicación aprenderás sobre:
- Cómo almacenar contenido dinámico en MongoDB
- Integración con bases de datos NoSQL
- APIs conectadas a MongoDB en Astro

## Características

- **Almacenamiento persistente**: Los datos se guardan en MongoDB Atlas
- **Escalabilidad**: Soporta miles de artículos
- **Flexibilidad**: Esquema dinámico para contenido variable

¡Disfruta explorando nuestro nuevo sistema!`,
    cardImage: "/src/assets/blog-placeholder-1.jpg",
    articleImage: "/src/assets/blog-placeholder-1.jpg",
    publishedAt: "2025-07-01T09:00:00Z",
    category: "Noticias de IA",
    slug: "primera-publicacion-mongodb",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Tutorial: Configurando MongoDB con Astro",
    briefDescription:
      "Aprende a integrar MongoDB con tu proyecto Astro para crear un blog dinámico.",
    description: `# Configurando MongoDB con Astro

En este tutorial aprenderás a integrar MongoDB con Astro para crear un sistema de blog completamente dinámico.

## Requisitos previos

Antes de comenzar, asegúrate de tener:
- Node.js 18 o superior
- Cuenta en MongoDB Atlas
- Conocimientos básicos de JavaScript

## Instalación y Configuración

### Paso 1: Instalar dependencias

\`\`\`bash
npm install mongodb
\`\`\`

### Paso 2: Configurar variables de entorno

\`\`\`env
MONGODB_URI="tu_connection_string_de_mongodb"
MONGODB_DB="nombre_de_tu_base_de_datos"
\`\`\`

### Paso 3: Crear utilidades de conexión

\`\`\`javascript
import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  return client.db(process.env.MONGODB_DB);
}
\`\`\`

## Beneficios de MongoDB

- **Flexibilidad**: Esquemas dinámicos
- **Escalabilidad**: Crece con tu aplicación
- **Performance**: Consultas rápidas
- **Cloud**: MongoDB Atlas simplifica el hosting

¡Ya tienes tu base de datos configurada!`,
    cardImage: "/src/assets/blog-placeholder-2.jpg",
    articleImage: "/src/assets/blog-placeholder-2.jpg",
    publishedAt: "2025-07-01T10:30:00Z",
    category: "Tutoriales de IA",
    slug: "tutorial-mongodb-astro",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "MongoDB vs SQL: ¿Cuál elegir para tu blog?",
    briefDescription:
      "Comparativa detallada entre MongoDB y bases de datos SQL para proyectos de contenido.",
    description: `# MongoDB vs SQL: La elección correcta

La elección entre MongoDB y bases de datos SQL depende de muchos factores. Analicemos cada opción.

## MongoDB: La opción NoSQL

### Ventajas
- **Flexibilidad**: Esquemas dinámicos permiten evolución
- **Escalabilidad horizontal**: Fácil distribución
- **JSON nativo**: Perfecto para APIs REST
- **Desarrollo rápido**: Menos configuración inicial

### Desventajas
- **Consistencia**: ACID limitado comparado con SQL
- **Consultas complejas**: Menos potente que SQL
- **Curva de aprendizaje**: Diferentes conceptos

## SQL: La opción tradicional

### Ventajas
- **ACID completo**: Transacciones robustas
- **SQL estándar**: Amplio conocimiento en el mercado
- **Consultas complejas**: JOINs y análisis avanzados
- **Herramientas**: Ecosistema maduro

### Desventajas
- **Rigidez**: Esquemas fijos dificultan cambios
- **Escalabilidad**: Más compleja horizontalmente
- **ORM**: Necesidad de mapeo objeto-relacional

## Para Blogs y CMS

MongoDB es ideal para:
- Contenido variable (artículos, multimedia, comentarios)
- Desarrollo ágil con cambios frecuentes
- APIs JSON-first
- Escalabilidad simple

SQL es mejor para:
- Sistemas con relaciones complejas
- Reportes y análisis avanzados
- Equipos con experiencia SQL
- Consistencia crítica

## Conclusión

Para nuestro blog de IA, MongoDB ofrece la flexibilidad perfecta para manejar contenido diverso y permitir evolución rápida del esquema.`,
    cardImage: "/src/assets/blog-placeholder-3.jpg",
    articleImage: "/src/assets/blog-placeholder-3.jpg",
    publishedAt: "2025-07-01T14:15:00Z",
    category: "Modelos Generativos",
    slug: "mongodb-vs-sql-comparativa",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function initializeDatabase() {
  try {
    const collection = await getArticlesCollection();

    // Verificar si ya hay artículos
    const existingCount = await collection.countDocuments();

    if (existingCount === 0) {
      console.log("🚀 Inicializando base de datos con artículos de ejemplo...");

      // Insertar artículos de ejemplo
      const result = await collection.insertMany(sampleArticles);

      console.log(
        `✅ ${result.insertedCount} artículos insertados exitosamente`
      );
      console.log("🎉 Base de datos inicializada");

      return {
        success: true,
        insertedCount: result.insertedCount,
        message: "Base de datos inicializada con artículos de ejemplo",
      };
    } else {
      console.log(`ℹ️  Base de datos ya contiene ${existingCount} artículos`);
      return {
        success: true,
        existingCount,
        message: "Base de datos ya inicializada",
      };
    }
  } catch (error) {
    console.error("❌ Error inicializando base de datos:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
