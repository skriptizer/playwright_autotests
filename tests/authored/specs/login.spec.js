const { expect } = require('@playwright/test');
const LoginPage = require('../pageObjects/loginPage');
const MainPage = require('../pageObjects/mainPage');
const DataUtils = require('../../../main/utils/data/dataUtils');
const JSONLoader = require('../../../main/utils/data/JSONLoader');

const loginStep = async ({ page, context }, login, password) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);

  await context.clearCookies();
  await page.goto('/');

  expect(await loginPage.pageIsDisplayed()).toBeTruthy();

  await loginPage.fillLoginAndPassword(login, password);

  await DataUtils.waitForResponsesAndAction(
    page,
    [JSONLoader.APIEndpoints.auth.login],
    await loginPage.clickSubmitButton(),
  );

  expect(await mainPage.pageIsDisplayed()).toBeTruthy();
};

module.exports = {
  loginStep,
};
