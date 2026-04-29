# Playwright test

Автотесты для test на `Playwright`: UI-сценарии, API-хелперы, page object'ы и набор вспомогательных утилит для подготовки тестовых данных и запуска прогонов.

Проект поддерживает два основных типа тестов:

- `authored` — вручную написанные suite-ы с переиспользуемыми шагами и page object'ами.
- `generated` — записанные через `playwright codegen` спеки, которые можно запускать как по одному, так и группами.

## Стек

- `Node.js`
- `Playwright`
- `axios`
- `dotenv`
- `sequelize` / `mysql2`

## Структура проекта

```text
main/
  baseElement.js
  baseForm.js
  baseTest.js
  utils/
    API/
    DB/
    data/
    log/
    random/
    str/
    time/
resources/
  data/
  dict/
support/
  global-setup.js
  global-teardown.js
  playwright-codegen.js
  reporter.js
  run-tests.js
tests/
  authored/
    API/
    pageObjects/
      quote/
    specs/
    suites/
      quote/
  generated/
    specs/
      casco/
      claim/
      madp/
      quote/
README.md
package.json
playwright.config.js
```

Ключевые каталоги:

- `tests/authored/suites` — основные authored suite-ы.
- `tests/authored/specs` — authored-спеки и шаги, которые переиспользуются из suite-ов.
- `tests/authored/pageObjects` — page object'ы для UI-сценариев.
- `tests/authored/API` — API-клиенты и хелперы.
- `tests/generated/specs` — generated-спеки, записанные через codegen и разложенные по модулям.
- `main/utils/data` — генерация `JSONLoader`, подготовка конфигов и генерация CI-сплита.
- `main/utils/API` / `main/utils/DB` — базовые классы для API- и DB-абстракций.
- `support` — скрипты запуска, codegen-обёртка и глобальные хуки.
- `resources/data` — runtime-конфиг и тестовые JSON-данные.
- `resources/dict` — словари и справочники, используемые тестами.

Что важно по реальному устройству запуска:

- Playwright запускает только файлы, подходящие под `**/authored/suites/**/*.suite.js` и `**/generated/specs/**/*.spec.js`.
- `tests/authored/specs` не входит в `testMatch` напрямую и используется как слой reusable authored-логики.
- Для CI generated-часть группируется по верхнеуровневым директориям внутри `tests/generated/specs`.

### Объяснение каждого блока проекта

#### `main/`

Базовый слой проекта. Здесь лежат общие абстракции, на которых строятся page object'ы, формы и общий тестовый bootstrap.

- `main/baseElement.js` — базовая обёртка над UI-элементами.
- `main/baseForm.js` — базовая абстракция для экранов и форм.
- `main/baseTest.js` — общий bootstrap перед тестами, включая загрузку справочников и тестовых данных в `globalSetup`.

#### `main/utils/API/`

Базовые классы для HTTP-работы.

- `main/utils/API/baseAPI.js` — общий API-клиент, от которого наследуются authored API-хелперы.

#### `main/utils/DB/`

Инфраструктура для DB-проверок и моделей. Сейчас это вспомогательный слой, а не основной путь запуска тестов.

- `main/utils/DB/baseDB.js` — подключение к БД через `sequelize`.
- `main/utils/DB/baseModel.js` — базовая модель/обвязка для DB-сущностей.

#### `main/utils/data/`

Слой подготовки данных и конфигурации проекта.

- `main/utils/data/JSONLoader.js` — автогенерируемый loader для JSON-ресурсов и списка suite-ов.
- `main/utils/data/filesParser.js` — читает `.env.test`, обновляет `configData.json`, создаёт служебные JSON-файлы и пересобирает `JSONLoader`.
- `main/utils/data/gitlabCIGenerator.js` — генерирует `.split-config.yml` для GitLab child pipeline.
- `main/utils/data/dataUtils.js` — вспомогательные функции для работы с тестовыми данными.

#### `main/utils/log/`

Логирование проекта.

- `main/utils/log/Logger.js` — единая точка для логов в консоль и файловые артефакты.

#### `main/utils/random/`

Утилиты генерации случайных значений.

- `main/utils/random/randomizer.js` — хелперы для рандомизации данных в тестах.

