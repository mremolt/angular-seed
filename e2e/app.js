var app =  function () {

  this.h1 = element(by.css('h1'));

  var settings = {
    pageLoadTimeout : 1000,
    loadTimeout : 1000,
    pageURL : 'http://localhost:3000'
  };

  this.navigate = function() {
    browser.get(settings.pageURL);
    browser.sleep(settings.pageLoadTimeout);
  };
};

module.exports = new app();
