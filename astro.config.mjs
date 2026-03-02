// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://opuspopuli.org',
  integrations: [
    sitemap({
      serialize(item) {
        const highPriority = ['/platform/', '/about/', '/get-involved/'];
        if (item.url === 'https://opuspopuli.org/') {
          item.priority = 1.0;
        } else if (highPriority.some(p => item.url.endsWith(p))) {
          item.priority = 0.8;
        } else {
          item.priority = 0.6;
        }
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
