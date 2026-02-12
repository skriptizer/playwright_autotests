import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../main/BaseForm";

export class LoginPage extends BasePage {
  readonly loginInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(protected page: Page) {
    const uniqueElement = page.locator('//input[@id="form_item_login"]');
    super(page, uniqueElement, "login page");

    this.loginInput = page.locator('//input[@id="form_item_login"]');
    this.passwordInput = page.locator('//input[@id="form_item_password"]');
    this.submitButton = page.locator('//button[@type="submit"]');
  }

  async fillLoginAndPassword(login: string, password: string) {
    await expect(this.loginInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await this.loginInput.fill(login);
    await this.passwordInput.fill(password);
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }
}
