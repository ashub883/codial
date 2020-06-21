const gulp=require('gulp');

// gulp sass convert sass to cssgulp 

const sass=require('gulp-sass')

// gulp nano compress css into one line

const cssnano=require('gulp-cssnano')

// it will rename the file if a file  name is home.css then it renamed as home(somestring).css
// so that we it will always have a different namw (identity) when sent to the browser

const rev=require('gulp-rev');

gulp.task('css',function(){


    console.log('minifying css');

    // ** means any folder or subfolder inside it
    gulp.src('./assets/scss/**/*.scss')

    // it will sass file to css
    // pipe is a function which is calling all sub middleware with a gulp
    // we are calling to all these which willm convert sass file to css

    .pipe(sass())

    // it will compress css file which is converted
    // pipe is the function which call all sub middleware with the gulp 
    .pipe(cssnano())

    // it will  make here in the decelopment mode and in production we have to move in public/assets
    .pipe(gulp.dest('./assets.css'))


    // in src there is a dest , any folder or subfolder inside asset

    return gulp.src('./assets/**/*.css')

    // it is for renaming the file
       .pipe(rev())

       .pipe(gulp.dest('./public/assets'))

       .pipe(rev.manifest({
           cwd:'public',
           merge:true
       }))
       .pipe(gulp.dest('./public/assets'));
})
