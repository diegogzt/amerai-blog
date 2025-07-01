import { getCollection } from 'astro:content';
import { getArticlesCollection } from '../../lib/mongodb.js'

export async function GET(request) {
  try {
    // Obtener artículos dinámicos de MongoDB
    let dynamicArticles = [];
    try {
      const collection = await getArticlesCollection()
      const articles = await collection.find({}).sort({ publishedAt: -1 }).toArray()
      
      dynamicArticles = articles.map(article => ({
        ...article,
        _id: article._id.toString(),
        isStatic: false
      }))
    } catch (mongoError) {
      console.warn('Error loading dynamic articles from MongoDB:', mongoError)
      // Continuar sin artículos dinámicos si MongoDB falla
    }

    // Obtener artículos estáticos de Astro
    let staticArticles = [];
    try {
      const posts = await getCollection('blog');
      staticArticles = posts.map(post => ({
        _id: post.id,
        title: post.data.title,
        excerpt: post.data.description,
        category: 'tutoriales-ia', // Categoría por defecto
        slug: post.id,
        publishedAt: post.data.pubDate.toISOString(),
        updatedAt: post.data.updatedDate?.toISOString() || post.data.pubDate.toISOString(),
        isStatic: true,
        tags: []
      }));
    } catch (astroError) {
      console.warn('Error loading static articles from Astro:', astroError)
      // Continuar sin artículos estáticos si fallan
    }

    // Combinar ambos tipos de artículos
    const allArticles = [...dynamicArticles, ...staticArticles];
    
    // Ordenar por fecha de publicación (más reciente primero)
    allArticles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    
    return new Response(JSON.stringify(allArticles), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  } catch (error) {
    console.error('Error fetching combined articles:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch articles' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}
