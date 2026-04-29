const { expect } = require('@playwright/test');
const QuotePage2 = require('../pageObjects/quote/quotePage2');
const QuotePage3 = require('../pageObjects/quote/quotePage3');
const DataUtils = require('../../../main/utils/data/dataUtils');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const Randomizer = require('../../../main/utils/random/randomizer');

const quoteManagerFillDetailsGPOStep = async ({ page }, insuranceTypeData) => {
  const quotePage2 = new QuotePage2(page);
  const quotePage3 = new QuotePage3(page);

  await quotePage2.clickMainPolicyRadioButton();
  await DataUtils.waitForResponsesAndAction(
    page,
    [
      JSONLoader.APIEndpoints.quote.insuranceTypeProducts,
      JSONLoader.APIEndpoints.quote.CRLR,
    ],
    quotePage2.chooseInsuranceTypeCombobox(insuranceTypeData.name),
  );

  DataUtils.waitForResponsesAndAction(
    page,
    [JSONLoader.APIEndpoints.dictionary.productToRisks],
    await quotePage2.chooseInsuranceProductCombobox(
      insuranceTypeData.products[
        Randomizer.getRandomInteger(insuranceTypeData.products.length - 1, 0)
      ],
    ),
  );

  await DataUtils.waitForResponsesAndAction(
    page,
    [JSONLoader.APIEndpoints.dictionary.channelDetails],
    quotePage2.chooseRandomSalesChannel(),
  );

  await quotePage2.chooseRandomRisks();
  await quotePage2.chooseRandomChannnelDetail();
  await quotePage2.chooseRandomPeriodUnit();
  await quotePage2.chooseInsurancePeriod(JSONLoader.testData.insurance_period);
  await quotePage2.enableWithoutAgentCommissionCheckbox();
  await quotePage2.chooseGeneralTariff(JSONLoader.testData.tariff);
  await quotePage2.chooseRandomInsuranceTerritory();
  await quotePage2.fillInsuranceAmountGPO(String(Randomizer.getRandomInteger(10000000, 1)));
  await quotePage2.fillCommentObjectGPO(
    Randomizer.getRandomString(true, true, true, true, true, 1, 100),
  );
  await quotePage2.clickNextStepButton();

  expect(await quotePage3.pageIsDisplayed()).toBeTruthy();
};

module.exports = {
  quoteManagerFillDetailsGPOStep,
};
