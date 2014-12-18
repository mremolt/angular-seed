module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  /** the watch task (because of rename) can't be autoloaded **/
  grunt.loadNpmTasks('grunt-contrib-watch');
  /** same with html-build (we name it index) **/
  grunt.loadNpmTasks('grunt-html-build');

  /** load build configuration depending on project structure **/
  var userConfig = require('./build.config.js');

  var taskConfig = {

    /** installs bower_modules into vendor directory **/
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

    /** cleans up the given directories **/
    clean: {
      development: ['<%= devDir %>/*', '!<%= devDir %>/.gitkeep'],
      production: ['<%= prodDir %>/*', '!<%= prodDir %>/.gitkeep'],
      js: ['<%= devDir %>/**/*.js', '<%= devDir %>/**/*.js.map'],
      vendor: ['<%= devDir %>/vendor']
    },

    concurrent: {
      build: {
        tasks: ['bower-install', 'html2js', 'traceur:app', 'sass', 'cssmin'],
        options: {
          logConcurrentOutput: false
        }
      },
      firstrun: {
        tasks: ['build']
      }
    },


    /** start a server with livereload **/
    connect: {
      development: {
        options: {
          protocol: 'http',
          hostname: '0.0.0.0',
          port: 3000,
          base: '<%= devDir %>',
          keepalive: false,
          debug: false,
          livereload: false,
          open: false
        }
      },
      production: {
        options: {
          protocol: 'http',
          hostname: '0.0.0.0',
          port: 3000,
          base: '<%= prodDir %>',
          keepalive: false,
          debug: false,
          livereload: false,
          open: false
        }
      }
    },

    /** copy files **/
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
      },
      assetsProd: {
        src: ['**'],
        dest: '<%= prodDir %>/src/assets',
        cwd: '<%= devDir %>/src/assets',
        expand: true
      },
      jsProd: {
        cwd: '<%= devDir %>',
        src: ['src/build.js', 'src/main.js'],
        dest: '<%= prodDir %>',
        expand: true
      },
      almond: {
        cwd: '<%= devDir %>/vendor/almond',
        src: ['almond.js'],
        dest: '<%= prodDir %>/vendor/almond/',
        expand: true
      }
    },

    /** minify and combine css files **/
    cssmin: {
      combine: {
        files: {
          '<%= devDir %>/src/assets/<%= pkg.name %>-<%= pkg.version %>.css': ['<%= vendorFiles.css %>', '<%= devDir %>/src/assets/<%= pkg.name %>-<%= pkg.version %>.css']
        }
      }
    },

    /** renamed grunt-watch **/
    delta: {
      options: {
        livereload: true
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile'],
        options: {
          spawn: true
        }
      },

      html: {
        files: userConfig.appFiles.html,
        tasks: ['index:development']
      },

      sass: {
        files: ['src/sass/*.scss'],
        tasks: ['sass', 'cssmin']
      },

      scripts: {
        files: userConfig.appFiles.js,
        tasks: ['copy:vendorJs','newer:traceur:app'],
        options: {
          event: [
            'changed',
            'added'
          ]
        }
      },

      deletedScripts: {
        files: userConfig.appFiles.js,
        tasks: [
          'clean:js',
          'clean:vendor',
          'traceur:app',
          'copy:vendorJs',
          'html2js'
        ],
        options: {
          event: ['deleted']
        }
      },

      templates: {
        files: [
          '<%= appFiles.atpl %>',
          '<%= appFiles.ctpl %>'
        ],
        tasks: ['html2js'],
        options: {
          spawn: false
        }
      },

      bower: {
        files: 'bower.json',
        tasks: ['bower-install', 'clean:vendor', 'copy:vendorJs', 'copy:vendorCss']
      }
    },

    /** render all template files into angularJs modules **/
    html2js: {
      app: {
        options: {
          base: 'src/app'
        },
        src: ['<%= appFiles.atpl %>'],
        dest: '<%= devDir %>/templates-app.js'
      }
    },

    /** create index.html while replacing placeholders **/
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
            },
            require: {
              cwd: '<%= devDir %>',
              files: ['vendor/requirejs/require.js']
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
              files: [
                'templates-app.js',
                'src/build.js'
              ]
            },
            require: {
              cwd: '<%= prodDir %>',
              files: ['vendor/almond/almond.js']
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

    ngdocs: {
      options: {
        html5Mode: false,
        startPage: '/'
      },
      api: {
        src: [
          'src/**/*.js',
          '!src/**/*.spec.js'
        ],
        title: 'API Documentation'
      }
    },

    /** does the compile job meanwhile (we'll switch to almond in production) **/
    requirejs: {
      compile: {
        options: {
          baseUrl: 'build/development/src/app',
          mainConfigFile: 'src/main.js',
          name: 'app',
          out: userConfig.prodDir + '/src/build.js',
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


  // renamed task(s).

  grunt.renameTask('watch', 'delta');

  grunt.renameTask('htmlbuild', 'index');


  // Default task(s).

  grunt.registerTask('build', ['clean', 'concurrent:build', 'copyDev', 'index:development', 'connect:development']);

  grunt.registerTask('compile', ['clean', 'concurrent:build', 'copyDev', 'ngAnnotate', 'requirejs', 'copyProd', 'index:production', 'connect:production']);

  grunt.registerTask('default', ['build']);

  grunt.registerTask('copyDev', ['copy:vendorJs', 'copy:vendorCss', 'copy:assets']);

  grunt.registerTask('copyProd', ['copy:assetsProd', 'copy:jsProd', 'copy:almond']);

  grunt.registerTask("bower-install", ["bower-install-simple"]);

  grunt.registerTask('watch', ['build', 'delta']);
};
