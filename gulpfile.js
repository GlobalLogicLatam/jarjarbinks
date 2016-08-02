var gulp          = require('gulp');
var postcss       = require('gulp-postcss');
var less          = require('gulp-less');
var autoprefixer  = require('autoprefixer');
var browserSync   = require('browser-sync');
var webpack       = require('webpack-stream');
var clean         = require('gulp-clean');
var runSequence   = require('run-sequence');
var sourcemaps    = require('gulp-sourcemaps');

var config = {
  path: {
    less: './app/less/',
    output_folder: './dist/',
    output_folder_css: './dist/css/',
    node_modules: './node_modules/'
  }
};

function showError(err) {
  console.log('Error: ', err);
}

gulp.task('browser-sync', function() {
	browserSync({
		server : {
      baseDir: config.path.output_folder,
    },
		ghostMode: false
	});
});

gulp.task('bootstrap-less', function () {
	var processors = [
		autoprefixer
	];

	return gulp.src(config.path.less + 'bootstrap.less')
    .pipe(sourcemaps.init())
    .pipe(less())
		.pipe(postcss(processors))
    .pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(config.path.output_folder_css));
});

gulp.task('less', function () {
	var processors = [
		autoprefixer
	];
	return gulp.src(['./app/routes/**/*.less'])
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(config.path.output_folder_css));
});

gulp.task('html', function () {
	return gulp.src(['./app/**/*.html', './app/**/*.mustache'])    
		.pipe(gulp.dest(config.path.output_folder));
});

gulp.task('clean-dist', function () {
  return gulp.src('dist/')
    .pipe(clean());
});

gulp.task('bundle', function() {
  return gulp.src('app/app.js')
    .pipe(
      webpack(require('./webpack.config'))
    )
    .pipe(gulp.dest(config.path.output_folder));
});

gulp.task('serve', function(cb) {
  runSequence('clean-dist', ['html', 'bootstrap-less','less'], 'bundle', 'browser-sync', cb);
  
  // Watch for changes on css core.
  gulp.watch('app/less/**/*.less', ['bootstrap-less', browserSync.reload])
    .on('error', showError);

  // Watch for changes on css components.
  gulp.watch('app/routes/**/*.less', ['less', browserSync.reload])
    .on('error', showError);

  // Watch changes for html.
  gulp.watch('app/**/*.html', ['html', browserSync.reload])
  .on('error', showError);

  // Watch changes for html.
  gulp.watch('app/**/*.js', ['bundle', browserSync.reload])
  .on('error', showError);
  
  return true;
});
