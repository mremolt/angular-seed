import angular from 'angular';
import restBackend from './services/restBackend';

export default angular.module('dcsApp.backend', [])
  .run(function ($http) {
    restBackend.setHttp($http);
  });
