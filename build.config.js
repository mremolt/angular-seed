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
    ]
  }
};