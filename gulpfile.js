const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

 
gulp.task('default', () => {
    return gulp.src('source/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('compile')); 
});



