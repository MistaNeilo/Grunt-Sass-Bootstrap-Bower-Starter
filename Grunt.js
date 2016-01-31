(function () {
    'use strict';
}());

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: 'rnrn'
            },
            js: {
                src: ['src/main.js'],
                dest: 'dist/basic.js',
            }
            //            css: {
            //                src: ['sass/*.css', 'src/extras.js'],
            //                dest: 'dist/with_extras.js',
            //            }
        },

        uglify: {
            options: {
                banner: '/*! &lt;%= pkg.name %&gt; &lt;%= grunt.template.today("dd-mm-yyyy") %&gt; */n'
            },
            dist: {
                files: {
                    'js/main.min.js': ['&lt;%= concat.js.dest %&gt;']
                }
            }
        },

        jshint: {
            files: ['gruntfile.js', 'js/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: 'sass/',
                    cssDir: 'css/',
                    environment: 'development',
                    outputStyle: 'compressed'
                }
            }
        },

        watch: {
            files: ['&lt;%= jshint.files %&gt;', 'sass/**/*.scss'],
            tasks: ['concat', 'uglify', 'jshint', 'compass']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['concat', 'uglify', 'jshint', 'compass', 'watch']);
};
