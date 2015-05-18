'use strict';

var path = require('path');

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

var webpackDistConfig = require('./webpack.dist.config.js'),
    webpackDevConfig = require('./webpack.config.js'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    styleguide = require('sc5-styleguide');

module.exports = function (grunt) {
  // Let *load-grunt-tasks* require everything
  require('load-grunt-tasks')(grunt);

  // Read configuration from package.json
  var pkgConfig = grunt.file.readJSON('package.json');
  var styleguidePath = path.join(pkgConfig.dist, pkgConfig.styleguide);

  grunt.initConfig({
    pkg: pkgConfig,

    webpack: {
      options: webpackDistConfig,
      dist: {
        cache: false
      }
    },

    'webpack-dev-server': {
      options: {
        hot: true,
        port: 8000,
        webpack: webpackDevConfig,
        publicPath: 'http://localhost:8000/dist/assets/',
        contentBase: './',
        historyApiFallback: false
      },

      start: {
        keepAlive: true
      }
    },

    connect: {
      options: {
        port: 8000
      },

      dist: {
        options: {
          keepalive: true,
          middleware: function (connect) {
            return [
              mountFolder(connect, pkgConfig.dist),
            ];
          }
        }
      }
    },

    open: {
      options: {
        delay: 500
      },
      dev: {
        path: 'http://localhost:<%= connect.options.port %>/webpack-dev-server/'
      },
      dist: {
        path: 'http://localhost:<%= connect.options.port %>/'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    copy: {
      dist: {
        files: [
          // includes files within path
          {
            flatten: true,
            expand: true,
            src: ['<%= pkg.src %>/*', '<%= pkg.src %>/\.htaccess'],
            dest: './',
            filter: 'isFile'
          },
          {
            flatten: true,
            expand: true,
            src: ['<%= pkg.src %>/images/*'],
            dest: '<%= pkg.dist %>/images/'
          },
          {
            expand: true,
            cwd: '<%= pkg.src %>/demo/',
            src: ['**'],
            dest: '<%= pkg.dist %>/demo/'
          },
        ]
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= pkg.dist %>'
          ]
        }]
      }
    },

    gulp: {
      'styleguide-generate': function() {
        return gulp.src(['src/styles/styleguide.scss'])
          .pipe(sass().on('error', sass.logError))
          .pipe(autoprefixer({
            browsers: ['last 2 versions']
          }))
          .pipe(styleguide.generate({
              title: 'UI Kit Mockups Styleguide',
              server: false,
              rootPath: styleguidePath,
              appRoot: '/' + styleguidePath,
              overviewPath: 'README.md',
              commonClass: 'font--general'
            }))
          .pipe(gulp.dest(styleguidePath));
      },
      'styleguide-applystyles': function() {
        gulp.src('src/styles/styleguide.scss')
          .pipe(styleguide.applyStyles())
          .pipe(gulp.dest(styleguidePath));
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open:dist', 'connect:dist']);
    }

    grunt.task.run([
      'open:dev',
      'webpack-dev-server'
    ]);
  });

  grunt.registerTask('test', ['karma']);

  grunt.registerTask('styleguide', ['gulp:styleguide-generate', 'gulp:styleguide-applystyles']);

  grunt.registerTask('build', ['clean', 'copy', 'webpack', 'styleguide']);

  grunt.registerTask('default', []);
};
