import { test, expect } from '@playwright/test';
import DataUtils from '../../../../main/utils/data/dataUtils';
import JSONLoader from '../../../../main/utils/data/JSONLoader';

const loginManager = process.env.LOGIN_MANAGER;
const passwordManager = process.env.PASSWORD_MANAGER;
const loginUnderwriter = process.env.LOGIN_UNDERWRITER;
const passwordUnderwriter = process.env.PASSWORD_UNDERWRITER;
const clients = DataUtils.filterClients(JSONLoader.testClients, { isJuridical: true });
const { beneficiary, holder } = DataUtils.createRandomClientsStructures(clients);

test('Create and Approve Cargo quote', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: '* Логин' }).click();
  await page.getByRole('textbox', { name: '* Логин' }).fill(loginManager);
  await page.getByRole('textbox', { name: '* Пароль' }).click();
  await page.getByRole('textbox', { name: '* Пароль' }).fill(passwordManager);
  await page.getByRole('button', { name: 'Войти' }).click();
  await page.getByRole('link', { name: 'bar-chart Котировки' }).click();
  await page.getByRole('button', { name: 'plus Создать котировку' }).click();
  await page.getByRole('radio', { name: 'Юр. лицо' }).first().check();
  await page
    .locator('form')
    .filter({
      hasText: 'Вид клиентаЮр. лицоИПФиз. лицоРезидент РКДаНетБИНПоиск',
    })
    .locator('#form_item_iin')
    .click();
  await page
    .locator('form')
    .filter({
      hasText: 'Вид клиентаЮр. лицоИПФиз. лицоРезидент РКДаНетБИНПоиск',
    })
    .locator('#form_item_iin')
    .fill(holder.iin);
  await page
    .locator('form')
    .filter({
      hasText: 'Вид клиентаЮр. лицоИПФиз. лицоРезидент РКДаНетБИНПоиск',
    })
    .getByRole('button')
    .click();
  await expect(
    page.getByText(
      '!Обнаружено пересечение По данному страхователю найдены активные котировки или д',
    ),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByLabel('', { exact: true }).check();
  await page.getByRole('radio', { name: 'Юр. лицо' }).check();
  await page.locator('#form_item_iin').click();
  await page.locator('#form_item_iin').fill(beneficiary.iin);
  await DataUtils.waitForResponsesAndAction(
    page,
    [JSONLoader.APIEndpoints.client.getClient],
    page.getByRole('button', { name: 'search Поиск' }).click(),
  );
  await page.getByRole('button', { name: 'Далее' }).click();
  await page.getByRole('radio', { name: 'Основной' }).check();
  await page.getByRole('combobox', { name: '* Вид страхования' }).click();
  await page.getByRole('combobox', { name: '* Вид страхования' }).type('Страхование грузов');
  await page.getByRole('combobox', { name: '* Вид страхования' }).press('Enter');
  await page.getByRole('combobox', { name: '* Продукт страхования' }).click();
  await page.getByText('(Грузы факультатив)').click();
  await page
    .locator('div')
    .filter({ hasText: /^Риски$/ })
    .click();
  await page
    .getByText(
      'Вид страхованияСтрахование грузов CR: 1, LR: 2 на 21.11.2024Продукт страхования',
    )
    .click();
  await page.locator('.ant-select-selection-overflow').first().click();
  await page
    .getByText('Покрытие "А - с ответственностью за все риски" - повреждение')
    .click();
  await page
    .getByText(
      'Покрытие "В - с ответственностью за частную аварию" - повреждение',
    )
    .click();
  await page
    .getByText(
      'Покрытие "В - с ответственностью за частную аварию" - повреждение',
    )
    .nth(1)
    .click();
  await page
    .getByRole('checkbox', { name: 'Без агентского вознаграждения' })
    .check();
  await page.getByRole('combobox', { name: '* Канал продажи' }).click();
  await page.getByText('Фронтинг').click();
  await page.getByRole('combobox', { name: '* Детализация канала' }).click();
  await page.getByTitle('test').click();
  await page.getByRole('textbox', { name: 'Даты перевозки' }).click();
  await page
    .locator('div')
    .filter({
      hasText:
        'test',
    })
    .nth(5)
    .click();
  await page.getByRole('spinbutton', { name: '* Срок страхования' }).click();
  await page
    .getByRole('spinbutton', { name: '* Срок страхования' })
    .fill('123');
  await page
    .getByText(
      'Без агентского вознаграждения РВД, % История убытков Автоматическое восстановлен',
    )
    .click();
  await page.getByRole('radio', { name: 'Тариф по каждому объекту' }).check();
  await expect(page.getByText('Общий тариф отключён. Укажите тариф в карточке каждого объекта')).toBeVisible();
  await page
    .locator(
      '.ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-overflow',
    )
    .first()
    .click();
  await page.getByTitle('Казахстан').click();
  await page.getByTitle('Германия').click();
  await page.getByText('Соединенные Штаты Америки').click();
  await page.getByRole('button', { name: '+ Добавить объект' }).click();
  await page.getByRole('combobox', { name: '* Категория груза' }).click();
  await page.getByText('- Категории 1,3').click();
  await page.getByRole('combobox', { name: '* Тип транспортировки' }).click();
  await page.getByText('Морская перевозка').click();
  await page.getByRole('textbox', { name: '* Наименование груза' }).click();
  await page
    .getByRole('textbox', { name: '* Наименование груза' })
    .fill('test');
  await page.getByRole('textbox', { name: '* Пункт отправления' }).click();
  await page
    .getByRole('textbox', { name: '* Пункт отправления' })
    .fill('test');
  await page.getByRole('textbox', { name: 'Пункт перегрузки' }).click();
  await page.getByRole('textbox', { name: 'Пункт перегрузки' }).fill('test');
  await page.getByRole('textbox', { name: '* Пункт назначения' }).click();
  await page.getByRole('textbox', { name: '* Пункт назначения' }).fill('test');
  await page.getByRole('button', { name: 'Сохранить' }).click();
  await page.getByRole('spinbutton', { name: '* Страховая сумма' }).click();
  await page
    .getByRole('spinbutton', { name: '* Страховая сумма' })
    .fill('100 0000');
  await page.getByRole('spinbutton', { name: 'Тариф (%)' }).click();
  await page.getByRole('spinbutton', { name: 'Тариф (%)' }).fill('1.234567');
  await page.getByRole('button', { name: '+ Добавить объект' }).click();
  await page.getByRole('combobox', { name: '* Категория груза' }).click();
  await page.getByText('7- Категории').click();
  await page.getByRole('combobox', { name: '* Тип транспортировки' }).click();
  await page.getByText('Авиа+ЖД').click();
  await page.getByRole('textbox', { name: '* Наименование груза' }).click();
  await page
    .getByRole('textbox', { name: '* Наименование груза' })
    .fill('test');
  await page.getByRole('textbox', { name: '* Пункт отправления' }).click();
  await page.getByRole('textbox', { name: '* Пункт отправления' }).fill('test');
  await page.getByRole('textbox', { name: 'Пункт перегрузки' }).click();
  await page.getByRole('textbox', { name: '* Пункт назначения' }).click();
  await page
    .getByRole('textbox', { name: '* Пункт назначения' })
    .fill('test');
  await page.getByRole('button', { name: 'Сохранить' }).click();
  await page.locator('#form_item_cargos_1_insurance_amount').click();
  await page.locator('#form_item_cargos_1_insurance_amount').fill('200 0000');
  await page.locator('#form_item_cargos_1_tariff').click();
  await page.locator('#form_item_cargos_1_tariff').fill('5');
  await page.getByRole('button', { name: 'Далее' }).click();
  await page
    .getByRole('spinbutton', {
      name: 'Сколько лет грузоперевозчик(-и) предоставляет(-ют) свои услуги Страхователю',
    })
    .click();
  await page
    .getByRole('spinbutton', {
      name: 'Сколько лет грузоперевозчик(-и) предоставляет(-ют) свои услуги Страхователю',
    })
    .fill('10');
  await page
    .getByRole('spinbutton', {
      name: 'Сколько лет грузоперевозчик(-и) предоставляет(-ют) свои услуги на рынке',
    })
    .click();
  await page
    .getByRole('spinbutton', {
      name: 'Сколько лет грузоперевозчик(-и) предоставляет(-ют) свои услуги на рынке',
    })
    .fill('3');
  await page
    .locator('#form_item_liabilityInsurance')
    .getByRole('radio', { name: 'Нет' })
    .check();
  await page.getByText('Насыпью').click();
  await page.getByRole('checkbox', { name: 'В цистерне' }).check();
  await page
    .getByRole('checkbox', {
      name: 'В упаковке завода-изготовителя на паллетах',
    })
    .check();
  await page
    .getByRole('checkbox', {
      name: 'В упаковке завода-изготовителя без паллет',
    })
    .check();
  await page
    .getByRole('spinbutton', {
      name: '* Количество единиц транспорта, которые перевозят груз',
    })
    .click();
  await page
    .getByRole('spinbutton', {
      name: '* Количество единиц транспорта, которые перевозят груз',
    })
    .fill('15');
  await page
    .getByRole('combobox', { name: '* Сведения об охране груза' })
    .click();
  await page.getByText('Вооруженная охрана', { exact: true }).click();
  await page
    .getByRole('textbox', {
      name: 'Укажите условия поставки груза в соответствии с правилами ИНКОТЕРМС (если примен',
    })
    .click();
  await page
    .getByRole('textbox', {
      name: 'Укажите условия поставки груза в соответствии с правилами ИНКОТЕРМС (если примен',
    })
    .fill('test');
  await page
    .getByRole('combobox', {
      name: 'При необходимости, укажите дополнительные риски (оплачиваются отдельно)',
    })
    .click();
  await page.getByText('Риск военных действий').click();
  await page
    .getByRole('combobox', { name: '* Сведения об источниках финансирования' })
    .click();
  await page.getByText('Доход от предпринимательской деятельности').click();
  await page
    .locator('#form_item_gosBuy')
    .getByRole('radio', { name: 'Да' })
    .check();
  await page
    .locator('#form_item_gosCompany')
    .getByRole('radio', { name: 'Да' })
    .check();
  await page
    .getByRole('spinbutton', {
      name: '* Процент доли Государственного участия',
    })
    .click();
  await page
    .getByRole('spinbutton', {
      name: '* Процент доли Государственного участия',
    })
    .fill('15');
  await page.getByRole('button', { name: 'Создать черновик' }).click();
  await expect(page.getByText('Черновик')).toBeVisible();
  const quoteParentId = (await page.getByText('Котировка №').innerText())
    .split('№')[1]
    .match(/\d+/)?.[0];
  await expect(
    page.getByRole('button', { name: 'Редактировать' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Отправить на рассмотрение' }),
  ).toBeVisible();
  await expect(page.getByText('(Грузы факультатив)')).toBeVisible();
  await expect(page.getByText('Страхование грузов')).toBeVisible();
  await expect(
    page.getByText(
      'Покрытие "А - с ответственностью за все риски" - повреждение',
    ),
  ).toBeVisible();
  await expect(page.getByText('Общая страховая сумма: 3 000')).toBeVisible();
  await expect(page.getByText('Общая страховая премия: 112')).toBeVisible();
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
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByRole('button', { name: 'Одобрить' })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Редактировать' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Отправить на доработку' }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Отказать' })).toBeVisible();
  await page.getByRole('button', { name: 'Одобрить' }).click();
  await page
    .getByRole('textbox', { name: 'Комментарий андеррайтера', exact: true })
    .click();
  await page
    .getByRole('textbox', { name: 'Комментарий андеррайтера', exact: true })
    .fill('testt');
  await page
    .getByRole('textbox', { name: 'Комментарий андеррайтера по бонусам' })
    .click();
  await page
    .getByRole('textbox', { name: 'Комментарий андеррайтера по бонусам' })
    .fill('test');
  await page.getByRole('button', { name: 'Сохранить' }).click();
});
