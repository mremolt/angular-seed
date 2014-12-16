module.exports = {
  devDir: 'build/development',
  prodDir: 'build/production',

  appFiles: {
    js: ['src/app/app.js', 'src/**/*.js', '!src/**/*.spec.js', '!src/**/*.scenario.js', '!src/assets/**/*.js'],
    jsunit: ['src/**/*.spec.js', 'src/**/*.scenario.js'],

    atpl: ['src/app/**/*.tpl.html'],
    ctpl: ['src/common/**/*.tpl.html'],

    html: ['src/index.html'],
    sass: 'src/sass/main.sass'
  },

  vendorFiles: {
    css: [
      'vendor/normalize-css/normalize.css'
    ],
    js: [
      'vendor/traceur-runtime/traceur-runtime.js',
      'vendor/lodash/dist/lodash.js',
      'vendor/moment/min/moment-with-locales.js',
      'vendor/angular/angular.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      'vendor/angular-translate/angular-translate.js',
      'vendor/angular-sanitize/angular-sanitize.js',
      'vendor/requirejs/require.js'
    ]
  }
};