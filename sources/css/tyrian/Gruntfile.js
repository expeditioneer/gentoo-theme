// Tyrian -- the new look of gentoo.org
// Alex Legler <a3li@gentoo.org>

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
        },
        copy: {
            update_assets: {
                files: [
                    { expand: true, cwd: '../bootstrap/dist/css/', src: ['bootstrap.css', 'bootstrap.min.css'], dest: '../../../assets/css/'},
                    { expand: true, cwd: '../bootstrap/dist/fonts/', src: '*', dest: '../../../assets/fonts/'},
                    { expand: true, cwd: '../bootstrap/dist/js/', src: '*', dest: '../../../assets/js/'},
                    { expand: true, cwd: 'dist/', src: 'tyrian*.css', dest: '../../../assets/css/'},
                    { expand: true, cwd: 'fonts/', src: '*', dest: '../../../assets/fonts/'},
                ]
            }
        },
        sed: {
            inject_variables: {
                path: '../bootstrap/less/bootstrap.less',
                pattern: '@import "variables.less";',
                replacement: '@import "variables.less"; @import "../../tyrian/bootstrap/variables-tyrian.less";'
            }
        },
        shell: {
            update_bootstrap: {
                command: [
                    'git checkout -- .',
                    'git pull --rebase'
                ].join('&&'),
                options: {
                    execOptions: {
                        cwd: '../bootstrap/'
                    }
                }
            },
            build_bootstrap: {
                command: 'grunt dist',
                options: {
                    stdout: true,
                    execOptions: {
                        cwd: '../bootstrap/'
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-replace");
    grunt.loadNpmTasks("grunt-sed");
    grunt.loadNpmTasks("grunt-shell");

    // Compiles tryrian sources
    grunt.registerTask("compile", ["less:compile", "replace:compile"]);

    // Compresses tyrian sources
    grunt.registerTask("compress", ["less:minify"]);

    // Updates assets in the main directory
    grunt.registerTask("update_assets", ["copy:update_assets"]);

    // Updates bootstrap, injects our custom variables, and builds bootstrap
    grunt.registerTask("bootstrap", ["shell:update_bootstrap", "sed:inject_variables", "shell:build_bootstrap"]);

    // by default: compile and compress
    grunt.registerTask("default", ["compile", "compress"]);

    grunt.registerTask("all", ["bootstrap", "compile", "compress", "update_assets"]);
};

