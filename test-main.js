var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  paths: {
    lodash: '/base/vendor/lodash/dist/lodash',
    moment: '/base/vendor/moment/min/moment-with-locales',
    angular: '/base/vendor/angular/angular',
    angularMocks: '/base/vendor/angular-mocks/angular-mocks',
    router: '/base/vendor/angular-ui-router/release/angular-ui-router',
    angularTranslate: '/base/vendor/angular-translate/angular-translate',
    angularSanitize: '/base/vendor/angular-sanitize/angular-sanitize'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    'router':{
      deps: ['angular']
    },
    'angularMocks': {
      deps: ['angular'],
      'exports': 'angular.mock'
    }
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
