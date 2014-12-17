import angular from 'angular';
import router from 'router';

var mod = angular.module('dcsApp.chuck', [
  'ui.router'
]);

mod.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('category', {
      url: '/categories/:categoryName',
      templateUrl: 'chuck/templates/listCategory.tpl.html',
      controller: function ($stateParams) {
        this.categoryName = $stateParams.categoryName;
      },
      controllerAs: 'cn'
    });

});


export default mod;
