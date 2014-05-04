module.exports = {

    build_dir: 'build',
    compile_dir: 'bin',
    app_dir:'webkitbuilds',
    bower_dir:'bower_components',

    app_files: {
        html: [ 'src/index.html' ],
        less: 'src/less/main.less',
        js: [ 'src/js/*.js','src/js/vendor/*.js']
    },
    vendor_files: {
        js: [
            'bower_components/jquery/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/angular-ui-router/release/ui-bootstrap-tpls.js',
            'bower_components/momentjs/moment.js'
        ],
        js_add: [
            'bower_components/headjs/dist/1.0.0/head.js'
        ],
        jsunit: [ 'src/**/*.spec.js' ],
        css: [
            //'bower_components/ng-grid/ng-grid.css'
        ],
        css_add: [
        ],
        font: [
            'bower_components/font-awesome/fonts/*',
            'src/fonts/*'
        ]

    }
};