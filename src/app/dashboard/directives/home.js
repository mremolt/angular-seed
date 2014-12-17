import angular from 'angular';
import dashboard from '../_dashboard';
import Controller from '../controllers/home';
import categoriesDirective from 'chuck/category/directives/categories';
import jokeDirective from 'chuck/joke/directives/joke';


export default dashboard.directive('home', function () {

  return {
    templateUrl: 'dashboard/templates/home.tpl.html',
    controller: Controller,
    controllerAs: 'cn',
    bindToController: true,
    scope: {
      firstName: '@',
      lastName: '@'
    }
  }
});
