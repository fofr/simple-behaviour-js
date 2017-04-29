module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/simple-be.js',
        dest: 'build/simple-be.min.js'
      }
    },
    jasmine: {
      javascripts: {
        src: [
          'node_modules/jquery/dist/jquery.js',
          'src/**/*.js'
        ],
        options: {
          specs: 'spec/**/*.spec.js',
          helpers: 'spec/*.helper.js'
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('test', ['jasmine']);
};
