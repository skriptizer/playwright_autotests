const moment = require('moment');
const Randomizer = require('../random/randomizer');
const TimeUtils = require('../time/timeUtils');
const JSONLoader = require('./JSONLoader');
const StrUtils = require('../str/strUtils');

class DataUtils {
  static async waitForResponsesAndAction(page, urls, actionPromise) {
    const responses = urls.map((url) => page.waitForResponse(
      (response) => response.url().includes(url) && response.status() === 200,
    ));

    await Promise.all([...responses, actionPromise]);
  }

  static filterClients(clients, options = {}) {
    const { isResident } = options;
    const { hasPassport } = options;
    const { hasDriverLicence } = options;
    const { isUnderSixtyYearsOld } = options;
    const { isJuridical } = options;
    let filteredClients = [...clients];

    filteredClients = filteredClients.filter((client) => {
      if (isResident !== undefined) {
        return isResident ? client.resident_bool : !client.resident_bool;
      }

      return true;
    });

    filteredClients = filteredClients.filter((client) => {
      if (hasDriverLicence !== undefined) {
        return hasDriverLicence ? client.driving_license : !client.driving_license;
      }

      return true;
    });

    filteredClients = filteredClients.filter((client) => {
      if (hasPassport !== undefined) {
        const hasLetter = /[a-zA-Z]/.test(client.document_number);
        return hasPassport
          ? client.document_type_id === 11 && hasLetter
          : client.document_type_id !== 11;
      }

      return true;
    });

    filteredClients = filteredClients.filter((client) => {
      if (isUnderSixtyYearsOld !== undefined) {
        return isUnderSixtyYearsOld
          ? moment(client.born) > moment().subtract(60, 'years')
          : moment(client.born) <= moment().subtract(60, 'years');
      }

      return true;
    });

    filteredClients = filteredClients.filter((client) => {
      if (isJuridical !== undefined) {
        return isJuridical ? !client.natural_person_bool : client.natural_person_bool;
      }

      return true;
    });

    return filteredClients;
  }

