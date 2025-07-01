# Guía de Troubleshooting para Deployment en Vercel

## Error Solucionado: @tailwindcss/typography

### Problema

```
Error: Cannot find module '@tailwindcss/typography'
```

### Solución Implementada

1. **Movido @tailwindcss/typography a dependencies**: El módulo estaba en devDependencies pero Vercel necesita acceso en runtime.

2. **Configuración corregida en package.json**:

```json
{
  "dependencies": {
    "@tailwindcss/typography": "^0.5.16",
    "tailwindcss": "^3.4.17"
  }
}
```

3. **Configuración en tailwind.config.js**:

```javascript
plugins: [require("@tailwindcss/typography")],
```

## Pasos para Deploy Exitoso

### 1. Variables de Entorno en Vercel

Asegúrate de configurar estas variables en el dashboard de Vercel:

- `ADMIN_USERNAME=XFBDGZT`
- `ADMIN_PASSWORD=D24M01Y25`
- `MONGODB_URI=mongodb+srv://nemrox:WxLLupo2oNRzWB14@blog.se1ktnn.mongodb.net/`
- `MONGODB_DB=Blog`

### 2. Verificación Pre-Deploy

```bash
# Ejecutar script de preparación
./deploy-prep.sh

# O manualmente:
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 3. Archivos Importantes

- `vercel.json`: Configuración específica de Vercel
- `astro.config.mjs`: Adapter de Vercel configurado
- `.env.example`: Plantilla de variables de entorno

## Configuración de Adapter

### astro.config.mjs

```javascript
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  // ...resto de configuración
});
```

## Estructura de Archivos para Vercel

```
apps/astro-blog/
├── dist/                  # Generado por build
├── src/
│   ├── pages/api/        # API routes para Vercel Functions
│   ├── components/       # Componentes React/Astro
│   └── ...
├── package.json          # Dependencies correctas
├── vercel.json           # Configuración de Vercel
└── astro.config.mjs     # Adapter de Vercel
```

## Verificación Post-Deploy

### URLs a Probar

1. **Blog Principal**: `https://tu-dominio.vercel.app/blog`
2. **Admin Panel**: `https://tu-dominio.vercel.app/admin`
3. **API Articles**: `https://tu-dominio.vercel.app/api/articles`
4. **Categorías**: `https://tu-dominio.vercel.app/categoria/noticias-ia`

### Funcionalidades a Verificar

- [ ] Google AdSense ads se cargan
- [ ] Admin login funciona
- [ ] Creación de artículos
- [ ] Conexión a MongoDB
- [ ] Responsive design
- [ ] React components funcionan

## Comandos de Debug

```bash
# Local build test
npm run build

# Local preview
npm run preview

# Vercel CLI deploy
vercel --prod

# Ver logs de Vercel
vercel logs
```

## Problemas Comunes y Soluciones

### 1. Module Not Found

- Verificar que todas las dependencias estén en `dependencies`, no en `devDependencies`
- Limpiar node_modules y reinstalar

### 2. Build Timeout

- Verificar que no haya imports circulares
- Optimizar imágenes y assets

### 3. Runtime Errors

- Verificar variables de entorno
- Comprobar logs de Vercel Functions

### 4. MongoDB Connection

- Verificar que MONGODB_URI sea accesible desde Vercel
- Whitelist IPs de Vercel en MongoDB Atlas (0.0.0.0/0 para Vercel)

## Estado Final

✅ **Completado**:

- Adapter de Vercel configurado
- Dependencies en lugar correcto
- Variables de entorno configuradas
- Build exitoso localmente
- Scripts de preparación creados
- Documentación completa

🚀 **Listo para deploy**
