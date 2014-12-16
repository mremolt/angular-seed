module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('node-sass');

  require('jit-grunt')(grunt);

  // the watch task (because of rename) can't be autoloaded
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html-build');

  var target = grunt.option('target') || 'development';

  var userConfig = require('./build.config.js');

  var taskConfig = {
    clean: {
      development: ['<%= devDir %>/*', '!<%= devDir %>/.gitkeep'],
      production: ['<%= prodDir %>/*', '!<%= prodDir %>/.gitkeep']
    },

    concurrent: {
      build: {
        //tasks: ['bower-install', 'html2js', 'traceur:appjs', 'less:build'],
        tasks: ['traceur', 'sass'],
        options: {
          logConcurrentOutput: false
        }
      },
      rebuildjs: {
        tasks: [
          //'newer:jshint:src',
          //'newer:traceur:appjs'
        ]
      },
      firstrun: {
        tasks: ['index:development']
        //tasks: ['index:development', 'karmaconfig']
      }
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
        src: ['<%= vendorFiles.js %>'],
        dest: '<%= devDir %>/'
      },
      vendorCss: {
        src: ['<%= vendorFiles.css %>'],
        dest: '<%= devDir %>/'
      },
      assets: {
        src: ['**'],
        dest: '<%= devDir %>/assets',
        cwd: 'src/assets',
        expand: true
      }
    },

    cssmin: {
      combine: {
        files: {
          '<%= devDir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css':
            ['<%= vendorFiles.css %>', '<%= devDir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css']
        }
      }
    },

    delta: {
      options: {
        livereload: true
      },

      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile'],
        options: {
          livereload: false
        }
      },

      html: {
        files: ['<%= appFiles.html %>'],
        tasks: ['index:development']
      },

      sass: {
        files: ['src/sass/*.scss'],
        tasks: ['sass']
      },

      scripts: {
        files: ['src/app/**/*.js'],
        tasks: ['traceur:app'],
        options: {
          spawn: false
        }
      }
    },

    index: {
      development: {
        src: 'src/index.html',
        dest: '<%= devDir %>/',
        options: {
          beautify: true,
          relative: false,
          logOptions: true,
          scripts: {
            vendor: ['<%= vendorFiles.js %>'],
            app: ['src/app/**/*.js']
          },
          styles: {
            app: ['<%= vendorFiles.css %>', 'src/assets/<%= pkg.name %>-<%= pkg.version %>.css']
          }
        }
      },
      production: {}
    },

    jshint: {
      src: {
        files: {
          src: 'src/**/*.js'
        },
        options: {
          jshintrc: true,
          ignores: [
            '**/*.spec.js',
            '**/*.scenario.js'
          ]
        }
      },
      test: {
        files: {
          src: [
            'src/**/*.spec.js',
            'src/**/*.scenario.js'
          ]
        },
        options: {
          jshintrc: '.jshintrc.test'
        }
      },
      gruntfile: [
        'Gruntfile.js'
      ]
    },

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'src/assets/<%= pkg.name %>-<%= pkg.version %>.css': 'src/sass/main.scss'
        }
      }
    },

    traceur: {
      options: {
        blockBinding: true,
        //modules: 'amd',
        moduleNames: true,
        sourceBasePackage: 'src/app'
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

  /**
   * The default task is to build and compile.
   */
  grunt.registerTask('default', ['build']);

  //grunt.registerTask('e2e', ['protractor_webdriver', 'protractor']);

  grunt.registerTask("bower-install", [ "bower-install-simple" ]);

  grunt.renameTask('watch', 'delta');
  grunt.registerTask('watch', ['concurrent:firstrun', 'delta']);

  grunt.renameTask('htmlbuild', 'index');
};