import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly loginInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly uniqueElement: Locator;

  constructor(private page: Page) {
    this.loginInput = page.getByLabel("Login");
    this.passwordInput = page.getByLabel("Password");
    this.submitButton = page.getByRole("button", { name: "Login" });
    this.uniqueElement = page.getByRole("heading", { name: "Login" });
  }

  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible();
  }

  async fillLoginAndPassword(login: string, password: string) {
    await this.loginInput.fill(login);
    await this.passwordInput.fill(password);
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }
}
