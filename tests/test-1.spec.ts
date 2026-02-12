import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await expect(
    page
      .getByRole("heading", { name: "Playwright enables reliable" })
      .locator("span"),
  ).toBeVisible();
});
