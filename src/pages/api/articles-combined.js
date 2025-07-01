import { getCollection } from "astro:content";
import { getArticlesCollection } from "../../lib/mongodb.js";

// Función helper para timeout
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ]);
}

export async function GET(request) {
  try {
    // Cargar ambos tipos de artículos en paralelo con timeout
    const [dynamicArticles, staticArticles] = await Promise.allSettled([
      // MongoDB con timeout de 3 segundos
      withTimeout(loadDynamicArticles(), 3000),
      // Artículos estáticos con timeout de 2 segundos  
      withTimeout(loadStaticArticles(), 2000)
    ]);

    const articles = [];
    
    // Procesar artículos dinámicos
    if (dynamicArticles.status === 'fulfilled') {
      articles.push(...dynamicArticles.value);
    } else {
      console.warn("Failed to load dynamic articles:", dynamicArticles.reason);
    }
    
    // Procesar artículos estáticos
    if (staticArticles.status === 'fulfilled') {
      articles.push(...staticArticles.value);
    } else {
      console.warn("Failed to load static articles:", staticArticles.reason);
    }

    // Combinar ambos tipos de artículos
    const allArticles = articles;

    // Ordenar por fecha de publicación (más reciente primero)
    allArticles.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return new Response(JSON.stringify(allArticles), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300" // Cache por 5 minutos
      },
    });
  } catch (error) {
    console.error("Error fetching combined articles:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch articles" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

async function loadDynamicArticles() {
  const collection = await getArticlesCollection();
  const articles = await collection
    .find({})
    .sort({ publishedAt: -1 })
    .limit(20) // Limitar a 20 artículos
    .toArray();

  return articles.map((article) => ({
    ...article,
    _id: article._id.toString(),
    isStatic: false,
  }));
}

async function loadStaticArticles() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    _id: post.id,
    title: post.data.title,
    excerpt: post.data.description,
    category: "tutoriales-ia",
    slug: post.id,
    publishedAt: post.data.pubDate.toISOString(),
    updatedAt: post.data.updatedDate?.toISOString() || post.data.pubDate.toISOString(),
    isStatic: true,
    tags: [],
  }));
}
