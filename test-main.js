var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;
var APP_REGEXP = /src\/app\/.*\.js$/i;
var allAppFiles = [];

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

// ie function.name polyfill
if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
  Object.defineProperty(Function.prototype, 'name', {
    get: function () {
      var funcNameRegex = /function\s([^(]{1,})\(/;
      var results = (funcNameRegex).exec((this).toString());
      return (results && results.length > 1) ? results[1].trim() : "";
    },
    set: function (value) {
    }
  });
}


Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  } else if (APP_REGEXP.test(file)) {
    allAppFiles.push(pathToModule(file));
  }
});


var config = {
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

  waitSeconds: 30,

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
};

allAppFiles.forEach(function (path) {
  path = path.replace('src/app/', '');
  config.paths[path] = '/base/src/app/' + path;
});

require.config(config);
