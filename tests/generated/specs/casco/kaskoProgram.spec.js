import { test, expect } from '@playwright/test';

const loginUnderwriter = process.env.LOGIN_UNDERWRITER;
const passwordUnderwriter = process.env.PASSWORD_UNDERWRITER;

test.skip('New casco creating program', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: '* Логин' }).click();
  await page.getByRole('textbox', { name: '* Логин' }).fill(loginUnderwriter);
  await page.getByRole('textbox', { name: '* Пароль' }).click();
  await page.getByRole('textbox', { name: '* Пароль' }).fill(passwordUnderwriter);
  await page.getByRole('button', { name: 'Войти' }).click();
  await expect(page.getByText('Программы страхования')).toBeVisible();
  await page.locator('div').filter({ hasText: /^Программы страхования$/ }).click();
  await expect(page.getByRole('link', { name: 'КАСКО New' })).toBeVisible();
  await page.getByRole('link', { name: 'КАСКО New' }).click();
  await expect(page.getByText('Реестр программ страхования')).toBeVisible();
  await expect(page.getByRole('button', { name: 'plus Создать программу' })).toBeVisible();
  await page.getByRole('button', { name: 'plus Создать программу' }).click();

  // first block
  await expect(page.getByText('Программа страхования')).toBeVisible();
  await page.getByRole('spinbutton', { name: '* Базовый тариф, %' }).click();
  await page.getByRole('spinbutton', { name: '* Базовый тариф, %' }).fill('4');
  await page.getByRole('textbox', { name: '* Название программы info-' }).click();
  await page.getByRole('textbox', { name: '* Название программы info-' }).fill('kasko program generation test');
  await page.getByRole('textbox', { name: '* Краткое название программы' }).click();
  await page.getByRole('textbox', { name: '* Краткое название программы' }).fill('kasko program test');
  await page.getByRole('textbox', { name: '* Срок действия программы' }).click();
  await page.getByText('Сегодня').click();
  await page.getByRole('textbox', { name: 'Конец' }).click();
  await page.locator('div:nth-child(7) > div > .ant-picker-dropdown > .ant-picker-panel-container > .ant-picker-panel-layout > .ant-picker-panel > .ant-picker-date-panel > .ant-picker-header > .ant-picker-header-super-next-btn').click();
  await page.getByRole('table').locator('.ant-picker-cell-start.ant-picker-cell-in-view').click();
  await page.locator('.ant-select-selection-overflow').first().click();
  await page.getByText('1 месяц', { exact: true }).click();
  await page.getByText('2 месяца').click();
  await page.getByText('3 месяца').click();
  await page.getByText('4 месяца').click();
  await page.getByText('5 месяцев').click();
  await page.getByText('6 месяцев').click();
  await page.getByText('7 месяцев').click();
  await page.getByText('8 месяцев').click();
  await page.getByText('9 месяцев').click();
  await page.getByText('10 месяцев').click();
  await page.getByText('11 месяцев').click();
  await page.getByText('12 месяцев').click();
  await page.getByText('Период страхования').click();
  await page.getByRole('combobox', { name: 'Подразделение' }).click();
  await page.getByText('Дата утверждения программыПериод страхования1 месяц2 месяца3 месяца4 месяца5').click();
  await expect(page.getByText('Вид страхователя', { exact: true })).toBeVisible();
  await page.getByLabel('Страхователь').getByText('Юридическое лицо').click();
  await page.getByLabel('Страхователь').getByText('Физическое лицо').click();
  await page.getByLabel('Страхователь').getByText('ИП').click();
  await page.getByRole('tab', { name: 'Выгодоприобретатель по повреждению' }).click();
  await page.getByLabel('Выгодоприобретатель по повреждению').getByText('Юридическое лицо').click();
  await page.getByLabel('Выгодоприобретатель по повреждению').getByText('Физическое лицо').click();
  await page.getByLabel('Выгодоприобретатель по повреждению').getByText('ИП').click();
  await page.getByRole('tab', { name: 'Выгодоприобретатель по утрате' }).click();
  await page.getByLabel('Выгодоприобретатель по утрате').getByText('Юридическое лицо').click();
  await page.getByLabel('Выгодоприобретатель по утрате').getByText('Физическое лицо').click();
  await page.getByLabel('Выгодоприобретатель по утрате').getByText('ИП').click();
  await expect(page.getByText('Задействованные андеррайтеры')).toBeVisible();
  await page.locator('div:nth-child(6) > div > .ant-row > .ant-col.ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-overflow').click();
  await page.getByText('Уланов Евгений Николаевич').nth(1).click();
  await page.getByRole('combobox', { name: '* Канал реализации' }).click();
  await page.getByText('Фронтинг').click();
  await page.getByRole('combobox', { name: 'Группа стран/Страна' }).click();
  await page.getByText('Казахстан, Кыргызстан', { exact: true }).click();
  await page.getByRole('spinbutton', { name: 'Коэффициент' }).click();
  await page.getByRole('spinbutton', { name: 'Коэффициент' }).fill('1');
  await page.locator('div').filter({ hasText: /^Осмотр ТС$/ }).click();
  await page.getByText('Не требуется').click();
  await page.getByRole('button', { name: 'Сохранить' }).click();

  // second block
  await page.locator('#programs-form2').getByRole('button', { name: 'right' }).click();
  await page.locator('.ant-form > div > .ant-row > .ant-col.ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-overflow').first().click();
  await page.getByText('(КАСКО)').click();
  await page.getByText('(Экстра КАСКО)').click();
  await page.getByText('(Гранд КАСКО)').click();
  await page.locator('div').filter({ hasText: /^Продукты страхования$/ }).click();
  await page.locator('#form_item_nettoValue').click();
  await page.locator('#form_item_nettoValue').fill('0');
  await page.locator('#form_item_officialBonus').click();
  await page.locator('#form_item_officialBonus').fill('15');
  await page.locator('#form_item_personalBonus').click();
  await page.locator('#form_item_personalBonus').fill('16');
  await page.locator('#form_item_projectBonus').click();
  await page.locator('#form_item_projectBonus').fill('17');
  await page.locator('#form_item_teamBonus').click();
  await page.locator('#form_item_teamBonus').fill('18');
  await page.locator('.ant-card-body > .space-y-6').click();
  await page.locator('#programs-form2').getByRole('button', { name: 'plus Добавить', exact: true }).click();
  await page.locator('#form_item_nettoValue').nth(1).click();
  await page.locator('#form_item_nettoValue').nth(1).fill('6');
  await page.locator('#form_item_officialBonus').nth(1).click();
  await page.locator('#form_item_officialBonus').nth(1).fill('19');
  await page.locator('#form_item_personalBonus').nth(1).click();
  await page.locator('#form_item_personalBonus').nth(1).fill('20');
  await page.locator('#form_item_projectBonus').nth(1).click();
  await page.locator('#form_item_projectBonus').nth(1).fill('21');
  await page.locator('#form_item_projectBonus').nth(1).click();
  await page.locator('#form_item_teamBonus').nth(1).click();
  await page.locator('#form_item_teamBonus').nth(1).fill('22');
  await page.locator('div:nth-child(4) > .ant-row > .ant-col.ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-overflow').click();
  await page.getByText('Легковые').click();
  await page.locator('div').filter({ hasText: /^Типы ТС$/ }).click();
  await page.locator('div:nth-child(5) > .ant-row > .ant-col.ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-overflow').click();
  await page.getByText('СТО по выбору Страхователя').click();
  await page.getByText('Фирменное СТО Автосалона').click();
  await page.locator('div').filter({ hasText: /^Вариант обслуживания$/ }).click();
  await page.getByText('С амортизацией').click();
  await page.getByRole('checkbox', { name: 'Без амортизации' }).check();
  await page.getByRole('spinbutton', { name: '* Год производства объекта страхования' }).click();
  await page.getByRole('spinbutton', { name: '* Год производства объекта страхования' }).fill('2015');
  await page.locator('#programs-form2').getByRole('button', { name: 'Сохранить' }).click();

  // third block
  await page.locator('div:nth-child(2) > .ant-input-number-input-wrap > .ant-input-number-input').first().click();
  await page.locator('.ant-input-number.w-full.css-1labtzy.ant-input-number-focused > .ant-input-number-input-wrap > .ant-input-number-input').fill('1.2');
  await page.locator('div:nth-child(3) > .ant-input-number-input-wrap > .ant-input-number-input').click();
  await page.locator('.ant-input-number.css-1labtzy.ant-input-number-focused > .ant-input-number-input-wrap > .ant-input-number-input').fill('5');
  await page.locator('.ant-input-number.w-1\\/2 > .ant-input-number-input-wrap > .ant-input-number-input').first().click();
  await page.locator('.ant-input-number.w-1\\/2 > .ant-input-number-input-wrap > .ant-input-number-input').first().fill('15 0000');
  await page.getByRole('tab', { name: 'Безусловная франшиза по утрате' }).click();
  await page.getByLabel('Безусловная франшиза по утрате').getByText('Процент + минимум/максимум в тг').click();
  await page.getByText('Фиксированная сумма').click();
  await page.locator('#rc-tabs-2-panel-2 > .space-y-6 > .space-y-2 > div:nth-child(2) > .ant-input-number.w-full > .ant-input-number-input-wrap > .ant-input-number-input').click();
  await page.locator('.ant-input-number.w-full.css-1labtzy.ant-input-number-focused > .ant-input-number-input-wrap > .ant-input-number-input').fill('1.10');
  await page.locator('.ant-input-number.w-full.css-1labtzy.ant-input-number-focused > .ant-input-number-input-wrap > .ant-input-number-input').press('Enter');
  await page.locator('.grid > .ant-input-group > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').click();
  await page.locator('.ant-input-number.w-1\\/2.css-1labtzy.ant-input-number-focused > .ant-input-number-input-wrap > .ant-input-number-input').fill('20 0000');
  await page.getByLabel('Безусловная франшиза по утрате').getByRole('button', { name: 'plus Добавить' }).click();
  await page.getByLabel('Безусловная франшиза по утрате').getByText('Процент + минимум/максимум в тг').click();
  await page.getByText('Нет франшизы').nth(1).click();
  await page.locator('div:nth-child(3) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').click();
  await page.locator('.ant-input-number.w-full.css-1labtzy.ant-input-number-focused > .ant-input-number-input-wrap > .ant-input-number-input').fill('1.2');
  await page.getByLabel('Безусловная франшиза по утрате').locator('div').filter({ hasText: /^Добавить$/ }).click();
  await page.locator('#programs-form3').getByRole('button', { name: 'Сохранить' }).click();

  // fourth block
  await page.getByRole('button', { name: 'Рассчитать тарифы' }).click();
  await expect(page.getByText('Расчет тарифов займет некоторое время. Нажмите кнопку ниже через 30-60')).toBeVisible();
  const showTariffsButton = page.getByRole('button', { name: 'Отобразить тарифы' });
  const calculateTariffsButton = page.getByRole('button', { name: 'Рассчитать тарифы' });
  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < 10; i += 1) {
    if (await calculateTariffsButton.isVisible()) break;

    await showTariffsButton.click();
    await expect(page.getByText('Расчет тарифов займет некоторое время. Нажмите кнопку ниже через 30-60')).toBeVisible();
    await page.waitForTimeout(1000); // small delay if UI needs time
  }
  await expect(page.getByText('Расчет тарифов завершен')).toBeVisible();
  await page.getByRole('button', { name: 'right 200 (КАСКО)' }).click();
  await page.getByRole('row', { name: 'Агентское вознаграждение   0% 4.8' }).getByLabel('', { exact: true }).check();
  await page.getByRole('row', { name: 'Агентское вознаграждение   0% 4.8' }).getByLabel('', { exact: true }).uncheck();
  await page.getByLabel('', { exact: true }).first().check();
  await page.getByLabel('', { exact: true }).first().uncheck();
  await page.getByRole('button', { name: 'right 203 (Экстра КАСКО)' }).click();
  await page.getByRole('button', { name: 'right 206 (Гранд КАСКО)' }).click();
  await expect(page.getByRole('button', { name: 'Утвердить' })).toBeVisible();
  await page.getByRole('button', { name: 'Утвердить' }).click();
  await expect(page.getByText('Программа успешно утверждена')).toBeVisible();
});
