import mod from '../chuck';
import Controller from '../controllers/joke';

mod.directive('joke', function () {

  return {
    templateUrl: 'chuck/templates/joke.tpl.html',
    controller: Controller,
    controllerAs: 'cn',
    bindToController: true,
    scope: {}
  };
});
