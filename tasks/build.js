var gulp = require('gulp');
var fs = require('fs');
var colorguard = require('colorguard');
var rename = require('gulp-rename');
var jade = require('gulp-jade');

var locals = {};

gulp.task('build', ['clean'], function() {
  var css = fs.readFileSync('./src/fixtures/student.css', 'utf8');
  var output = colorguard.inspect(css);
  locals.pageTitle = 'student.css';
  locals.audit = output;

  return gulp.src('./src/*/*.jade')
    .pipe(rename('index'))
    .pipe(jade({
      locals: locals,
      pretty: true
    }))
    .pipe(gulp.dest('./build/'));
});
