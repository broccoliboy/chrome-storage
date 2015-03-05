// Generated on 2015-03-05 using generator-chromeapp 0.2.15
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    //Copies remaining files to places other tasks can use
    copy: {
      default: {
        files: [
          {expand: true, src: ['../chrome-storage.html'], dest: 'components/chrome-storage/*'},
          {expand: true, src: ['../../polymer/**'], dest: 'components/polymer/**'},
          {expand: true, src: ['../../webcomponentsjs/**'], dest: 'components/webcomponentsjs/**'}
        ]
      }
    },

    // prepare polymer elements for use in chrome app
    vulcanize: {
      default: {
        options: {
          strip: false,
          csp: true
        },
        files: {
          'demo.vulcanized.html': [
            'demo.html'
          ]
        }
      }
    }

  });

  grunt.registerTask('build', [
    'copy',
    'vulcanize'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
