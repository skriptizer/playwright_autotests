import { test, expect } from "@playwright/test";
import { ExamplePage } from "../pageObjects/example.page";
import { waitReady } from "../../utils/codegen-helpers";

test.describe("Codegen Template", () => {
  test.skip(true, "Template only. Copy and customize into real spec.");

  test("user flow", async ({ page }) => {
    const examplePage = new ExamplePage(page);

    const login = process.env.LOGIN || "test@example.com";
    const password = process.env.PASSWORD || "secret";

    await test.step("Arrange: open app", async () => {
      await examplePage.open();
      await waitReady(page);
      await examplePage.expectOpened();
    });

    await test.step("Act: perform actions", async () => {
      // Paste refined codegen actions here.
      await examplePage.login(login, password);
    });

    await test.step("Assert: verify result", async () => {
      // Replace with business assertion after login.
      await expect(page).toHaveURL(/.+/);
    });
  });
});
