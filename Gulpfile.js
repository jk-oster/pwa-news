const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');


function css() {
    return gulp.src([
        'style.css'
    ])
        .pipe(concat('src/styles.css'))
        .pipe(gulp.dest('dist-gulp/css'))
        .pipe(concat('styles.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist-gulp/css'));
}

function js() {
    return gulp.src('src/*.js')
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist-gulp/js'));
}

function img() {
    return gulp.src('images/*')
        .pipe(imagemin([
            imagemin.mozjpeg({optimizationLevel: 5})
        ]))
        .pipe(gulp.dest('images/dist-gulp/'));
}

exports.default = gulp.parallel(gulp.series(css), js, img);