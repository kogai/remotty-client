require('babel/register');

import gulp from 'gulp';
import newer from 'gulp-newer';
import objectAssign from 'object-assign';

import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';

import sass from 'gulp-ruby-sass';

import pngmin from 'gulp-pngmin';
import shell from 'gulp-shell';
import babel from 'gulp-babel';

import util from 'gulp-util';
import jade from 'gulp-jade';
import runSequence from 'run-sequence';

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
	var opt = objectAssign(
		{},
		{
			entries: [
				config.src.client.views + '/App.jsx'
			],
			extensions: ['.js'],
			debug: true
		}
	);

	var b;

	b = browserify(opt);
	return b.transform('babelify')
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

gulp.task('runElectron', function(){
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
    'runElectron',
    done
  );
});

gulp.task('default', [
	'compile'
], function(){
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

gulp.task('build', [
	'isProduction',
	'compile'
]);
