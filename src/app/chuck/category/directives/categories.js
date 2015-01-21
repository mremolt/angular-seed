import mod from 'as/chuck/chuck';
import Controller from '../controllers/categories';


mod.directive('categories', function () {

  return {
    templateUrl: 'chuck/category/templates/categories.tpl.html',
    controller: Controller,
    controllerAs: 'cn',
    bindToController: true,
    scope: {}
  };
});
