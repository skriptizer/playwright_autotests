/* eslint-disable import/no-extraneous-dependencies */
const { defineConfig } = require('@playwright/test');
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '.env.test'),
  override: true,
});

const baseURL = process.env.BASE_URL || 'test';
const isCI = !!process.env.CI;

module.exports = defineConfig({
  testDir: './tests',
  outputDir: 'artifacts/test-results',

  fullyParallel: true,

  workers: process.env.CI ? parseInt(process.env.WORKERS_COUNT, 10) : undefined,

  testMatch: [
    '**/authored/suites/**/*.suite.js',
    '**/generated/specs/**/*.spec.js',
  ],

  globalSetup: require.resolve('./support/global-setup'),
  timeout: 120000,
  expect: {
    timeout: 40000,
  },
  retries: 2,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'artifacts/playwright-report' }],
  ],
  use: {
    baseURL,
    headless: isCI,
    viewport: isCI ? { width: 1920, height: 1080 } : null,
    launchOptions: {
      args: isCI ? [] : ['--start-maximized'],
    },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
