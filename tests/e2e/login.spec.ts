import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test("user can login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(
    process.env.LOGIN || "test@example.com",
    process.env.PASSWORD || "secret",
  );
  await loginPage.assertLoggedIn();
});
