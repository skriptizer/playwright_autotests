const BaseForm = require('../../../main/baseForm');
const Logger = require('../../../main/utils/log/Logger');
const { BaseElement } = require('../../../main/baseElement');

class LoginPage extends BaseForm {
  constructor(page) {
    super(page, '#form_item_login', 'Login page');

    this.loginTextbox = new BaseElement(
      page.locator('#form_item_login'),
      'login',
      Logger,
    );

    this.passwordTextbox = new BaseElement(
      page.locator('#form_item_password'),
      'password',
      Logger,
    );

    this.submitButton = new BaseElement(
      page.locator('button[type="submit"]'),
      'submit button',
      Logger,
    );
  }

  async fillLoginAndPassword(login, password) {
    await this.loginTextbox.fill(login);
    await this.passwordTextbox.fill(password);
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }
}

module.exports = LoginPage;
