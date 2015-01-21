import mod from 'as/chuck/chuck';
import Controller from '../controllers/jokesList';


export default mod.directive('jokesList', function () {

  return {
    templateUrl: 'chuck/joke/templates/jokesList.tpl.html',
    controller: Controller,
    controllerAs: 'cn',
    bindToController: true,
    scope: {
      category: '='
    }
  };
});
