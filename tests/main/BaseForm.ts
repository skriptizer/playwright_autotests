import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  constructor(
    protected page: Page,
    protected uniqueLocator: Locator,
    protected name: string,
  ) {}

  async waitForOpened() {
    console.log(`▶ wait ${this.name} opened`);
    await expect(this.uniqueLocator).toBeVisible();
  }

  async isOpened(): Promise<boolean> {
    return await this.uniqueLocator.isVisible();
  }

  async isEnabled(): Promise<boolean> {
    return await this.uniqueLocator.isEnabled();
  }
}
