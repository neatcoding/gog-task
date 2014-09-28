module.exports = function(grunt) {

  var uglify_files = [
    'vendors/angular.min.js',
    'vendors/angular-animate.min.js',
    'vendors/angular-route.min.js',
    'vendors/angular-resource.min.js',
    'app/app.js',
    'app/animations.js',
    'app/controllers.js',
    'app/filters.js',
    'app/services.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      handlebars: 'web/handlebars',
      compiled: 'web/js/handlebars'
    },
    watch: {
      uglify: {
        files: uglify_files,
        tasks: ['uglify'],
        options: {
          livereload: true
        }
      },
      livereload: {
        files: [
          'assets/js/*.js',
          'assets/css/*.css', '**/*.html'
        ],
        options: {
          livereload: true
        }
      },
      configFiles: {
        files: [ 'Gruntfile.js', 'packages.json' ],
        options: {
          reload: true
        }
      }
    },
    uglify: {
      gog: {
        options: {
          preserveComments: 'some'
        },
        files: {
          'assets/js/script.all.min.js': uglify_files
        }
      }
    }
  });


  // grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [/*'coffee',*/ 'uglify']);

};