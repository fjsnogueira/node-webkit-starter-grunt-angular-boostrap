/*jslint node: true */
'use strict';

var fs = require("fs");

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-text-replace');

    var buildConfig = require('./build.config.js');


    /**
     * This is the configuration object Grunt uses to give each plugin its
     * instructions.
     */
    var pkg = grunt.file.readJSON("package.json");

//	var appName = 'ant-' + pkg.version;
    var appName = 'nodeWebkitDemo';
    var taskConfig = {
        pkg: grunt.file.readJSON("package.json"),

        shell: {
            build: {
                command: 'npm install',
                options: {
                    stdout: true,
                    execOptions: {
                        cwd: 'src'
                    }
                }
            },
            fix_mac: {
                command: [
                        'rm -rf webkitprod/releases/' + appName + '/mac/' + appName + '.app/Contents/Resources/app.nw',
                        'unzip -q webkitprod/releases/' + appName + '/' + appName + '.nw -d webkitprod/releases/' + appName + '/mac/' + appName + '.app/Contents/Resources/app.nw'
                ].join('&&'),
                options: {
                    stdout: true,
                    execOptions: {
                        cwd: './'
                    }
                }
            },
            sign_mac: {
                command: [
                        'cd webkitprod/releases/' + appName + '/mac/; sh ../../../../sign.sh ' + appName + '.app'
                ].join('&&'),
                options: {
                    stdout: true,
                    execOptions: {
                        cwd: './'
                    }
                }
            },
//            compress_mac: {
//                command: [
//                        'cd webkitprod/releases/' + appName + '/mac/;../../../../yoursway-create-dmg/create-dmg --window-size 799 457 --volname "' + appName +
//                        '" --app-drop-link 550 145 --background Folder-Background.jpg --volicon Mounted-Image.icns --icon "' + appName + '" 260 148 ' + appName + '.dmg ' + appName + '.app'
//                ].join('&&'),
//                options: {
//                    stdout: true,
//                    execOptions: {
//                        cwd: './'
//                    }
//                }
//            },

            compress_mac: {
                command: [
                        'cd webkitprod/releases/' + appName + '/mac/;../../../../yoursway-create-dmg/create-dmg --window-size 799 457 --volname "' + appName +
                        '" --app-drop-link 550 145 --icon "' + appName + '" 260 148 ' + appName + '.dmg ' + appName + '.app'
                ].join('&&'),
                options: {
                    stdout: true,
                    execOptions: {
                        cwd: './'
                    }
                }
            },

            buildLinux_amd64: {
                command: [
                        'chmod a+x webkitprod/releases/' + appName + '/linux64/' + appName + '/run.sh',
                        './makeself/makeself.sh --notemp webkitprod/releases/' + appName + '/linux64/' + appName + '  webkitprod/releases/' + appName + '/linux64/' + appName + '-amd64.sh.run "nodeWebkitDemo version ' + pkg.version + '" ./run.sh'
                ].join('&&'),
                options: {
                    stdout: true,
                    execOptions: {
                        cwd: './'
                    }
                }
            },
            buildLinux_i386: {
                command: [
                        'chmod a+x webkitprod/releases/' + appName + '/linux32/' + appName + '/run.sh',
                        './makeself/makeself.sh --notemp webkitprod/releases/' + appName + '/linux32/' + appName + '  webkitprod/releases/' + appName + '/linux32/' + appName + '-i386.sh.run "nodeWebkitDemo version ' + pkg.version + '" ./run.sh'
                ].join('&&'),
                options: {
                    stdout: true,
                    execOptions: {
                        cwd: './'
                    }
                }
            }
        },
        copy: {
            build: {
                files: [
                    {
                        src: [ '<%= vendor_files.font %>' ],
                        dest: '<%= build_dir %>/fonts/',
                        flatten: true,
                        cwd: '.',
                        expand: true
                    },
                    {
                        src: [ '<%= vendor_files.js %>' ],
                        dest: '<%= build_dir %>/js/vendor/',
                        flatten: true,
                        cwd: '.',
                        expand: true
                    },
                    {
                        src: [ '<%= vendor_files.js_add %>' ],
                        dest: '<%= build_dir %>/js/vendor/',
                        flatten: true,
                        cwd: '.',
                        expand: true
                    },
                    {
                        src: [ '<%= vendor_files.css %>' ],
                        dest: '<%= build_dir %>/css/',
                        flatten: true,
                        cwd: '.',
                        expand: true
                    },
                    {
                        src: [ '<%= vendor_files.css_add %>' ],
                        dest: '<%= build_dir %>/css/',
                        flatten: true,
                        cwd: '.',
                        expand: true
                    },
                    {
                        src: [ '**' ],
                        dest: '<%= build_dir %>/img/',
                        flatten: false,
                        cwd: './src/img/',
                        expand: true
                    },
                    {
                        src: [ '**' ],
                        dest: '<%= build_dir %>/js/',
                        flatten: false,
                        cwd: './src/js/',
                        expand: true
                    } ,
                    {
                        src: [ '**' ],
                        dest: '<%= build_dir %>/partials/',
                        flatten: false,
                        cwd: './src/partials/',
                        expand: true
                    },
                    {
                        src: [ '**' ],
                        dest: '<%= build_dir %>/',
                        cwd: 'src/favicons',
                        expand: true
                    },
                    {
                        src: ['node_modules/**'],
                        dest: '<%= build_dir %>/',
                        cwd: './src/',
                        expand: true
                    }
                ]
            },
            compile: {
                files: [
                    {
                        src: [ '<%= vendor_files.font %>' ],
                        dest: '<%= compile_dir %>/fonts/',
                        flatten: true,
                        cwd: '.',
                        expand: true
                    },
                    {
                        src: [ '<%= vendor_files.js_add %>' ],
                        dest: '<%= compile_dir %>/js/vendor/',
                        flatten: true,
                        cwd: '.',
                        expand: true
                    },
                    {
                        src: [ '<%= vendor_files.css %>' ],
                        dest: '<%= compile_dir %>/css/',
                        flatten: true,
                        cwd: '.',
                        expand: true
                    },
                    {
                        src: [ '<%= vendor_files.css_add %>' ],
                        dest: '<%= compile_dir %>/css/',
                        flatten: true,
                        cwd: '.',
                        expand: true
                    },
                    {
                        src: [ '**' ],
                        dest: '<%= compile_dir %>/img/',
                        flatten: false,
                        cwd: './src/img/',
                        expand: true
                    },
                    {
                        src: [ '**' ],
                        dest: '<%= compile_dir %>/partials/',
                        flatten: false,
                        cwd: './src/partials/',
                        expand: true
                    },
                    {
                        src: [ '**' ],
                        dest: '<%= compile_dir %>/',
                        cwd: 'src/favicons',
                        expand: true
                    },
                    {
                        src: ['node_modules/**'],
                        dest: '<%= compile_dir %>/',
                        cwd: 'src/',
                        expand: true
                    }
                ]
            },
            'buildLinux': {
                files: [
                    {
                        src: [ 'run.sh' ],
                        dest: './webkitprod/releases/' + appName + '/linux64/' + appName + '',
                        cwd: '.',
                        expand: true
                    },
                    {
                        src: [ 'run.sh' ],
                        dest: './webkitprod/releases/' + appName + '/linux32/' + appName + '',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            'macIcons': {
                files: [
                    {
                        src: [ '*' ],
                        dest: './webkitprod/releases/' + appName + '/mac/',
                        cwd: './AppIcons/',
                        expand: true
                    }
                ]
            }
        },
        clean: {
            all: ['<%= build_dir %>', '<%= compile_dir %>'],
            build: ['<%= build_dir %>', 'webkitdev/releases'],
            compile: ['<%= compile_dir %>', 'webkitprod/releases']
        },
        index: {

            /**
             * During development, we don't want to have wait for compilation,
             * concatenation, minification, etc. So to avoid these steps, we simply
             * add all script files directly to the `<head>` of `index.html`. The
             * `src` property contains the list of included files.
             */
            build: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= vendor_files.css %>',
                    '<%= build_dir %>/css/<%= pkg.name %>.css',
                    './src/js/app/appConfig.js',
                    './src/js/app/*.js'
                ]
            },
            compile: {
                dir: '<%= compile_dir %>',
                src: [
                    '<%= concat.compile_js.dest %>',
                    '<%= vendor_files.css %>',
                    '<%= compile_dir %>/css/<%= pkg.name %>.css'
                ]
            }
        },
        less: {
            build: {
                files: {
                    '<%= build_dir %>/css/<%= pkg.name %>.css':'<%= app_files.less %>'
                },
                options: {
                    compile: false,
                    cleancss: false
                }
            },
            compile: {
                files: {
                    '<%= compile_dir %>/css/<%= pkg.name %>.css':'<%= app_files.less %>'
                },
                options: {
                    compile: true,
                    cleancss: true
                }
            }
        },
        uglify: {
            compile: {
                options: {
                    preserveComments: 'all'
                },
                files: {
                    '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
                }
            }
        },
        jshint: {
            src: [
                '<%= app_files.js %>'
            ],
            app: [
                './src/js/app/*.js'
            ],
            gruntfile: [
                'Gruntfile.js'
            ],
            traceroute: [
                'src/node_modules/traceroute/traceroute.js'
            ],
            build_config: [
                'build.config.js'
            ],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true,
                globalstrict: true,
                latedef: true,
                globals: {
                    angular: false,
                    sjcl: false,
                    google: false,
                    console: false,
                    speak: false,
                    $: false,
                    mainCtrl: false,
                    require: false,
                    cb: false,
                    exports: false
                }
            }
        },
        concat: {
            compile_js: {
                src: [
                    '<%= vendor_files.js %>',
                    './src/js/app/appConfig.js',
                    './src/js/app/*.js'
                ],
                dest: '<%= compile_dir %>/js/vendor/<%= pkg.name %>.js'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: [ 'jshint:gruntfile'],
                options: {
                    livereload: false
                }
            },
            build_config: {
                files: 'build.config.js',
                tasks: [ 'jshint:build_config'],
                options: {
                    livereload: false
                }
            },
            js: {
                files: ['<%= app_files.js %>'],
                tasks: ["jshint:src", 'build'],
                options: {
                    livereload: true
                }
            },
            less: {
                files: [ 'src/**/*.less' ],
                tasks: [ 'less:build' ],
                options: {
                    livereload: true
                }
            },
            html: {
                files: [ '<%= app_files.html %>' ],
                tasks: [ 'build' ]
            },
            app: {
                files: [ 'src/js/app/*' ],
                tasks: [ 'jshint:app', 'build' ],
                options: {
                    livereload: true
                }
            },
            partials: {
                files: [ 'src/partials/**' ],
                tasks: [ 'build' ],
                options: {
                    livereload: true
                }
            }
        },
        nodewebkit: {
            build: {
                options: {
                    build_dir: './webkitdev', // Where the build version of my node-webkit src is saved
                    mac: true, // We want to build it for mac
                    win: true, // We want to build it for win
                    linux32: true, // We don't need linux32
                    linux64: true, // We don't need linux64
                    keep_nw: false,
                    mac_icns: './src/img/App-Icon-512px.icns',
                    credits: 'src/credits.html',
                    version: '0.9.2',
                    app_name: appName,
                    app_version: grunt.config('pkg.version')
                },
                src: ['./build/**/*'] // Your node-wekit src
            },
            compile: {
                options: {
                    build_dir: './webkitprod', // Where the build version of my node-webkit src is saved
                    mac: true, // We want to build it for mac
                    win: true, // We want to build it for win
                    linux32: true, // We don't need linux32
                    linux64: true, // We don't need linux64
                    keep_nw: true,
                    mac_icns: './src/img/App-Icon-512px.icns',
                    credits: 'src/credits.html',
                    version: '0.9.2',
                    app_name: appName,
                    app_version: grunt.config('pkg.version')
                },
                src: ['./bin/**/*'] // Your node-wekit src
            }
        },
        bump: {
            files: ['package.json', 'component.json'],
            updateConfigs: ['pkg', 'component'],
            commit: false
        },
        compress: {
            main: {
                options: {
                    mode: 'zip',
                    archive: 'webkitprod/releases/' + appName + '/mac/' + appName + '-mac.app.zip'
                },
                expand: true,
                cwd: 'webkitprod/releases/' + appName + '/mac/',
                src: ['*app/**'],
                dest: './'
            }
        },
        replace: {
            run: {
                src: ['./run_raw.sh'],             // source files array (supports minimatch)
                dest: './run.sh',             // destination directory or file
                replacements: [{
                    from: './afriNetworkTest',                   // string replacement
                    to: './'+ appName
                }]
            }
        }
    };

    /**
     * A utility function to get all app JavaScript sources.
     */
    function filterForJS(files) {
        return files.filter(function (file) {
            return file.match(/\.js$/);
        });
    }

    /**
     * A utility function to get all app CSS sources.
     */
    function filterForCSS(files) {
        return files.filter(function (file) {
            return file.match(/\.css$/);
        });
    }

    grunt.initConfig(grunt.util._.extend(taskConfig, buildConfig));

    //installation-related

    grunt.registerTask('build', ['shell:build', 'clean:all', 'copy:build',
        'less:build',
        'index:build', 'devpackage']);

    grunt.registerTask('buildnw', ['nodewebkit:build']);

    grunt.registerTask('compile', ['shell:build', 'clean:compile', 'copy:compile', 'concat:compile_js',
        'less:compile',
        'index:compile',
        'copy:compile', 'uglify', 'livepackage', 'nodewebkit:compile','replace:run', 'copy:buildLinux', 'shell:buildLinux_i386', 'shell:buildLinux_amd64', 'shell:fix_mac','copy:macIcons',  'shell:compress_mac'
    ]);

