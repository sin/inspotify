//noinspection JSLint
module.exports = function (grunt) {
    'use strict';

    //noinspection JSUnresolvedFunction
    grunt.initConfig({
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/jquery/dist/',
                        src: '**',
                        dest: 'dist/js/libs/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/mustache/',
                        src: 'mustache.js',
                        dest: 'dist/js/libs/'
                    },
                    {
                        expand: true,
                        cwd: 'static/img/',
                        src: '**',
                        dest: 'dist/img/'
                    },
                    {
                        expand: true,
                        cwd: 'src/js/',
                        src: '**',
                        dest: 'dist/js/'
                    },
                    {
                        expand: true,
                        cwd: 'static/',
                        src: 'favicon.ico',
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        cwd: 'src/html/',
                        src: '**',
                        dest: 'dist/'
                    }
                ]
            },
            html: {
                expand: true,
                cwd: 'src/html/',
                src: '**',
                dest: 'dist/'
            },
            js: {
                expand: true,
                cwd: 'src/js/',
                src: '**',
                dest: 'dist/js/'
            }
        },
        uglify: {
            options: {
                sourceMap: true
            },
            main: {
                src: 'dist/js/main.js',
                dest: 'dist/js/main.min.js'
            },
            libs: {
                src: 'dist/js/libs/mustache.js',
                dest: 'dist/js/libs/mustache.min.js'
            }
        },
        less: {
            options: {
                cleancss: true
            },
            main: {
                src: 'src/less/main.less',
                dest: 'dist/css/main.min.css'
            }
        },
        autoprefixer: {
            options: {
                browsers: ['> 5%', 'last 2 versions']
            },
            main: {
                src: 'dist/css/main.min.css',
                dest: 'dist/css/main.min.css'
            }
        },
        watch: {
            js: {
                files: 'src/js//*.js',
                tasks: ['copy:js', 'uglify:main']
            },
            css: {
                files: 'src/less/main.less',
                tasks: ['less', 'autoprefixer']
            },
            html: {
                files: 'src/html/index.html',
                tasks: ['copy:html']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('default', ['copy:main', 'uglify', 'less', 'autoprefixer']);
    grunt.registerTask('js', ['copy:js', 'uglify:main']);
    grunt.registerTask('css', ['less', 'autoprefixer']);
    grunt.registerTask('html', ['copy:html']);
    grunt.registerTask('dev', ['watch']);
};