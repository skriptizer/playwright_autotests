const BaseTest = require('../main/baseTest');

async function globalTeardown() {
  await BaseTest.afterAll();
}

module.exports = globalTeardown;
