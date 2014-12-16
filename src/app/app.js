import angular from 'angular';
import router from 'router';
import templates from 'templates';

import homeDirective from 'dashboard/directives/home';

var app = angular.module('dcsApp', [
    'ui.router',
    'templates-app',
    'dcsApp.dashboard'
]);

app.config(function () {
    console.log('AAAAAngular?????');
});

export default app;