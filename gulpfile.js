var gulp = require('gulp');
var browserSync = require('browser-sync').create();

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
