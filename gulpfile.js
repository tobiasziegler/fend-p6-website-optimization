var gulp = require('gulp');

gulp.task('build', function() {
	return gulp.src('src/**/*')
	.pipe(gulp.dest('dist'));
});
