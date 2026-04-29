const { BaseElement } = require('../../../../main/baseElement');
const BaseForm = require('../../../../main/baseForm');
const Logger = require('../../../../main/utils/log/Logger');

class QuotePage1 extends BaseForm {
  constructor(page) {
    super(page, page.getByRole('heading', { name: 'Страхователь' }), 'client info page');

    this.holderIINTextbox = new BaseElement(
      page.getByRole('heading', { name: 'Страхователь' })
        .locator('..')
        .locator('+ div')
        .getByRole('textbox'),
      'holder IIN textbox',
      Logger,
    );

    this.holderSearchButton = new BaseElement(
      page.getByRole('heading', { name: 'Страхователь' })
        .locator('..')
        .locator('+ div')
        .getByRole('button', { name: 'Поиск' }),
      'holder search button',
      Logger,
    );

    this.isInsurersEqualCheckbox = new BaseElement(
      page.getByRole('heading', { name: 'Выгодоприобретатель' })
        .locator('+ div').getByLabel(''),
      'is insurers equal checkbox',
      Logger,
    );

    this.BeneficiaryIINTextbox = new BaseElement(
      page.getByRole('heading', { name: 'Выгодоприобретатель' })
        .locator('..')
        .locator('+ div')
        .getByRole('textbox'),
      'insurer IIN textbox',
      Logger,
    );

    this.insurerSearchButton = new BaseElement(
      page.getByRole('heading', { name: 'Выгодоприобретатель' })
        .locator('..')
        .locator('+ div')
        .getByRole('button', { name: 'Поиск' }),
      'insurer search button',
      Logger,
    );

    this.nextStepButton = new BaseElement(
      page.getByRole('button', { name: 'Далее' }),
      'next step button',
      Logger,
    );

    this.intersectionSkipButton = new BaseElement(
      page.getByRole('button', { name: 'Продолжить' }),
      'intersection skip button',
      Logger,
    );
  }

  async fillHolderIIN(IIN) {
    await this.holderIINTextbox.fill(IIN);
  }

  async fillBeneficiaryIIN(IIN) {
    await this.BeneficiaryIINTextbox.fill(IIN);
  }

  async clickHolderSearchButton() {
    await this.holderSearchButton.click();
  }

  async clickInsurerSearchButton() {
    await this.insurerSearchButton.click();
  }

  async clickIsInsurersEqualCheckbox() {
    await this.isInsurersEqualCheckbox.click();
  }

  async clickIntersectionSkipButton() {
    await this.intersectionSkipButton.click();
  }

  async clickNextStepButton() {
    await this.nextStepButton.click();
  }
}

module.exports = QuotePage1;
