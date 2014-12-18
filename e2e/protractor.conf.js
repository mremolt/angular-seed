var config = {
  specs: ['**/*spec.js'],
  allScriptsTimeout: 30000,
  getPageTimeout: 30000,
  jasmineNodeOpts: {
    showColors: true,
    isVerbose: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  }

};

caps = {browserName: 'internet explorer'};
caps.name = 'Win 8, IE 11';
caps.platform = 'Windows 8.1';
caps.version = '11';
caps['deviceName'] = '';

config.capabilities = caps;
//config.baseUrl = 'http://test.visualizer.gfk.com';
config.sauceUser = 'kaibirkenstock';
config.sauceKey = '729e4f96-3e88-4719-b286-8278b0046f2b';

exports.config = config;
