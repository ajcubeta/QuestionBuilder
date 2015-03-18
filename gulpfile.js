'use strict';

var gulp = require('gulp');
var stylish = require('jshint-stylish');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function () {
  browserSync({
    proxy: 'localhost:8000',
  });
});

gulp.task('watch', function () {
  gulp.watch([
    'css/*.css',
    'js/*.js'], browserSync.reload);

  gulp.watch(['js/*.js'], ['lint']);
});

gulp.task('default', ['browser-sync', 'watch']);
