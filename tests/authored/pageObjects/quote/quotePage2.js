const { BaseElement } = require('../../../../main/baseElement');
const BaseForm = require('../../../../main/baseForm');
const Logger = require('../../../../main/utils/log/Logger');

class QuotePage2 extends BaseForm {
  constructor(page) {
    super(page, page.getByRole('heading', { name: 'Страхователь' }), 'object page');

    this.mainPolicyRadioButton = new BaseElement(
      page.getByRole('radio', { name: 'Основной' }),
      'main policy radio button',
      Logger,
    );

    this.insuranceTypeDropdown = new BaseElement(
      page.getByText('Вид страхования')
        .locator('../..')
        .getByRole('combobox'),
      'insurance type dropdown',
      Logger,
    );

    this.insuranceProductDropdown = new BaseElement(
      page.getByText('Продукт страхования')
        .locator('../..')
        .getByRole('combobox'),
      'insurance product dropdown',
      Logger,
    );

    this.risksDropdown = new BaseElement(
      page.getByText('Риски')
        .locator('../..')
        .getByRole('combobox'),
      'risks dropdown',
      Logger,
    );

    this.salesChannelDropdown = new BaseElement(
      page.getByText('Канал продажи')
        .locator('../..')
        .getByRole('combobox')
        .locator('../..'),
      'sales channel dropdown',
      Logger,
    );

    this.сhannelDetailsDropdown = new BaseElement(
      page.getByText('Детализация канала')
        .locator('../..')
        .getByRole('combobox')
        .locator('../..'),
      'channel details dropdown',
      Logger,
    );

    this.insurancePeriodTextbox = new BaseElement(
      page.getByText('Срок страхования')
        .locator('../..')
        .getByRole('spinbutton'),
      'insurance period textbox',
      Logger,
    );

    this.insurancePeriodUnitDropdown = new BaseElement(
      page.getByText('Срок страхования')
        .locator('../..')
        .getByRole('combobox')
        .locator('../..'),
      'insurance period unit dropdown',
      Logger,
    );

    this.withoutAgentCommissionCheckbox = new BaseElement(
      page.getByRole('checkbox', { name: 'Без агентского вознаграждения' }),
      'without agent commission checkox',
      Logger,
    );

    this.lossHistoryCheckbox = new BaseElement(
      page.getByRole('checkbox', { name: 'История убытков' }),
      'loss history checkox',
      Logger,
    );

    this.lossHistoryCommentTextbox = new BaseElement(
      page.getByRole('textbox', { name: '* Комментарий к истории убытков' }),
      'loss history comment textbox',
      Logger,
    );

    this.encumbranceRadioGroup = new BaseElement(
      page.locator('#form_item_encumbrance'),
      'encumbrance radio group',
      Logger,
    );

    this.generalTariffTextbox = new BaseElement(
      page.getByRole('spinbutton', { name: 'Тариф (%)' }),
      'general tariff textbox',
      Logger,
    );

    this.insuranceTerritoryDropdown = new BaseElement(
      page.getByText('Территория страхования')
        .locator('../..')
        .getByRole('combobox')
        .locator('../..'),
      'insurance territory dropdown',
      Logger,
    );

    this.insurancePaymentConditionDropdown = new BaseElement(
      page.getByText('Вариант обслуживания')
        .locator('../..')
        .getByRole('combobox')
        .locator('../..'),
      'insurance payment condition dropdown',
      Logger,
    );

    this.costTypeDropdown = new BaseElement(
      page.getByText('Вид стоимости')
        .locator('../..')
        .getByRole('combobox')
        .locator('../..'),
      'cost type dropdown',
      Logger,
    );

    this.amortizationRadioGroup = new BaseElement(
      page.locator('#form_item_with_amortization'),
      'amortization radio group',
      Logger,
    );

    this.addCarButton = new BaseElement(
      page.getByRole('button', { name: '+ Добавить ТС' }),
      'add car button',
      Logger,
    );

    this.isCarRegisteredYesRadioButton = new BaseElement(
      page.getByRole('dialog', { name: 'Добавление ТС' }).getByLabel('Да'),
      'is car registered "Да" radio button',
      Logger,
    );

    this.isCarRegisteredNoRadioButton = new BaseElement(
      page.getByRole('dialog', { name: 'Добавление ТС' }).getByLabel('Нет'),
      'is car registered "Нет" radio button',
      Logger,
    );

    this.VINTextbox = new BaseElement(
      page.getByRole('textbox', { name: '* VIN код' }),
      'VIN textbox',
      Logger,
    );

    this.RegistrationRegionDropdown = new BaseElement(
      page.getByText('Регион регистрации')
        .locator('../..')
        .getByRole('combobox')
        .locator('../..'),
      'registration region dropdown',
      Logger,
    );

    this.carTypeDropdown = new BaseElement(
      page.getByText('Тип')
        .locator('../..')
        .getByRole('combobox')
        .locator('../..'),
      'car type dropdown',
      Logger,
    );

    this.carMarkTextbox = new BaseElement(
      page.getByRole('textbox', { name: '* Марка' }),
      'car mark textbox',
      Logger,
    );

    this.carModelTextbox = new BaseElement(
      page.getByRole('textbox', { name: '* Модель' }),
      'car model textbox',
      Logger,
    );

    this.carYearTextbox = new BaseElement(
      page.getByRole('textbox', { name: '* Год выпуска' }),
      'car year textbox',
      Logger,
    );

    this.VINTextbox = new BaseElement(
      page.getByRole('textbox', { name: '* VIN код' }),
      'VIN textbox',
      Logger,
    );

    this.searchCarButton = new BaseElement(
      page.getByRole('button', { name: 'search Поиск' }),
      'search car button',
      Logger,
    );

    this.saveCarButton = new BaseElement(
      page.getByRole('button', { name: 'Сохранить' }),
      'save car button',
      Logger,
    );

    this.nextStepButton = new BaseElement(
      page.getByRole('button', { name: 'Далее' }),
      'next step button',
      Logger,
    );

    this.insuranceAmountGPOTextbox = new BaseElement(
      page.getByRole('spinbutton', { name: '* Страховая сумма' }),
      'insurance amount gpo textbox',
      Logger,
    );

    this.commentObjectGPOTextbox = new BaseElement(
      page.getByRole('textbox', { name: '* Комментарий' }),
      'comment object gpo textbox',
      Logger,
    );
  }

