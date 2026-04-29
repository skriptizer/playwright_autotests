const { expect } = require('@playwright/test');
const QuotePage2 = require('../pageObjects/quote/quotePage2');
const QuotePage3 = require('../pageObjects/quote/quotePage3');
const DataUtils = require('../../../main/utils/data/dataUtils');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const Randomizer = require('../../../main/utils/random/randomizer');

const quoteManagerFillDetailsKaskoStep = async ({ page }, insuranceTypeData, car) => {
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

  await quotePage2.chooseRandomChannnelDetail();
  await quotePage2.chooseRandomPeriodUnit();
  await quotePage2.chooseInsurancePeriod(JSONLoader.testData.insurance_period);
  await quotePage2.enableWithoutAgentCommissionCheckbox();
  await quotePage2.chooseRandomEncumbranceRadioButton();
  await quotePage2.chooseGeneralTariff(JSONLoader.testData.tariff);
  await quotePage2.chooseRandomInsuranceTerritory();
  await quotePage2.chooseRandomInsurancePaymentCondition();
  await quotePage2.chooseRandomCostType();
  await quotePage2.chooseRandomAmortizationRadioButton();

  await quotePage2.clickAddCarButton();
  await quotePage2.clickIsCarRegisteredNoRadioButton();
  await quotePage2.fillCarVIN(car.vin);
  await quotePage2.chooseRegistrationRegion(car.region_id);
  await quotePage2.chooseCarType(car.type_id);
  await quotePage2.chooseCarMark(car.mark.KASKO.get);
  await quotePage2.chooseCarModel(car.model.KASKO.get);
  await quotePage2.chooseCarYear(car.year);

  // вернуть когда починят gbd
  // await DataUtils.waitForResponsesAndAction(
  //   page,
  //   JSONLoader.APIEndpoints.casco.vehicles,
  //   await quotePage2.clickSearchCarButton(),
  // );
  await quotePage2.clickSaveCarButton();
  await quotePage2.clickNextStepButton();

  expect(await quotePage3.pageIsDisplayed()).toBeTruthy();
};

module.exports = {
  quoteManagerFillDetailsKaskoStep,
};
