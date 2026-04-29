module.exports = {
  root: true,
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    browser: true,
  },
  ignorePatterns: [
    'main/utils/data/JSONLoader.js',
    'artifacts/',
    'node_modules/',
  ],
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
