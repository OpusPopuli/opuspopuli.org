/**
 * /maintenance — the page a Cloudflare redirect rule sends the California app's
 * visitors to during an upgrade window. It is reached only through that rule,
 * so it must stay out of search results and out of the sitemap.
 */
import { test, expect } from "@playwright/test";

test.describe("Maintenance page", () => {
  test("explains the outage in English and Spanish", async ({ page }) => {
    await page.goto("/maintenance");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("upgrading");
    const spanish = page.locator('[lang="es"]');
    await expect(spanish).toBeVisible();
    await expect(spanish.getByRole("heading")).toHaveText("En mantenimiento");
  });

  test("offers a contact address and a way back to the home page", async ({ page }) => {
    await page.goto("/maintenance");
    await expect(page.locator('main a[href="mailto:hello@opuspopuli.org"]').first()).toBeVisible();
    await expect(page.locator('main a[href="/"]')).toBeVisible();
  });

  test("is marked noindex", async ({ request }) => {
    const body = await (await request.get("/maintenance")).text();
    expect(body).toContain('name="robots" content="noindex"');
  });

  test("is not linked from the site", async ({ page }) => {
    // Linking it would put a maintenance notice in front of visitors when
    // nothing is down. Only the temporary Cloudflare rule should lead here.
    await page.goto("/");
    await expect(page.locator('a[href*="maintenance"]')).toHaveCount(0);
  });

  test("ordinary pages stay indexable", async ({ request }) => {
    const body = await (await request.get("/about")).text();
    expect(body).not.toContain('name="robots" content="noindex"');
  });
});
