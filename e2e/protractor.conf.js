exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  specs: ['**/*spec.js'],
  capabilities: {
    "browserName": "chrome"
    //"parent-tunnel": "kaibirkenstock"
  }
}
