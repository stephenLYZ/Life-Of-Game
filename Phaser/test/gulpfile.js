var gulp = require('gulp')
var clean = require('gulp-clean')
var cleanCSS = require('gulp-clean-css')
var uglify = require('gulp-uglify')
var imagemin = require('gulp-imagemin')
var autoprefixer = require('gulp-autoprefixer')
var rev = require('gulp-rev')
var revCollector = require('gulp-rev-collector')
var connect = require('gulp-connect')
var ghPages = require('gulp-gh-pages')

gulp.task('minifyCSS',function(){
  return gulp.src('./src/index.css')
          .pipe(autoprefixer({
                    browsers: ['last 2 versions'],
                    cascade: false
                }))
          .pipe(cleanCSS())
          .pipe(rev())
          .pipe(gulp.dest('./dist/'))
          .pipe(rev.manifest())
          .pipe(gulp.dest('./rev/css'))
})

gulp.task('minifyJS',function(){
  return gulp.src('./src/index.js')
          .pipe(uglify())
          .pipe(rev())
          .pipe(gulp.dest('./dist/'))
          .pipe(rev.manifest())
          .pipe(gulp.dest('./rev/js'))
})

gulp.task('minImage',function(){
  return gulp.src('./src/assets/*')
          .pipe(imagemin())
          .pipe(gulp.dest('./dist/assets/'))
})

gulp.task('cleanCSS',function(){
  return gulp.src('./dist/*.css')
          .pipe(clean())
})
gulp.task('cleanJS',function(){
  return gulp.src('./dist/*.js')
          .pipe(clean())
})

gulp.task('connect',function(){
  return connect.server({
    livereload: true
  })
})

gulp.task('version',['minifyCSS','minifyJS','minImage'],function(){
  return gulp.src(['./rev/**/*.json','./src/index.html'])
          .pipe(revCollector())
          .pipe(gulp.dest('./dist'))
          .pipe(connect.reload())
})

gulp.task('watch',function(){
  gulp.watch('src/index.css',['cleanCSS','version'])
  gulp.watch('src/index.js',['cleanJS','version'])
})

gulp.task('build',['version'])

gulp.task('deploy',function(){
  return gulp.src('./dist/**/*')
          .pipe(ghPages())
})

gulp.task('server',['connect','watch'])
