const { expect } = require('@playwright/test');
const QuoteMainPage = require('../pageObjects/quote/quoteMainPage');
const QuotePage1 = require('../pageObjects/quote/quotePage1');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const MainPage = require('../pageObjects/mainPage');
const QuotePage2 = require('../pageObjects/quote/quotePage2');
const DataUtils = require('../../../main/utils/data/dataUtils');

const quoteManagerFillClientsStep = async ({ page }, beneficiary, holder) => {
  const quoteMainPage = new QuoteMainPage(page);
  const quotePage1 = new QuotePage1(page);
  const quotePage2 = new QuotePage2(page);
  const mainPage = new MainPage(page);

  expect(await mainPage.pageIsDisplayed()).toBeTruthy();

  await mainPage.clickQuoteButton();
  expect(await quoteMainPage.pageIsDisplayed()).toBeTruthy();

  await quoteMainPage.clickCreateQuoteButton();
  expect(await quotePage1.pageIsDisplayed()).toBeTruthy();

  await quotePage1.fillHolderIIN(holder.iin);

  await DataUtils.waitForResponsesAndAction(
    page,
    [JSONLoader.APIEndpoints.client.getClient],
    await quotePage1.clickHolderSearchButton(),
  );
  await quotePage1.clickIntersectionSkipButton();

  await quotePage1.clickIsInsurersEqualCheckbox();
  await quotePage1.fillBeneficiaryIIN(beneficiary.iin);

  await DataUtils.waitForResponsesAndAction(
    page,
    [JSONLoader.APIEndpoints.client.getClient],
    await quotePage1.clickInsurerSearchButton(),
  );
  await quotePage1.clickNextStepButton();

  expect(await quotePage2.pageIsDisplayed()).toBeTruthy();
};

module.exports = {
  quoteManagerFillClientsStep,
};
