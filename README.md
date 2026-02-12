# Playwright Autotests Template

Шаблон проекта для UI-автотестов на Playwright с поддержкой автогенерации тестов (`codegen`) и структурой для масштабирования.

## Установка

1. Скопируйте `.env.example` в `.env` и заполните `NPM_TOKEN` токеном с доступом к private scope `@amanat-qa`.
2. Установите зависимости:

```bash
npm ci
npx playwright install
```

## Запуск тестов

```bash
npm test
npm run test:ui
npm run test:headed
npm run test:debug
```

## Генерация тестов

```bash
npm run codegen:base
# или
npm run codegen
```

Сохранение сразу в файл:

```bash
npx playwright codegen https://your-app-url.com -o tests/generated/smoke.codegen.spec.ts
```

## Рекомендуемый workflow для codegen

1. Записать сценарий в `tests/generated`.
2. Почистить локаторы: `getByRole`, `getByLabel`, `getByTestId`.
3. Вынести действия и селекторы в `pages/*` (Page Object).
4. Финальный стабильный сценарий переместить в `tests/e2e`.



## Доступ к приватным npm-пакетам

В репозитории добавлен `.npmrc` с настройкой scope `@amanat-qa` и авторизацией через переменную окружения `NPM_TOKEN`:

```ini
@amanat-qa:registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

Токен не хранится в репозитории — передавайте его через `.env` или переменные CI.

## Подключение библиотек `@amanat-qa/utils-frontend` и `@amanat-qa/ui-core`

В проект добавлены npm-библиотеки:

```json
"dependencies": {
  "@amanat-qa/utils-frontend": "latest",
  "@amanat-qa/ui-core": "latest"
}
```

Пример использования в тестах:

```ts
import * as utilsFrontend from "@amanat-qa/utils-frontend";
import * as uiCore from "@amanat-qa/ui-core";

// const value = utilsFrontend.someUtility(...);
// const component = uiCore.someComponent(...);
```

`qalib` больше не используется как зависимость в этом репозитории.

## Переменные окружения

Скопируйте `.env.example` в `.env` и заполните значения:

- `BASE_URL`
- `LOGIN`
- `PASSWORD`
- `NPM_TOKEN` (токен для private npm scope `@amanat-qa`)
