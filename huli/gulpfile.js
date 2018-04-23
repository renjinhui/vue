const gulp = require('gulp');
const uglify = require('gulp-uglify');
const changed = require('gulp-changed');
const fs = require('fs');

const src = './dist_src/*.js';
const dest = './dist/';

gulp.task('uglify:bundle', function(){
	gulp.src(src)
		.pipe(changed(dest))
		.pipe(uglify({
			compress: { screw_ie8: false },
			mangle: { screw_ie8: false },
			output: { screw_ie8: false }
		}))
		.pipe(gulp.dest(dest))
});

gulp.task('build', ['uglify:bundle']);
