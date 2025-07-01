# 🚀 AmerAI Blog - Proyecto Independiente

Blog de Inteligencia Artificial construido con **Astro + React + Tailwind CSS + MongoDB**.

## ✨ Características

- 🎨 **Diseño moderno** con Tailwind CSS
- ⚛️ **Componentes React** integrados en Astro
- 🗃️ **Base de datos MongoDB** para artículos
- 🔐 **Panel de administración** con autenticación
- 💰 **Google AdSense** integrado
- 📱 **Responsive** y optimizado para móviles
- 🚀 **Deploy en Vercel** con APIs serverless

## 🛠️ Stack Tecnológico

- **Framework**: Astro 5.10+
- **Frontend**: React 19 + Tailwind CSS
- **Base de datos**: MongoDB
- **Deploy**: Vercel
- **Modo**: Server (SSR + APIs dinámicas)

## 🚀 Instalación y Desarrollo

### 1. Clonar e instalar dependencias

```bash
git clone <tu-repo>
cd Blog
npm install
```

### 2. Configurar variables de entorno

Copia `.env.example` a `.env` y configura:

```env
MONGODB_URI=mongodb+srv://tu-usuario:tu-password@cluster.mongodb.net/
MONGODB_DB=amerai_blog
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu_password_seguro
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

Visita http://localhost:4321

### 4. Build y preview

```bash
npm run build
npm run preview
```

## 📁 Estructura del Proyecto

```
Blog/
├── src/
│   ├── components/          # Componentes React + Astro
│   │   ├── AdminPanel.jsx   # Panel de administración
│   │   ├── BlogIndex.jsx    # Listado de artículos
│   │   └── ...
│   ├── pages/
│   │   ├── api/             # APIs serverless
│   │   │   ├── articles.js  # CRUD de artículos
│   │   │   ├── auth/        # Autenticación
│   │   │   └── init-db.js   # Inicializar BD
│   │   ├── blog/
│   │   │   ├── index.astro  # Página principal del blog
│   │   │   └── [...slug].astro # Artículos individuales
│   │   ├── admin.astro      # Panel de admin
│   │   └── index.astro      # Homepage
│   ├── lib/
│   │   └── mongodb.js       # Conexión a MongoDB
│   └── styles/
│       └── tailwind.css     # Estilos de Tailwind
├── astro.config.mjs         # Configuración de Astro
├── tailwind.config.js       # Configuración de Tailwind
└── vercel.json             # Configuración de Vercel
```

## 🌐 Deploy en Vercel

### 1. Conectar repositorio

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Importa tu repositorio Git
3. Vercel detectará automáticamente que es un proyecto Astro

### 2. Configurar variables de entorno

En la configuración del proyecto en Vercel, añade:

```
MONGODB_URI=mongodb+srv://...
MONGODB_DB=amerai_blog
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu_password_seguro
```

### 3. Deploy automático

Cada push a la rama principal deployará automáticamente.

## 📊 URLs Disponibles

- `/` - Homepage
- `/blog` - Lista de artículos
- `/blog/[slug]` - Artículo individual
- `/admin` - Panel de administración
- `/api/articles` - API de artículos
- `/api/auth/login` - API de autenticación
- `/api/init-db` - Inicializar base de datos

## 🔧 APIs Disponibles

### Artículos
- `GET /api/articles` - Obtener todos los artículos
- `POST /api/articles` - Crear nuevo artículo
- `GET /api/articles/[slug]` - Obtener artículo por slug

### Autenticación
- `POST /api/auth/login` - Login de administrador

### Base de datos
- `POST /api/init-db` - Inicializar con artículos de ejemplo

## 🎯 Características del Admin

1. **Login seguro** con credenciales de entorno
2. **Crear artículos** con categorías y tags
3. **Vista previa** de artículos antes de publicar
4. **Gestión de categorías**: noticias-ia, tutoriales-ia, modelos-generativos

## 💰 AdSense

El proyecto incluye espacios para anuncios de Google AdSense:
- Banner superior en el blog
- Banner inferior en artículos
- Configurado con client ID: `ca-pub-4946584433561362`

## 🔒 Seguridad

- Variables de entorno para credenciales
- Autenticación básica para admin
- Validación de inputs en APIs
- Rate limiting en producción (Vercel)

## 📱 Responsive Design

- Diseño mobile-first
- Navegación adaptativa
- Imágenes optimizadas
- Tipografía escalable

---

**Desarrollado para AmerAI** 🤖✨

Este proyecto es completamente independiente y no requiere monorepo.
