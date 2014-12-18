// Karma configuration
// Generated on Tue Dec 16 2014 13:13:29 GMT+0100 (CET)

var fs = require('fs');

module.exports = function (config) {

  // Use ENV vars on Travis and sauce.json locally to get credentials
  if (!process.env.SAUCE_USERNAME) {
    if (!fs.existsSync('sauce.json')) {
      console.log('Create a sauce.json with your credentials based on the sauce-sample.json file.');
      process.exit(1);
    } else {
      process.env.SAUCE_USERNAME = require('../sauce').username;
      process.env.SAUCE_ACCESS_KEY = require('../sauce').accessKey;
    }
  }

  // Browsers to run on Sauce Labs
  var customLaunchers = {
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 8.1'
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      platform: 'Windows 8.1'
    },
    sl_safari: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.10',
      version: '8'
    },
    //sl_ie_9: {
    //  base: 'SauceLabs',
    //  browserName: 'internet explorer',
    //  platform: 'Windows 7',
    //  version: '9'
    //},
    sl_ie_10: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '10'
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    }
    //sl_ios_safari: {
    //  base: 'SauceLabs',
    //  browserName: 'iPad',
    //  platform: 'OS X 10.9',
    //  version: '8.1'
    //},
    //sl_android_chrome: {
    //  base: 'SauceLabs',
    //  browserName: 'android',
    //  platform: 'Linux',
    //  version: '4.4',
    //  deviceName: 'Google Nexus 7 HD Emulator',
    //  'device-orientation': 'portrait'
    //}
  };


  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs', 'traceur'],


    // list of files / patterns to load in the browser
    files: [
      'test-main.js',
      {pattern: 'vendor/**/*.js', included: false},
      {pattern: 'src/app/**/*.js', included: false},
      {pattern: 'test/**/*.spec.js', included: false}
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/app/**/*.js': ['traceur', 'coverage'],
      'test/**/*.spec.js': ['traceur']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'saucelabs'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    sauceLabs: {
      testName: 'Angular seed Karma testsuite'
    },
    captureTimeout: 300000,
    browserNoActivityTimeout: 20000,
    customLaunchers: customLaunchers,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: Object.keys(customLaunchers),


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    allScriptsTimeout: 30000,
    getPageTimeout: 30000,

    jasmineNodeOpts: {
      showColors: true,
      isVerbose: true,
      includeStackTrace: true,
      defaultTimeoutInterval: 30000
    }


  });
};
