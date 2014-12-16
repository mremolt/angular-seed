module.exports = function (grunt) {

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
          base: '<%= devDir %>',
          keepalive: true,
          debug: false,
          livereload: false,
          open: false
        }
      }
    },

    copy: {
      vendorJs: {
        src: ['vendor/**/*.js', 'src/main.js'],
        dest: '<%= devDir %>/'
      },
      assets: {
        src: ['**'],
        dest: '<%= devDir %>/assets',
        cwd: 'src/assets',
        expand: true
      }
    },

    htmlbuild: {
      development: {
        src: 'src/index.html',
        dest: '<%= devDir %>/',
        options: {
          beautify: true,
          relative: false,
          scripts: {
            vendor: ['<%= vendorFiles.js %>'],
            app: ['src/app/**/*.js']
          }
        }
      },
      production: {}
    },

    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      compile: {
        files: [{
          src: [userConfig.devDir + '/src/app/**/*.js'],
          expand: true
        }]
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: 'build/development/src/app',
          mainConfigFile: 'src/main.js',
          name: 'app',
          out: userConfig.devDir + '/src/build.js',
          optimize: 'uglify2',
          uglify2: {
            mangle: false
          }
        }
      }
    },

    traceur: {
      options: {
        blockBinding: true,
        modules: 'amd',
        moduleNames: true,
        sourceBasePackage: 'src/app',
        sourceMaps: true
      },
      app: {
        files: [{
          expand: true,
          cwd: '.',
          src: ['src/app/**/*.js'],
          dest: '<%= devDir %>/'
        }]
      }
    }

  };

  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

  // Default task(s).
  grunt.registerTask('default', ['clean', 'copy:vendorJs', 'traceur', 'ngAnnotate', 'htmlbuild:development', 'requirejs', 'connect']);
};