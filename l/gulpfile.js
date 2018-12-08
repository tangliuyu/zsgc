var gulp = require('gulp');

var server = require('gulp-webserver');

gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8081,
            proxies: [{
                source: '/users',
                target: 'http://localhost:3000/users',
            },{
                source: '/users/api/add',
                target: 'http://localhost:3000/users/api/add',
            },{
                source: '/users/api/detail',
                target: 'http://localhost:3000/users/api/detail',
            },
			{
				source: '/users/api/del',
				target: 'http://localhost:3000/users/api/del',
			}
			
			
			]

        }))
})