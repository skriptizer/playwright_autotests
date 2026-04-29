const path = require('path');
const moment = require('moment');
const { createWriteStream, mkdirSync } = require('fs');
const JSONLoader = require('../data/JSONLoader');

const artifactsDir = path.join(path.resolve(), 'artifacts');
mkdirSync(artifactsDir, { recursive: true });

const filePath = path.join(artifactsDir, 'log.txt');

const timeList = [];
const logList = [];

function safeJsonStringify(value) {
  try {
    return JSON.stringify(value);
  } catch (error) {
    return JSON.stringify({ serializationError: error.message });
  }
}

function maskLogText(step) {
  if (JSONLoader.configData?.hiddenLogBodies && step.includes('[req]')) {
    const words = step.split(' ');
    const firstPart = words.slice(0, 3).join(' ');
    const secondPart = words.slice(words.length - 2).join(' ');
    return `${firstPart} ${secondPart}`;
  }
  return step;
}

class Logger {
  static #title;

  static #pw = undefined;

  static bindPlaywright(testInfo, options = {}) {
    this.#pw = {
      testInfo,
      title: options.title || testInfo?.title,
      lines: [],
      events: [],
    };
    if (this.#pw.title) this.#title = this.#pw.title;
  }

  static clearPlaywright() {
    this.#pw = undefined;
  }

  static async flushPlaywright() {
    if (!this.#pw?.testInfo) return;

    const {
      testInfo, lines, events, title,
    } = this.#pw;
    if (!lines.length && !events.length) return;

    const safeTitle = (title || testInfo.title || 'test')
      .replace(/[^\w.-]+/g, '_')
      .slice(0, 120);

    if (lines.length) {
      await testInfo.attach(`${safeTitle}.log`, {
        body: Buffer.from(`${lines.join('\n')}\n`, 'utf8'),
        contentType: 'text/plain',
      });
    }

    if (events.length) {
      await testInfo.attach(`${safeTitle}.log.json`, {
        body: Buffer.from(`${safeJsonStringify(events)}\n`, 'utf8'),
        contentType: 'application/json',
      });
    }
  }

  static log(step, meta) {
    const timeStamp = moment().format().slice(0, 19).replace('T', ' ');
    let title;

    if (typeof meta === 'string') {
      title = meta;
    } else if (meta && typeof meta === 'object') {
      const parts = [];
      if (meta.page) parts.push(`page="${meta.page}"`);
      if (meta.name) parts.push(`name="${meta.name}"`);
      if (meta.key) parts.push(`key="${meta.key}"`);
      if (meta.value !== undefined) {
        const safeValue = maskLogText(String(meta.value));
        parts.push(`value="${safeValue}"`);
      }
      title = parts.length ? parts.join(' ') : undefined;
    }

    const line = title ? `${step} ${title}` : step;

    logList.push(` ${line}`);
    timeList.push(`${timeStamp}`);

    if (this.#pw) {
      const masked = maskLogText(line);
      this.#pw.lines.push(`${timeStamp} ${masked}`);
      this.#pw.events.push({ timeStamp, step: line, maskedStep: masked });
    }

    const safeTitle = (this.#title || '').replace(/[\\/:*?"<>|]/g, '_');
    const targetFile = safeTitle
      ? path.join(artifactsDir, `${safeTitle}.log.txt`)
      : filePath;

    const stream = createWriteStream(targetFile, { flags: 'a', autoClose: true });
    stream.write(`${timeStamp} ${line}\n`);
    this.hideLogBodies(line);

    return timeStamp;
  }

  static hideLogBodies(step) {
    // eslint-disable-next-line no-console
    console.log(`  ${maskLogText(step)}`);
  }

  static logParallel() {
    logList.forEach((step) => this.hideLogBodies(step.trim()));
  }

  static logToFileParallel() {
    const zip = (a, b) => a.map((k, i) => [k, b[i]]);
    const summaryList = zip(timeList, logList);
    summaryList.shift();

    const safeTitle = (this.#title || 'run').replace(/[\\/:*?"<>|]/g, '_');
    const fileName = filePath
      .split(path.sep)
      .map((part, index, array) => (index === array.length - 1 ? `${safeTitle}.${part}` : part))
      .join(path.sep);

    const stream = createWriteStream(fileName, { flags: 'a', autoClose: true });
    summaryList.forEach((logString) => logString.forEach((logSubString, index) => {
      // eslint-disable-next-line no-unused-expressions
      index % 2 !== 0
        ? stream.write(`${logSubString}\n`)
        : stream.write(`${logSubString}`);
    }));
  }
}

module.exports = Logger;
