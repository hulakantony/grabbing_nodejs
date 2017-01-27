const cron = require('node-cron');
const fromGrabbersToDB = require('../../../grabbers/');

module.exports = function () {
	fromGrabbersToDB();
	cron.schedule('* * 6 * * *', function() {
	    fromGrabbersToDB();
	});
}