const { expect } = require('@playwright/test');
const QuoteShowReviewPage = require('../pageObjects/quote/quoteShowReviewPage');
const QuoteMainPage = require('../pageObjects/quote/quoteMainPage');
const MainPage = require('../pageObjects/mainPage');

const quoteApproveStep = async ({ page }, ctx) => {
  const mainPage = new MainPage(page);
  const quoteShowReviewPage = new QuoteShowReviewPage(page);
  const quoteMainPage = new QuoteMainPage(page);

  await mainPage.clickQuoteButton();
  expect(await quoteMainPage.pageIsDisplayed()).toBeTruthy();

  await quoteMainPage.clickOpenQuoteButton(ctx.quoteParentId);
  expect(await quoteShowReviewPage.pageIsDisplayed()).toBeTruthy();

  await quoteShowReviewPage.clickIntersectionSkipButton();

  await quoteShowReviewPage.clickApproveQuoteButton();
  await quoteShowReviewPage.clickSaveCommentsApproveButton();

  expect(await quoteMainPage.pageIsDisplayed()).toBeTruthy();
};

module.exports = {
  quoteApproveStep,
};
