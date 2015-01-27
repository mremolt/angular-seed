import angular from 'angular';
import sanitize from 'angular-sanitize';
import router from 'angular-ui-router';
import translate from 'angular-translate';
import templates from 'templates-app';

import homeDirective from 'as/dashboard/directives/home';
import backendMod from 'as/backend/backend';

var app = angular.module('dcsApp', [
  'ui.router',
  'ngSanitize',
  'pascalprecht.translate',
  'templates-app',
  'dcsApp.dashboard',
  'dcsApp.backend'
]);

app.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  console.log('hier');
});

app.factory('$exceptionHandler', function() {
  return function(exception, cause) {
    console.error(exception.stack);
    throw exception;
  };
});

app.config(function ($translateProvider) {
  $translateProvider.translations('en', {
    TITLE: 'Hello',
    FOO: 'This is a paragraph.',
    BUTTON_LANG_EN: 'english',
    BUTTON_LANG_DE: 'german'
  });
  $translateProvider.translations('de', {
    TITLE: 'Hallo',
    FOO: 'Dies ist ein Paragraph.',
    BUTTON_LANG_EN: 'englisch',
    BUTTON_LANG_DE: 'deutsch'
  });
  $translateProvider.preferredLanguage('de');
});

export default app;
