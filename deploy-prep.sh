#!/bin/bash

# Script para preparar el proyecto para deploy en Vercel

echo "🚀 Preparando proyecto para deploy en Vercel..."

# Limpiar archivos de build anteriores
echo "🧹 Limpiando archivos anteriores..."
rm -rf dist .vercel

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Ejecutar build
echo "🔨 Ejecutando build..."
npm run build

# Verificar archivos generados
echo "✅ Verificando archivos generados..."
if [ -d "dist" ]; then
    echo "✅ Directorio dist creado exitosamente"
    ls -la dist/
else
    echo "❌ Error: No se generó el directorio dist"
    exit 1
fi

echo "🎉 Proyecto listo para deploy!"
echo ""
echo "📋 Variables de entorno requeridas en Vercel:"
echo "- ADMIN_USERNAME"
echo "- ADMIN_PASSWORD" 
echo "- MONGODB_URI"
echo "- MONGODB_DB"
echo ""
echo "📝 Para deployar en Vercel:"
echo "1. vercel --prod"
echo "2. O hacer push a la rama principal si tienes auto-deploy configurado"
