const { BaseElement } = require('../../../main/baseElement');
const BaseForm = require('../../../main/baseForm');
const Logger = require('../../../main/utils/log/Logger');

class MainPage extends BaseForm {
  constructor(page) {
    super(page, '.ant-row', 'main page');

    this.quotePageButton = new BaseElement(
      page.getByRole('link', { name: 'Котировки' }),
      'Quote page button',
      Logger,
    );
  }

  async clickQuoteButton() {
    await this.quotePageButton.click();
  }
}

module.exports = MainPage;
