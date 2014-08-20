var gulp = require('gulp');
var server = require('gulp-express');

gulp.task('server', function () {
    //start the server at the beginning of the task
    server.run({
        file: 'server.js'
    });
});

gulp.task('default',['server']);