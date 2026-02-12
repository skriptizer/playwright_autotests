# Playwright Codegen Template (from scratch)

Minimal starter focused on writing maintainable tests from Playwright codegen.

## 1. Install

```bash
npm install
npx playwright install
```

## 2. Configure

Copy `.env.example` to `.env` and set values.

## 3. Record actions

```bash
npm run codegen:base
```

Paste draft actions into `tests/templates/codegen.raw-actions.example.ts`.

## 4. Create real test from template

- Copy `tests/templates/codegen.template.spec.ts` to a new spec (e.g. `tests/e2e/login.spec.ts`)
- Move stable locators/actions into page object classes (see `tests/pageObjects/example.page.ts`)
- Keep assertions business-driven in `Assert` step

## 5. Run

```bash
npm test
```

## Recommended style

- `Arrange / Act / Assert` with `test.step`
- Prefer page objects for reusable actions
- Keep raw codegen output only as temporary draft
