'use strict';

var gulp = require('gulp');
var newer = require('gulp-newer');
var objectAssign = require('object-assign');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

var sass = require('gulp-ruby-sass');

var pngmin = require('gulp-pngmin');
var shell = require('gulp-shell');
var babel = require('gulp-babel');

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
		images: './public/images'
	}
};

gulp.task('babel', function(){
	return gulp.src([
		config.src.client.root + '/*.js',
		config.src.client.root + '/**/*.js',
		config.src.client.root + '/**/**/*.js'
	])
	.pipe(babel())
	.pipe(gulp.dest(config.dest.root))
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

gulp.task('copy-client', function(){
	return gulp.src([
		config.src.client.root + '/index.html'
	])
	.pipe(gulp.dest(config.dest.root));
});

gulp.task('copy', [
	'copy-client'
]);

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

gulp.task('isProduction', function(){
	config.env = 'production';
});

gulp.task('compile', [
	'copy'
,	'pngmin'
,	'browserify'
,	'babel'
,	'sass'
]);

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
});

gulp.task('build', [
	'isProduction',
	'compile'
]);
