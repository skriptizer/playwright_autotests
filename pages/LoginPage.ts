import { expect, Page, Locator } from "@playwright/test";

export class LoginPage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = this.page.getByLabel("Email");
    this.passwordInput = this.page.getByLabel("Password");
    this.submitButton = this.page.getByRole("button", {
      name: /sign in|login/i,
    });
  }

  async open(): Promise<void> {
    await this.page.goto("/login");
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async assertLoggedIn(): Promise<void> {
    await expect(this.page).toHaveURL(/dashboard|profile|home/);
  }
}
