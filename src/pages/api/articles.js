import { getArticlesCollection } from '../../lib/mongodb.js'

export async function GET(request) {
  try {
    const collection = await getArticlesCollection()
    const articles = await collection.find({}).sort({ publishedAt: -1 }).toArray()
    
    // Convertir ObjectId a string
    const articlesWithStringId = articles.map(article => ({
      ...article,
      _id: article._id.toString()
    }))
    
    return new Response(JSON.stringify(articlesWithStringId), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch articles' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}

export async function POST(request) {
  try {
    const data = await request.json()
    
    // Crear slug desde el título
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
    
    const article = {
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      category: data.category,
      tags: data.tags || [],
      slug: slug,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    const collection = await getArticlesCollection()
    const result = await collection.insertOne(article)
    
    return new Response(JSON.stringify({ 
      success: true, 
      id: result.insertedId.toString(),
      article: { ...article, _id: result.insertedId.toString() }
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  } catch (error) {
    console.error('Error creating article:', error)
    return new Response(JSON.stringify({ error: 'Failed to create article' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}
