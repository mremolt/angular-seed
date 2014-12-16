import angular from 'angular';
import dashboard from '../_dashboard';
import Controller from '../controllers/home';

export default dashboard.directive('home', function ($rootScope) {

  console.log($rootScope);

  return {
    template: '<h1>Hello {{ cn.firstName }}!!!!!!!!!!</h1>',
    controller: Controller,
    controllerAs: 'cn',
    bindToController: true,
    scope: {
      firstName: '=',
      lastName: '='
    }
  }
});