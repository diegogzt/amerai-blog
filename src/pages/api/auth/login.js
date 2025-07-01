export async function POST(request) {
  try {
    const { username, password } = await request.json()
    
    // Verificar credenciales desde variables de entorno
    const validUsername = import.meta.env.ADMIN_USERNAME || 'admin'
    const validPassword = import.meta.env.ADMIN_PASSWORD || 'password123'
    
    if (username === validUsername && password === validPassword) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Login successful',
        token: 'dummy-token-for-demo' // En producción, usar JWT real
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      })
    } else {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Invalid credentials' 
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }
  } catch (error) {
    console.error('Error during login:', error)
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Login failed' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}
