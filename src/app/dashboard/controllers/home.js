import _ from 'lodash';

class HomeController {
  constructor($timeout, $scope) {
    console.log('im constructor', this, $scope, 'wefergrth');

    $timeout(function () {
      _.each([1, 2, 3, 4], (function(n) {
        console.log(n * n);
        //throw new Error('ARGH!!!!');
      }));
    }, 2000);

  }
}

export default HomeController;