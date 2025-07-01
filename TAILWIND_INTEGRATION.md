# Tailwind CSS en Astro

Este proyecto incluye una configuración completa de Tailwind CSS integrada con Astro, proporcionando un sistema de diseño moderno y eficiente.

## 🚀 Configuración Realizada

### 1. Paquetes Instalados

```bash
npm install -D tailwindcss@^3.4.0 @tailwindcss/typography
npm install @astrojs/tailwind
```

### 2. Configuración de Astro

El archivo `astro.config.mjs` incluye:

```javascript
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false, // Control total sobre estilos base
    }),
  ],
});
```

### 3. Configuración de Tailwind

**`tailwind.config.js`:**

```javascript
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        "astro-gray": {
          50: "#f9fafb",
          // ... más colores personalizados
        },
      },
      fontFamily: {
        atkinson: ["Atkinson Hyperlegible", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
```

## 🎨 Sistema de Diseño

### Colores Personalizados

- **astro-gray**: Paleta de grises personalizada (50-900)
- **Variables CSS**: Mantiene compatibilidad con `--accent`, `--black`, etc.

### Tipografía

- **Font Family**: Atkinson Hyperlegible como fuente principal
- **Responsive**: Escalado automático en diferentes dispositivos
- **Jerarquía**: h1-h6 con tamaños coherentes

### Componentes Predefinidos

#### Botones

```html
<button class="btn-primary">Primario</button>
<button class="btn-secondary">Secundario</button>
<button class="btn">Base</button>
```

#### Cards

```html
<div class="card">
  <h3>Título</h3>
  <p>Contenido</p>
</div>
```

#### Enlaces de Navegación

```html
<a class="nav-link">Enlace</a>
```

### Utilidades Personalizadas

#### Efectos Visuales

```html
<!-- Texto con gradiente -->
<h1 class="gradient-text">Título Llamativo</h1>

<!-- Efecto cristal -->
<div class="glass">Panel translúcido</div>

<!-- Sombra de texto -->
<p class="text-shadow">Texto con sombra</p>
```

#### Responsive

```html
<!-- Ocultar en móvil -->
<div class="mobile-hidden">Solo desktop</div>

<!-- Grid responsivo -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- Contenido -->
</div>
```

## 📱 Breakpoints

| Breakpoint | Tamaño  | Uso                |
| ---------- | ------- | ------------------ |
| `sm`       | 640px+  | Tablet pequeña     |
| `md`       | 768px+  | Tablet             |
| `lg`       | 1024px+ | Desktop            |
| `xl`       | 1280px+ | Desktop grande     |
| `2xl`      | 1536px+ | Desktop muy grande |

## 🎯 Ejemplos de Uso

### Layout Básico

```astro
<div class="max-w-4xl mx-auto p-6">
  <h1 class="text-4xl font-bold text-center mb-8">
    Título Principal
  </h1>
  <div class="prose-custom">
    <!-- Contenido -->
  </div>
</div>
```

### Card Grid

```astro
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="card hover:shadow-xl transition-shadow duration-300">
    <h3 class="text-xl font-semibold mb-3">Título</h3>
    <p class="text-gray-600">Descripción</p>
  </div>
</div>
```

### Formulario

```astro
<form class="space-y-4">
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">
      Campo
    </label>
    <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
  </div>
  <button class="btn-primary w-full">Enviar</button>
</form>
```

## 🛠️ Integración con React

Los componentes React también pueden usar Tailwind:

```jsx
export default function Component() {
  return (
    <div className="card border-2 border-indigo-500">
      <h3 className="text-xl font-semibold text-indigo-600">
        Componente React
      </h3>
      <button className="btn-primary mt-4">Acción</button>
    </div>
  );
}
```

## 📚 Estructura de Archivos

```
src/
  styles/
    tailwind.css         # Configuración principal de Tailwind
    global.css          # Estilos globales (legacy)
  components/
    *.astro             # Componentes con clases Tailwind
  pages/
    tailwind-demo.astro # Demo de componentes
```

## 🎨 Páginas de Demo

- **`/tailwind-demo`** - Showcase completo de componentes y utilidades
- **`/react-demo`** - Componentes React con estilos Tailwind

## ⚡ Optimizaciones

### Producción

- **Purge CSS**: Automático con la integración de Astro
- **Minificación**: Incluida en el build
- **Tree Shaking**: Solo se incluyen las clases utilizadas

### Desarrollo

- **Hot Reload**: Cambios instantáneos
- **IntelliSense**: Autocompletado en VS Code
- **Variant Groups**: Sintaxis moderna disponible

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build optimizado
npm run build

# Preview de producción
npm run preview

# Generar clases Tailwind (manual)
npx tailwindcss -i ./src/styles/tailwind.css -o ./dist/output.css --watch
```

## 🆚 Migración desde CSS Vanilla

### Antes (CSS personalizado)

```css
.header {
  margin: 0;
  padding: 0 1em;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
```

### Después (Tailwind)

```astro
<header class="m-0 px-4 bg-white shadow-sm">
  <!-- Contenido -->
</header>
```

## 📖 Recursos Adicionales

- [Documentación oficial de Tailwind CSS](https://tailwindcss.com/docs)
- [Integración Astro + Tailwind](https://docs.astro.build/en/guides/integrations-guide/tailwind/)
- [Tailwind CSS Typography](https://tailwindcss.com/docs/typography-plugin)
- [Cheat Sheet de Tailwind](https://tailwindcomponents.com/cheatsheet/)

## 🎯 Mejores Prácticas

1. **Usa componentes** para patrones repetitivos
2. **Prefiere utilidades** sobre CSS personalizado
3. **Mantén consistencia** en espaciado y colores
4. **Optimiza para móvil** primero
5. **Aprovecha las variantes** de estado (hover, focus, etc.)

## 🌟 Próximos Pasos

- [ ] Implementar modo oscuro
- [ ] Añadir más componentes personalizados
- [ ] Integrar con sistemas de iconos
- [ ] Optimizar rendimiento avanzado
