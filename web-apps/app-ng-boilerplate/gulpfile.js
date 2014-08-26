var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({lazy:false});
var gutil = require('gulp-util');
var clean = require('gulp-rimraf');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var stream = require('event-stream');
var html2js = require('gulp-html2js');
var order = require("gulp-order");

/**
 * Load in our build configuration file.
 */
var build = require( './build.config.js' );
var pkg = require( './package.json' );

/**
 * Clean the build directory
 */
gulp.task('clean', function() {
	gutil.log('Cleaning build directory: ' + build.deploy.root);
    return gulp.src(build.deploy.root, {read: false})
    	.pipe(clean());
});

/**
 * Build and deploy index.html, templates, css, and javascript
 */

gulp.task('index', ['clean'], function() {
	gutil.log('Build and deploy index.html:' + build.app.templates);

	var jsVendor = gulp.src(build.vendor.js)
			.pipe(concat('vendor.js'))
			.pipe(uglify())
			.pipe(gulp.dest(build.deploy.js));

	var jsApp = gulp.src(build.app.js)
		.pipe(concat('app.js'))
//		.pipe(uglify())  
		.pipe(gulp.dest(build.deploy.js));
		
	var jsTemplate = gulp.src(build.app.templates)
		.pipe(html2js({
			  outputModuleName: 'templates-app',	
	          base: 'src/app'
	        }))
		.pipe(concat('template.js'))
		.pipe(gulp.dest(build.deploy.js));
		
	var appStyles = gulp.src(build.app.css)
		.pipe(concat('appstyles.css'))
		.pipe(gulp.dest(build.deploy.styles));

	var all = stream.merge(jsVendor, jsTemplate, jsApp, appStyles)
		.pipe(order([
			'*vendor*',
			'*template*',
			'*'
			]));

	return gulp.src(build.app.index)
		.pipe(inject(all, {ignorePath:build.deploy.root}))
		.pipe(gulp.dest(build.deploy.root));
});


/**
 * Full Build
 */
gulp.task('build', ['clean','index'], function() {
	gutil.log('Version: ' + pkg.version + ' build complete!');
});


gulp.task('connect', plugins.connect.server(
	{
    root: ['build'],
    port: 9001,
    livereload: {port: 35730}
	}
));

gulp.task('default',['connect']);