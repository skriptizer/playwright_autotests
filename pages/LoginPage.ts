import { expect, Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  private emailInput = this.page.getByLabel("Email");
  private passwordInput = this.page.getByLabel("Password");
  private submitButton = this.page.getByRole("button", {
    name: /sign in|login/i,
  });

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
