var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var deploy = require('gulp-gh-pages');

gulp.task('build', function() {
	return gulp.src('src/**/*')
	.pipe(gulp.dest('dist'));
});

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
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
