import mod from '../chuck';
import Controller from '../controllers/categories';

console.log('hier', mod, Controller);

mod.directive('categories', function () {


  return {
    templateUrl: 'chuck/templates/categories.tpl.html',
    controller: Controller,
    controllerAs: 'cn',
    bindToController: true,
    scope: {}
  };
});
