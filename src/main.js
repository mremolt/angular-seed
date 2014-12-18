require.config({
  baseUrl: 'src/app',

  paths: {
    traceur: '../../vendor/traceur-runtime/traceur-runtime',
    lodash: '../../vendor/lodash/dist/lodash',
    moment: '../../vendor/moment/min/moment-with-locales',
    angular: '../../vendor/angular/angular',
    router: '../../vendor/angular-ui-router/release/angular-ui-router',
    angularTranslate: '../../vendor/angular-translate/angular-translate',
    angularSanitize: '../../vendor/angular-sanitize/angular-sanitize',
    templates: '../../templates-app'
  },

  shim: {
    angular: {
      exports: 'angular',
      deps: ['traceur']
    },
    'router':{
      deps: ['angular']
    },
    'angularSanitize':{
      deps: ['angular']
    },
    'templates': {
      deps: ['angular']
    },
    traceur: {
      exports: '$traceurRuntime'
    }
  }
});

require(['angular', 'traceur', 'app'], function (angular) {
  angular.bootstrap(document, ['dcsApp']);
});