  async clickMainPolicyRadioButton() {
    await this.mainPolicyRadioButton.click();
  }

  async chooseInsuranceTypeCombobox(insuranceType) {
    await this.insuranceTypeDropdown.selectByTypingAndEnter(insuranceType);
  }

  async chooseInsuranceProductCombobox(insuranceProduct) {
    await this.insuranceProductDropdown.selectByTypingAndEnter(insuranceProduct);
  }

  async clickInsurancePeriodUnitDropdown() {
    await this.insurancePeriodUnitDropdown.click();
  }

  async chooseRandomPeriodUnit() {
    await this.insurancePeriodUnitDropdown.selectRandomOption();
  }

  async chooseRandomSalesChannel() {
    await this.salesChannelDropdown.selectRandomOption();
  }

  async chooseRandomRisks() {
    await this.risksDropdown.selectRandomOption();
  }

  async chooseRandomChannnelDetail() {
    await this.сhannelDetailsDropdown.selectRandomOption();
  }

  async chooseInsurancePeriod(period) {
    await this.insurancePeriodTextbox.selectByTypingAndEnter(period);
  }

  async enableWithoutAgentCommissionCheckbox() {
    await this.withoutAgentCommissionCheckbox.check();
  }

  async enableLossHistoryCheckbox() {
    await this.lossHistoryCheckbox.check();
  }

  async chooseLossHistoryComment(comment) {
    await this.lossHistoryCommentTextbox.selectByTypingAndEnter(comment);
  }

  async chooseRandomEncumbranceRadioButton() {
    await this.encumbranceRadioGroup.selectRandomRadio();
  }

  async chooseGeneralTariff(tariff) {
    await this.generalTariffTextbox.selectByTypingAndEnter(tariff);
  }

  async chooseRandomInsuranceTerritory() {
    await this.insuranceTerritoryDropdown.selectRandomOption();
  }

  async chooseRandomInsurancePaymentCondition() {
    await this.insurancePaymentConditionDropdown.selectRandomOption();
  }

  async chooseRandomCostType() {
    await this.costTypeDropdown.selectRandomOption();
  }

  async chooseRandomAmortizationRadioButton() {
    const disabledRadios = this.amortizationRadioGroup.locator.locator('.ant-radio-wrapper-disabled');

    if (await disabledRadios.count() > 0) return;

    await this.amortizationRadioGroup.selectRandomRadio();
  }

  async getInsurancePaymentConditionValue() {
    return (await this.insurancePaymentConditionDropdown.locator.innerText()).trim();
  }

  async isAmortizationRadioDisabled() {
    await this.amortizationRadioGroup.toBeDisabled();
  }

  async clickAddCarButton() {
    await this.addCarButton.click();
  }

  async clickIsCarRegisteredYesRadioButton() {
    await this.isCarRegisteredYesRadioButton.click();
  }

  async clickIsCarRegisteredNoRadioButton() {
    await this.isCarRegisteredNoRadioButton.click();
  }

  async fillCarVIN(VIN) {
    await this.VINTextbox.selectByTypingAndEnter(VIN);
  }

  async chooseRegistrationRegion(regionESBDID) {
    await this.RegistrationRegionDropdown.selectOptionByText(regionESBDID);
  }

  async chooseCarType(carTypeESBDID) {
    await this.carTypeDropdown.selectOptionByText(carTypeESBDID);
  }

  async chooseCarMark(carMark) {
    await this.carMarkTextbox.selectByTypingAndEnter(carMark);
  }

  async chooseCarModel(carModel) {
    await this.carModelTextbox.selectByTypingAndEnter(carModel);
  }

  async chooseCarYear(carYear) {
    await this.carYearTextbox.selectByTypingAndEnter(carYear);
  }

  async clickSearchCarButton() {
    await this.searchCarButton.click();
  }

  async clickSaveCarButton() {
    await this.saveCarButton.click();
  }

  async clickNextStepButton() {
    await this.nextStepButton.click();
  }

  async fillInsuranceAmountGPO(insuranceAmount) {
    await this.insuranceAmountGPOTextbox.selectByTypingAndEnter(insuranceAmount);
  }

  async fillCommentObjectGPO(commentObject) {
    await this.commentObjectGPOTextbox.selectByTypingAndEnter(commentObject);
  }
}
module.exports = QuotePage2;
