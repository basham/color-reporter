var gulp = require('gulp');
var fs = require('fs');
var colorguard = require('colorguard');
var _ = require('lodash');
var rename = require('gulp-rename');
var jade = require('gulp-jade');

var locals = {};

gulp.task('build', ['clean', 'styles'], function() {
  // Analyze color usage.
  var css = fs.readFileSync('./src/fixtures/student.css', 'utf8');
  var output = colorguard.inspect(css);
  // Assign data for templates.
  locals.pageTitle = 'student.css';
  locals.audit = output;
  // Sort colors.
  locals.colorsByCount = _.chain(output.stats.counts)
    .map(function(val, key) {
      return { value: key, count: val };
    })
    .sortBy('count')
    .reverse()
    .value();

  return gulp.src('./src/*/*.jade')
    .pipe(rename('index'))
    .pipe(jade({
      locals: locals,
      pretty: true
    }))
    .pipe(gulp.dest('./build/'));
});
