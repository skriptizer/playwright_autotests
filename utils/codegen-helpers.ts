import { expect, Locator, Page } from "@playwright/test";

export async function waitReady(page: Page) {
  await page.waitForLoadState("domcontentloaded");
}

export async function fillAndTab(locator: Locator, value: string) {
  await locator.fill(value);
  await locator.press("Tab");
}

export async function assertVisible(locator: Locator, message?: string) {
  await expect(locator, message).toBeVisible();
}
