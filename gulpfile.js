// Définition des dépendances dont on a besoin pour exécuter les tâches
var
    gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    destclean = require('gulp-dest-clean'),
    newer = require('gulp-newer'),
    size = require('gulp-size'),
    imacss = require('gulp-imacss'),
    sass = require('gulp-sass'),
    htmlclean = require('gulp-htmlclean'),
    preprocess = require('gulp-preprocess'),
    pkg = require('./package.json'),
    del = require('del');

// Définition de quelques variables générales pour notre gulpfile
var
    devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production'),
    source = 'source/',
    dest = 'build/';

// Définition de quelques variables liées à nos tâches (options de tâches)
var
    imagesOpts = {
        in: source + 'images/*.*',
        out: dest + 'images/',
        watch: source + 'images/*.*'
    },
    imageUriOpts = {
        in: source + 'images/inline/*.*',
        out: source + 'scss/images/',
        filename: '_datauri.scss',
        namespace: 'img'
    },
    css = {
        in: source + 'scss/main.scss',
        watch: [source + 'scss/**/*'],
        out: dest + 'css/',
        sassOpts: {
            outputStyle: 'expanded',
            precision: 3,
            errLogToConsole: true
        }
    },
    html = {
        in: source + '*.html',
        watch: [source + '*.html', source + 'template/**/*'],
        out: dest,
        context: {
            devBuild: devBuild,
            author: pkg.author,
            version: pkg.version
        }
    };


// Définition des tâches
gulp.task('clean', function () {
    del([dest + '*']);
});

gulp.task('images', function () {
    return gulp.src(imagesOpts.in)
        .pipe(destclean(imagesOpts.out))
        .pipe(newer(imagesOpts.out))
        .pipe(size({title: 'Images size before compression: ', showFiles: true}))
        .pipe(imagemin())
        .pipe(size({title: 'Images size after compression: ', showFiles: true}))
        .pipe(gulp.dest(imagesOpts.out));
});

gulp.task('imageuri', function () {
    return gulp.src(imageUriOpts.in)
        .pipe(imagemin())
        .pipe(imacss(imageUriOpts.filename, imageUriOpts.namespace))
        .pipe(gulp.dest(imageUriOpts.out));
});

gulp.task('sass', function () {
    return gulp.src(css.in)
        .pipe(sass(css.sassOpts))
        .pipe(gulp.dest(css.out));
});

gulp.task('html', function () {
    var page = gulp.src(html.in).pipe(preprocess({context: html.context}));
    if (!devBuild) {
        page = page
            .pipe(size({title:'HTML avant minification:'}))
            .pipe(htmlclean())
            .pipe(size({title:'HTML après minification:'}));
    }
    return page.pipe(gulp.dest(html.out));
});

// Tâche par défaut exécutée lorsqu’on tape juste *gulp* dans le terminal
gulp.task('default', ['images', 'sass'], function () {
    gulp.watch(html.watch, ['html']);
    gulp.watch(imagesOpts.watch, ['images']);
    gulp.watch(css.watch, ['sass']);
});

