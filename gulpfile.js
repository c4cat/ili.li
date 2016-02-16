// 
// 
//
//
//

//npm install --save-dev gulp
//npm install -g browser-sync


var gulp = require('gulp'),
	livereload = require('gulp-livereload'),
	webserver = require('gulp-webserver'),
	fileinclude = require('gulp-file-include'),
    // gutil = require('gulp-util'),
	less = require('gulp-less');

//html
gulp.task('html', function() {
    return gulp.src("*.html")
        // .pipe(gulp.dest('dist/'))
        .pipe(livereload());
        // .pipe(notify({ message: 'html task complete' }));
}); 

//css just reload
gulp.task('css', function() {
    return gulp.src("*.css")
        // .pipe(gulp.dest('dist/'))
        .pipe(livereload());
        // .pipe(notify({ message: 'html task complete' }));
}); 

//less
gulp.task('less', function() {
    return gulp.src("./static/css/*.less")
        .pipe(less().on('error', function(err){
            // gutil.log(err);
            this.emit('end');
        }))
        .pipe(gulp.dest('./static/css'))
        .pipe(livereload());
}); 

//
gulp.task('fileinclude', function() {
  gulp.src(['./template/*.html'])
    .pipe(fileinclude('@@'))
    .pipe(gulp.dest('./'))
    .pipe(livereload());
});

gulp.task('webserver', function() {
	gulp.src( './' ).pipe(webserver({ 
	  livereload: true, 
	  open: true ,
	  port: 5177
	}));
});

gulp.task('watch', function () {
    gulp.watch( '*.html', ['html']);
    gulp.watch( 'static/css/*.less', ['less']);
    gulp.watch( 'static/css/*.css', ['css']);
    gulp.watch( 'template/**/*.html', ['fileinclude']);
});


gulp.task('default',['webserver','watch']);