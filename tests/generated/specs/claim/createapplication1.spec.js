import { test, expect } from '@playwright/test';
import moment from 'moment';
import DataUtils from '../../../../main/utils/data/dataUtils';
import JSONLoader from '../../../../main/utils/data/JSONLoader';

const car = DataUtils.createRandomCarStructure(JSONLoader.testCars);
const loginClaimer = process.env.LOGIN_CLAIMER;
const passwordClaimer = process.env.PASSWORD_CLAIMER;
const clients = DataUtils.filterClients(JSONLoader.testClients, { isJuridical: false });
const { holder } = DataUtils.createRandomClientsStructures(clients);

test('Создание заявки, где тип заявителя - Представитель', async ({ page }) => {
  const today = moment().format('DD.MM.YYYY');

  await page
    .goto('/');
  await page
    .getByRole('textbox', { name: '* Логин' })
    .click();
  await page
    .getByRole('textbox', { name: '* Логин' })
    .fill(loginClaimer);
  await page
    .getByRole('textbox', { name: '* Пароль' })
    .click();
  await page
    .getByRole('textbox', { name: '* Пароль' })
    .fill(passwordClaimer);
  await page
    .getByRole('button', { name: 'Войти' })
    .click();
  await expect(page
    .getByText('Урегулирование выплат'))
    .toBeVisible();
  await page
    .getByText('Урегулирование выплат')
    .click();
  await expect(page
    .getByText('ЗаявленияСтрах. событияРаспоряженияРегрессные дела'))
    .toBeVisible();
  await page
    .getByRole('link', { name: 'Заявления' })
    .click();
  await page
    .getByRole('button', { name: 'plus Создать' })
    .click();
  await page
    .getByText('По номеру')
    .click();
  await page
    .getByText('По номеру')
    .nth(1)
    .click();
  await page
    .locator('input[name="policy_number"]')
    .click();
  await page
    .locator('input[name="policy_number"]')
    .fill(JSONLoader.testData.policyForIE);
  await DataUtils.waitForResponsesAndAction(
    page,
    [JSONLoader.APIEndpoints.claim.checkContractByDate,
      JSONLoader.APIEndpoints.claim.getContractByNum],
    page.getByRole('button', { name: 'Найти договор' }).click(),
  );
  await expect(page
    .getByRole('button', { name: 'Создать заявку' }))
    .toBeVisible();
  await page
    .getByRole('button', { name: 'Создать заявку' })
    .click();
  await expect(page
    .getByText('Страховое событиеОснованиеНовоеУрегулированиеСтандартноеПрямоеДатаМестоОписание '))
    .toBeVisible();
  await page
    .getByRole('combobox', { name: '* Место :' })
    .click();
  await page
    .getByText('АБАЙ область')
    .click();
  await page
    .getByRole('textbox', { name: '* Описание места :' })
    .click();
  await page
    .getByRole('textbox', { name: '* Описание места :' })
    .fill('mesto mesto mesto');
  await page
    .getByRole('textbox', { name: '* Описание события :' })
    .click();
  await page
    .getByRole('textbox', { name: '* Описание события :' })
    .fill('sobytie sobytie sobytie');
  await page
    .getByRole('button', { name: 'Заявитель right' })
    .click();
  await expect(page
    .locator('div').filter({ hasText: /^Нерезидент$/ }).nth(4))
    .toBeVisible();
  await page
    .getByRole('combobox', { name: '* Тип :' })
    .click();
  await page.getByText('Представитель').click();
  await page.getByRole('textbox', { name: '* № доверенности :' }).click();
  await page.getByRole('textbox', { name: '* № доверенности :' }).fill('123456');
  await page.locator('#form_item_signer_document_gived_date').click();
  await page.locator('#form_item_signer_document_gived_date').fill(today);
  await page.getByRole('textbox', { name: '* ИИН :' }).click();
  await page.getByRole('textbox', { name: '* ИИН :' }).fill(holder.iin);
  await DataUtils.waitForResponsesAndAction(
    page,
    [JSONLoader.APIEndpoints.client.getClient],
    page.getByRole('button', { name: 'Поиск' }).click(),
  );
  await page
    .getByRole('button', { name: 'Пострадавшие объекты right' })
    .click();
  await expect(page
    .locator('div').filter({ hasText: /^Пострадавший объект 1$/ }))
    .toBeVisible();
  await page
    .getByRole('textbox', { name: '* Гос. номер :' })
    .click();
  await page
    .getByRole('textbox', { name: '* Гос. номер :' })
    .fill(car.reg_num);
  await page
    .getByRole('textbox', { name: '* Номер свид. рег. ТС :' })
    .click();
  await page
    .getByRole('textbox', { name: '* Номер свид. рег. ТС :' })
    .fill(car.reg_cert_num);
  await DataUtils.waitForResponsesAndAction(
    page,
    [JSONLoader.APIEndpoints.claim.vehicles],
    page.getByRole('button', { name: 'Найти' }).click(),
  );
  await page
    .getByRole('textbox', { name: '* Повреждения :' })
    .click();
  await page
    .getByRole('textbox', { name: '* Повреждения :' })
    .fill('повреждения повреждения поврежденияя');
  await page
    .getByRole('spinbutton', { name: '* Сумма ущерба :' })
    .click();
  await page
    .getByRole('spinbutton', { name: '* Сумма ущерба :' })
    .fill('50 0000');
  await page
    .locator('[id="form_item_0.currency_code"]')
    .click();
  await page
    .getByText('Казахстанский тенге')
    .click();
  await page
    .getByRole('combobox', { name: '* Тип СС :' })
    .click();
  await page
    .getByText('ДТП с причинением вреда имуществу', { exact: true })
    .click();
  await expect(page
    .getByRole('button', { name: 'Добавить пострадавший объект' }))
    .toBeVisible();
  await expect(page
    .getByRole('button', { name: 'Заявка right' }))
    .toBeVisible();
  await page
    .getByRole('button', { name: 'Заявка right' })
    .click();
  await expect(page
    .getByRole('heading', { name: 'Выберите тип уведомления для каждой заявки' }))
    .toBeVisible();
  await page
    .getByRole('combobox', { name: '* 1 Заявление СС :' })
    .click();
  await page
    .getByText('По пострадавшему (Заявление о страховом случае)')
    .click();
  await page
    .getByRole('textbox', { name: '* Дата уведомления :' })
    .click();
  await page
    .getByRole('textbox', { name: '* Дата уведомления :' })
    .fill(today);
  await page
    .getByRole('textbox', { name: '* Дата уведомления :' })
    .press('Enter');
  await expect(page
    .getByRole('button', { name: 'Предпросмотр right' }))
    .toBeVisible();
  await page
    .getByRole('button', { name: 'Предпросмотр right' })
    .click();
  await expect(page
    .getByRole('heading', { name: 'Договор' }))
    .toBeVisible();
  await expect(page
    .getByRole('heading', { name: 'Страховое событие' }))
    .toBeVisible();
  await expect(page
    .getByRole('heading', { name: 'Заявитель' }))
    .toBeVisible();
  await expect(page
    .getByRole('heading', { name: 'Пострадавший объект' }))
    .toBeVisible();
  await DataUtils.waitForResponsesAndAction(
    page,
    [JSONLoader.APIEndpoints.claim.isEsbdStable, JSONLoader.APIEndpoints.claim.setInsuranceEvent],
    page.getByRole('button', { name: 'Создать заявку' }).click(),
  );
  await expect(page
    .locator('div').filter({ hasText: 'Страховое событие и заявление успешно созданы!OK' }).nth(4))
    .toBeVisible();
  await page
    .getByRole('button', { name: 'OK' })
    .click();
});
