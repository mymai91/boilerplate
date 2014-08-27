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
var replace = require("gulp-replace-task");
var awspublish = require('gulp-awspublish');

/**
 * Load in our build configuration file.
 */
var build = require( './build.config.js' );
var pkg = require( './package.json' );
var aws = require('./aws.config.json');

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

gulp.task('dev-build', ['clean'], function() {

  gutil.log('DEV BUILD: Build and deploy index.html, js, templates, and css');

  // concat the all the vendor js to vendor.js
  var jsVendor = gulp.src(build.vendor.js)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(build.deploy.js));

  // concat all the app js to app.js, inject in dev settings
  var jsApp = gulp.src(build.app.js)
    .pipe(replace({
			 patterns: [{json: build.deploy.devSettings}]
		}))
		.pipe(gulp.dest(build.deploy.js));

  // convert all the templates to js and concat to template.js
  var jsTemplate = gulp.src(build.app.templates)
    .pipe(html2js({
			 outputModuleName: 'templates-app',
			 base: 'src/modules'
    }))
    .pipe(concat('template.js'))
    .pipe(gulp.dest(build.deploy.js));

  // concat all the css to appstyles.css
	var appStyles = gulp.src(build.app.css)
	  .pipe(concat('appstyles.css'))
		.pipe(gulp.dest(build.deploy.styles));

  // merge all the streams together
	var all = stream.merge(jsVendor, jsTemplate, jsApp, appStyles)
	  .pipe(order([
			'*vendor*',
			'*template*',
			'*'
		]));

  // inject the includes into index, write out to deploy directory
	return gulp.src(build.app.index)
		.pipe(inject(all, {ignorePath:build.deploy.root}))
		.pipe(gulp.dest(build.deploy.root));
});

gulp.task('release-build', ['clean'], function() {
	gutil.log('RELEASE BUILD: Build and deploy index.html, js, templates, and css');

	var jsVendor = gulp.src(build.vendor.js)
			.pipe(concat('vendor.js'))
			.pipe(uglify())
			.pipe(gulp.dest(build.deploy.js));

	var jsApp = gulp.src(build.app.js)
		.pipe(replace(
			{
				patterns: [{json: build.deploy.releaseSettings}]
			}
		))
		.pipe(concat('app.js'))
//		.pipe(uglify())
		.pipe(gulp.dest(build.deploy.js));

	var jsTemplate = gulp.src(build.app.templates)
		.pipe(html2js({
				outputModuleName: 'templates-app',
						base: 'src/modules'
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

gulp.task('publish', ['clean','release-build'], function(){

	gutil.log("credentials: " + JSON.stringify(aws));

  // create a new publisher
  var publisher = awspublish.create(aws);

  // publish
	return gulp.src('./'+build.deploy.root+'/**')
	  .pipe(publisher.publish())
	  .pipe(publisher.sync())
	  .pipe(awspublish.reporter());
});


/**
 * Full Build
 */
gulp.task('build', ['clean','dev-build'], function() {
	gutil.log('Version: ' + pkg.version + ' build complete!');
});

gulp.task('release', ['clean','release-build', 'publish'], function() {
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
