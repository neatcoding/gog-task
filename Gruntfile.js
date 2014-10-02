module.exports = function(grunt) {

  var uglifyFiles = [
    'vendors/TweenLite.min.js',
    'vendors/Draggable.min.js',
    'vendors/CSSPlugin.min.js',
    'vendors/RoundPropsPlugin.min.js',
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

  var compassFiles = [
    'assets/sass/**/*.scss'
  ];

  var liveReloadFiles = [
    'assets/js/*.js',
    'assets/css/*.css', '**/*.html'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      // coffee: {
      //   files: coffeeFiles,
      //   tasks: ['coffee']
      // },
      uglify: {
        files: uglifyFiles,
        tasks: ['uglify']
      },
      compass: {
        files: compassFiles,
        tasks: ['compass']
      },
      livereload: {
        files: liveReloadFiles,
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
    compass: {
      compile: {
        options: {
          config: 'assets/config.rb',
          basePath: 'assets'
        }
      }
    },
    uglify: {
      gog: {
        options: {
          preserveComments: 'some'//,
          // should be done by dev and prod environment detection
          // compress: false,
          // mangle: false
        },
        files: {
          'assets/js/script.all.min.js': uglifyFiles
        }
      }
    }
  });


  // grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [/*'coffee',*/ 'compass', 'uglify']);

};