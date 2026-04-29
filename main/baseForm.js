const Logger = require('./utils/log/Logger');

class BaseForm {
  #pageName;

  #uniqueLocator;

  constructor(page, locator, pageName) {
    this.page = page;
    this.#pageName = pageName;

    this.#uniqueLocator = typeof locator === 'string'
      ? page.locator(locator).first()
      : locator.first();
  }

  getUniqueElement() {
    return this.#uniqueLocator;
  }

  async waitPageIsExisting(timeout = 10000) {
    Logger.log(`[inf] ▶ wait ${this.#pageName} is existing`);

    try {
      await this.#uniqueLocator.waitFor({
        state: 'attached',
        timeout,
      });
      return true;
    } catch {
      return false;
    }
  }

  async pageIsVisible() {
    return this.#uniqueLocator.isVisible();
  }

  async pageIsDisplayed() {
    Logger.log(`[inf] ▶ check ${this.#pageName} is displayed`);

    const exists = await this.waitPageIsExisting();

    if (!exists) {
      Logger.log(`[inf] ▶ ${this.#pageName} is not displayed`);
      return false;
    }

    const visible = await this.pageIsVisible();

    Logger.log(
      visible
        ? `[inf] ▶ ${this.#pageName} is displayed`
        : `[inf] ▶ ${this.#pageName} is not displayed`,
    );

    return visible;
  }

  async pageIsEnabled() {
    Logger.log(`[inf] ▶ check ${this.#pageName} is enabled`);

    try {
      await this.#uniqueLocator.waitFor({
        state: 'visible',
        timeout: 10000,
      });

      const enabled = await this.#uniqueLocator.isEnabled();

      Logger.log(
        enabled
          ? `[inf] ▶ ${this.#pageName} is enabled`
          : `[inf] ▶ ${this.#pageName} is not enabled`,
      );

      return enabled;
    } catch {
      Logger.log(`[inf] ▶ ${this.#pageName} is not enabled`);
      return false;
    }
  }
}

module.exports = BaseForm;
