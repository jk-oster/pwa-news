const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const minifyHTML = require('gulp-htmlmin');
const stripComments = require('gulp-strip-comments');
const jsHint = require('gulp-jshint');
const terser = require('gulp-terser');

function lint(done) {
    gulp.src(['./js/*.js*', '!./js/*.min.js'])
        .pipe(jsHint({esnext: true}))
        .pipe(jsHint.reporter('default'));
    done();
}

exports.lint = lint;

// minify HTML pages

function html() {
    return gulp.src('./src/*.html')
        .pipe(stripComments())
        .pipe(minifyHTML({collapseWhitespace: true}))
        .pipe(gulp.dest('dist-gulp'));
}

exports.htmlpage = html;

function css() {
    return gulp.src([
        'src/*.css'
    ])
        .pipe(concat('style.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist-gulp'));
}

function js() {
    return gulp.src('src/*.js')
        .pipe(stripComments())
        .pipe(terser())
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

function copyJson() {
    return gulp.src(['src/*.json'])
        .pipe(gulp.dest('dist-gulp'));
}

function copyIcons() {
    return gulp.src('images/icons/*')
        .pipe(gulp.dest('dist-gulp/images/icons'));
}

const gulpBuild = gulp.parallel(gulp.series(css), html, js, img, copyJson, copyIcons);

exports.default = function () {
    gulpBuild();

    gulp.watch('src/*.json', copyJson());
    gulp.watch('images/*', img);
    gulp.watch('src/*.css', css);
    gulp.watch('src/*.js', js);
    gulp.watch('src/*.html', html);
}