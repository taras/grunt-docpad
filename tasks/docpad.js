/*
 * grunt-deployd
 * https://github.com/taras/grunt-deployd
 *
 * Copyright (c) 2013 Taras Mankovski
 * Licensed under the MIT license.
 */

'use strict';

require( 'coffee-script' );
var
  docpad = require( 'docpad' ),
  path = require( 'path') ;

module.exports = function(grunt) {

  function getDocpadInstance( callback ) {
    var docpadInstance = grunt.config.get( 'docpadInstance' );
    if ( docpadInstance ) {
      grunt.log.debug( "Reusing existing Docpad Instance" );
      callback( docpadInstance );
    } else {
      // import docpad config
      var docpadConfigFile = path.join( process.cwd(), 'docpad' );
      var docpadConfig = require( docpadConfigFile );
      grunt.log.debug( "Read Docpad config: " + docpadConfigFile );

      docpad.createInstance( docpadConfig, function( err, docpadInstance ) {
        if ( err ) {
          return grunt.fail.warn( err.stack );
        }
        grunt.config.set( "docpadInstance", docpadInstance );
        grunt.log.debug( "Created an instance of Docpad." );
        callback( docpadInstance );
      });
    }
  }

  grunt.registerTask('docpad:generate', '(re)generates your project', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});

    // Tell grunt this task is asynchronous.
    var done = this.async();

    getDocpadInstance( function( docpadInstance ) {
      docpadInstance.action( 'generate', function ( err, result ) {
        if ( err ) {
          grunt.log.error( err.stack );
          done( false );
          return;
        }
        grunt.log.writeln( "Generate executed successfully" );
        done();
      });
    });
  });

  grunt.registerTask( 'docpad:watch', "watches your project for changes, and (re)generates whenever a change is made", function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});

    var done = this.async();

    getDocpadInstance( function( docpadInstance ) {
      docpadInstance.action( 'watch', function( err, result ) {
        if ( err ) {
          grunt.log.error( err.stack );
          done( false );
          return;
        }
        grunt.log.writeln( "Watching for Docpad file changes..." );
      });
    });
  })

};