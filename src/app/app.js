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

app.config(function () {
  console.log('AAAAAngular?????');
});

export default app;
