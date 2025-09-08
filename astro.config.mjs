// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://diana-kalinowska-prawnik.pl',
  integrations: [
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    })
  ],
  output: 'static',
  build: {
    assets: 'assets'
  }
});
