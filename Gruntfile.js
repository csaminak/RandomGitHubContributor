module.exports = function(grunt) {
        'use strict';

        grunt.initConfig({

            clean: ['build/'],

            jshint: {
                options: {
                    jshintrc: '.jshintrc',
                    ignores: ['src/js/vendor/**']
                },
                all: {
                    files: {
                        src: ['src/js/**/*.js', 'Gruntfile.js']
                    }
                }
            },

            sass: {
                all: {
                    files: {
                        'build/css/styles.css': 'src/sass/main.scss'
                    }
                }
            },

            copy: {
                html: {
                    files: [{
                        expand: true, cwd: 'src/', src: ['index.html'], dest: 'build/'
                    }]
                }
            },

            concat: {
                js: {
                    options: {
                        sourceMap: true
                    },
                    src: ['src/js/*.js'],
                    dest: 'build/js/main.js'
                }
            },

            watch: {
                sass: {
                    files: ['src/sass/**/*.scss'],
                    tasks: ['sass']
                },
                js: {
                    files: ['src/js/*.js'],
                    tasks: ['jshint', 'concat']
                },
                html: {
                    files: ['src/index.html'],
                    tasks: ['copy:html']
                }
            }

        });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['clean', 'jshint', 'concat', 'sass', 'copy']);
    grunt.registerTask('default', ['build']);

};
