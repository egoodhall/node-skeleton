var gulp = require('gulp');
var babel = require('gulp-babel');
var clean = require('gulp-clean')
var deleteLines = require('gulp-delete-lines');
var json = require('gulp-json-editor');
var path = require('path');

// Build directory
const buildDir = path.join('.', 'build');

gulp.task('default', ['clean', 'build']);

// Clean the build directory
gulp.task('clean', () => {
  return gulp.src(buildDir).pipe(clean({ force: true }));
});

// Compile babel and move files to build directory
gulp.task('build', function () {
  // Setup scripts deployment
  gulp.src('package.json').pipe(json((json) => {
    // Remove development scripts
    delete json.scripts.build;
    delete json.scripts.clean;
    delete json.scripts.lint;
    delete json.devDependencies;
    // Scripts for production build
    json.scripts.start  = 'node app.js';
    return json;
  })).pipe(gulp.dest(buildDir));

  gulp.src('src/**/*.json').pipe(gulp.dest(buildDir));
  gulp.src('src/**/*.js').pipe(gulp.dest(buildDir));
});
