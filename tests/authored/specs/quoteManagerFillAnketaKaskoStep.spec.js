const QuotePage3 = require('../pageObjects/quote/quotePage3');
const QuoteShowTemplatePage = require('../pageObjects/quote/quoteShowTemplatePage');
const DataUtils = require('../../../main/utils/data/dataUtils');
const JSONLoader = require('../../../main/utils/data/JSONLoader');

const quoteManagerFillAnketaKaskoStep = async ({ page }) => {
  const quotePage3 = new QuotePage3(page);
  const quoteShowTemplatePage = new QuoteShowTemplatePage(page);

  await quotePage3.clickUsagePurposeRadioGroup();
  await quotePage3.clickUsedAsTaxiOrBusRadioGroup();
  await quotePage3.clickRentedOutRadioGroup();
  await quotePage3.clickRacingAndEnduranceTestsRadioGroup();
  await quotePage3.clickTransportExplosivesRadioGroup();
  await quotePage3.clickOtherInsuranceExistsRadioGroup();
  await DataUtils.waitForResponsesAndAction(
    page,
    [JSONLoader.APIEndpoints.quote.create],
    await quotePage3.clickCreateTemplateButton(),
  );

  await quoteShowTemplatePage.pageIsDisplayed();
};

module.exports = {
  quoteManagerFillAnketaKaskoStep,
};
