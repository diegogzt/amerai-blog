# Integración de React con Astro

Este proyecto incluye una configuración completa de React con Astro, permitiendo crear componentes interactivos del lado cliente.

## 🚀 Configuración Realizada

### 1. Paquetes Instalados

```bash
npm install @astrojs/react
npm install react react-dom
npm install -D @types/react @types/react-dom
```

### 2. Configuración de Astro

El archivo `astro.config.mjs` incluye:

```javascript
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
});
```

### 3. Configuración de TypeScript

El archivo `tsconfig.json` fue actualizado para soportar JSX:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

## 📁 Componentes React Incluidos

### 1. ReactCounter.jsx

Un contador interactivo simple que demuestra:

- Estado con `useState`
- Manejo de eventos
- Props básicas

### 2. TodoList.tsx

Una lista de tareas completa con:

- TypeScript
- LocalStorage para persistencia
- Estado complejo
- Props tipadas con interfaces

### 3. Welcome.tsx

Un componente de bienvenida que muestra:

- Props con valores por defecto
- Theming (claro/oscuro)
- Selector de color
- Estado condicional

## 🎯 Directivas de Cliente

### Directivas Disponibles

| Directiva        | Descripción                               | Uso Recomendado                                             |
| ---------------- | ----------------------------------------- | ----------------------------------------------------------- |
| `client:load`    | Hidrata inmediatamente                    | Componentes críticos que necesitan interactividad inmediata |
| `client:idle`    | Hidrata cuando el navegador está inactivo | Componentes de baja prioridad                               |
| `client:visible` | Hidrata cuando entra en viewport          | Componentes que aparecen después del scroll                 |
| `client:media`   | Hidrata según media query                 | Componentes específicos para ciertos dispositivos           |
| `client:only`    | Solo renderiza en cliente                 | SPAs o componentes que no pueden ser SSR                    |
| Sin directiva    | Solo SSR (estático)                       | Componentes puramente informativos                          |

### Ejemplos de Uso

```astro
<!-- Hidratación inmediata -->
<ReactCounter client:load initialValue={0} />

<!-- Hidratación cuando es visible -->
<TodoList client:visible title="Mis Tareas" />

<!-- Hidratación cuando está inactivo -->
<Welcome client:idle name="Usuario" />

<!-- Hidratación condicional -->
<MobileMenu client:media="(max-width: 768px)" />

<!-- Solo en el cliente -->
<Chart client:only="react" data={chartData} />

<!-- Solo SSR (sin interactividad) -->
<StaticInfo data={info} />
```

## 🎨 Mejores Prácticas

### 1. Estrategia de Hidratación

- **client:load**: Solo para componentes críticos que necesitan interactividad inmediata
- **client:visible**: Ideal para componentes que aparecen después del fold
- **client:idle**: Perfecto para componentes secundarios
- **Sin directiva**: Para contenido estático/informativo

### 2. Optimización de Rendimiento

- Minimiza el uso de `client:load`
- Usa `client:visible` para componentes below-the-fold
- Considera componentes estáticos para contenido informativo
- Agrupa componentes similares cuando sea posible

### 3. Estructura de Archivos

```
src/
  components/
    *.jsx     # Componentes React simples
    *.tsx     # Componentes React con TypeScript
  pages/
    *.astro   # Páginas que pueden incluir componentes React
```

## 🚀 Página de Demo

Visita `/react-demo` para ver todos los componentes en acción con diferentes estrategias de hidratación.

## 🔧 Comandos Útiles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de la build
npm run preview
```

## 📚 Recursos Adicionales

- [Documentación oficial de Astro + React](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Directivas de Cliente en Astro](https://docs.astro.build/en/reference/directives-reference/#client-directives)
- [Islas de Astro](https://docs.astro.build/en/concepts/islands/)
