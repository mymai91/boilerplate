var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({lazy:false});
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var stream = require('event-stream');

/**
 * Load in our build configuration file.
 */
var build_config = require( './build.config.js' );

/**
 * Clean the build directory
 */
gulp.task('clean', function() {
	gutil.log('Cleaning build directory: ' + build_config.deploy_dir)
    return gulp.src(build_config.deploy_dir, {read: false})
    	.pipe(clean());
});

/**
 * Build and deploy index.html
 */

gulp.task('index', ['clean'], function() {
	gutil.log('Build and deploy index.html');

	var js_vendor_stream	= gulp.src(build_config.vendor_files.js)
			.pipe(concat('app.js'))
			.pipe(uglify())
			.pipe(gulp.dest(build_config.deploy_dir + '/includes'));

	var js_app_stream = gulp.src(build_config.app_files.js)
		.pipe(concat('vendor.js'))
		.pipe(uglify())
		.pipe(gulp.dest(build_config.deploy_dir + '/includes'));

	var all_streams = stream.merge(js_vendor_stream, js_app_stream);

	gulp.src(build_config.app_files.index_src)
		.pipe(inject(all_streams, {ignorePath:build_config.deploy_dirgulp}))
		.pipe(gulp.dest(build_config.deploy_dir));
});

/**
 * Build the vendor.js and inject into index.html
 */

/**
 * Concat and minify all the app js
 */

/**
 * Full Build
 */
gulp.task('build', ['clean','index']);


gulp.task('connect', plugins.connect.server(
	{
    root: ['build'],
    port: 9001,
    livereload: {port: 35730}
	}
));

gulp.task('default',['connect']);