//    grunt.registerTask('compile', ['shell:build', 'clean:compile', 'copy:compile', 'concat:compile_js',
//        'less:compile',
//        'index:compile',
//        'copy:compile', 'uglify', 'livepackage', 'nodewebkit:compile','replace:run', 'copy:buildLinux', 'shell:buildLinux_i386', 'shell:buildLinux_amd64', 'shell:fix_mac','copy:macIcons', 'shell:sign_mac', 'shell:compress_mac'
//    ]);

    grunt.registerTask('live', ['bump-only:patch', 'compile']);

    grunt.registerTask('minor', ['bump:minor']);
    grunt.registerTask('major', ['bump:major']);

    grunt.registerTask('sleep', function () {
        console.log('Sleeping to wait for sign to finish');
        setTimeout(this.async(), 2000);
    });

    grunt.registerTask('install', ['shell:install']);

    grunt.registerTask('livepackage', function () {
        var tmpPkg = require('./src/package.json');

        tmpPkg.window.toolbar = false;
        tmpPkg.version = grunt.config('pkg.version');
        grunt.file.write(grunt.config('compile_dir') + '/package.json', JSON.stringify(tmpPkg, null, 2));
    });

    grunt.registerTask('devpackage', function () {
        var tmpPkg = require('./src/package.json');

        tmpPkg.window.toolbar = true;
        tmpPkg.version = grunt.config('pkg.version');
        grunt.file.write(grunt.config('build_dir') + '/package.json', JSON.stringify(tmpPkg, null, 2));
    });

    grunt.registerMultiTask('index', 'Process index.html template', function () {

        var dirRE = new RegExp('^(' + grunt.config('build_dir') + '(\/.*|)|' + grunt.config('compile_dir') + '(\/.*|)|' + grunt.config('bower_dir') + '\/.*)\/', 'g');
        var dirAppRE = new RegExp('^(.\/src\/.*)\/', 'g');
        var jsFiles = filterForJS(this.filesSrc).map(function (file) {
//			grunt.log.write(file+"\n");
            file = file.replace(dirRE, 'js/vendor/');
//			grunt.log.write(file+"\n");
//			grunt.log.write( file.replace( dirAppRE, 'js/app/' )+"\n");
            return file.replace(dirAppRE, 'js/app/');
        });

        var cssFiles = filterForCSS(this.filesSrc).map(function (file) {
//			grunt.log.write(file+"\n");
//			grunt.log.write(dirRE+"\n");
//			grunt.log.write(file.replace( dirRE, 'css/' )+"\n");
            return file.replace(dirRE, 'css/');
        });
        grunt.file.copy(grunt.config('app_files.html'), this.data.dir + '/index.html', {
            process: function (contents, path) {
                return grunt.template.process(contents, {

                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    });

};