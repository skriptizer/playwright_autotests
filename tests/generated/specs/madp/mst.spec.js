import { test, expect } from '@playwright/test';
import DataUtils from '../../../../main/utils/data/dataUtils';
import JSONLoader from '../../../../main/utils/data/JSONLoader';
import kaspiAPI from '../../../authored/API/kaspiAPI';

const madpUrl = process.env.MADP_URL;
const loginAgent = process.env.LOGIN_AGENT;
const passwordAgent = process.env.PASSWORD_AGENT;
const clients = DataUtils.filterClients(JSONLoader.testClients, { isJuridical: false });
const { holder } = DataUtils.createRandomClientsStructures(clients);

test('MST policy issue in MADP', async ({ page }) => {
  await page.goto(madpUrl);
  await page.getByRole('button', { name: 'Вход' }).click();
  await page.getByRole('button', { name: 'По email' }).click();
  await page.locator('div').filter({ hasText: 'Email' }).nth(5).click();
  await page.locator('input[type="text"]').fill(loginAgent);
  await page.locator('div').filter({ hasText: 'Пароль' }).nth(4).click();
  await page.locator('input[type="password"]').fill(passwordAgent);
  await page.getByRole('button', { name: 'Войти' }).click();
  await expect(page.locator('div').filter({ hasText: 'МСТ' }).nth(4)).toBeVisible();
  await page.getByRole('button', { name: '+ Новый полис' }).click();
  await page.getByText('Страна поездки Выбрать +Шенген +Турция +Грузия +Таиланд +ОАЭ').click();
  await expect(page.getByText('Выберите страны ГерманияШенгенШвейцарияЕгипетИрландияФранцияБельгияИталияТунисЯп')).toBeVisible();
  await page.getByRole('textbox', { name: 'Поиск' }).click();
  await page.getByRole('textbox', { name: 'Поиск' }).fill('Германия');
  await page.getByRole('checkbox', { name: ' Германия' }).click();
  await page.getByRole('textbox', { name: 'Поиск' }).click();
  // вернуть когда вернут Англию в 1С
  // await page.getByRole('textbox', { name: 'Поиск' }).fill('Анг');
  // await page.getByRole('checkbox', { name: ' Англия' }).click();
  await page.getByRole('button', { name: 'Готово' }).click();
  await page.getByRole('button', { name: 'Выбрать' }).click();
  await page.locator('.flex.w-full.items-center.font-normal').first().click();
  await page.locator('.van-calendar__day.today-date').click();
  await page.locator('.van-calendar__month').nth(1).getByRole('gridcell', { name: '3', exact: true }).click();
  await page.getByRole('button', { name: /^Выбрать,/ }).click();
  await expect(page.getByText('К оплате')).toBeVisible();
  await page.locator('.vue-slider-dot > div > .icon > svg').click();
  await page.getByRole('button', { name: 'Далее' }).click();
  await page.getByText('Фамилия Имя ИИН').click();
  await page.getByRole('textbox', { name: 'Введите ИИН' }).click();
  await page.getByRole('textbox', { name: 'Введите ИИН' }).fill(holder.iin);
  await DataUtils.waitForResponsesAndAction(
    page,
    [JSONLoader.APIEndpoints.client.getClient],
    page.locator('#main-layout').getByRole('button').click(),
  );
  await page.getByRole('textbox', { name: '7' }).click();
  await page.getByRole('textbox', { name: '777 77 77' }).fill(holder.phone);
  await page.getByRole('button', { name: 'Сохранить' }).click();
  await DataUtils.waitForResponsesAndAction(
    page,
    [JSONLoader.APIEndpoints.mst.setPolicy],
    page.getByRole('button', { name: 'Выписать полис' }).click(),
  );
  await expect(page.getByText('Полис отправлен на оплату')).toBeVisible();
  await page.locator('.van-overlay').last().evaluate((el) => el.click());
  await expect(page.getByRole('button', { name: 'Скопировать ссылку на оплату' })).toBeVisible();
  await page.context().grantPermissions(
    ['clipboard-read', 'clipboard-write'],
    { origin: new URL(madpUrl).origin },
  );
  await page.getByRole('button', { name: 'Скопировать ссылку на оплату' }).click();
  const paymentLink = await page.evaluate(() => navigator.clipboard.readText());
  await page.goto(paymentLink);
  await expect(page.getByText(`Здравствуйте, ${holder.last_name} ${holder.first_name}`)).toBeVisible();
  await page
    .locator('.van-checkbox')
    .filter({ hasText: 'Я согласен' })
    .locator('.van-checkbox__icon')
    .click({ force: true });
  await page.getByRole('checkbox', { name: ' Я разрешаю обработку моих персональных данных' }).click();
  await page.getByRole('button', { name: 'Через Kaspi.kz' }).click();
  await expect(page.getByRole('link', { name: 'Счёт на оплату' })).toBeVisible();
  const code = (await page.locator('span.code').first().innerText()).trim();
  const sumBlockText = await page.locator('div', { hasText: 'К оплате' }).first().innerText();
  const sumMatch = sumBlockText.match(/К оплате\s*([\d\s]+)/i);
  const sumToPay = Number((sumMatch?.[1] ?? '').replace(/\s/g, ''));

  await kaspiAPI.setToken();
  const paymentResponse = await kaspiAPI.pay(code, sumToPay);

  expect(paymentResponse.status).toBe(200);
});
