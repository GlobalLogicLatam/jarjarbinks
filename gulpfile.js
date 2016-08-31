var gulp          = require('gulp');
var postcss       = require('gulp-postcss');
var less          = require('gulp-less');
var autoprefixer  = require('autoprefixer');
var browserSync   = require('browser-sync').create();
var webpack       = require('webpack-stream');
var clean         = require('gulp-clean');
var runSequence   = require('run-sequence');
var sourcemaps    = require('gulp-sourcemaps');
var KarmaServer   = require('karma').Server;
var eslint        = require('gulp-eslint');

var config = {
  path: {
    less:                 './app/less/',
    output_folder:        './dist/',
    output_folder_css:    './dist/css/',
    output_folder_images: './dist/images/',
    output_folder_fonts:  './dist/fonts/',
    node_modules:         './node_modules/'
  }
};

function showError(err) {
  console.log('Error: ', err);
  this.emit('end');
}

function createServer(openBrowser){
  browserSync.init({
    server : {
      baseDir: config.path.output_folder,
    },
    open: openBrowser,
    ghostMode: false,
    middleware: require('./api/router')
  });
}


gulp.task('browser-sync', function() {
  createServer(false);
});

gulp.task('restart-server', function() {
	Promise
    .all([browserSync.exit()])
    .then(function(){
      createServer(false);
    })
});

gulp.task('bootstrap-less', function () {
	var processors = [
		autoprefixer
	];

	return gulp.src(config.path.less + 'bootstrap.less')
    .pipe(sourcemaps.init())
    .pipe(less().on('error', function(e){
      showError.call(this, e);
    }))
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
    .pipe(less().on('error', function(e){
      showError.call(this, e);
    }))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(config.path.output_folder_css));
});

// Moves html and mustache partials files to dist folder
gulp.task('html', function () {
  return gulp.src(['./app/**/*.html', './app/**/*.mustache'])
    .pipe(gulp.dest(config.path.output_folder));
});

// Moves images files to dist folder
gulp.task('images', function () {
  return gulp.src('./app/images/**/')
    .pipe(gulp.dest(config.path.output_folder_images));
});

// Moves fonts files to dist folder
gulp.task('fonts', function () {
  return gulp.src('./app/fonts/**/')
    .pipe(gulp.dest(config.path.output_folder_fonts));
});

// Delete everything in /dist
gulp.task('clean-dist', function () {
  return gulp.src('dist/')
    .pipe(clean());
});

// Create js bundle
gulp.task('bundle', function() {
  return gulp.src('app/app.js')
    .pipe(
      webpack(require('./webpack.config'))
    )
    .pipe(gulp.dest(config.path.output_folder));
});

// Run test with Karma
gulp.task('test', function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma.config.js',
    singleRun: true
  }, done).start();
});

// Run eslint
gulp.task('eslint', () => {
  return gulp.src(['./app/**/*.js'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

gulp.task('serve', function(cb) {
  runSequence('clean-dist', ['html', 'images', 'fonts', 'bootstrap-less','less'], 'bundle', 'browser-sync', cb);

  // Watch for changes on css core.
  gulp.watch('app/less/**/*.less', ['bootstrap-less', browserSync.reload])
    .on('error', showError);

  // Watch for changes on css components.
  gulp.watch('app/routes/**/*.less', ['less', browserSync.reload])
    .on('error', showError);

  // Watch changes for html.
  gulp.watch(['app/**/*.html', 'app/**/*.mustache'], ['html', 'bundle', browserSync.reload])
  .on('error', showError);

  // Watch changes for images.
  gulp.watch(['app/images/**/*.*'], ['images', browserSync.reload])
  .on('error', showError);

  // Watch changes for fonts.
  gulp.watch(['app/fonts/**/*.*'], ['fonts', browserSync.reload])
  .on('error', showError);

  // Watch changes for html.
  gulp.watch('app/**/*.js', ['eslint', 'bundle', browserSync.reload])
  .on('error', showError);

  // Watch changes for html.
  gulp.watch('api/**/*.js', ['restart-server'])
  .on('error', showError);

  return true;
});
