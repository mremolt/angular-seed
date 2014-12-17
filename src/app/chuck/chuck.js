import angular from 'angular';
import router from 'router';
import CategoryController from 'chuck/controllers/CategoryController';


var mod = angular.module('dcsApp.chuck', [
  'ui.router'
]);

mod.config(function ($stateProvider) {

  $stateProvider
    .state('category', {
      url: '/categories/:categoryName',
      templateUrl: 'chuck/templates/listCategory.tpl.html',
      controller: CategoryController,
      controllerAs: 'cn'
    });

});


export default mod;
