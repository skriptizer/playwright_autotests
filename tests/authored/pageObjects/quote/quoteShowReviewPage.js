const { BaseElement } = require('../../../../main/baseElement');
const BaseForm = require('../../../../main/baseForm');
const Logger = require('../../../../main/utils/log/Logger');

class QuoteShowReviewPage extends BaseForm {
  constructor(page) {
    super(page, page.getByText('На рассмотрении'), 'quote show review page');

    this.approveQuoteButton = new BaseElement(
      page.getByRole('button', { name: 'Одобрить' }),
      'send review quote button',
      Logger,
    );

    this.saveCommentsApproveButton = new BaseElement(
      page.getByText('Одобрение заявки на котировку')
        .locator('..')
        .locator('+ div')
        .getByRole('button', { name: 'Сохранить' }),
      'save comments approve button',
      Logger,
    );

    this.intersectionSkipButton = new BaseElement(
      page.getByRole('button', { name: 'Продолжить' }),
      'intersection skip button',
      Logger,
    );
  }

  async clickApproveQuoteButton() {
    await this.approveQuoteButton.click();
  }

  async clickSaveCommentsApproveButton() {
    await this.saveCommentsApproveButton.click();
  }

  async clickIntersectionSkipButton() {
    await this.intersectionSkipButton.click();
  }
}

module.exports = QuoteShowReviewPage;
