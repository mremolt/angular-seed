import _ from 'lodash';
import mod from '../_dashboard';
import restBackend from '../../backend/services/restBackend';


class HomeController {
  constructor($timeout, $http) {
    console.log('im constructor', this, 'wefergrth');

    restBackend.setHttp($http);

    restBackend.getJoke().then(joke => {
      this.joke = joke;
    });


    $timeout(function () {
      _.each([1, 2, 3, 4], (function (n) {
        console.log(n * n);
      }));
    }, 2000);

  }
}

export default HomeController;