#### `main/utils/str/`

Строковые хелперы.

- `main/utils/str/strUtils.js` — утилиты для преобразования и нормализации строк.

#### `main/utils/time/`

Утилиты времени и дат.

- `main/utils/time/timeUtils.js` — хелперы для форматирования и вычислений со временем.

#### `resources/data/`

Runtime-данные и конфигурация, которые используются во время прогона.

- `resources/data/configData.json` — основной runtime-конфиг проекта.
- `resources/data/APIEndpoints.json` — набор endpoint'ов для API-слоя.
- `resources/data/testData.json` — тестовые входные данные.
- `resources/data/testCars.json` — кэш тестовых машин, который обновляется в `globalSetup`.
- `resources/data/testClients.json` — кэш тестовых клиентов, который обновляется в `globalSetup`.
- `resources/data/anketaTestFile.pdf` — тестовый файл для сценариев загрузки документов.

#### `resources/dict/`

Справочники и словари, используемые тестами и шагами.

- `resources/dict/dictDocumentType.json` — словарь типов документов.
- `resources/dict/dictSexID.json` — словарь значений пола.

#### `support/`

Служебные скрипты запуска и интеграция с Playwright runtime.

- `support/global-setup.js` — точка входа для `globalSetup`, вызывает `BaseTest.beforeAll()`.
- `support/global-teardown.js` — место для post-run логики и очистки после завершения тестов.
- `support/playwright-codegen.js` — обёртка над `playwright codegen`, которая нормализует имя сценария и путь сохранения.
- `support/reporter.js` — кастомный репортёр для подсчёта фактически упавших тестов и записи итогового статуса.
- `support/run-tests.js` — основной раннер проекта для локального запуска suite-ов и generated-модулей.

#### `tests/authored/API/`

Прикладные API-клиенты для бизнес-сценариев.

- `authAPI.js` — авторизация и получение токена.
- `dictionaryAPI.js` — работа со справочниками, переключением серверов, verification и тестовыми данными.
- `clientAPI.js` — операции с клиентскими данными.
- `kaspiAPI.js` — интеграционные вызовы для сценариев Kaspi.

#### `tests/authored/pageObjects/`

Ручной UI-слой для authored-сценариев.

- `loginPage.js` — page object страницы логина.
- `mainPage.js` — page object главной страницы.
- `quote/` — page object'ы quote-сценариев, например `quotePage1.js`, `quotePage2.js`, `quoteShowReviewPage.js`.

#### `tests/authored/specs/`

Переиспользуемые authored-шаги и сценарные куски, из которых собираются suite-ы.

- `login.spec.js` — логин-сценарий.
- `quoteManagerFillClientsStep.spec.js` — шаг заполнения клиентов.
- `quoteManagerFillDetailsGPOStep.spec.js` / `quoteManagerFillDetailsKaskoStep.spec.js` — шаги заполнения деталей котировки.
- `quoteApproveStep.spec.js`, `quoteReviewStep.spec.js` — этапы ревью и согласования.

#### `tests/authored/suites/`

Финальные authored suite-ы, которые реально попадают в `Playwright testMatch`.

- `tests/authored/suites/quote/quoteGPO.suite.js` — suite для GPO-котировки.
- `tests/authored/suites/quote/quoteKasko.suite.js` — suite для Kasko-котировки.

#### `tests/generated/specs/`

Автоматически записанные или полуавтоматически поддерживаемые спеки, сгруппированные по бизнес-модулям.

- `quote/` — generated-сценарии котировок, например `cargoQuote.spec.js`, `kaskoQuote.spec.js`.
- `claim/` — claim-сценарии, например `createApplication.spec.js`.
- `casco/` — сценарии КАСКО и программ страхования.
- `madp/` — отдельные сценарии для MADP, например `mst.spec.js`.

#### `README.md`

Основная документация по проекту: запуск, структура, CI и правила работы с конфигами.

#### `package.json`

Точка входа для npm-скриптов проекта: `config`, `ci:generate`, `playwright:codegen`, `test`, `lint`.

#### `playwright.config.js`

Главная конфигурация Playwright: `testMatch`, `globalSetup`, таймауты, retries, browser project и настройки артефактов.

