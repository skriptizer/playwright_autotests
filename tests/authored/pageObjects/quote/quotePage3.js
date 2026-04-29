const path = require('path');
const { BaseElement } = require('../../../../main/baseElement');
const BaseForm = require('../../../../main/baseForm');
const Logger = require('../../../../main/utils/log/Logger');

class QuotePage3 extends BaseForm {
  constructor(page) {
    super(page, page.getByRole('button', { name: 'Создать черновик' }), 'anketa page');

    this.usagePurposeRadioGroup = new BaseElement(
      page.locator('#form_item_usagePurposeId'),
      'usage purpose radio group',
      Logger,
    );

    this.usedAsTaxiOrBusRadioGroup = new BaseElement(
      page.locator('#form_item_usedAsTaxiOrBus'),
      'used as taxi or bus radio group',
      Logger,
    );

    this.rentedOutRadioGroup = new BaseElement(
      page.locator('#form_item_rentedOut'),
      'rented out radio group',
      Logger,
    );

    this.racingAndEnduranceTestsRadioGroup = new BaseElement(
      page.locator('#form_item_racingAndEnduranceTests'),
      'racing and endurance tests radio group',
      Logger,
    );

    this.transportExplosivesRadioGroup = new BaseElement(
      page.locator('#form_item_transportExplosives'),
      'transport explosives radio group',
      Logger,
    );

    this.otherInsuranceExistsRadioGroup = new BaseElement(
      page.locator('#form_item_otherInsuranceExists'),
      'other insurance exists radio group',
      Logger,
    );

    this.createTemplateButton = new BaseElement(
      page.getByRole('button', { name: 'Создать черновик' }),
      'create template button',
      Logger,
    );

    this.uploadAnketaButton = new BaseElement(
      page.getByRole('button', { name: 'upload Выбрать' }).nth(1),
      'upload anketa button',
      Logger,
    );
  }

  async clickUsagePurposeRadioGroup() {
    await this.usagePurposeRadioGroup.selectRandomRadio();
  }

  async clickUsedAsTaxiOrBusRadioGroup() {
    await this.usedAsTaxiOrBusRadioGroup.selectRandomRadio();
  }

  async clickRentedOutRadioGroup() {
    await this.rentedOutRadioGroup.selectRandomRadio();
  }

  async clickRacingAndEnduranceTestsRadioGroup() {
    await this.racingAndEnduranceTestsRadioGroup.selectRandomRadio();
  }

  async clickTransportExplosivesRadioGroup() {
    await this.transportExplosivesRadioGroup.selectRandomRadio();
  }

  async clickOtherInsuranceExistsRadioGroup() {
    await this.otherInsuranceExistsRadioGroup.selectRandomRadio();
  }

  async clickCreateTemplateButton() {
    await this.createTemplateButton.click();
  }

  async uploadFile() {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.uploadAnketaButton.click(), // локатор кнопки загрузки
    ]);
    await fileChooser.setFiles(path.resolve(__dirname, '../../../../resources/data/anketaTestFile.pdf'));
  }
}
module.exports = QuotePage3;
