"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imageSnapshot = void 0;

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _jestImageSnapshot = require("jest-image-snapshot");

var _nodeLogger = require("@storybook/node-logger");

var _url = require("./url");

expect.extend({
  toMatchImageSnapshot: _jestImageSnapshot.toMatchImageSnapshot
}); // We consider taking the full page is a reasonnable default.

const defaultScreenshotOptions = () => ({
  fullPage: true
});

const noop = () => {};

const asyncNoop = async () => {};

const defaultConfig = {
  storybookUrl: 'http://localhost:6006',
  chromeExecutablePath: undefined,
  getMatchOptions: noop,
  getScreenshotOptions: defaultScreenshotOptions,
  beforeScreenshot: noop,
  getGotoOptions: noop,
  customizePage: asyncNoop,
  customBrowser: undefined
};

const imageSnapshot = (customConfig = {}) => {
  const {
    storybookUrl,
    chromeExecutablePath,
    getMatchOptions,
    getScreenshotOptions,
    beforeScreenshot,
    getGotoOptions,
    customizePage,
    customBrowser
  } = { ...defaultConfig,
    ...customConfig
  };
  let browser; // holds ref to browser. (ie. Chrome)

  let page; // Hold ref to the page to screenshot.

  if (customBrowser) {
    browser = customBrowser;
  }

  const testFn = async ({
    context
  }) => {
    const {
      kind,
      framework,
      story
    } = context;

    if (framework === 'rn') {
      // Skip tests since we de not support RN image snapshots.
      _nodeLogger.logger.error("It seems you are running imageSnapshot on RN app and it's not supported. Skipping test.");

      return;
    }

    const url = (0, _url.constructUrl)(storybookUrl, kind, story);

    if (!browser || !page) {
      _nodeLogger.logger.error(`Error when generating image snapshot for test ${kind} - ${story} : It seems the headless browser is not running.`);

      throw new Error('no-headless-browser-running');
    }

    expect.assertions(1);
    let image;

    try {
      await customizePage(page);
      await page.goto(url, getGotoOptions({
        context,
        url
      }));
      await beforeScreenshot(page, {
        context,
        url
      });
      image = await page.screenshot(getScreenshotOptions({
        context,
        url
      }));
    } catch (e) {
      _nodeLogger.logger.error(`Error when connecting to ${url}, did you start or build the storybook first? A storybook instance should be running or a static version should be built when using image snapshot feature.`, e);

      throw e;
    }

    expect(image).toMatchImageSnapshot(getMatchOptions({
      context,
      url
    }));
  };

  testFn.afterAll = () => {
    if (customBrowser) {
      return page.close();
    }

    return browser.close();
  };

  testFn.beforeAll = async () => {
    if (!browser) {
      // add some options "no-sandbox" to make it work properly on some Linux systems as proposed here: https://github.com/Googlechrome/puppeteer/issues/290#issuecomment-322851507
      browser = await _puppeteer.default.launch({
        args: ['--no-sandbox ', '--disable-setuid-sandbox'],
        executablePath: chromeExecutablePath
      });
    }

    page = await browser.newPage();
  };

  return testFn;
};

exports.imageSnapshot = imageSnapshot;