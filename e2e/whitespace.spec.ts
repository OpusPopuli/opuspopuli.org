/**
 * Rendered spacing around inline links.
 *
 * The copy wraps links mid-sentence across source lines. Astro 7's default
 * 'jsx' whitespace rules drop those line breaks, so "for every one" rendered
 * as "forevery one". astro.config.mjs sets compressHTML: true to keep the
 * lossless behaviour; these sentences fail if that ever regresses.
 */
import { test, expect } from "@playwright/test";

const cases = [
  { path: "/why", text: "the threshold for every one of California’s 58 counties is published" },
  { path: "/why", text: "along with Downs, in the philosophical foundation." },
  { path: "/thresholds", text: "addresses it. See what else we concede." },
];

for (const c of cases) {
  test(`${c.path} keeps the spaces around "${c.text.slice(0, 32)}…"`, async ({ page }) => {
    await page.goto(c.path);
    const text = await page.evaluate(() => document.body.innerText.replace(/\s+/g, " "));
    expect(text).toContain(c.text);
  });
}
