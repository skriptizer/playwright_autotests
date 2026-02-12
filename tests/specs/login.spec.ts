import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageObjects/loginPage";
import { MainPage } from "../pageObjects/mainPage";

test("Login into ADP", async ({ page, context }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);

  // очистка кук
  await context.clearCookies();

  // перехват запроса
  const loginRequest = page.waitForResponse(
    (resp) => resp.url().includes("/login") && resp.status() === 200,
  );

  // открыть страницу
  await page.goto("/");

  // проверка страницы логина
  await loginPage.waitForOpened();

  // действия
  await loginPage.fillLoginAndPassword("user", "pass");
  await loginPage.clickSubmitButton();

  // ожидание ответа
  await loginRequest;

  // проверка главной страницы
  await mainPage.waitForOpened();
});
