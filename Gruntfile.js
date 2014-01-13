module.exports = function (grunt) {
  "use strict";
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      boxSizing: {
        src: ['src/behavior/boxsizing/head', 'tmp/behavior/boxsizing/script.js', 'src/behavior/boxsizing/foot'],
        dest: 'polyfills/boxsizing.htc'
      }
    },
    uglify: {
      boxSizing: {
        options: {compress: true},
        files: {
          './tmp/behavior/boxsizing/script.js': ['src/behavior/boxsizing/script.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['uglify', 'concat']);
};