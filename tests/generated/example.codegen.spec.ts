import { test, expect } from "@playwright/test";

test("generated smoke example", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/.*/);
});
