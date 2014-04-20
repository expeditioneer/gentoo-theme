'use strict';
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            compile: {
                options: {
                    strictMath: true,
                },
                files: {
                    "dist/tyrian.css": "less/tyrian.less"
                }                
            },
            minify: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "dist/tyrian.min.css": "dist/tyrian.css"
                }
            }
        },
        replace: {
            compile: {
                options: {
                    patterns: [
                        {
                            match: /^(.*\r?\n)*\/\* tyrian-start \*\/\r?\n/gm,
                            replacement: ""
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['dist/tyrian.css'], dest: 'dist/'}
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-replace");

    grunt.registerTask("compile", ["less:compile", "replace:compile"]);
    grunt.registerTask("compress", ["less:minify"]);
    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask("default", ["compile", "compress"]);
};