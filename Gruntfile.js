module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      html: {
        expand: true,
        cwd: 'client/views',
        src: ['index.html',
              '**/*.html'],
        dest: 'server/public/views/'
      },
      css: {
        expand: true,
        cwd: 'client/styles',
        src: ['style.css'],
        dest: 'server/public/styles/'
      },
      bootstrap: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist/',
        src: ['css/bootstrap.css',
              'css/bootstrap.min.css',
              'css/bootstrap.min.css.map',
              'js/bootstrap.js'],
        dest: 'server/public/vendors/bootstrap/'
      },
      moment: {
        expand: true,
        cwd: 'node_modules/moment/',
        src: ['moment.js'],
        dest: 'server/public/vendors/moment/'
      },
      angular: {
        expand: true,
        cwd: 'node_modules/angular/',
        src: ['angular.js',
              'angular.min.js',
              'angular.min.js.map'],
        dest: 'server/public/vendors/angular/'
      },
      angularRoute: {
        expand: true,
        cwd: 'node_modules/angular-route/',
        src: ['angular-route.js',
              'angular-route.min.js',
              'angular-route.min.js.map'],
        dest: 'server/public/vendors/angular-route/'
      },
      scripts: {
        expand: true,
        cwd: 'client/scripts/',
        src: ['*.js',
              '**/*.js'],
        dest: 'server/public/scripts/'
      },
    },
    watch: {
      save: {
        files: ['client/**/*.*'],
        tasks: ['copy']
      },
      refresh: {
        files: ['server/public/scripts/*.js', 'server/public/stylesheets/*.css', 'server/public/views/*.html', 'server/public/vendors/*.*'],
        options: {
          livereload: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['copy', 'watch']);
};
