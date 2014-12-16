import HomeController from 'src/app/dashboard/controllers/home';
import angular from 'angular';
import angularMocks from 'angularMocks';

describe('foo', function () {

  var $timeout;

  beforeEach(function () {
    module('dcsApp.dashboard');
  });

  beforeEach(inject(function ($injector) {
    $timeout = $injector.get('$timeout');
  }));


  it('runs the specs', function () {
    expect(1).toEqual(1);
  });

  it('Has the Controller class', function () {
    expect(HomeController).toEqual(jasmine.any(Function));
    expect(HomeController.name).toEqual('HomeController');
  });

  it('creates an instance', function () {
    var cn = new HomeController($timeout);
    $timeout.flush();
  });
});