const fs = require('fs');
const path = require('path');
const YAML = require('js-yaml');
const JSONLoader = require('./JSONLoader');
const Logger = require('../log/Logger');

const ROOT = process.cwd();
const OUTPUT_FILE = path.join(ROOT, '.split-config.yml');
const GENERATED_SPECS_DIR = path.join(ROOT, 'tests', 'generated', 'specs');

const authoredSuites = JSONLoader.testSuitesNames;

function getGeneratedModules(dir = GENERATED_SPECS_DIR) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => fs.statSync(path.join(dir, file)).isDirectory());
}

function makeJob(name, scriptArgs) {
  return {
    [name]: {
      image: 'mcr.microsoft.com/playwright:v1.58.2-jammy',
      stage: 'e2e-tests',
      only: ['dev'],
      tags: ['k8s'],
      variables: {
        PLAYWRIGHT_CHROMIUM_USE_HEADLESS_SHELL: '1',
      },
      before_script: [
        'echo "$ENV_TEST" | tr -d \'\\r\' > ./.env.test',
        'npm ci',
        'npm run config:parallel',
      ],
      script: [
        `node support/run-tests.js ${scriptArgs}`,
      ],
      artifacts: {
        when: 'always',
        expire_in: '1 month',
        paths: [
          'artifacts/',
        ],
      },
    },
  };
}

const generatedModules = getGeneratedModules();

Logger.log('Detected authored suites:', authoredSuites.join(', ') || 'none');
Logger.log('Detected generated modules:', generatedModules.join(', ') || 'none');

const jobs = [
  ...authoredSuites.map((suite) => makeJob(`Authored ${suite}`, `authored ${suite}`)),
  ...generatedModules.map((mod) => makeJob(`Generated ${mod}`, `generated ${mod}`)),
];

const gitlabCIConfig = {
  stages: ['e2e-tests'],
  ...Object.assign({}, ...jobs),
};

fs.writeFileSync(OUTPUT_FILE, YAML.dump(gitlabCIConfig));
Logger.log('.split-config.yml generated successfully');
