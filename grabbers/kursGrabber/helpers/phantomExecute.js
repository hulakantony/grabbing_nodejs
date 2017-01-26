var util = require('util'),
    exec = require('child_process').exec;

module.exports = function(callback) {  
	try{  
    exec('phantomjs phantom.js', function(err, stdout){
        if(err) {
          throw err;
        }  
        const out = stdout.match(/{.+}/i);
        if(out) {
        	callback(out[0]);
        } else {
        	callback('nodata');
        }     
        
    });
	} catch(err) {
		console.log(err)
	}
};