/*
 * grunt-deployd
 * https://github.com/taras/grunt-deployd
 *
 * Copyright (c) 2013 Taras Mankovski
 * Licensed under the MIT license.
 */

'use strict';

require( 'coffee-script' );

module.exports = function(grunt) {

  grunt.registerMultiTask('docpad:generate', '(re)generates your project', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});

    var docpadConfig = require( './docpad' )

  });

};
