var gulp = require('gulp');
var postcss = require('gulp-postcss');
var less = require('gulp-less');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync({
        // we need to disable clicks and forms for when we test multiple rooms
        server : {},
        // middleware : [ historyApiFallback() ],
        ghostMode: false
    });
});

gulp.task('bootstrap-less', function () {
    var processors = [
        autoprefixer
    ];
    return gulp.src('./node_modules/bootstrap/less/bootstrap.less')
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dist'));
});

gulp.task('css', function () {
    var processors = [
        autoprefixer
    ];
    return gulp.src('./app/**/*.less')
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dist'));
});

gulp.task('html', function () {
    return gulp.src('./app/**/*.html')    
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['html', 'bootstrap-less','css','browser-sync'], function() {
  gulp.watch('css/**/*', ['styles']); 
  return true;
});

