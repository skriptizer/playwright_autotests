const { BaseElement } = require('../../../../main/baseElement');
const BaseForm = require('../../../../main/baseForm');
const Logger = require('../../../../main/utils/log/Logger');

class QuoteMainPage extends BaseForm {
  constructor(page) {
    super(page, page.getByRole('heading', { name: 'Котировки' }), 'quote main page');

    this.createQuoteButton = new BaseElement(
      page.getByRole('button', { name: 'plus Создать котировку' }),
      'create quote button',
      Logger,
    );

    this.openQuoteButton = new BaseElement(
      page.getByRole('button', { name: 'plus Создать котировку' }),
      'create quote button',
      Logger,
    );
  }

  async clickCreateQuoteButton() {
    await this.createQuoteButton.click();
  }

  async clickOpenQuoteButton(quoteParentID) {
    await this.page.getByRole('link', { name: quoteParentID }).click();
  }
}

module.exports = QuoteMainPage;
