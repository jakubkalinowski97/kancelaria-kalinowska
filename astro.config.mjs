// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: 'https://kancelariakalinowska.pl',
  integrations: [
    sitemap(),
    robotsTxt({
      policy: [{ userAgent: '*', allow: '/' }],
    }),
    tailwind({
      applyBaseStyles: false,
    })
  ],
  output: 'static',
  build: {
    assets: 'assets'
  }
});
