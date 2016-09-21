// Définition des dépendances dont on a besoin pour exécuter les tâches
var
    gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    newer = require('gulp-newer'),
    size = require('gulp-size'),
    del = require('del');

// Définition de quelques variables générales pour notre gulpfile
var
    source = 'source/',
    dest = 'build/';

// Définition de quelques variables liées à nos tâches (options de tâches)
var
    imagesOpts = {
        in: source + 'images/*.*',
        out: dest + 'images/'
    };


// Définition des tâches
gulp.task('clean', function () {
    del([dest + '*']);
});

gulp.task('images', function () {
    gulp.src(imagesOpts.in)
        .pipe(newer(imagesOpts.out))
        .pipe(size({title: 'Images size before compression: ', showFiles: true}))
        .pipe(imagemin())
        .pipe(size({title: 'Images size after compression: ', showFiles: true}))
        .pipe(gulp.dest(imagesOpts.out));

});

// Tâche par défaut exécutée lorsqu’on tape juste *gulp* dans le terminal
gulp.task('default', function () {

});

