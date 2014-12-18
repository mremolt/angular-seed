var app = require('./app.js');

describe('angular-seed app', function() {
  it('should have a title', function() {
    app.navigate();

    expect(browser.getTitle()).toEqual('angular-seed');
  });

  describe('content on the page', function () {
    it('should have a h1 with specific content', function () {
      expect(app.h1.getText()).toEqual('Random joke of the day');
    });
  });
});

xdescribe('foo', function () {
  it('google', function () {
    browser.get('http://test.visualizer.gfk.com/#/login');
    expect(browser.getTitle()).toEqual('TODO: LOGINPAGE-TITLE | Gxl Visualizer Frontend NG');
  });
});
