import _ from 'lodash';
import mod from '../_dashboard';

class HomeController {
  constructor($timeout) {
    console.log('im constructor', this, 'wefergrth');

    $timeout(function () {
      _.each([1, 2, 3, 4], (function(n) {
        console.log(n * n);
        //throw new Error('ARGH!!!!');
      }));
    }, 2000);

  }
}

export default HomeController;