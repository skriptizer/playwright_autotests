import { expect, Locator, Page } from "@playwright/test";

export class ExamplePage {
  readonly loginInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(private page: Page) {
    this.loginInput = page.locator('xpath=//input[@id="form_item_login"]');
    this.passwordInput = page.locator('xpath=//input[@id="form_item_password"]');
    this.submitButton = page.locator('xpath=//button[@type="submit"]');
  }

  async open() {
    await this.page.goto("/");
  }

  async login(login: string, password: string) {
    await this.loginInput.fill(login);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectOpened() {
    await expect(this.loginInput).toBeVisible();
  }
}
