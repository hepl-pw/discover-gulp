// Définition des dépendances dont on a besoin pour exécuter les tâches
var
    gulp = require('gulp'),
    imagemin = require('gulp-imagemin');

// Définition de quelques variables générales pour notre gulpfile
var
    source = 'source/',
    dest = 'build/';

// Définition de quelques variables liées à nos tâches (options de tâches)
var
    imagesOpts = {

    };

// Définition des tâches
gulp.task('images', function(){
    gulp.src()
});

// Tâche par défaut exécutée lorsqu’on tape juste *gulp* dans le terminal
gulp.task('default', function(){

});

