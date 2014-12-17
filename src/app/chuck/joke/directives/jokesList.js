import mod from 'chuck/chuck';
//import Controller from '../controllers/joke';
debugger;

mod.directive('jokesList', function () {

  return {
    templateUrl: 'chuck/joke/templates/jokesList.tpl.html',
    //controller: Controller,
    controllerAs: 'cn',
    bindToController: true,
    scope: {
      category: '='
    }
  };
});
