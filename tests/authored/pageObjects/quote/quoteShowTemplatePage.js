const { BaseElement } = require('../../../../main/baseElement');
const BaseForm = require('../../../../main/baseForm');
const Logger = require('../../../../main/utils/log/Logger');

class QuoteShowTemplatePage extends BaseForm {
  constructor(page) {
    super(page, page.getByText('Черновик'), 'quote show template page');

    this.quoteParentIDLabel = new BaseElement(
      page.getByText('Котировка №'),
      'quote parent id label',
      Logger,
    );

    this.reviewQuoteButton = new BaseElement(
      page.getByRole('button', { name: 'Отправить на рассмотрение' }),
      'send review quote button',
      Logger,
    );

    this.saveCommentsReviewButton = new BaseElement(
      page.getByText('Отправить заявку на рассмотрение')
        .locator('..')
        .locator('+ div')
        .getByRole('button', { name: 'Сохранить' }),
      'save comments review button',
      Logger,
    );
  }

  async clickReviewQuoteButton() {
    await this.reviewQuoteButton.click();
  }

  async getQuoteParentID() {
    const text = await this.page.getByText('Котировка №').innerText();
    return text.split('№')[1].match(/\d+/)?.[0];
  }

  async clickSaveCommentsReviewButton() {
    await this.saveCommentsReviewButton.click();
  }
}

module.exports = QuoteShowTemplatePage;
