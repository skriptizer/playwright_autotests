# Playwright Autotests Template

Шаблон проекта для UI-автотестов на Playwright с поддержкой автогенерации тестов (`codegen`) и структурой для масштабирования.

## Установка

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

## Переменные окружения

Скопируйте `.env.example` в `.env` и заполните значения:

- `BASE_URL`
- `LOGIN`
- `PASSWORD`
