var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('watch', function() {
  gulp.watch(['./src/**/*.jade'], ['build', browserSync.reload]);
  gulp.watch(['./src/**/*.less'], ['styles']);
});
