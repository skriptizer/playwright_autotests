const fs = require('fs');
const path = require('path');

const envDirectory = path.join(__dirname, '../../../');
const envTestPath = path.join(envDirectory, '.env.test');
const envPath = path.join(envDirectory, '.env');
const envExamplePath = path.join(envDirectory, '.env.example');

const loaderFileLocation = path.join(__dirname, 'JSONLoader.js');
const resourcesDirectory = path.join(envDirectory, 'resources');
const dataDirectory = path.join(resourcesDirectory, 'data');
const testClientsFileLocation = path.join(dataDirectory, 'testClients.json');
const testCarsFileLocation = path.join(dataDirectory, 'testCars.json');
const JSONDirectory = resourcesDirectory;
const suitesDirectory = path.join(envDirectory, 'tests');
const jsonExtension = '.json';
const testExtension = '.test';
const testSuitePattern = '.suite.js';

const loadEnvFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const index = trimmed.indexOf('=');
    if (index < 1) return;
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^['"]|['"]$/g, '');
    process.env[key] = value;
  });
};

if (fs.existsSync(envTestPath)) {
  loadEnvFile(envTestPath);
} else if (fs.existsSync(envPath)) {
  loadEnvFile(envPath);
} else if (fs.existsSync(envExamplePath)) {
  loadEnvFile(envExamplePath);
}

const getFiles = (directory, extension) => {
  if (!fs.existsSync(directory)) return [];

  const allFiles = fs.readdirSync(directory);
  const selectedFiles = allFiles.filter((file) => file.endsWith(extension));
  allFiles.forEach((file) => {
    const fullPath = path.join(directory, file);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
      const nestedFiles = getFiles(fullPath, extension);
      selectedFiles.push(...nestedFiles.map((nestedFile) => path.join(file, nestedFile)));
    }
  });

  return selectedFiles;
};

const generateClassInit = (selectedFiles, directory) => `class JSONLoader {\n${selectedFiles.map((file) => {
  const variableName = path.parse(file).name.replace(/[^a-zA-Z0-9_$]/g, '_');
  const requirePath = path.relative(__dirname, path.join(directory, file)).replace(/\\/g, '/');
  return `\tstatic get ${variableName}() {\n\t\tconst ${variableName} = require('./${requirePath}');\n\t\treturn JSON.parse(JSON.stringify(${variableName}));\n\t}\n\n`;
}).join('')}`;

const generateTestSuitesNames = (selectedFiles) => {
  const suiteFolders = selectedFiles
    .map((file) => {
      const relativePath = file.replace('authored/suites/', '');
      return relativePath.split(path.sep)[0];
    });

  const uniqueSuites = [...new Set(suiteFolders)]
    .filter((name) => !name.endsWith('.js'))
    .map((name) => `'${name}'`)
    .join(', ');

  return `\tstatic get testSuitesNames() {\n\t\treturn [${uniqueSuites}];\n\t}\n\n`;
};

const generateJSONLoader = (filePath, directory) => {
  const jsonFiles = getFiles(directory, jsonExtension);
  const testSuites = getFiles(suitesDirectory, testSuitePattern);
  const classInit = generateClassInit(jsonFiles, directory);
  const suitesNames = generateTestSuitesNames(testSuites);
  const classExport = '}\n\nmodule.exports = JSONLoader;';
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, classInit + suitesNames + classExport);
};

const setConfigData = (directory, extension) => {
  const files = getFiles(directory, extension);
  const configFile = files.filter((file) => file.includes('config')).pop();
  if (configFile) {
    const filePath = `${directory}/${configFile}`;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.parallel = process.argv.includes('--parallel');
    data.setPolicyWaitingTWB = process.argv.includes('--setPolicyWaitingTWB');
    try {
      data.verification = Boolean(JSON.parse(process.env.VERIFICATION ?? data.verification));
    } catch (error) {
      console.log('  [err]   incorrect value of "VERIFICATION" .env variable!'); // eslint-disable-line no-console
    }

    try {
      const value = JSON.parse(process.env.SET_POLICY_WAITING_TWB ?? data.setPolicyWaitingTWB);
      data.setPolicyWaitingTWB = Boolean(value);
    } catch (error) {
      console.log('  [err]   incorrect value of "SET_POLICY_WAITING_TWB" .env variable!'); // eslint-disable-line no-console
    }

    try {
      data.getPolicyTWB = Boolean(JSON.parse(process.env.GET_POLICY_TWB ?? data.getPolicyTWB));
    } catch (error) {
      console.log('  [err]   incorrect value of "GET_POLICY_TWB" .env variable!'); // eslint-disable-line no-console
    }

    if (process.env.GATEWAY_URL || process.env.BASE_URL) {
      const source = process.env.GATEWAY_URL || process.env.BASE_URL;
      const value = source.match(/\b(?:localhost|dev|staging)\b/g);
      if (value) {
        data.environment = value.pop();
      } else {
        console.log('  [err]   incorrect value of "GATEWAY_URL" .env variable!'); // eslint-disable-line no-console
      }
    } else {
      console.log('  [err]   "GATEWAY_URL" .env variable not exists!'); // eslint-disable-line no-console
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  }
};

const checkEnvExists = (directory, extension) => {
  const files = getFiles(directory, extension);
  const hasEnv = fs.existsSync(envTestPath)
  || fs.existsSync(envPath)
  || fs.existsSync(envExamplePath);
  if (!files.length && !hasEnv) throw new Error('[err]   .env.test file not exists in root directory!');
};

const generateTestDataFile = (filePath) => {
  const emptyObj = {};
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify(emptyObj, null, 2), 'utf8');
};

checkEnvExists(envDirectory, testExtension);
setConfigData(JSONDirectory, jsonExtension);
generateTestDataFile(testCarsFileLocation);
generateTestDataFile(testClientsFileLocation);
generateJSONLoader(loaderFileLocation, JSONDirectory);
