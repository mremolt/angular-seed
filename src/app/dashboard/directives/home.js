import angular from 'angular';
import dashboard from '../_dashboard';
import Controller from '../controllers/home';
import categoriesDirective from 'as/chuck/category/directives/categories';
import jokeDirective from 'as/chuck/joke/directives/joke';
import jokesListDirective from 'as/chuck/joke/directives/jokesList';


export default dashboard.directive('home', function ($interval) {

  var link = function(scope) {
    $interval(() => {
      scope.cn.showRandomJoke();
    }, 60000);
  };

  return {
    templateUrl: 'dashboard/templates/home.tpl.html',
    controller: Controller,
    controllerAs: 'cn',
    bindToController: true,
    link: link,
    scope: {
      firstName: '@',
      lastName: '@'
    }
  }
});