## Требования

- `Node.js 18+`
- `npm`
- установленный браузер `chromium` для Playwright
- доступ к нужным стендам test и test API

## Быстрый старт

1. Установить зависимости:

```bash
npm install
```

2. Установить браузер:

```bash
npm run playwright:install
```

3. Создать локальный env-файл:

```bash
cp .env.test.example .env.test
```

4. Заполнить `.env.test`.

5. Подготовить runtime-конфиг и служебные файлы:

```bash
npm run config
```

Команда `npm run config`:

- загружает переменные из `.env.test`
- обновляет `resources/data/configData.json`
- генерирует `main/utils/data/JSONLoader.js`
- создаёт `resources/data/testCars.json`, если файла ещё нет
- создаёт `resources/data/testClients.json`, если файла ещё нет

## Переменные окружения

Базовые переменные:

```env
AUTH_LOGIN=
AUTH_PASSWORD=

LOGIN_MANAGER=
PASSWORD_MANAGER=

LOGIN_UNDERWRITER=
PASSWORD_UNDERWRITER=

LOGIN_CLAIMER=
PASSWORD_CLAIMER=

LOGIN_AGENT=
PASSWORD_AGENT=

GATEWAY_URL=
BASE_URL=
MADP_URL=
```

Что используется в коде:

- `AUTH_LOGIN` / `AUTH_PASSWORD` — сервисная авторизация для API-хелперов и `globalSetup`.
- `LOGIN_MANAGER` / `PASSWORD_MANAGER` — учётка менеджера.
- `LOGIN_UNDERWRITER` / `PASSWORD_UNDERWRITER` — учётка андеррайтера.
- `LOGIN_CLAIMER` / `PASSWORD_CLAIMER` — учётка для claim-сценариев.
- `LOGIN_AGENT` / `PASSWORD_AGENT` — учётка для MADP-сценариев.
- `GATEWAY_URL` — базовый URL backend API.
- `BASE_URL` — базовый URL UI test.
- `MADP_URL` — URL MADP-стенда для отдельных generated-сценариев.

Опциональные флаги:

- `VERIFICATION` — переопределяет `verification` в `resources/data/configData.json`.
- `SET_POLICY_WAITING_TWB` — переопределяет `setPolicyWaitingTWB`.
- `GET_POLICY_TWB` — переопределяет `getPolicyTWB`.
- `CI` — включает CI-поведение для раннеров и ограничивает число worker'ов.
- `DRY_RUN=1` — для `playwright:codegen` печатает итоговую команду, не запуская браузер.

Переменные для DB-слоя:

- `DB_HOST`
- `DB_PORT`
- `DB_USERNAME`
- `DB_PASSWORD`

Они используются в `main/utils/DB/baseDB.js` и нужны только если вы расширяете проект DB-проверками.

## Как устроена инициализация

Перед запуском тестов `globalSetup` вызывает `BaseTest.beforeAll()`, который:

- выставляет таймзону из `configData.json`
- получает API-токен через `dictionaryAPI`
- переключает активный сервер
- синхронизирует флаг verification
- загружает тестовые машины и клиентов
- сохраняет данные в `resources/data/testCars.json` и `resources/data/testClients.json`
- обновляет `withESBD` в `resources/data/configData.json`

Из-за этого для полноценного запуска нужен рабочий доступ к `GATEWAY_URL` и корректные учётные данные.

## Запуск тестов

Перед первым запуском и после изменения `.env.test` или JSON-конфигов рекомендуется выполнять:

```bash
npm run config
```

Основной запуск:

```bash
npm test
```

По умолчанию `npm test` запускает `support/run-tests.js`, который:

- запускает authored suite-ы из `tests/authored/suites`
- запускает generated-спеки из `tests/generated/specs`
- сохраняет отдельные логи в `artifacts/*.log`
- локально добавляет `--headed`, если не выставлен `CI`

Запуск только authored-набора:

```bash
node ./support/run-tests.js authored
```

Запуск конкретного authored suite или grep-поиска:

```bash
node ./support/run-tests.js authored quote
node ./support/run-tests.js authored quoteKasko.suite.js
```

Запуск только generated-сценариев:

```bash
node ./support/run-tests.js generated
```

