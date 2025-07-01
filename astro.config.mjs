// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  // Modo servidor para APIs dinámicas
  output: "server",
  adapter: vercel(),

  site: "https://yourdomain.vercel.app",

  integrations: [
    mdx(),
    sitemap(),
    react(),
    tailwind({
      applyBaseStyles: false, // Para tener control total sobre los estilos base
    }),
  ],
});
