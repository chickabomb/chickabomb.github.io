var syntax        = 'sass', // Syntax: sass or scss;
		gulpversion   = '4'; // Gulp version: 3 or 4

var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require('gulp-notify'),
		rsync         = require('gulp-rsync');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
	})
});

gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/mmenu/dist/jquery.mmenu.all.js',
		'app/libs/owl.carousel/dist/owl.carousel.min.js',
		'app/libs/fotorama/fotorama.js',
		'app/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('rsync', function() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

if (gulpversion == 3) {
	gulp.task('watch', ['styles', 'scripts', 'browser-sync'], function() {
		gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
		gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['scripts']);
		gulp.watch('app/*.html', ['code'])
	});
	gulp.task('default', ['watch']);
}

if (gulpversion == 4) {
	gulp.task('watch', function() {
		gulp.watch('app/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
		gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
		gulp.watch('app/*.html', gulp.parallel('code'))
	});
	gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));
}

// var path = {  //Тут мы укажем куда складывать готовые после сборки файлы
// 	build: {
// 		html: 'dist/',
// 		js: 'dist/js/',
// 		css: 'dist/css/',
// 		img: 'dist/img/',
// 		fonts: 'dist/fonts/'
// 	},
// 	app: { //Пути откуда брать исходники
// 		html: 'app/*.html',
// 		js: 'app/js/common.js',
// 		css: 'app/css/main.min.css',
// 		img: 'app/img/**/*.*',
// 		fonts: 'app/fonts/**/*.*'
// 	},
// 	watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
// 		html: 'app/*.html',
//      js: 'app/js/*.js',
//      css: 'app/css/*.css',
//      img: 'app/img/**/*.*',
//      fonts: 'app/fonts/**/*.*'
// 	},
// 	clean: './dist'
// };

// var config = {
// 	server: {
// 		baseDir: "./build"
// 	},
// 	tunnel: true,
// 	host:'localhost',
// 	port: 9000,
// 	logPrefix: "Swimm"
// };

// gulp.task('html:build', function () {
// 	gulp.app(path.)
// })