
/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-image-resize gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'), //importing gulp library and storing in variable "gulp"
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');
    imageResize = require('gulp-image-resize')

// Styles dont want to use sass one
// gulp.task('styles', function() {
//   return sass('src/styles/main.scss', { style: 'expanded' })
//     .pipe(autoprefixer('last 2 version'))
//     .pipe(gulp.dest('dist/styles'))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(minifycss())
//     .pipe(gulp.dest('dist/styles'))
//     .pipe(notify({ message: 'Styles task complete' }));
// });

gulp.task('styles', function(){
  return gulp.src('css/*.css')
        .pipe(autoprefixer({
          browsers: ['last 2 versions'] //newly added and not tested
        })) 
        .pipe(minifycss())
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

// Images
gulp.task('images', function() {
  return gulp.src('images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('images/compressed'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Images Resize
gulp.task('resize1', function () {    //540 resize
  return gulp.src('images/compressed/*.{jpg,png,jpeg}')
    .pipe(imageResize({ 
      width : 540,
      crop : false,
      imageMagick : true,
      upscale : false
    }))
    .pipe(rename({ suffix: '-540' }))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('resize2', function () { //780 resize
  return gulp.src('images/compressed/*.{jpg,png,jpeg}')
    .pipe(imageResize({ 
      width : 780,
      crop : false,
      imageMagick : true,
      upscale : false
    }))
    .pipe(rename({ suffix: '-780' }))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('resize3', function () {  //1920 resize
  return gulp.src('images/compressed/*.{jpg,png,jpeg}')
    .pipe(imageResize({ 
      width : 1920,
      crop : false,
      imageMagick : true,
      upscale : false
    }))
    .pipe(rename({ suffix: '-1920' }))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('resize4', function () {  //resizing my landscape hero image for vertical small devices
  return gulp.src('images/compressed/*.{jpg,png,jpeg}')
    .pipe(imageResize({ 
      height : 640,
      width : 400,
      crop : true,
      imageMagick : true,
      upscale : true
    }))
    .pipe(rename({ suffix: '-640h' }))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('resize5', function () {  //resizing my landscape hero image for vertical mid devices
  return gulp.src('images/compressed/*.{jpg,png,jpeg}')
    .pipe(imageResize({ 
      height : 900,
      crop : true,
      imageMagick : true,
      upscale : true
    }))
    .pipe(rename({ suffix: '-900h' }))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('resize6', function () {    //540 resize
  return gulp.src('images/compressed/bendriver.jpg')
    .pipe(imageResize({ 
      width : 300,
      crop : false,
      imageMagick : true,
      upscale : false
    }))
    .pipe(rename({ suffix: '-300' }))
    .pipe(gulp.dest('dist/img'));
});


// Clean
gulp.task('clean', function(cb) {
    del(['dist/css', 'dist/js', 'dist/img'], cb)
});

//tasks for web optimization and clean
gulp.task('weboptclean', function(cb) {
    del(['web-optimize/dist/css', 'web-optimize/dist/js', 'web-optimize/dist/images', 'web-optimize/views/dist/images'], cb)
});

// Scripts for web opt
gulp.task('weboptscripts', function() {
  return gulp.src('web-optimize/js/**/*.js')
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(concat('perfmatters.js'))
    .pipe(gulp.dest('web-optimize/dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('web-optimize/dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('weboptimages', function() {
  return gulp.src('web-optimize/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 6, progressive: true, interlaced: true })))
    .pipe(gulp.dest('web-optimize/dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// pizza Images
gulp.task('pizzaimages', function() {
  return gulp.src('web-optimize/views/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('web-optimize/views/dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

//pizzaresize
gulp.task('pizzaresize', function () { //540 resize
  return gulp.src('web-optimize/views/images/pizzeria-780.jpg')
    .pipe(imageResize({ 
      width : 300,
      crop : false,
      imageMagick : true,
      upscale : false
    }))
    .pipe(rename({ suffix: '-300' }))
    .pipe(gulp.dest('web-optimize/views/images'));
});

gulp.task('weboptstyles', function(cb) {
      return gulp.src('web-optimize/css/*.css')
        .pipe(autoprefixer({
          browsers: ['last 2 versions'] //newly added and not tested
        })) 
        .pipe(minifycss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('web-optimize/dist/css'));
});

// web op Default task
gulp.task('weboptdefault', function() {   //two parameters, takes name and function
    gulp.start('weboptstyles', 'weboptimages', 'weboptscripts', 'pizzaimages');
});

// Default task
gulp.task('default', function() {   //two parameters, takes name and function
    gulp.start('styles', 'images');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('css/**/*.css', ['styles']);

  // Watch .js files
  gulp.watch('js/**/*.js', ['scripts']); //specify files you want to watch and what tasks you want to run when changes get detected in those files

  // Watch image files
  gulp.watch('images/**/*', ['images']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});