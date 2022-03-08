const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');


function css() {
    return gulp.src([
        'src/style.css'
    ])
        .pipe(concat('style.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist-gulp'));
}

function js() {
    return gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist-gulp'));
}

function img() {
    return gulp.src('images/*')
        .pipe(imagemin([
            imagemin.mozjpeg({optimizationLevel: 5})
        ]))
        .pipe(gulp.dest('dist-gulp/images'));
}

function copyData() {
    return gulp.src(['src/*.json', 'src/*.html'])
        .pipe(gulp.dest('dist-gulp'));
}

function copyIcons() {
    return gulp.src('images/icons/*')
        .pipe(gulp.dest('dist-gulp/images/icons'));
}

const gulpBuild = gulp.parallel(gulp.series(css), js, img, copyData, copyIcons);

exports.default = function () {
    gulp.watch(['src/*.json', 'src/*.html'], copyData());

    gulp.watch('image/*.css', img);

    gulp.watch('src/*.css', gulp.series(css));

    gulp.watch('src/*.js', js);
}