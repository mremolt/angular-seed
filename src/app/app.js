import angular from 'angular';
import router from 'router';
import templates from 'templates';

import homeDirective from 'dashboard/directives/home';
import backendMod from 'backend/backend';

var app = angular.module('dcsApp', [
  'ui.router',
  'templates-app',
  'dcsApp.dashboard',
  'dcsApp.backend'
]);

app.config(function () {
  console.log('AAAAAngular?????');
});

export default app;
