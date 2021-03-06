module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> version <%= pkg.version %> */\n'
      },
      build: {
        src: 'src/simple.js',
        dest: 'build/simple.min.js'
      }
    },
    jasmine: {
      javascripts: {
        src: [
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

  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('test', ['jasmine']);
};
