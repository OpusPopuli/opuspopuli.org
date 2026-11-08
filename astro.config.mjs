// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://opuspopuli.org',
  // Astro 7 defaults to 'jsx' whitespace rules, which drop the line break
  // between a word and a link on the next source line ("forevery",
  // "countiesis"). The copy here is prose with links wrapped mid-sentence, so
  // keep Astro 5's lossless compression, which preserves rendered spacing.
  compressHTML: true,
  integrations: [
    sitemap({
      // /platform is a noindex redirect stub to /tools, not a page.
      // /maintenance is only reached through a temporary Cloudflare redirect
      // from the app's domain while a node is being upgraded.
      filter: page => !page.endsWith('/platform/') && !page.endsWith('/maintenance/'),
      serialize(item) {
        const highPriority = ['/tools/', '/about/', '/why/', '/foundation/', '/thresholds/', '/get-involved/'];
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
