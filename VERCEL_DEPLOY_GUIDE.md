# 🚀 DEPLOY EN VERCEL - GUÍA COMPLETA

## ✅ Repositorio Creado

**GitHub Repository:** https://github.com/diegogzt/amerai-blog

## 🚀 Pasos para Deploy en Vercel

### 1. **Conectar con Vercel**

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Haz clic en **"New Project"**
3. Conecta tu cuenta de GitHub si no lo has hecho
4. Busca el repositorio `amerai-blog`
5. Haz clic en **"Import"**

### 2. **Configuración Automática**

Vercel detectará automáticamente que es un proyecto **Astro** y configurará:

- ✅ **Framework**: Astro
- ✅ **Build Command**: `npm run build`
- ✅ **Output Directory**: `dist`
- ✅ **Install Command**: `npm install`

### 3. **Variables de Entorno CRÍTICAS**

⚠️ **ANTES DE DEPLOY**, configura estas variables en Vercel:

```env
MONGODB_URI=mongodb+srv://tu-usuario:tu-password@cluster.mongodb.net/
MONGODB_DB=amerai_blog
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu_password_seguro_aqui
```

**Cómo configurarlas:**

1. En el proyecto de Vercel, ve a **Settings**
2. Haz clic en **Environment Variables**
3. Añade cada variable una por una
4. Asegúrate de seleccionar **Production**, **Preview**, y **Development**

### 4. **Deploy**

1. Haz clic en **"Deploy"**
2. Espera a que termine el build (2-3 minutos)
3. ¡Tu blog estará live!

### 5. **Configurar Dominio (Opcional)**

1. Ve a **Settings** → **Domains**
2. Añade tu dominio personalizado
3. Actualiza los DNS según las instrucciones de Vercel

## 🔧 URLs Después del Deploy

- **Homepage**: `https://tu-proyecto.vercel.app/`
- **Blog**: `https://tu-proyecto.vercel.app/blog`
- **Admin**: `https://tu-proyecto.vercel.app/admin`
- **API Articles**: `https://tu-proyecto.vercel.app/api/articles`
- **API Login**: `https://tu-proyecto.vercel.app/api/auth/login`
- **Init DB**: `https://tu-proyecto.vercel.app/api/init-db`

## 🗄️ Inicializar Base de Datos

**Después del primer deploy:**

1. Ve a `https://tu-proyecto.vercel.app/api/init-db`
2. Haz un POST request (puedes usar Postman o curl):
   ```bash
   curl -X POST https://tu-proyecto.vercel.app/api/init-db
   ```
3. Esto creará artículos de ejemplo en MongoDB

## 👤 Acceso al Admin

1. Ve a `https://tu-proyecto.vercel.app/admin`
2. Usa las credenciales que configuraste:
   - **Usuario**: El valor de `ADMIN_USERNAME`
   - **Password**: El valor de `ADMIN_PASSWORD`

## 📊 Verificar Todo Funciona

### ✅ Checklist Post-Deploy:

- [ ] **Homepage carga** (`/`)
- [ ] **Blog index carga** (`/blog`)
- [ ] **API articles responde** (`/api/articles`)
- [ ] **Admin panel carga** (`/admin`)
- [ ] **Login funciona** (credenciales correctas)
- [ ] **Crear artículo funciona** (desde admin)
- [ ] **Ver artículo funciona** (`/blog/slug-del-articulo`)
- [ ] **AdSense aparece** (banners de Google)

## 🔄 Updates Automáticos

Cada vez que hagas `git push` a la rama `main`, Vercel automáticamente:

1. Detectará los cambios
2. Hará un nuevo build
3. Deployará la nueva versión

## 🛠️ Comandos Git Útiles

```bash
# Desde tu directorio Blog:
cd /Users/dgtovar/Blog

# Ver estado
git status

# Añadir cambios
git add .

# Commit
git commit -m "Descripción de los cambios"

# Push (deploy automático)
git push origin main
```

## 🆘 Troubleshooting

### Si el build falla:

1. Revisa las **Build Logs** en Vercel
2. Verifica que todas las variables de entorno están configuradas
3. Asegúrate de que `MONGODB_URI` sea válida

### Si las APIs no funcionan:

1. Verifica **Function Logs** en Vercel
2. Comprueba la conexión a MongoDB
3. Revisa que `MONGODB_DB` sea el nombre correcto

### Si el admin no funciona:

1. Verifica `ADMIN_USERNAME` y `ADMIN_PASSWORD`
2. Comprueba que no hay espacios extra en las variables
3. Intenta hacer login con las credenciales exactas

## 🎯 Próximos Pasos

1. **Conectar dominio personalizado**
2. **Configurar Google Analytics**
3. **Optimizar AdSense**
4. **Añadir más contenido**
5. **Configurar backups de MongoDB**

---

## 📞 Support

Si tienes problemas:

1. Revisa los logs en Vercel Dashboard
2. Comprueba la consola del navegador
3. Verifica la conexión a MongoDB Atlas

**¡Tu blog está listo para conquitar el mundo de la IA!** 🤖✨
