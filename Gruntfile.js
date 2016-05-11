module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy:{
        main: { 
          files: [ {
                expand: true,
                cwd: 'static',
                src: '**',
                dest: 'public/',
               }, {
                expand: true,
                cwd: 'src',
                src: 'directives/**.html',
                dest: 'public/',
               }, {
                expand: true,
                cwd: 'src',
                src: '**.html',
                dest: 'public/',
               } ]
           }
        },
        
    concat: {
          options: {
            stripBanners: true,
            sourceMap: true
          },
          js: {
            src: [ 'node_modules/gsc/dist/gsc.js', 'src/app.js', 'src/map/*.js', 
                   'src/MainController.js','src/directives/*.js'],
            dest: 'public/app.js',
          },
          css: {
            src: ['node_modules/gsc/dist/gsc.css','node_modules/gsc/dist/styles.css'],
            dest: 'public/app.css',
          },
      },
    
    bower_concat: {
          all: {
            dest: {
              'js': 'public/bower.js',
              'css': 'public/bower.css'
            },
            exclude: [ 'jquery' ],
            dependencies: {
              'tink-api-angular': ['angular' ,'jquery'],
            },
            bowerOptions: {
              relative: false
            }
          }
        },
    
    war: {
        target: {
          options: {
            war_verbose: true,
            war_dist_folder: 'build',
            war_name: 'GSC_CS_Client',
            webxml_welcome: 'index.html',
            webxml_display_name: '<%= pkg.name %>',
          },
          files: [
            {
              expand: true,
              cwd: 'public',
              src: ['**'],
              dest: ''
            }
          ]
        }
      } ,
      clean: { contents: ['build/*','public/*'] }
    
  });

  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-war');
  
  grunt.registerTask('default', ['bower_concat','concat','copy']);
  grunt.registerTask('build', ['bower_concat','concat','copy','war']);

};