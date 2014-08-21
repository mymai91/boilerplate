var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({lazy:false});

gulp.task('connect', plugins.connect.server(
	{
    root: ['build'],
    port: 9001,
    livereload: {port: 35730}
	}
));

gulp.task('default',['connect']);