const privatGrabber = require('./privatGrabber/');
const financeGrabber = require('./financeGrabber/');
const kursGrabber = require('./kursGrabber/');

module.exports = function () {
	privatGrabber();
	financeGrabber();
	kursGrabber();
} 