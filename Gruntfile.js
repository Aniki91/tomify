module.exports = function(grunt) {

grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

     // configure uglify to minify js file -------------------------------------
    uglify: {
      build: {
        files: {
          'dist/js/main.min.js': ['js/**/*.js']
        }
      }
    },

    // minify css file -------------------------------------
    cssmin: {
      target: {
        files: {
          'dist/css/application.min.css' : 'assets/css/application.css'
        }
      }
    },

    // compile scss stylesheets to css -----------------------------------------
    sass: {
      options: {
        sourcemap: 'none'
      },
      dist: {
        files: {
          'assets/css/application.css': 'assets/sass/application.scss'
        }
      }
    },

    jshint: {
      all: ['js/**/*.js']
    },

    // watach tasks -------------------------------------
    watch:{
      js: {
        files: ['js/**/*.js'],
        tasks: ['jshint', 'uglify'],
          options: {
            spawn: false,
          }
      },
      sass: {
        files: ['assets/sass/**/*.scss'],
        tasks: ['sass', 'cssmin'],
          options: {
            spawn: false,
          }
      }
    }
});

grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-cssmin');

grunt.registerTask("default", [ "uglify", "cssmin", "sass", "jshint", "watch" ]);
};
