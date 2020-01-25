"use strict";

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var chai = require("chai");
var source = require('vinyl-source-stream'); // makes browserify bundle compatible with gulp
var browserify = require('browserify');

gulp.task('specs', function() {
  return gulp.src('assets/js/spec/lib/*.js')
    .pipe(mocha());
});

gulp.task('scripts', function() {
  return browserify(['./assets/js/standaloner.js']).bundle()
    .pipe(source('all.min.js'))
    .pipe(gulp.dest('./public/'));
});

gulp.task('default', ['specs', 'scripts']);
