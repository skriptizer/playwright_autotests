import { test, expect } from '@playwright/test';
import moment from 'moment';
import DataUtils from '../../../../main/utils/data/dataUtils';
import JSONLoader from '../../../../main/utils/data/JSONLoader';

const loginManager = process.env.LOGIN_MANAGER;
const passwordManager = process.env.PASSWORD_MANAGER;
const clients = DataUtils.filterClients(JSONLoader.testClients, { isJuridical: false });
const car = DataUtils.createRandomCarStructure(JSONLoader.testCars);
const { beneficiary, holder, insured } = DataUtils.createRandomClientsStructures(clients);

test('New casco policy issue', async ({ page }) => {
  const today = moment().format('DD.MM.YYYY');

  // login page
  await page
    .goto('/');
  await page
    .getByRole('textbox', { name: '* Логин' })
    .click();
  await page
    .getByRole('textbox', { name: '* Логин' })
    .fill(loginManager);
  await page
    .getByRole('textbox', { name: '* Пароль' })
    .click();
  await page
    .getByRole('textbox', { name: '* Пароль' })
    .fill(passwordManager);
  await page
    .getByRole('button', { name: 'Войти' })
    .click();

  // main page
  await expect(page
    .getByRole('link', { name: 'КАСКО Новый полис' })
    .nth(1))
    .toBeVisible();
  await page
    .getByRole('link', { name: 'КАСКО Новый полис' }).nth(1)
    .click();
  await page
    .getByRole('button', { name: 'plus Создать полис' })
    .click();

  // step 1
  await expect(page
    .getByText('Выберите агента для оформления полисаАгентПропуститьДалее'))
    .toBeVisible();
  await page
    .getByLabel('Выберите агента для оформления полиса')
    .getByRole('button', { name: 'Пропустить' })
    .click();
  await expect(page
    .getByText('Предварительный расчетТип ТСГод выпускаСтрана производстваДругоеКитайТребуется о'))
    .toBeVisible();
  await page
    .getByRole('combobox', { name: '* Тип ТС' })
    .click();
  await page
    .getByText('Легковые').click();
  await page
    .getByRole('spinbutton', { name: '* Год выпуска' })
    .click();
  await page
    .getByRole('spinbutton', { name: '* Год выпуска' })
    .fill(car.year);
  await page
    .locator('div')
    .filter({ hasText: /^ДругоеКитай$/ }).nth(1)
    .click();
  await page
    .getByRole('radio', { name: 'Другое' })
    .check();
  await page
    .locator('div')
    .filter({ hasText: /^ДаНет$/ }).nth(1)
    .click();
  await page
    .getByRole('radio', { name: 'Да' })
    .check();
  await page
    .getByRole('spinbutton', { name: '* Количество ТС' })
    .click();
  await page
    .getByRole('spinbutton', { name: '* Количество ТС' })
    .fill('1');
  await page
    .getByRole('spinbutton', { name: '* Страховая сумма' })
    .click();
  await page
    .getByRole('spinbutton', { name: '* Страховая сумма' })
    .fill('10 0000');
  await page
    .getByRole('button', { name: 'Подобрать тариф' })
    .click();
  await expect(page
    .getByText('ФильтрЗалоговаяДаНет'))
    .toBeVisible();
  await page
    .getByRole('dialog', { name: 'Выбрать тариф' })
    .getByLabel('Да')
    .check();
  await page
    .getByRole('button', { name: 'Выбрать' })
    .first()
    .click();
  await page
    .getByRole('radio', { name: 'Единовременно' })
    .check();
  await page
    .getByRole('button', { name: 'Далее' })
    .click();

  // step 2
  await expect(page
    .getByText('#1Ввести данные ТС'))
    .toBeVisible();
  await page
    .getByRole('button', { name: 'plus Ввести данные ТС' })
    .click();
  await page
    .getByRole('textbox', { name: '* Госномер' })
    .click();
  await page
    .getByRole('textbox', { name: '* Госномер' })
    .fill(car.reg_num);
  await page
    .getByRole('textbox', { name: '* VIN код' })
    .click();
  await page
    .getByRole('textbox', { name: '* VIN код' })
    .fill(car.vin);
  await DataUtils.waitForResponsesAndAction(
    page,
    [JSONLoader.APIEndpoints.casco.vehicles],
    page.getByRole('button', { name: 'search Поиск' }).click(),
  );
  await page
    .getByRole('textbox', { name: '* № техпаспорта' })
    .click();
  await page
    .getByRole('textbox', { name: '* № техпаспорта' })
    .fill(car.reg_cert_num);
  await page
    .getByRole('textbox', { name: '* Дата регистрации' })
    .click();
  await page
    .getByRole('textbox', { name: '* Дата регистрации' })
    .fill(car.dt_reg_cert.DMY);
  await page
    .getByRole('textbox', { name: '* Дата регистрации' })
    .press('Enter');
  await page
    .getByRole('combobox', { name: '* Регион регистрации' })
    .click();
  await page
    .getByText('Алматы')
    .click();
  await page
    .getByRole('spinbutton', { name: '* Год выпуска' })
    .click();
  await page
    .getByRole('spinbutton', { name: '* Год выпуска' })
    .fill(car.year);
  await expect(page
    .getByRole('textbox', { name: '* Марка' }))
    .toBeVisible();
  await page
    .getByRole('button', { name: 'Сохранить' })
    .click();
  await expect(page
    .getByText(/Стоимость проверена|Стоимость не определена/))
    .toBeVisible();
  await page
    .getByRole('button', { name: 'Сохранить', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Далее' })
    .click();

  // step 3
  await expect(page
    .getByText('Вид клиентаЮридическое лицоФизическое лицоИПРезидент РКДаНетИИНПоискФамилияИмяОт'))
    .toBeVisible();
  await page
    .getByRole('textbox', { name: '* ИИН' })
    .click();
  await page
    .getByRole('textbox', { name: '* ИИН' })
    .fill(holder.iin);
  await DataUtils.waitForResponsesAndAction(
    page,
    [JSONLoader.APIEndpoints.client.getClient],
    page.getByRole('button', { name: 'search Поиск' }).click(),
  );
  await page.getByTestId('client-form__input-client-phone').click();
  await page.getByTestId('client-form__input-client-phone').fill('test');
  await page
    .getByRole('button', { name: 'Далее' })
    .click();
  await expect(page
    .getByText('Выгодоприобретатели совпадают Выгодоприобретатель по повреждению Выгодоприобрета'))
    .toBeVisible();
  await page
    .getByRole('textbox', { name: '* ИИН * ИИН * ИИН' })
    .click();
  await page
    .getByRole('textbox', { name: '* ИИН * ИИН * ИИН' })
    .fill(beneficiary.iin);
  await DataUtils.waitForResponsesAndAction(
    page,
    [JSONLoader.APIEndpoints.client.getClient],
    page.getByRole('button', { name: 'search Поиск' }).click(),
  );
  await page.getByTestId('beneficiary-form__input-client-phone').click();
  await page.getByTestId('beneficiary-form__input-client-phone').fill('test');
  await page
    .getByRole('button', { name: 'Сохранить' })
    .click();
  await expect(page
    .getByRole('button', { name: 'delete' }))
    .toBeVisible();
  await page
    .getByRole('button', { name: 'Добавить Выгодоприобретателя' })
    .click();
  await expect(page
    .getByRole('heading', { name: 'Выгодоприобретатель #' }))
    .toBeVisible();
  await page
    .getByRole('textbox')
    .click();
  await page
    .getByRole('textbox')
    .fill(insured.iin);
  await DataUtils.waitForResponsesAndAction(
    page,
    [JSONLoader.APIEndpoints.client.getClient],
    page.getByRole('button', { name: 'search Поиск' }).click(),
  );
  await page
    .getByRole('button', { name: 'Сохранить' })
    .click();
  await page
    .getByRole('button', { name: 'Далее' })
    .click();
  await page
    .getByText('Выгодоприобретатель по утрате')
    .click();
  await page
    .getByRole('switch', { name: 'Да Нет' })
    .click();
  await page
    .locator('div', { hasText: 'Выбрать статичного клиента' })
    .getByRole('combobox')
    .click();
  await page
    .getByText('Третьи лица')
    .click();
  await page
    .getByRole('button', { name: 'Сохранить' })
    .click();
  await page
    .getByRole('button', { name: 'Далее' })
    .click();

  // step 4
  await expect(page
    .getByText('Объекты страхования'))
    .toBeVisible();
  await page
    .getByRole('button', { name: 'Далее' })
    .click();

  // step 5
  await expect(page
    .getByText('Дата начала страховой защиты'))
    .toBeVisible();
  await page
    .getByRole('textbox', { name: 'Представитель страховщика' })
    .click();
  await page
    .getByRole('textbox', { name: 'Представитель страховщика' })
    .fill('test');
  await page
    .getByRole('textbox', { name: 'Акт осмотра от', exact: true })
    .click();
  await page
    .getByRole('textbox', { name: 'Акт осмотра от', exact: true })
    .type(today, { delay: 100 });
  await page
    .getByRole('textbox', { name: 'Акт осмотра от', exact: true })
    .press('Enter');
  await page
    .getByRole('textbox', { name: '* Подписант страховщика' })
    .click();
  await page
    .getByRole('textbox', { name: '* Подписант страховщика' })
    .fill('test');
  await page
    .getByRole('combobox', { name: '* Подразделение' })
    .click();
  await page
    .getByText('test')
    .click();
  await page
    .getByRole('textbox', { name: '* Номер доверенности' })
    .click();
  await page
    .getByRole('textbox', { name: '* Номер доверенности' })
    .fill('test');
  await page.locator("[id='form_item_signatory_insurer_attorney_date']")
    .click();
  await page.locator("[id='form_item_signatory_insurer_attorney_date']")
    .fill(today);
  await page.locator("[id='form_item_signatory_insurer_attorney_date']")
    .press('Enter');
  await DataUtils.waitForResponsesAndAction(
    page,
    [JSONLoader.APIEndpoints.casco.policies],
    page.getByRole('button', { name: 'Выписать полис' }).click(),
  );
  await page
    .getByRole('button', { name: 'OK' })
    .click();
  await expect(page
    .getByText('Статус полиса: Выписан'))
    .toBeVisible();
  await expect(page
    .getByRole('button', { name: 'download Полис' }))
    .toBeVisible();
  await expect(page
    .getByRole('button', { name: 'download Договор' }))
    .toBeVisible();
  await expect(page
    .getByRole('button', { name: 'download Анкета-заявление' }))
    .toBeVisible();
});
