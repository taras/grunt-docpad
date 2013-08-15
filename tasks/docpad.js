/*
 * grunt-deployd
 * https://github.com/taras/grunt-deployd
 *
 * Copyright (c) 2013 Taras Mankovski
 * Licensed under the MIT license.
 */

'use strict';

require( 'coffee-script' );
var docpad = require( 'docpad' );

module.exports = function(grunt) {

  grunt.registerMultiTask('generate', '(re)generates your project', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});

    var docpadConfig = require( './docpad' );

    docpad.createInstance( docpadConfig, function( err, docpadInstance ) {
      if ( err ) {
        return grunt.fail.warn( err.stack );
      }

      docpadInstance.action( 'generate', function ( err, result ) {
        if ( err ) {
          return grunt.log.error( err.stack );
        }

        grunt.log.writeln( "Generate executed successfully" );
      });
    });


  });

};
