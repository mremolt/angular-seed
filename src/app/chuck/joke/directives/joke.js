import mod from 'as/chuck/chuck';
import Controller from '../controllers/joke';

export default mod.directive('joke', function () {

  return {
    templateUrl: 'chuck/joke/templates/joke.tpl.html',
    controller: Controller,
    controllerAs: 'cn',
    bindToController: true,
    scope: {
      model: '='
    }
  };
});
