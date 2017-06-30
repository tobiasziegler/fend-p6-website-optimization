var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var deploy = require('gulp-gh-pages');
var ngrok = require('ngrok');
var port = 3000;
var imagemin = require('gulp-imagemin');

// Optimize images using imagemin
gulp.task('images', function() {
	return gulp.src('src/**/*.+(png|jpg|gif|svg)')
	.pipe(imagemin({
		verbose: true
	}))
	.pipe(gulp.dest('dist'));
});

gulp.task('build', function() {
	return gulp.src('src/**/*')
	.pipe(gulp.dest('dist'));
});

gulp.task('serve', function() {
	// Open the site on a local server using Browsersync
	browserSync.init({
		server: {
			baseDir: 'dist',
			port: port
		}
	},
	// Get a URL that external connections and PageSpeed Insights can access
	function(err, browserSync) {
		return ngrok.connect(
			port,
			function(err, url) {
				console.log(' ----------------------------------');
				console.log('ngrok URL: ' + url);
				console.log(' ----------------------------------');
			}
		);
	});
});

/**
 * Push build to gh-pages:
 * https://medium.com/superhighfives/deploying-to-github-pages-with-gulp-c06efc527de8
 */
gulp.task('deploy', function () {
	return gulp.src("dist/**/*")
	.pipe(deploy());
});
