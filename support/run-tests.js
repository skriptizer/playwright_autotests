/* eslint-disable no-await-in-loop, no-restricted-syntax */
const { execSync, spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');
const Logger = require('../main/utils/log/Logger');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.test'), override: true });

const type = process.argv[2];
const moduleName = process.argv[3];
const specName = process.argv[4];

const getWorkers = () => {
  if (process.env.CI) return parseInt(process.env.WORKERS_COUNT, 10);
  return Math.floor(os.cpus().length / 2) || 1;
};

const getFilesRecursive = (dir) => {
  const entries = fs.readdirSync(dir);
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry);
    return fs.statSync(fullPath).isDirectory() ? getFilesRecursive(fullPath) : fullPath;
  }).filter((f) => f.endsWith('.js'));
};

const run = async (testPath, label = '') => {
  if (!fs.existsSync(testPath)) throw new Error(`Path not found: ${testPath}`);

  const stats = fs.statSync(testPath);
  const filesToRun = stats.isDirectory() ? getFilesRecursive(testPath) : [testPath];

  const logDir = path.join(process.cwd(), 'artifacts');
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

  const workers = filesToRun.length;
  const labelText = label ? ` ${label}` : '';
  Logger.log(`🚀 Starting ${workers}${labelText} tests in parallel... (workers: ${getWorkers()})`);

  const testPromises = filesToRun.map((file) => new Promise((resolve) => {
    const testFileName = path.parse(file).name.replace('.suite', '').replace('.spec', '');
    const logFilePath = path.join(logDir, `${testFileName}.log`);
    const logStream = fs.createWriteStream(logFilePath);

    const reportPath = path.join(process.cwd(), 'artifacts/playwright-report', testFileName);

    Logger.log(`▶ Pending: ${testFileName} -> artifacts/${testFileName}.log`);

    const args = ['playwright', 'test', file, '--reporter=list,html'];
    if (!process.env.CI) args.push('--headed');

    const child = spawn('npx', args, {
      shell: true,
      env: {
        ...process.env,
        FORCE_COLOR: '0',
        PLAYWRIGHT_HTML_REPORT: reportPath,
      },
    });

    child.stdout.pipe(logStream);
    child.stderr.pipe(logStream);

    child.on('close', (code) => {
      if (code === 0) {
        Logger.log(`✅ Finished: ${testFileName}`);
      } else {
        Logger.log(`❌ Failed: ${testFileName} (check artifacts/${testFileName}.log)`);
      }
      resolve(code);
    });
  }));

  const results = await Promise.all(testPromises);
  if (results.some((code) => code !== 0)) process.exit(1);
};

(async () => {
  try {
    if (!type) {
      const pairs = [
        { p: 'tests/authored/suites', label: 'authored' },
        { p: 'tests/generated/specs', label: 'generated' },
      ].filter(({ p }) => fs.existsSync(p));
      await Promise.all(pairs.map(({ p, label }) => run(p, label)));
      process.exit(0);
    }

    const basePath = type === 'generated' ? 'tests/generated/specs' : 'tests/authored/suites';

    if (!moduleName) {
      await run(basePath, type);
      process.exit(0);
    }

    const modulePath = path.join(basePath, moduleName);

    if (!specName) {
      if (fs.existsSync(modulePath)) {
        await run(modulePath, type);
      } else {
        Logger.log(`⚠️  Grep mode: ${moduleName}`);
        const headed = !process.env.CI ? '--headed' : '';
        execSync(`npx playwright test ${basePath} --grep ${moduleName} ${headed}`, { stdio: 'inherit' });
      }
      process.exit(0);
    }

    const specFile = specName.endsWith('.js') ? specName : `${specName}.suite.js`;
    const specPath = path.join(modulePath, specFile);

    if (fs.existsSync(specPath)) {
      await run(specPath, type);
    } else {
      const altSpecFile = specName.endsWith('.js') ? specName : `${specName}.spec.js`;
      const altSpecPath = path.join(modulePath, altSpecFile);
      if (fs.existsSync(altSpecPath)) {
        await run(altSpecPath, type);
      } else {
        Logger.log(`⚠️  Grep mode: ${specName}`);
        const headed = !process.env.CI ? '--headed' : '';
        execSync(`npx playwright test ${modulePath} --grep ${specName} ${headed}`, { stdio: 'inherit' });
      }
    }
  } catch (error) {
    Logger.log(`🔥 Error: ${error.message}`);
    process.exit(1);
  }
})();
