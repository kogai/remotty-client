require('babel/register');

var gulp = require('gulp');
var newer = require('gulp-newer');
var objectAssign = require('object-assign');

var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

var sass = require('gulp-ruby-sass');

var pngmin = require('gulp-pngmin');
var shell = require('gulp-shell');
var babel = require('gulp-babel');

var util = require('gulp-util');
var jade = require('gulp-jade');
var runSequence = require('run-sequence');

var config = {
	env: 'development',
	src: {
		client: {
			root: './src'
,			images: './src/images'
,			views: './src/views'
,			sass: './src/sass'
		},
		server: './server/src'
	},
	dest: {
		root: './public',
		global: './global',
		images: './public/images'
	}
};

gulp.task('jade', function() {
  return gulp.src([
		config.src.client.root + '/*.jade'
	])
  .pipe(jade({
		pretty: true
	}))
  .on('error', function(err){
    util.beep();
    console.log(err);
  })
  .pipe(gulp.dest(config.dest.root));
});

gulp.task('babel', function(){
	return gulp.src([
		config.src.client.root + '/*.js',
		config.src.client.root + '/**/*.js',
		config.src.client.root + '/**/**/*.js'
	])
	.pipe(babel())
	.pipe(gulp.dest(config.dest.global))
	.on('error', function(err){
		return console.log(err);
	});
});

gulp.task('sass', function(){
	return sass(config.src.client.sass + '/style.sass', {
		compass: true
,		style: 'compressed'
,		sourcemap: true
	})
	.on('error', function(err){
		console.log(err);
	})
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(config.dest.root));
});

gulp.task('browserify', function(){
	var opt = objectAssign({}, {
		entries: [ config.src.client.views + '/App.jsx' ],
		extensions: ['.js', '.jsx'],
		debug: true
	});

  // var b = watchify(browserify(opt));

	return browserify(opt)
	.transform('babelify')
	.transform('reactify')
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(buffer())
	.pipe(sourcemaps.init({
		loadMaps: true
	}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(config.dest.root));
});

gulp.task('copy', function(){
	return gulp.src([
		config.src.client.images + '/*.png',
		config.src.client.root + '/credential.js'
	])
	.pipe(gulp.dest(config.dest.root));
});

gulp.task('pngmin', function () {
	return (
		gulp.src([
			config.src.client.images + '/*.png',
			config.src.client.images + '/**/*.png',
			config.src.client.images + '/**/**/*.png'
		])
		.pipe(newer(config.dest.images))
		.pipe(pngmin())
		.pipe(gulp.dest(config.dest.images))
	);
});

gulp.task('ele', function(){
  return gulp.src('*.js', { read: false })
  .pipe(shell([
    'npm start'
  ]));
});

gulp.task('isProduction', function(){
	config.env = 'production';
});

gulp.task('compile', function(done){
  return runSequence(
  	['copy', 'babel', 'sass', 'jade', 'pngmin'],
    'browserify',
    done
  );
});

gulp.task('watch', function(done){
	gulp.watch([
		config.src.client.views + '/*.jsx',
		config.src.client.views + '/**/*.jsx',
		config.src.client.views + '/**/**/*.jsx',
		config.src.client.views + '/*.js',
		config.src.client.views + '/**/*.js',
		config.src.client.views + '/**/**/*.js',
		config.src.client.root + '/*.js',
		config.src.client.root + '/**/*.js',
		config.src.client.root + '/**/**/*.js'
	], ['browserify', 'babel']);

	gulp.watch([
		config.src.client.images + '/*',
		config.src.client.images + '/**/*',
		config.src.client.images + '/**/**/*'
	], ['pngmin']);

	gulp.watch([
		config.src.client.sass + '/*',
		config.src.client.sass + '/**/*',
		config.src.client.sass + '/**/**/*'
	], ['sass']);

	gulp.watch([
		config.src.client.root + '/*.jade'
	], ['jade']);

	gulp.watch([
		config.src.client.root + '/credential.js',
		config.src.client.images + '/*.png'
	], ['copy']);
});

gulp.task('default', function(){
	return runSequence(
		'compile',
		'watch'
	);
});

gulp.task('build', [
	'isProduction',
	'compile'
]);
