import angular from 'angular';
import sanitize from 'angular-sanitize';
import router from 'angular-ui-router';
import templates from 'templates-app';

import homeDirective from 'as/dashboard/directives/home';
import backendMod from 'as/backend/backend';

var app = angular.module('dcsApp', [
  'ui.router',
  'ngSanitize',
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

export default app;
