/* eslint-disable
    func-names,
    global-require,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Generated on 2017-09-15 using generator-reveal 1.0.0

'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {

      livereload: {
        options: {
          livereload: true,
        },
        files: [
          'index.html',
          'slides/{,*/}*.{md,html}',
          'js/*.js',
          'css/*.css',
          'resources/**',
        ],
      },

      index: {
        files: [
          'templates/_index.html',
          'templates/_section.html',
          'slides/list.json',
        ],
        tasks: ['buildIndex'],
      },

      coffeelint: {
        files: ['Gruntfile.coffee'],
        tasks: ['coffeelint'],
      },

      eslint: {
        files: ['js/**/*.js'],
        tasks: ['eslint'],
      },

      sass: {
        files: ['css/source/theme.scss'],
        tasks: ['sass'],
      },
    },

    sass: {

      theme: {
        files: {
          'css/theme.css': 'css/source/theme.scss',
        },
      },
    },

    connect: {

      livereload: {
        options: {
          port: 9000,
          base: '.',
          open: true,
          livereload: true,
        },
      },
    },

    coffeelint: {

      options: {
        indentation: {
          value: 4,
        },
        max_line_length: {
          level: 'ignore',
        },
      },

      all: ['Gruntfile.coffee'],
    },

    eslint: {
      all: ['js/**/*.js'],
    },

    copy: {

      dist: {
        files: [{
          expand: true,
          src: [
            'slides/**',
            'bower_components/**',
            'js/**',
            'css/*.css',
            'resources/**',
          ],
          dest: 'dist/',
        }, {
          expand: true,
          src: ['index.html'],
          dest: 'dist/',
          filter: 'isFile',
        }],
      },
    },


    buildcontrol: {

      options: {
        dir: 'dist',
        commit: true,
        push: true,
        message: 'Built from %sourceCommit% on branch %sourceBranch%',
      },
      pages: {
        options: {
          remote: '<%= pkg.repository.url %>',
          branch: 'gh-pages',
        },
      },
    },
  });


  // Load all grunt tasks.
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('buildIndex',
    'Build index.html from templates/_index.html and slides/list.json.',
    () => {
      const indexTemplate = grunt.file.read('templates/_index.html');
      const sectionTemplate = grunt.file.read('templates/_section.html');
      const slides = grunt.file.readJSON('slides/list.json');

      const html = grunt.template.process(indexTemplate, {
        data: {
          slides,
          section(slide) {
            return grunt.template.process(sectionTemplate, {
              data: {
                slide,
              },
            }
            );
          },
        },
      }
      );
      return grunt.file.write('index.html', html);
    });

  grunt.registerTask('test',
    '*Lint* javascript and coffee files.', [
      'coffeelint',
      'eslint',
    ]);

  grunt.registerTask('serve',
    'Run presentation locally and start watch process (living document).', [
      'buildIndex',
      'sass',
      'connect:livereload',
      'watch',
    ]);

  grunt.registerTask('dist',
    'Save presentation files to *dist* directory.', [
      'test',
      'sass',
      'buildIndex',
      'copy',
    ]);


  grunt.registerTask('deploy',
    'Deploy to Github Pages', [
      'dist',
      'buildcontrol',
    ]);


  // Define default task.
  return grunt.registerTask('default', [
    'test',
    'serve',
  ]);
};
