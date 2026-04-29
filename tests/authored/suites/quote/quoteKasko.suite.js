const { test } = require('@playwright/test');
const { loginStep } = require('../../specs/login.spec');
const { quoteManagerFillClientsStep } = require('../../specs/quoteManagerFillClientsStep.spec');
const { quoteManagerFillDetailsKaskoStep } = require('../../specs/quoteManagerFillDetailsKaskoStep.spec');
const { quoteReviewStep } = require('../../specs/quoteReviewStep.spec');
const { quoteApproveStep } = require('../../specs/quoteApproveStep.spec');
const DataUtils = require('../../../../main/utils/data/dataUtils');
const JSONLoader = require('../../../../main/utils/data/JSONLoader');
const Randomizer = require('../../../../main/utils/random/randomizer');
const { quoteManagerFillAnketaKaskoStep } = require('../../specs/quoteManagerFillAnketaKaskoStep.spec');

const loginManager = process.env.LOGIN_MANAGER;
const passwordManager = process.env.PASSWORD_MANAGER;
const loginUnderwriter = process.env.LOGIN_UNDERWRITER;
const passwordUnderwriter = process.env.PASSWORD_UNDERWRITER;

const insuranceTypeData = Randomizer.getRandomInsuranceType('KASKO');
const clients = DataUtils.filterClients(JSONLoader.testClients, { isJuridical: false });
const car = DataUtils.createRandomCarStructure(JSONLoader.testCars);
const { beneficiary, holder } = DataUtils.createRandomClientsStructures(clients);

test.describe('Kasko quote test suite:', () => {
  test('Create and Approve KASKO quote', async ({ page, context }) => {
    const ctx = {};

    await loginStep({ page, context }, loginManager, passwordManager);
    await quoteManagerFillClientsStep({ page }, beneficiary, holder);
    await quoteManagerFillDetailsKaskoStep({ page }, insuranceTypeData, car);
    await quoteManagerFillAnketaKaskoStep({ page });
    await quoteReviewStep({ page }, ctx);
    await loginStep({ page, context }, loginUnderwriter, passwordUnderwriter);
    await quoteApproveStep({ page }, ctx);
  });
});
