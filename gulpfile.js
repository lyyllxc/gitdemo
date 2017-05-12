//less编译，压缩，合并
//js合并,压缩,混淆
//img的复制
//html压缩

var gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
var htmlmin=require('gulp-htmlmin');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('sev', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/styles/_*.less',['style']);
    gulp.watch('src/scripts/*.js',['scripts']);
    gulp.watch('src/images/*.*',['img']);
    gulp.watch('src/*.html',['html']);
});



gulp.task('style',function(){
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('scripts',function(){
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('img',function(){
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('html',function(){
     gulp.src('src/*.html')
         .pipe(htmlmin({
             collapseWhitespace:true,
             removeComments:true
         }))
         .pipe(gulp.dest('dist'))
         .pipe(browserSync.reload({stream:true}));
});


