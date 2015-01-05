// Tyrian -- the new look of gentoo.org
// Alex Legler <a3li@gentoo.org>

'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            update_bootstrap: {
                command: ['git checkout -- .', 'git pull --rebase'].join('&&'),
                options: {
                    execOptions: {
                        cwd: 'sources/css/bootstrap/'
                    }
                }
            },
            build_tyrian_css: {
                command: 'grunt dist',
                options: {
                    stdout: true,
                    execOptions: {
                        cwd: './sources/css/tyrian/'
                    }
                }
            }
        },
        copy: {
            copy_assets: {
                files: [
                    {
                        cwd: 'sources/css/bootstrap/dist/',
                        src: [
                            'js/bootstrap.js',
                            'js/bootstrap.min.js',
                            'css/bootstrap.css',
                            'css/bootstrap.css.map',
                            'css/bootstrap.min.css',
                            'fonts/*'
                        ],
                        dest: 'assets/',
                        expand: true,
                        flatten: true
                    },
                    {
                        cwd: 'sources/css/tyrian/dist/',
                        src: [
                            '*.css'
                        ],
                        dest: 'assets/',
                        expand: true,
                        flatten: true
                    },
                    {
                        cwd: 'sources/fonts/',
                        src: [
                            '*.*'
                        ],
                        dest: 'assets/',
                        expand: true,
                        flatten: true
                    },
                    {
                        cwd: 'sources/img/',
                        src: [
                            '*.*'
                        ],
                        dest: 'assets/',
                        expand: true,
                        flatten: true
                    },
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-shell");

    grunt.registerTask("compile", ["shell:build_tyrian_css"]);
    grunt.registerTask("copy_assets", ["copy:copy_assets"]);

    grunt.registerTask("default", ["compile", "copy_assets"]);

    grunt.registerTask("update_bootstrap", ["shell:update_bootstrap"]);
};
