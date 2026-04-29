const BaseTest = require('../main/baseTest');

async function globalSetup() {
  await BaseTest.beforeAll();
}

module.exports = globalSetup;
