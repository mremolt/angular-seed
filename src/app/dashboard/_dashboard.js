import angular from 'angular';
import router from 'router';

var mod = angular.module('dcsApp.dashboard', [
  'ui.router',
  'dcsApp.chuck'
]);

mod.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'dashboard/templates/homeController.tpl.html'
    });
});

export default mod;
