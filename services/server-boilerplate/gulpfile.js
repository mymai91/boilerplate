var gulp = require('gulp');
var server = require('gulp-express');
var clean = require('gulp-rimraf');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var zip = require('gulp-zip');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

/**
 * Load in our build configuration file.
 */
var build = require( './build.config.json' );
var pkg = require( './package.json' );

/**
 * Clean the build directory
 */
gulp.task('clean', function() {
  gutil.log('Cleaning build directory: ' + build.deploy.root);
    return gulp.src(build.deploy.root, {read: false})
      .pipe(clean());
});

gulp.task('clean-dist', function() {
  gutil.log('Cleaning build directory: ' + build.deploy.root);
    return gulp.src(build.deploy.dist, {read: false})
      .pipe(clean());
});

/**
 * Copy over express w/default config
 */
gulp.task('prep-build', ['clean'], function() {
  gutil.log('Copy Base Express system to build');

  return gulp.src(build.src)
          .pipe(jshint())
          .pipe(jshint.reporter(stylish))
          .pipe(jshint.reporter('default'))
          .pipe(jshint.reporter('fail'))
          .pipe(gulp.dest(build.deploy.root));

});

/**
 * Overwrite config w/staging config
 */
gulp.task('stage-config', ['clean', 'prep-build'], function() {
  gutil.log('Configure build for STAGING');

  gulp.src("build/**/*", {base: "build/"})

  return gulp.src(build.deploy.staging.config)
          .pipe(concat('config.json'))
          .pipe(gulp.dest(build.deploy.config));
});

/**
 * Bundle it into a zip file
 */
gulp.task('stage-bundle', ['clean', 'clean-dist', 'prep-build', 'stage-config'], function() {
  var date = new Date().toISOString().replace(/[^0-9]/g, '');

  gutil.log('Bundle build into a zip');

  return gulp.src("build/**/*", {base: "build/"})
          .pipe(zip(pkg.name + "-" + pkg.version + "-" + date + ".zip"))
          .pipe(gulp.dest(build.deploy.dist));
});

/**
 *  Create a bundle of the express app for staging
 */
gulp.task('stage', ['clean', 'clean-dist', 'prep-build', 'stage-config', 'stage-bundle'], function() {
    gutil.log('Bundle ready for staging');
});

/**
 *  Default to running the server locally
 */
gulp.task('server', function () {
    //start the server at the beginning of the task
    server.run({
        file: 'server.js'
    });
});

gulp.task('default',['server']);
