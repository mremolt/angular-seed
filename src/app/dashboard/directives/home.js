import angular from 'angular';
import dashboard from '../_dashboard';
import Controller from '../controllers/home';
import categoriesDirective from '../../chuck/directives/categories';


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
