import { getArticlesCollection } from '../../lib/mongodb.js'

export async function POST(request) {
  try {
    const collection = await getArticlesCollection()
    
    // Verificar si ya hay artículos
    const existingCount = await collection.countDocuments()
    if (existingCount > 0) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Database already initialized',
        count: existingCount 
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }
    
    // Artículos de ejemplo
    const sampleArticles = [
      {
        title: "Introducción a la Inteligencia Artificial",
        content: "La inteligencia artificial (IA) es una rama de la informática que se enfoca en crear sistemas capaces de realizar tareas que normalmente requieren inteligencia humana...",
        excerpt: "Descubre los fundamentos de la IA y cómo está transformando el mundo",
        category: "noticias-ia",
        tags: ["AI", "Machine Learning", "Introducción"],
        slug: "introduccion-inteligencia-artificial",
        publishedAt: new Date('2024-01-15').toISOString(),
        updatedAt: new Date('2024-01-15').toISOString()
      },
      {
        title: "Tutorial: Primeros Pasos con Machine Learning",
        content: "En este tutorial aprenderás los conceptos básicos del machine learning y cómo implementar tu primer modelo...",
        excerpt: "Guía práctica para comenzar en el mundo del machine learning",
        category: "tutoriales-ia",
        tags: ["Tutorial", "Machine Learning", "Python"],
        slug: "tutorial-primeros-pasos-machine-learning",
        publishedAt: new Date('2024-01-20').toISOString(),
        updatedAt: new Date('2024-01-20').toISOString()
      },
      {
        title: "GPT-4 y los Modelos de Lenguaje del Futuro",
        content: "Los modelos de lenguaje como GPT-4 están revolucionando la forma en que interactuamos con la tecnología...",
        excerpt: "Explora las capacidades y el futuro de los modelos de lenguaje",
        category: "modelos-generativos",
        tags: ["GPT", "LLM", "OpenAI"],
        slug: "gpt-4-modelos-lenguaje-futuro",
        publishedAt: new Date('2024-01-25').toISOString(),
        updatedAt: new Date('2024-01-25').toISOString()
      }
    ]
    
    const result = await collection.insertMany(sampleArticles)
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Database initialized successfully',
      insertedCount: result.insertedCount,
      insertedIds: Object.values(result.insertedIds).map(id => id.toString())
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  } catch (error) {
    console.error('Error initializing database:', error)
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Failed to initialize database' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}
