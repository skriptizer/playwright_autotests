const { test } = require('@playwright/test');
const { loginStep } = require('../../specs/login.spec');
const { quoteManagerFillClientsStep } = require('../../specs/quoteManagerFillClientsStep.spec');
const { quoteManagerFillDetailsGPOStep } = require('../../specs/quoteManagerFillDetailsGPOStep.spec');
const { quoteReviewStep } = require('../../specs/quoteReviewStep.spec');
const { quoteApproveStep } = require('../../specs/quoteApproveStep.spec');
const DataUtils = require('../../../../main/utils/data/dataUtils');
const JSONLoader = require('../../../../main/utils/data/JSONLoader');
const Randomizer = require('../../../../main/utils/random/randomizer');
const { quoteManagerFillAnketaGPOStep } = require('../../specs/quoteManagerFillAnketaGPOStep.spec');

const loginManager = process.env.LOGIN_MANAGER;
const passwordManager = process.env.PASSWORD_MANAGER;
const loginUnderwriter = process.env.LOGIN_UNDERWRITER;
const passwordUnderwriter = process.env.PASSWORD_UNDERWRITER;

const insuranceTypeData = Randomizer.getRandomInsuranceType('GPO');
const clients = DataUtils.filterClients(JSONLoader.testClients, { isJuridical: false });
const car = DataUtils.createRandomCarStructure(JSONLoader.testCars);
const { beneficiary, holder } = DataUtils.createRandomClientsStructures(clients);

test.describe('GPO quote test suite:', () => {
  test('Create and Approve GPO quote', async ({ page, context }) => {
    const ctx = {};

    await loginStep({ page, context }, loginManager, passwordManager);
    await quoteManagerFillClientsStep({ page }, beneficiary, holder);
    await quoteManagerFillDetailsGPOStep({ page }, insuranceTypeData, car);
    await quoteManagerFillAnketaGPOStep({ page });
    await quoteReviewStep({ page }, ctx);
    await loginStep({ page, context }, loginUnderwriter, passwordUnderwriter);
    await quoteApproveStep({ page }, ctx);
  });
});
