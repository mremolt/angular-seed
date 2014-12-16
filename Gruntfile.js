module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  // the watch task (because of rename) can't be autoloaded
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html-build');

  var target = grunt.option('target') || 'development';

  var userConfig = require('./build.config.js');

  var taskConfig = {

    "bower-install-simple": {
      options: {
        color: true,
        directory: "vendor",
        forceLatest: true
      },
      dev: {
        options: {
          production: false
        }
      }
    },

    clean: {
      development: ['<%= devDir %>/*', '!<%= devDir %>/.gitkeep'],
      production: ['<%= prodDir %>/*', '!<%= prodDir %>/.gitkeep']
    },

    concurrent: {
      build: {
        tasks: ['bower-install', 'html2js', 'traceur:app', 'reBuildCss'],
        options: {
          logConcurrentOutput: false
        }
      },
      firstrun: {
        tasks: ['build']
      }
    },

    connect: {
      development: {
        options: {
          protocol: 'http',
          hostname: '0.0.0.0',
          port: 3000,
          base: '<%= devDir %>',
          keepalive: false,
          debug: false,
          livereload: true,
          open: false
        }
      }
    },

    copy: {
      vendorJs: {
        src: ['vendor/**/*.js', 'src/main.js'],
        dest: '<%= devDir %>/'
      },
      vendorCss: {
        src: ['<%= vendorFiles.css %>'],
        dest: '<%= devDir %>/'
      },
      assets: {
        src: ['**'],
        dest: '<%= devDir %>/src/assets',
        cwd: 'src/assets',
        expand: true
      }
    },

    cssmin: {
      combine: {
        files: {
          '<%= devDir %>/src/assets/<%= pkg.name %>-<%= pkg.version %>.css':
            ['<%= vendorFiles.css %>', '<%= devDir %>/src/assets/<%= pkg.name %>-<%= pkg.version %>.css']
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
          spawn: true,
          livereload: true
        }
      },

      html: {
        files: ['<%= appFiles.html %>'],
        tasks: ['index:development']
      },

      sass: {
        files: ['src/sass/*.scss'],
        tasks: ['reBuildCss']
      },

      scripts: {
        files: ['<%= appFiles.js %>'],
        tasks: ['traceur:app'],
        options: {
          spawn: false,
          livereload: true
        }
      },

      templates: {
        files: [
          '<%= appFiles.atpl %>',
          '<%= appFiles.ctpl %>'
        ],
        tasks: ['html2js'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    html2js: {
      app: {
        options: {
          base: 'src/app'
        },
        src: ['<%= appFiles.atpl %>'],
        dest: '<%= devDir %>/templates-app.js'
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
          styles: {
            app: {
              cwd: '<%= devDir %>',
              files: ['src/assets/<%= pkg.name %>-<%= pkg.version %>.css']
            }
          },
          scripts: {
            app: {
              cwd: '<%= devDir %>',
              files: []
            }
          }
        }
      },
      production: {
        src: 'src/index.html',
        dest: '<%= prodDir %>/',
        options: {
          beautify: true,
          relative: false,
          logOptions: true,
          styles: {
            app: {
              cwd: '<%= prodDir %>',
              files: ['src/assets/<%= pkg.name %>-<%= pkg.version %>.css']
            }
          },
          scripts: {
            app: {
              cwd: '<%= prodDir %>',
              files: ['templates-app.js', 'src/build.js']
            }
          }
        }
      }
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
          '<%= devDir %>/src/assets/<%= pkg.name %>-<%= pkg.version %>.css': 'src/sass/main.scss'
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

  grunt.registerTask('build', ['clean', 'concurrent:build', 'copy', 'ngAnnotate', 'index:development', 'connect']);
  grunt.registerTask('compile', ['clean', 'concurrent:build', 'copy', 'ngAnnotate', 'index:production', 'requirejs', 'connect']);
  grunt.registerTask('default', ['build']);

  grunt.registerTask('reBuildCss', ['sass', 'cssmin']);

  grunt.registerTask("bower-install", [ "bower-install-simple" ]);

  grunt.renameTask('watch', 'delta');

  grunt.registerTask('watch', ['build', 'delta']);

  grunt.renameTask('htmlbuild', 'index');
};
