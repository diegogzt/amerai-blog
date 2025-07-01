# Sistema de Autenticación para Panel de Administración

## 🔐 Implementación Completa

He agregado un sistema de autenticación seguro al panel de administración que requiere credenciales específicas antes de permitir el acceso a la creación de artículos.

## 📋 Características del Sistema

### ✅ **Credenciales de Acceso**

- **Usuario**: `XFBDGZT`
- **Contraseña**: `D24M01Y25`
- **Almacenamiento**: Variables de entorno (`.env`)

### ✅ **Flujo de Autenticación**

1. **Acceso a `/admin`**

   - Se muestra formulario de login
   - Campos: usuario y contraseña
   - Validación en tiempo real

2. **Verificación de Credenciales**

   - POST a `/api/auth/login`
   - Comparación con variables de entorno
   - Generación de token de sesión

3. **Acceso Autorizado**
   - Token guardado en localStorage
   - Acceso completo al panel de administración
   - Opción de cerrar sesión

### ✅ **Componentes Implementados**

#### **1. AdminLogin.jsx**

- Formulario de autenticación
- Validación de campos
- Manejo de errores
- Estados de carga

#### **2. AdminPanel.jsx**

- Control de estado de autenticación
- Verificación de tokens
- Interfaz completa del panel
- Funcionalidad de logout

#### **3. API /auth/login**

- Validación de credenciales
- Generación de tokens
- Respuestas estructuradas

### ✅ **Seguridad Implementada**

1. **Variables de Entorno**

   ```env
   ADMIN_USERNAME=XFBDGZT
   ADMIN_PASSWORD=D24M01Y25
   ```

2. **Validación Server-Side**

   - Verificación en el backend
   - Tokens de sesión
   - Manejo de errores

3. **Protección de Rutas**
   - Panel solo accesible con autenticación
   - Verificación automática de sesión
   - Redirección a login si no está autenticado

## 🚀 **Cómo Usar**

### **1. Acceder al Panel**

```
http://localhost:4322/admin
```

### **2. Iniciar Sesión**

- **Usuario**: `XFBDGZT`
- **Contraseña**: `D24M01Y25`

### **3. Crear Artículos**

Una vez autenticado, acceso completo al sistema de creación de artículos.

## 🛠 **Estructura de Archivos**

```
src/
├── pages/
│   ├── admin.astro              # Página principal del panel
│   └── api/
│       └── auth/
│           └── login.js         # Endpoint de autenticación
├── components/
│   ├── AdminLogin.jsx           # Formulario de login
│   ├── AdminPanel.jsx           # Panel principal autenticado
│   └── ArticleCreator.jsx       # Creador de artículos (ya existía)
└── .env                         # Variables de entorno (gitignore)
```

## 🔧 **Configuración Técnica**

### **Variables de Entorno**

```env
# .env
ADMIN_USERNAME=XFBDGZT
ADMIN_PASSWORD=D24M01Y25
```

### **API Response Format**

```javascript
// Login exitoso
{
  "success": true,
  "token": "generated_token",
  "message": "Autenticación exitosa"
}

// Login fallido
{
  "success": false,
  "error": "Usuario o contraseña incorrectos"
}
```

## 🛡️ **Consideraciones de Seguridad**

### **Implementación Actual (Desarrollo)**

- Tokens simples con base64
- Validación básica en localStorage
- Adecuado para desarrollo y testing

### **Para Producción (Recomendaciones)**

- Implementar JWT tokens
- Sesiones con expiración
- Rate limiting en login
- Logs de acceso
- HTTPS obligatorio

## ✅ **Funcionalidades Adicionales**

1. **Estado de Carga**: Indicadores visuales durante autenticación
2. **Manejo de Errores**: Mensajes claros para el usuario
3. **Persistencia de Sesión**: Mantiene sesión en localStorage
4. **Logout Seguro**: Limpia tokens y redirige
5. **Interfaz Moderna**: Diseño responsivo con Tailwind CSS

## 🧪 **Testing**

### **Credenciales Correctas**

- Usuario: `XFBDGZT`
- Contraseña: `D24M01Y25`
- Resultado: Acceso completo al panel

### **Credenciales Incorrectas**

- Cualquier otra combinación
- Resultado: Error y no acceso

El sistema está **100% funcional** y protege efectivamente el acceso al panel de administración con las credenciales específicas solicitadas.