Запуск конкретного generated-файла или grep-поиска:

```bash
node ./support/run-tests.js generated kaskoQuote.spec.js
node ./support/run-tests.js generated kaskoQuote
```

Прямой запуск Playwright тоже доступен:

```bash
npx playwright test
```

Но обычно удобнее пользоваться `support/run-tests.js`, потому что он раскладывает логи по файлам и запускает отдельные спеки параллельно.

## Запись generated-сценариев

Записать новый сценарий:

```bash
npm run playwright:codegen -- <scenario-name>
```

Скрипт:

- нормализует имя сценария в `kebab-case`
- сохраняет файл в `tests/generated/specs/<scenario-name>.spec.js`
- использует `BASE_URL` как стартовый URL, если он задан

Пример:

```bash
npm run playwright:codegen -- quote-create-flow
```

Алиас `npm run record` сейчас ожидает переменную окружения `SPEC_NAME`:

```bash
SPEC_NAME=quote-create-flow npm run record
```

Для ручного запуска удобнее использовать именно `npm run playwright:codegen -- <scenario-name>`.

## Линтинг и подготовка конфигов

```bash
npm run config
npm run config:parallel
npm run ci:generate
npm run lint
npm run lint:fix
```

Что важно:

- `config:parallel` дополнительно включает `parallel=true` в `configData.json`
- `ci:generate` выполняет `config:parallel`, а затем генерирует `.split-config.yml` для GitLab CI
- `lint` и `lint:fix` всегда сначала выполняют `npm run config`

## Артефакты

Во время прогонов используются и обновляются:

- `artifacts/test-results` — результаты Playwright
- `artifacts/playwright-report` — HTML-репорты
- `artifacts/*.log` — отдельные логи по каждому запущенному suite/spec

В `playwright.config.js` включены:

- `screenshot: 'only-on-failure'`
- `trace: 'on-first-retry'`
- `video: 'retain-on-failure'`
- `retries: 2`

## Как это работает в CI

У этого проекта есть два связанных уровня CI:

1. downstream-trigger из `test`
2. собственный GitLab CI pipeline проекта `test`

### Как тесты стартуют после merge в `test`

После merge в ветку `dev` проекта `test` запускается его основной pipeline. В нём есть stage `trigger-e2e-tests`, где отдельно триггерятся UI-автотесты.

Для Playwright используется такой downstream-job:

```yaml
trigger-e2e-tests-playwright:
  stage: trigger-e2e-tests
  trigger:
    project: test
    branch: dev
    strategy: depend
  only:
    - dev
```

Это означает:

- merge в `test/dev` запускает pipeline приложения
- на стадии `trigger-e2e-tests` GitLab стартует отдельный pipeline проекта `test`
- запускается именно ветка `dev` тестового репозитория
- `strategy: depend` заставляет родительский pipeline ждать завершения тестового pipeline и наследовать его статус

Именно поэтому после merge в `dev` у `test` Playwright-тесты стартуют не внутри репозитория приложения, а как отдельный downstream pipeline в репозитории `test`.

### Что происходит внутри `test`

Базовый файл [`/.gitlab-ci.yml`](./.gitlab-ci.yml) у этого проекта подключает общие шаблоны и задаёт стадии:

- `lint-front-e2e-autotests`
- `generate-config`
- `e2e-tests`

По твоему шаблону реальная схема такая:

- `lint-playwright-e2e-autotests` запускается на merge request'ах в default branch
- `generate-config` запускается на ветке `dev`
- `e2e-tests` запускается на ветке `dev`

Логика разбиения e2e-прогонов по job'ам формируется не вручную, а через генератор:

```bash
npm run ci:generate
```

Эта команда:

- запускает `npm run config:parallel`
- обновляет `resources/data/configData.json` с `parallel=true`
- пересобирает `JSONLoader.js`
- генерирует файл [`.split-config.yml`](./.split-config.yml)

Файл `.split-config.yml` строится скриптом [`main/utils/data/gitlabCIGenerator.js`](./main/utils/data/gitlabCIGenerator.js) и содержит набор однотипных GitLab jobs:

- по одному job на каждый authored suite из `tests/authored/suites/*`
- по одному job на каждый верхнеуровневый generated-модуль из `tests/generated/specs/*`

