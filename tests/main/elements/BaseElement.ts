import { Locator, expect } from "@playwright/test";

export class BaseElement {
  constructor(
    protected locator: Locator,
    protected name: string,
  ) {}

  async click() {
    console.log(`▶ click ${this.name}`);
    await this.locator.click();
  }

  async fill(value: string) {
    console.log(`▶ fill ${this.name} with ${value}`);
    await this.locator.fill(value);
  }

  async text(): Promise<string | null> {
    return await this.locator.textContent();
  }

  async isVisible(): Promise<boolean> {
    return await this.locator.isVisible();
  }

  async expectVisible() {
    await expect(this.locator).toBeVisible();
  }

  async forceClick() {
    await this.locator.click({ force: true });
  }
}
