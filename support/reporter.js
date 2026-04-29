const fs = require('fs');
const path = require('path');
const Logger = require('../main/utils/log/Logger');
const JSONLoader = require('../main/utils/data/JSONLoader');

const RESULT_FILE = path.join(process.cwd(), 'artifacts', 'suite-result.json');

class CustomReporter {
  onBegin(config, suite) {
    this.totalTests = suite.allTests().length;
    this.failedTestsMap = new Map();
  }

  onTestEnd(test, result) {
    this.failedTestsMap.set(test.titlePath().join(' > '), {
      status: result.status,
      outcome: test.outcome(),
    });
  }

  async onEnd() {
    const reallyFailed = [...this.failedTestsMap.values()].filter(
      (t) => (t.status === 'failed' || t.status === 'timedOut') && t.outcome !== 'flaky',
    );

    const failedTests = reallyFailed.length;

    fs.mkdirSync(path.dirname(RESULT_FILE), { recursive: true });
    fs.writeFileSync(RESULT_FILE, JSON.stringify({ failedTests }));

    if (failedTests > 0) {
      Logger.log(JSONLoader.configData.failed);
    } else {
      Logger.log(JSONLoader.configData.passed);
    }

    if (JSONLoader.configData.parallel) {
      Logger.logParallel();
      Logger.logToFileParallel();
    }
  }
}

module.exports = CustomReporter;
