class BaseElement {
  constructor(locator, name, logger) {
    this.locator = locator;
    this.name = name;
    this.logger = logger;
  }

  async click(options) {
    this.logger?.log('[inf] ▶ click', { name: this.name });
    await this.locator.click(options);
  }

  async fill(value, options) {
    this.logger?.log('[inf] ▶ fill', { name: this.name, value });
    await this.locator.fill(value, options);
  }

  async check(options) {
    this.logger?.log('[inf] ▶ check', { name: this.name });
    await this.locator.check(options);
  }

  async press(key, options) {
    this.logger?.log('[inf] ▶ press', { name: this.name, key });
    await this.locator.press(key, options);
  }

  async isVisible(options) {
    return this.locator.isVisible(options);
  }

  async selectRandomOption() {
    this.logger?.log(`[inf] ▶ selectRandomOption: ${this.name}`);
    const page = this.locator.page();
    await this.locator.scrollIntoViewIfNeeded();
    await this.locator.click();
    const dropdown = page.locator('.ant-select-dropdown:visible');
    await dropdown.waitFor({ state: 'visible', timeout: 10000 });
    const options = dropdown.locator('.ant-select-item-option');
    await options.first().waitFor({ state: 'visible', timeout: 10000 });
    const enabledOptions = options.filter({
      hasNot: dropdown.locator('.ant-select-item-option-disabled'),
    });
    const count = await enabledOptions.count();
    if (!count) {
      throw new Error(`Нет доступных опций: ${this.name}`);
    }
    const randomIndex = Math.floor(Math.random() * count);
    const option = enabledOptions.nth(randomIndex);
    const contentLocator = option.locator('.ant-select-item-option-content');
    const optionText = (await contentLocator.innerText()).trim();
    await option.click();

    await page.keyboard.press('Escape');
    await dropdown.waitFor({ state: 'hidden', timeout: 10000 });

    const selectedItem = this.locator.locator('.ant-select-selection-item');
    let selectedText;
    if (await selectedItem.count()) {
      selectedText = (await selectedItem.first().innerText()).trim();
    } else {
      selectedText = (await this.locator.innerText()).trim();
    }
    const finalText = selectedText || optionText;
    this.logger?.log(
      `[inf] ✔ option selected: ${this.name} -> "${finalText}" (index=${randomIndex})`,
    );
    return finalText;
  }

  async selectOptionByText(optionText) {
    this.logger?.log(`[inf] ▶ selectOptionByText: ${this.name} -> "${optionText}"`);
    const page = this.locator.page();
    await this.locator.scrollIntoViewIfNeeded();
    await this.locator.click();
    const dropdown = page.locator('.ant-select-dropdown:visible');
    await dropdown.waitFor({ state: 'visible', timeout: 10000 });
    const option = dropdown.locator('.ant-select-item-option', { hasText: optionText }).first();
    await option.waitFor({ state: 'visible', timeout: 10000 });
    await option.click();
    await dropdown.waitFor({ state: 'hidden', timeout: 10000 });
    this.logger?.log(`[inf] ✔ option selected: ${this.name} -> "${optionText}"`);
    return optionText;
  }

  async selectByTypingAndEnter(text) {
    this.logger?.log(`[inf] ▶ selectByTypingAndEnter: ${this.name} -> "${text}"`);
    const page = this.locator.page();
    await this.locator.click();
    await this.locator.fill(text);
    await this.locator.press('Enter');
    await page.locator('.ant-select-dropdown:visible').waitFor({ state: 'hidden', timeout: 10000 });
    this.logger?.log(`[inf] ✔ selected: ${this.name} -> "${text}"`);
  }

  async selectRandomRadio() {
    this.logger?.log(`[inf] ▶ selectRandomRadio: ${this.name}`);
    const radios = this.locator.locator('.ant-radio-wrapper:visible');
    await radios.first().waitFor({ state: 'visible', timeout: 10000 });
    const count = await radios.count();
    if (!count) {
      throw new Error(`Radio buttons not found: ${this.name}`);
    }
    const randomIndex = Math.floor(Math.random() * count);
    const radio = radios.nth(randomIndex);
    const labelText = (await radio.innerText()).trim();
    await radio.scrollIntoViewIfNeeded();
    await radio.click();
    this.logger?.log(
      `[inf] ✔ random radio selected: ${this.name} -> "${labelText}" (index=${randomIndex})`,
    );
    return labelText;
  }

  async isDisabled() {
    if (await this.locator.isDisabled().catch(() => false)) {
      return true;
    }

    const aria = await this.locator.getAttribute('aria-disabled');
    if (aria === 'true') {
      return true;
    }

    const classAttr = await this.locator.getAttribute('class');
    if (classAttr?.includes('disabled')) {
      return true;
    }

    return false;
  }
}

module.exports = {
  BaseElement,
};