  static createRandomClientsStructures(clientsArr) {
    let randomHolderIndex = 0;
    let randomInsuredIndex = 0;
    let randomBeneficiaryIndex = 0;

    if (clientsArr.length > 1) {
      randomHolderIndex = Randomizer.getRandomInteger(clientsArr.length - 1);

      do {
        randomInsuredIndex = Randomizer.getRandomInteger(clientsArr.length - 1);
      } while (randomInsuredIndex === randomHolderIndex);

      do {
        randomBeneficiaryIndex = Randomizer.getRandomInteger(clientsArr.length - 1);
      } while (randomBeneficiaryIndex === randomHolderIndex
      || randomBeneficiaryIndex === randomInsuredIndex);
    }

    const tempHolder = clientsArr[randomHolderIndex];
    const tempInsured = clientsArr[randomInsuredIndex];
    const tempBeneficiary = clientsArr[randomBeneficiaryIndex];

    const resultHolder = { ...tempHolder };
    const resultInsured = { ...tempInsured };
    const resultBeneficiary = { ...tempBeneficiary };

    resultHolder.document_gived_date = {};
    resultHolder.document_gived_date.YMD = tempHolder.document_gived_date;
    resultHolder.document_gived_date.DMY = TimeUtils
      .reformatDateFromYMDToDMY(tempHolder.document_gived_date);
    resultHolder.born = {};
    resultHolder.born.YMD = tempHolder.born;
    resultHolder.born.DMY = TimeUtils.reformatDateFromYMDToDMY(tempHolder.born);
    resultHolder.date_issue_license = {};
    resultHolder.date_issue_license.YMD = tempHolder.date_issue_license;
    resultHolder.date_issue_license.DMY = TimeUtils
      .reformatDateFromYMDToDMY(tempHolder.date_issue_license);

    resultHolder.iin = tempHolder.iin.toString();
    resultHolder.document_type = JSONLoader
      .dictDocumentType[tempHolder.document_type_id.toString()];

    resultHolder.sex = JSONLoader.dictSexID[tempHolder.sex_id];
    resultHolder.address = JSONLoader.testData.holderAddress;
    resultHolder.email = JSONLoader.testData.holderEmail;
    resultHolder.document_gived_by = JSONLoader.testData.holderDocumentGivedBy;
    resultHolder.document_gived_by_quote = JSONLoader.testData.holderDocumentGivedByQuote;
    resultHolder.pdl = JSONLoader.testData.holderIsPDL;
    resultHolder.driver_certificate_type_id = JSONLoader.testData.holderDriverLicenceType;
    resultHolder.invalid_bool = JSONLoader.testData.holderIsInvalid;
    resultHolder.pensioner_bool = JSONLoader.testData.holderIsPensioner;
    resultHolder.country = JSONLoader.testData.holderCountry;
    resultHolder.region = JSONLoader.testData.holderRegion;
    resultHolder.phone = JSONLoader.testData.holderPhone;
    resultHolder.phoneTrimmed = JSONLoader.testData.holderPhoneTrimmed;
    resultHolder.phoneFormatted = JSONLoader.testData.holderPhoneFormatted;

    resultInsured.document_gived_date = {};
    resultInsured.document_gived_date.YMD = tempInsured.document_gived_date;
    resultInsured.document_gived_date.DMY = TimeUtils
      .reformatDateFromYMDToDMY(tempInsured.document_gived_date);
    resultInsured.born = {};
    resultInsured.born.YMD = tempInsured.born;
    resultInsured.born.DMY = TimeUtils.reformatDateFromYMDToDMY(tempInsured.born);
    resultInsured.date_issue_license = {};
    resultInsured.date_issue_license.YMD = tempInsured.date_issue_license;
    resultInsured.date_issue_license.DMY = TimeUtils
      .reformatDateFromYMDToDMY(tempInsured.date_issue_license);

    resultInsured.iin = tempInsured.iin.toString();
    resultInsured.document_type = JSONLoader
      .dictDocumentType[tempInsured.document_type_id.toString()];

    resultInsured.sex = JSONLoader.dictSexID[tempInsured.sex_id];
    resultInsured.address = JSONLoader.testData.insuredAddress;
    resultInsured.email = JSONLoader.testData.insuredEmail;
    resultInsured.document_gived_by = JSONLoader.testData.insuredDocumentGivedBy;
    resultInsured.pdl = JSONLoader.testData.insuredIsPDL;
    resultInsured.driver_certificate_type_id = JSONLoader.testData.insuredDriverLicenceType;
    resultInsured.invalid_bool = JSONLoader.testData.insuredIsInvalid;
    resultInsured.pensioner_bool = JSONLoader.testData.insuredIsPensioner;

    resultBeneficiary.document_gived_date = {};
    resultBeneficiary.document_gived_date.YMD = tempBeneficiary.document_gived_date;
    resultBeneficiary.document_gived_date.DMY = TimeUtils
      .reformatDateFromYMDToDMY(tempBeneficiary.document_gived_date);
    resultBeneficiary.born = {};
    resultBeneficiary.born.YMD = tempBeneficiary.born;
    resultBeneficiary.born.DMY = TimeUtils.reformatDateFromYMDToDMY(tempBeneficiary.born);
    resultBeneficiary.date_issue_license = {};
    resultBeneficiary.date_issue_license.YMD = tempBeneficiary.date_issue_license;
    resultBeneficiary.date_issue_license.DMY = TimeUtils
      .reformatDateFromYMDToDMY(tempBeneficiary.date_issue_license);

    resultBeneficiary.iin = tempBeneficiary.iin.toString();
    resultBeneficiary.document_type = JSONLoader
      .dictDocumentType[tempBeneficiary.document_type_id.toString()];
    resultBeneficiary.sex = JSONLoader.dictSexID[tempBeneficiary.sex_id];
    resultBeneficiary.address = JSONLoader.testData.beneficiaryAddress;
    resultBeneficiary.email = JSONLoader.testData.beneficiaryEmail;
    resultBeneficiary.document_gived_by = JSONLoader.testData.beneficiaryDocumentGivedBy;
    resultBeneficiary.document_gived_by_quote = JSONLoader.testData.beneficiaryDocumentGivedByQuote;
    resultBeneficiary.pdl = JSONLoader.testData.beneficiaryIsPDL;
    resultBeneficiary.driver_certificate_type_id = JSONLoader.testData.beneficiaryDriverLicenceType;
    resultBeneficiary.invalid_bool = JSONLoader.testData.beneficiaryIsInvalid;
    resultBeneficiary.pensioner_bool = JSONLoader.testData.beneficiaryIsPensioner;

    return { holder: resultHolder, insured: resultInsured, beneficiary: resultBeneficiary };
  }

  static createRandomCarStructure(carsArr) {
    const randomCarIndex = Randomizer.getRandomInteger(carsArr.length - 1);
    const tempCar = carsArr[randomCarIndex];
    const resultCar = { ...tempCar };

    resultCar.dt_reg_cert = {};
    resultCar.dt_reg_cert.YMD = tempCar.dt_reg_cert;
    resultCar.dt_reg_cert.DMY = TimeUtils.reformatDateFromYMDToDMY(tempCar.dt_reg_cert);

    resultCar.year = tempCar.year.toString();
    resultCar.engine_volume = tempCar.engine_volume.toString();

    resultCar.model = {};
    resultCar.model.OGPO = tempCar.model;
    resultCar.model.KASKO = {};
    resultCar.model.KASKO.get = tempCar.model;
    resultCar.model.KASKO.set = tempCar.id !== 1
      ? StrUtils.toTitleCase(tempCar.model)
      : '5 серия';

    resultCar.mark = {};
    resultCar.mark.OGPO = tempCar.mark;
    resultCar.mark.KASKO = {};
    resultCar.mark.KASKO.get = tempCar.mark;
    resultCar.mark.KASKO.set = tempCar.id !== 1 ? StrUtils.toTitleCase(tempCar.mark) : tempCar.mark;

    resultCar.region_id = JSONLoader.testData.carRegion;
    resultCar.type_id = JSONLoader.testData.carType;

    return resultCar;
  }
}

module.exports = DataUtils;
