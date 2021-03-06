'use strict';

const gulp = require('gulp');
const minify = require('gulp-minify');
const csso = require('gulp-csso');
const concat = require('gulp-concat');
const image = require('gulp-image');
const browserSync = require('browser-sync').create();

function cssMinify() {
    return gulp.src(['./src/css/*.css'])
        .pipe(csso())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('./public/css')) 
}

function jsMinify() {
    return gulp.src(['src/js/*.js'])
    .pipe(minify({
        compress:true,
        noSource:true,
        ext: {
            min:".min.js"
        }
    }))
    .pipe(gulp.dest('public/js'))
}

function htmlCopy() {
    return gulp.src(['src/*.html'])
    .pipe(gulp.dest('public'))
}

function favIconCopy() {
    return gulp.src(['src/imgs/favicon/*'])
    .pipe(gulp.dest('public/imgs/favicon'))
}

function optimizeImages() {
    return gulp.src(['src/imgs/*.jpg','src/imgs/*.png'])
    .pipe(image())
    .pipe(gulp.dest('public/imgs'));
}

function serve() {
    browserSync.init({
        server: "./public"
    });

    gulp.watch("src/css/*.css",cssMinify).on('change', browserSync.reload);
    gulp.watch("src/js/*.js", jsMinify).on('change', browserSync.reload);
    gulp.watch(["src/imgs/*"], optimizeImages).on('change', browserSync.reload);
    gulp.watch("src/*.html",htmlCopy).on('change', browserSync.reload);

}

exports.minify = gulp.parallel(jsMinify,cssMinify,htmlCopy,favIconCopy,optimizeImages); 
exports.serve = serve;