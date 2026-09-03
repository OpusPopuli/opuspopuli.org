/**
 * Sticky header behaviour.
 *
 * The header is position:sticky, which means an anchor jump would land with
 * the target tucked underneath it unless html carries scroll-padding-top.
 * The site has many deep links (/tools#petition-scanner and friends), so the
 * offset is load-bearing, not cosmetic.
 */
import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "mobile", width: 390, height: 844 },
];

for (const vp of VIEWPORTS) {
  test.describe(`${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test("header stays pinned to the top after scrolling", async ({ page }) => {
      await page.goto("/tools");
      const header = page.locator("header").first();
      await expect(header).toBeInViewport();

      await page.evaluate(() => window.scrollTo(0, 3000));
      await expect(header).toBeInViewport();

      const top = await header.evaluate(el => el.getBoundingClientRect().top);
      expect(Math.round(top)).toBe(0);
    });

    test("anchor targets land clear of the header, not beneath it", async ({ page }) => {
      await page.goto("/tools#petition-scanner");
      const header = page.locator("header").first();
      const target = page.locator("#petition-scanner");
      await expect(target).toBeVisible();

      const headerBottom = await header.evaluate(el => el.getBoundingClientRect().bottom);
      const targetTop = await target.evaluate(el => el.getBoundingClientRect().top);
      expect(targetTop).toBeGreaterThanOrEqual(headerBottom);
    });
  });
}

test("legacy /platform#anchor redirect also lands clear of the header", async ({ page }) => {
  await page.goto("/platform#document-qa");
  await expect(page).toHaveURL(/\/tools#document-qa$/);
  const headerBottom = await page.locator("header").first()
    .evaluate(el => el.getBoundingClientRect().bottom);
  const targetTop = await page.locator("#document-qa")
    .evaluate(el => el.getBoundingClientRect().top);
  expect(targetTop).toBeGreaterThanOrEqual(headerBottom);
});
