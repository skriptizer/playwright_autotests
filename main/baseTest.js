const path = require('path');
const moment = require('moment-timezone');
const { createWriteStream, readFileSync } = require('fs');
const JSONLoader = require('./utils/data/JSONLoader');
const dictionaryAPI = require('../tests/authored/API/dictionaryAPI');

const configDataFileLocation = path.join(__dirname, '../resources/data/configData.json');
const testCarsFileLocation = path.join(__dirname, '../resources/data/testCars.json');
const testClientsFileLocation = path.join(__dirname, '../resources/data/testClients.json');

class BaseTest {
  static async beforeAll() {
    moment.tz.setDefault(JSONLoader.configData.timezone);

    await dictionaryAPI.setToken();
    await dictionaryAPI.toggleServer();
    await dictionaryAPI.toggleVerification({ fromConfig: true, value: true });

    const cars = await dictionaryAPI.fetchAllTestCars();
    const clients = await dictionaryAPI.fetchAllTestClients();

    await this.writeFile(testCarsFileLocation, cars.data);
    await this.writeFile(testClientsFileLocation, clients.data);

    const configData = JSON.parse(readFileSync(configDataFileLocation, 'utf8'));
    const response = await dictionaryAPI.getESBDValue();

    configData.withESBD = Boolean(JSON.parse(response.data.setting).value);

    await this.writeFile(configDataFileLocation, configData);
  }

  static async writeFile(filePath, data) {
    return new Promise((resolve) => {
      const stream = createWriteStream(filePath);
      stream.write(JSON.stringify(data, null, 2));
      stream.end(resolve);
    });
  }
}

module.exports = BaseTest;
