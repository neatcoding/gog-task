module.exports = function(grunt) {

  var uglify_files = [
    'vendors/TweenLite.min.js',
    'vendors/Draggable.min.js',
    'vendors/CSSPlugin.min.js',
    'vendors/angular.min.js',
    'vendors/angular-route.min.js',
    'vendors/angular-resource.min.js',
    'app/app.js',
    'app/animations.js',
    'app/controllers.js',
    'app/directives.js',
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
      // coffee: {
        // files: coffee_files,
      //   tasks: ['coffee']
      // },
      uglify: {
        files: uglify_files,
        tasks: ['uglify']
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
          preserveComments: 'some'//,
          // compress: false,
          // mangle: false
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