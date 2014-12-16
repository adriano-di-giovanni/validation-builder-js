'use strict';

module.exports = function (grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON('./package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        options: '.jshintignore'
      },
      grunt: [
        'Gruntfile.js'
      ],
      lib: [
        'lib/**/*.js',
      ],
      test: {
        options: {
          '-W030': true
        },
        src: [ 'test/**/*.js' ]
      },
      dist: [
        'dist/ValidationBuilder.js'
      ],
    },

    concat: {
      options: {
        banner: grunt.file.read('./build/banner.js'),
        footer: grunt.file.read('./build/footer.js')
      },
      dist: {
        src: [
          'lib/Invokable.js',
          'lib/Validation.js',
          'lib/ValidationBuilder.js',
          'lib/validators/containsAll.js',
          'lib/validators/containsAny.js',
          'lib/validators/isArray.js',
          'lib/validators/isNull.js',
          'lib/validators/isUndefined.js',
        ],
        dest: 'dist/ValidationBuilder.js'
      }
    },

    uglify: {
      options: {
        preserveComments: false
      },
      dist: {
        files: {
          'dist/ValidationBuilder.min.js': 'dist/ValidationBuilder.js'
        }
      }
    }
  });

  grunt.registerTask('dist', [
    'jshint:grunt',
    'jshint:lib',
    'jshint:test',
    'concat',
    'jshint:dist',
    'uglify'
  ]);
};
