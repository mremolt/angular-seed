import _ from 'lodash';

class HomeController {
  constructor($timeout, $scope) {
    $timeout(function () {
      _.each([1, 2, 3, 4], (function(n) {
        console.log(n * n);
      }));
    }, 2000);

  }
}

export default HomeController;