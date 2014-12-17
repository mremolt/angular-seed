import HomeController from 'dashboard/controllers/home';
import angular from 'angular';
import angularMocks from 'angularMocks';
import Joke from 'chuck/models/Joke';


describe('foo', function () {

  var $interval;

  beforeEach(function () {
    module('dcsApp.dashboard');
  });

  beforeEach(inject(function ($injector) {
    $interval = $injector.get('$interval');
  }));

  it('Has the Controller class', function () {
    expect(HomeController).toEqual(jasmine.any(Function));
    expect(HomeController.name).toEqual('HomeController');
  });

  describe('an instance', function () {

    var subject;

    beforeEach(function () {
      spyOn(Joke, 'count').and.returnValue({
        then: function(fn) {
          fn(42);
        }
      });

      spyOn(Joke, 'random').and.returnValue({
        then: function(fn) {
          fn('not funny');
        }
      });

      subject = new HomeController($interval);
      $interval.flush(100000);
    });

    it('creates an instance', function () {
      expect(subject.constructor.name).toEqual('HomeController');
    });

    it('loads and assigns the number of jokes', function () {
      expect(subject.numberOfJokes).toEqual(42);
    });

    it('loads and assigns a random joke', function () {
      expect(subject.joke).toEqual('not funny');
    });

    describe('#showRandomJoke', function () {
      it('calls Joke.random()', function () {
        expect(Joke.random.calls.count()).toEqual(2);
      });
    });
  });


});
