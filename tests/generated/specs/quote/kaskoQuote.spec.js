import { test, expect } from '@playwright/test';
import DataUtils from '../../../../main/utils/data/dataUtils';
import JSONLoader from '../../../../main/utils/data/JSONLoader';

const loginManager = process.env.LOGIN_MANAGER;
const passwordManager = process.env.PASSWORD_MANAGER;
const loginUnderwriter = process.env.LOGIN_UNDERWRITER;
const passwordUnderwriter = process.env.PASSWORD_UNDERWRITER;
const clients = DataUtils.filterClients(JSONLoader.testClients, { isJuridical: false });
const { holder } = DataUtils.createRandomClientsStructures(clients);

test('Create and Approve KASKO quote', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: '* Логин' }).click();
  await page.getByRole('textbox', { name: '* Логин' }).fill(loginManager);
  await page.getByRole('textbox', { name: '* Пароль' }).click();
  await page.getByRole('textbox', { name: '* Пароль' }).fill(passwordManager);
  await page.getByRole('button', { name: 'Войти' }).click();
  await expect(
    page.getByRole('link', { name: 'bar-chart Котировки' }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'bar-chart Котировки' }).click();
  await expect(
    page.getByRole('button', { name: 'plus Создать котировку' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'plus Создать котировку' }).click();

  await page.locator('#form_item_iin').first().click();
  await page.locator('#form_item_iin').first().fill(holder.iin);
  await page.getByRole('button', { name: 'search Поиск' }).first().click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByLabel('', { exact: true }).check();
  await page.getByRole('switch', { name: 'Да Нет' }).click();
  await page.locator('#rc_select_26').click();
  await page.getByText('Третьи лица').click();
  await page.getByRole('button', { name: 'Сохранить' }).click();
  await page.getByRole('button', { name: 'Далее' }).click();
  await expect(page.getByText('Вид договора')).toBeVisible();
  await page.getByRole('radio', { name: 'Основной' }).check();
  await page.getByRole('combobox', { name: '* Вид страхования' }).click();
  await page.getByText('Страхование автомобильного транспорта').click();
  await page.getByRole('combobox', { name: '* Продукт страхования' }).click();
  await page.getByText('(КАСКО)').click();
  await expect(
    page.locator('div').filter({ hasText: /^Повреждение$/ }),
  ).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Угон$/ })).toBeVisible();
  await expect(page.getByTitle('Утрата (гибель)')).toBeVisible();
  await page.getByRole('combobox', { name: '* Канал продажи' }).click();
  await page.getByText('Автосалоны').click();
  await page.getByRole('combobox', { name: '* Детализация канала' }).click();
  await page.getByText('test').click();
  await page.getByRole('spinbutton', { name: '* Срок страхования' }).click();
  await page
    .getByRole('spinbutton', { name: '* Срок страхования' })
    .fill('365');
  await page.getByRole('combobox', { name: '* Агент' }).click();
  await page
    .getByText(
      'test',
    )
    .click();
  await page
    .getByRole('spinbutton', { name: '* Агентское вознаграждение, %' })
    .click();
  await page
    .getByRole('spinbutton', { name: '* Агентское вознаграждение, %' })
    .fill('5.55');
  await page.getByText('История убытков').click();
  await page.getByRole('checkbox', { name: 'История убытков' }).press('t');
  await page
    .getByRole('textbox', { name: '* Комментарий к истории убытков' })
    .click();
  await page.getByRole('checkbox', { name: 'История убытков' }).press('e');
  await page
    .getByRole('textbox', { name: '* Комментарий к истории убытков' })
    .fill('est');
  await page
    .locator('#form_item_encumbrance')
    .getByRole('radio', { name: 'Да' })
    .check();
  await page.getByRole('spinbutton', { name: 'Тариф (%)' }).click();
  await page.getByRole('spinbutton', { name: 'Тариф (%)' }).fill('3.123456');
  await page
    .getByRole('combobox', { name: '* Территория страхования' })
    .click();
  await page
    .getByText('Казахстан, Российская Федерация', { exact: true })
    .click();
  await page.getByRole('combobox', { name: '* Вариант обслуживания' }).click();
  await page.getByText('Калькуляция размера вреда причиненного ТС').click();
  await page.getByRole('combobox', { name: '* Вид стоимости' }).click();
  await page.getByText('Рыночная').click();
  await page.getByRole('radio', { name: 'Учитывается', exact: true }).check();
  await page.getByText('Безусловная').first().click();
  await page.getByText('Условная', { exact: true }).click();
  await page.locator('.ant-select.ant-select-in-form-item.css-runhvx.ant-select-multiple.ant-select-show-arrow > .ant-select-selector').first().click();
  await page.getByText('От страховой суммы').click();
  await page.getByText('По каждому объекту', { exact: true }).click();
  await page.getByText('По каждому страховому случаю').click();
  await page.getByRole('spinbutton', { name: 'Размер Размер' }).first().click();
  await page.getByRole('spinbutton', { name: 'Размер Размер' }).first().fill('4.35');
  await page.locator('div:nth-child(3) > .mb-6.w-full > .ant-flex > div > .ant-row > .ant-col.ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').first().click();
  await page.getByText('От страховой суммы').nth(5).click();
  await page.locator('div:nth-child(3) > .mb-6.w-full > .ant-flex > div:nth-child(2) > .ant-row > .ant-col.ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-number-group-wrapper > .ant-input-number-wrapper > .ant-input-number-group-addon > .ant-select > .ant-select-selector').first().click();
  await page.locator('div:nth-child(3) > .mb-6.w-full > .ant-flex > div > .ant-row > .ant-col.ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-overflow').first().click();
  await page.getByText('По каждому страховому случаю').nth(5).click();
  await page.getByText('%').nth(5).click();
  await page.getByTitle('Тенге').click();
  await page.getByRole('spinbutton', { name: 'Размер Размер' }).nth(1).click();
  await page.getByRole('spinbutton', { name: 'Размер Размер' }).nth(1).fill('2 0000');
  await expect(page.getByRole('main')).toContainText('Франшиза по повреждению устанавливается в размере 4.35% по всем рискам от страховой суммы, по каждому объекту страхования отдельно, по каждому страховому случаю отдельно.');
  await expect(page.getByRole('main')).toContainText('Франшиза по утрате устанавливается в размере 20 000 (двадцать тысяч) тенге по всем рискам от страховой суммы, по каждому страховому случаю отдельно.');
  await page.getByRole('button', { name: '+ Добавить ТС' }).click();
  await page.getByLabel('Добавление ТС').getByRole('radio', { name: 'Нет' }).check();
  await page.getByRole('textbox', { name: '* VIN код' }).click();
  await page.getByRole('textbox', { name: '* VIN код' }).fill('test');
  await page.getByRole('combobox', { name: '* Регион регистрации' }).click();
  await page.getByText('Алматы').click();
  await page.getByRole('combobox', { name: '* Тип' }).click();
  await page.getByTitle('Легковые').click();
  await page.getByRole('textbox', { name: '* Марка' }).click();
  await page.getByRole('textbox', { name: '* Марка' }).fill('test');
  await page.getByRole('textbox', { name: '* Модель' }).click();
  await page.getByRole('textbox', { name: '* Модель' }).fill('test');
  await page.getByRole('textbox', { name: '* Год выпуска' }).click();
  await page.getByRole('textbox', { name: '* Год выпуска' }).fill('2021');
  await page.getByRole('button', { name: 'Сохранить' }).click();
  await page.getByRole('button', { name: 'Далее' }).click();
  await expect(
    page.getByText('Цели использования автотранспорта', { exact: true }),
  ).toBeVisible();
  await page.getByRole('radio', { name: 'Служебные' }).check();
  await page
    .locator('#form_item_usedAsTaxiOrBus')
    .getByRole('radio', { name: 'Нет' })
    .check();
  await page
    .locator('#form_item_rentedOut')
    .getByRole('radio', { name: 'Да' })
    .check();
  await page
    .locator('#form_item_racingAndEnduranceTests')
    .getByRole('radio', { name: 'Нет' })
    .check();
  await page
    .locator('#form_item_transportExplosives')
    .getByRole('radio', { name: 'Да' })
    .check();
  await page
    .locator('#form_item_otherInsuranceExists')
    .getByRole('radio', { name: 'Нет' })
    .check();
  await page.locator('#form_item_otherUsagePurposes').click();
  await page.locator('#form_item_otherUsagePurposes').fill('test');
  await page.locator('#form_item_otherRiskFactors').click();
  await page.locator('#form_item_otherRiskFactors').fill('test');
  await page.getByRole('button', { name: 'Создать черновик' }).click();
  await expect(page.getByText('Черновик')).toBeVisible();
  const quoteParentId = (await page.getByText('Котировка №').innerText())
    .split('№')[1]
    .match(/\d+/)?.[0];
  await expect(
    page.getByRole('button', { name: 'Отправить на рассмотрение' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Редактировать' }),
  ).toBeVisible();
  await expect(
    page.getByText('test').nth(1),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Отправить на рассмотрение' }).click();
  await page.getByRole('textbox', { name: 'Комментарий менеджера' }).click();
  await page
    .getByRole('textbox', { name: 'Комментарий менеджера' })
    .fill('test');
  await page.getByRole('button', { name: 'Сохранить' }).click();
  await page.locator('span').filter({ hasText: 'Выйти' }).first().click();
  await page.getByRole('textbox', { name: '* Логин' }).click();
  await page.getByRole('textbox', { name: '* Логин' }).fill(loginUnderwriter);
  await page.getByRole('textbox', { name: '* Пароль' }).click();
  await page.getByRole('textbox', { name: '* Пароль' }).fill(passwordUnderwriter);
  await page.getByRole('button', { name: 'Войти' }).click();
  await page.getByRole('link', { name: quoteParentId }).click();
  await page.getByRole('button', { name: 'Продолжить' }).click();
  await page.getByRole('button', { name: 'Одобрить' }).click();
  await page
    .getByRole('textbox', { name: 'Комментарий андеррайтера', exact: true })
    .click();
  await page
    .getByRole('textbox', { name: 'Комментарий андеррайтера', exact: true })
    .fill('testte');
  await page
    .getByRole('textbox', { name: 'Комментарий андеррайтера по бонусам' })
    .click();
  await page
    .getByRole('textbox', { name: 'Комментарий андеррайтера по бонусам' })
    .fill('stte');
  await page.getByRole('button', { name: 'Сохранить' }).click();
});
