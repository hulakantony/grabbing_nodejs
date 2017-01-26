var util = require('util'),
    exec = require('child_process').exec;

module.exports = function(callback) {  
	try{  
    exec('phantomjs phantom.js', function(err, stdout){
        if(err) {
          throw err;
        }          
        callback(stdout.match(/{.+}/i)[0]);
    });
	} catch(err) {
		console.log(err)
	}
};
