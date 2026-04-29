const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
require('dotenv').config({ path: path.join(process.cwd(), '.env.test'), override: true });

function sanitizeScenarioName(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const argScenario = process.argv[2];
const scenarioName = sanitizeScenarioName(argScenario);

if (!scenarioName) {
  process.stderr.write('Usage: npm run playwright:codegen -- <scenario-name>\n');
  process.exit(1);
}

const outputDir = path.join(process.cwd(), 'tests', 'generated', 'specs');
const outputPath = path.join(outputDir, `${scenarioName}.spec.js`);

fs.mkdirSync(outputDir, { recursive: true });

const args = [
  'playwright',
  'codegen',
  '--target=playwright-test',
  '--browser=chromium',
  '--output',
  outputPath,
];

if (process.env.BASE_URL) args.push(process.env.BASE_URL);

if (process.env.DRY_RUN === '1') {
  const command = ['npx', ...args].join(' ');
  process.stdout.write(`${command}\n`);
  process.exit(0);
}

const child = spawn('npx', args, {
  stdio: 'inherit',
  shell: false,
});

child.on('exit', (code) => {
  process.exit(code ?? 1);
});
