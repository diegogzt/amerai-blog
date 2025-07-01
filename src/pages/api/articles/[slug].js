import { getArticlesCollection } from '../../../lib/mongodb.js'

export async function GET({ params }) {
  try {
    const { slug } = params
    const collection = await getArticlesCollection()
    const article = await collection.findOne({ slug: slug })
    
    if (!article) {
      return new Response(JSON.stringify({ error: 'Article not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }

    // Convertir ObjectId a string
    const articleWithStringId = {
      ...article,
      _id: article._id.toString()
    }
    
    return new Response(JSON.stringify(articleWithStringId), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  } catch (error) {
    console.error('Error fetching article:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch article' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}
