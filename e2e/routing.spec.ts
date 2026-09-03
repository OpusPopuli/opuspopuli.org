/**
 * Route redirects.
 *
 * /platform was renamed to /tools because the site argues tools enable and
 * platforms mediate. The old route has to keep working for inbound links.
 */
import { test, expect } from "@playwright/test";

test.describe("Legacy /platform route", () => {
  test("redirects to /tools", async ({ page }) => {
    await page.goto("/platform");
    await expect(page).toHaveURL(/\/tools$/);
  });

  test("carries the deep-link fragment across", async ({ page }) => {
    // Old links were all anchors: /platform#petition-scanner and friends.
    await page.goto("/platform#petition-scanner");
    await expect(page).toHaveURL(/\/tools#petition-scanner$/);
    await expect(page.locator("#petition-scanner")).toBeVisible();
  });

  test("is marked noindex and canonicalised to /tools", async ({ request }) => {
    // Raw fetch: a page.goto() would run the redirect script and return /tools.
    const body = await (await request.get("/platform")).text();
    expect(body).toContain('name="robots" content="noindex"');
    expect(body).toContain('rel="canonical" href="/tools"');
    // No-JS fallback must still move the reader.
    expect(body).toContain('http-equiv="refresh"');
  });
});

test.describe("New /tools route", () => {
  test("serves the tools page and is linked from the header", async ({ page }) => {
    await page.goto("/tools");
    await expect(page).toHaveTitle(/Tools/);
    await page.goto("/");
    await expect(page.locator('header a[href="/tools"]').first()).toBeVisible();
  });
});
