var gulp = require('gulp');

gulp.task('trade', function(done) {
    var clientFn = require('./src/client/CTOption.js');
    var client = new clientFn();

    client.run();
});
