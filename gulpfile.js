var gulp = require('gulp');
var babel = require('gulp-babel');
var clean = require('gulp-clean');
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
gulp.task('build', () => {
  // Setup scripts deployment
  gulp.src('package.json').pipe(json((cfg) => {
    // Remove development scripts
    delete cfg.scripts.build;
    delete cfg.scripts.clean;
    delete cfg.scripts.lint;
    delete cfg.devDependencies;
    // Scripts for production build
    json.scripts.start = 'node index.js';
    return json;
  })).pipe(gulp.dest(buildDir));

  gulp.src('src/**/*.json').pipe(gulp.dest(buildDir));
  gulp.src('src/**/*.js').pipe(babel()).pipe(gulp.dest(buildDir));
});
