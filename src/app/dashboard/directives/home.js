import angular from 'angular';
import dashboard from '../_dashboard';
import Controller from '../controllers/home';

export default dashboard.directive('home', function ($rootScope) {

  console.log($rootScope);

  return {
    templateUrl: 'dashboard/templates/home.tpl.html',
    controller: Controller,
    controllerAs: 'cn',
    bindToController: true,
    scope: {
      firstName: '=',
      lastName: '='
    }
  }
});