Для generated-сценариев модулем считается директория внутри `tests/generated/specs`, например `quote`, `claim`, `casco`, `madp`.

Ключевая особенность в том, что `.split-config.yml` не просто сохраняется как артефакт, а потом используется для запуска child pipeline:

```yaml
generate-config:
  stage: generate-config
  only:
    - dev
  script:
    - echo "${ENV_TEST}" | tr -d '\r' > ./.env.test
    - npm run ci:generate
  artifacts:
    expire_in: 1 week
    paths:
      - .split-config.yml

e2e-tests:
  stage: e2e-tests
  only:
    - dev
  needs:
    - generate-config
  trigger:
    include:
      - artifact: .split-config.yml
        job: generate-config
    strategy: depend
```

Это значит:

- сначала выполняется `generate-config`
- он генерирует актуальный список e2e-job'ов на основе текущей структуры репозитория
- затем `e2e-tests` поднимает child pipeline из `.split-config.yml`
- внутри child pipeline каждая тестовая группа бежит отдельным job'ом

Каждый job внутри этого child pipeline:

- запускается в образе `mcr.microsoft.com/playwright:v1.58.2-jammy`
- работает на стадии `e2e-tests`
- подхватывает секрет `ENV_TEST` и сохраняет его в `.env.test`
- выполняет `npm ci`
- выполняет `npm run config:parallel`
- запускает нужную часть тестов через `node support/run-tests.js ...`
- сохраняет `artifacts/` как артефакты

По сути CI воспроизводит локальный сценарий, только:

- всегда работает в параллельном режиме
- запускает наборы тестов отдельными джобами
- использует GitLab secret `ENV_TEST` вместо локального `.env.test`
- работает в headless-режиме, потому что в CI выставлен `CI`

### Полная цепочка после merge в `dev`

Если разложить поток по шагам, получается так:

1. код мержится в `test/dev`
2. стартует pipeline `test`
3. pipeline доходит до stage `trigger-e2e-tests`
4. job `trigger-e2e-tests-playwright` запускает downstream pipeline проекта `test` на ветке `dev`
5. в `test` выполняется `generate-config`
6. `generate-config` создаёт `.split-config.yml`
7. job `e2e-tests` поднимает child pipeline из этого файла
8. child pipeline параллельно запускает authored suite-ы и generated-модули
9. статусы child pipeline и downstream pipeline возвращаются наверх в `test` из-за `strategy: depend`

Практически это означает, что merge в `test/dev` триггерит не один большой Playwright-job, а каскад:

- `test` вызывает `test`
- `test` генерирует конфиг со списком тестовых групп
- GitLab строит отдельные e2e-job'ы под найденные suite-ы и generated-модули
- итоговый статус пробрасывается обратно в pipeline приложения

### Какие проверки стартуют в каких случаях

- merge request в самом `test`
  Обычно запускается `lint-playwright-e2e-autotests`, который проверяет проект через `npm run lint`.
- merge в `test/dev`
  Запускается downstream pipeline `test`, который уже выполняет `generate-config` и реальные e2e-тесты.

Пример того, какие команды фактически выполняются внутри джобы:

```bash
echo "$ENV_TEST" | tr -d '\r' > ./.env.test
npm ci
npm run config:parallel
node support/run-tests.js authored quote
```

или для generated-модуля:

```bash
node support/run-tests.js generated quote
```

## Что важно знать про CI-режим

- Если вы добавили новый authored suite, он попадёт в CI после `npm run ci:generate`.
- Если вы добавили новый generated-модуль как новую директорию в `tests/generated/specs`, для него тоже появится отдельный job.
- Если вы просто добавили новый `.spec.js` внутрь уже существующей generated-директории, он будет запускаться в рамках уже существующего job этого модуля.
- Если downstream trigger в `test` указывает на `branch: dev`, то для merge в `test/dev` всегда будет запускаться актуальная `dev`-ветка этого репозитория автотестов.
- Артефакты из CI сохраняются в каталоге `artifacts/`, включая HTML-репорты и `.log`-файлы.
- `parallel=true` влияет на логику кастомного репортера и параллельные логи.
