const { expect } = require('@playwright/test');
const QuoteShowTemplatePage = require('../pageObjects/quote/quoteShowTemplatePage');
const QuoteMainPage = require('../pageObjects/quote/quoteMainPage');

const quoteReviewStep = async ({ page }, ctx) => {
  const quoteShowTemplatePage = new QuoteShowTemplatePage(page);
  const quoteMainPage = new QuoteMainPage(page);

  ctx.quoteParentId = await quoteShowTemplatePage.getQuoteParentID();
  await quoteShowTemplatePage.clickReviewQuoteButton();
  await quoteShowTemplatePage.clickSaveCommentsReviewButton();

  expect(await quoteMainPage.pageIsDisplayed()).toBeTruthy();
};

module.exports = {
  quoteReviewStep,
};
