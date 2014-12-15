module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    htmlbuild: 'grunt-html-build'
  });

  var target = grunt.option('target') || 'development';

  var userConfig = require('./build.config.js');

  var taskConfig = {
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      development: ['<%= devDir %>/*', '!<%= devDir %>/.gitkeep'],
      production: ['<%= prodDir %>/*', '!<%= prodDir %>/.gitkeep']
    },

    connect: {
      development: {
        options: {
          protocol: 'http',
          hostname: '0.0.0.0',
          port: 3000,
          base: 'src',
          keepalive: false,
          debug: false,
          livereload: true,
          open: false
        }
      }
    },

    copy: {

    },

    htmlbuild: {
      development: {
        src: 'src/index.html',
        dest: '<%= devDir %>/'
      },
      production: {

      }
    }

  };

  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

  // Default task(s).
  grunt.registerTask('default', ['connect']);
};