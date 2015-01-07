import angular from 'angular';
import sanitize from 'angularSanitize';
import router from 'router';
import templates from 'templates';

import homeDirective from 'dashboard/directives/home';
import backendMod from 'backend/backend';

var app = angular.module('dcsApp', [
  'ui.router',
  'ngSanitize',
  'templates-app',
  'dcsApp.dashboard',
  'dcsApp.backend'
]);

app.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
});

app.factory('$exceptionHandler', function() {
  return function(exception, cause) {
    console.error(exception.stack);
    throw exception;
  };
});

export default app;
