'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var files = ['*.js', './lib/*.js', './model/*.js', './routes/*.js', './test/*.js'
];

var testFiles = ['./test/*test.js'];

gulp.task('lint' , () => {
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('test', () => {
  return gulp.src(testFiles, {
    read: false
  })
    .pipe(mocha({
      reporter: 'nyan'
    }));
});

gulp.task('watch', () => {
  gulp.watch(files, ['lint', 'test']);
});

gulp.task('default', ['lint', 'test', 'watch'], () => {
});
