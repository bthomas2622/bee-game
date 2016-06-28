
/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-image-resize gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'), //importing gulp library and storing in variable "gulp"
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    del = require('del');


gulp.task('styles', function(){
  return gulp.src('css/*.css')
        .pipe(autoprefixer({
          browsers: ['last 2 versions'] //newly added and not tested
        })) 
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'));
}); 

// Scripts
gulp.task('scripts', function() {
  return gulp.src('js/*.js')
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    //.pipe(concat('combined.js'))
    //.pipe(gulp.dest('dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});


// Clean
gulp.task('clean', function(cb) {
    del(['dist/css', 'dist/js', 'dist/art'], cb)
});

// Default task
gulp.task('default', function() {   //two parameters, takes name and function
    gulp.start('styles', 'scripts');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('css/**/*.css', ['styles']);

  // Watch .js files
  gulp.watch('js/**/*.js', ['scripts']); //specify files you want to watch and what tasks you want to run when changes get detected in those files


  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});