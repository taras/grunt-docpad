/*
 * grunt-deployd
 * https://github.com/taras/grunt-deployd
 *
 * Copyright (c) 2013 Taras Mankovski
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 9000,
          base: './out'
        }
      }
    },

    qunit: {
      all: {
        options: {
          urls: [
            'http://localhost:9000/tests/index.html'
          ]
        }
      }
    },

    open : {
      tests : {
        path: 'http://localhost:9000/tests',
        app: 'Google Chrome'
      }
    }


  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-contrib-qunit' );
  grunt.loadNpmTasks( 'grunt-open' );

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', function( target ) {

    grunt.event.on('qunit.spawn', function (url) {
      grunt.log.ok("Running test: " + url);
    });

    var tasks;
    if ( typeof target === 'undefined' ) {
      tasks = [
        'connect:server',
        'qunit'
      ];
    } else {
      tasks = [
        'open:tests',
        'connect:server:keepalive'
      ];
    }

    grunt.task.run( tasks );
  });

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint']);

};
