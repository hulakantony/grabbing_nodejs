var util = require('util'),
    exec = require('child_process').exec;

module.exports = function(callback) {    
    exec('phantomjs phantom.js', function(err, stdout){
        if(err) {
          throw err;
        }          
        callback(stdout.match(/{.+}/i)[0]);
    });
};
