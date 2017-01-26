const savePhantomData = require('./helpers/savePhantomData');
const phantomExecute = require('./helpers/phantomExecute');

module.exports = function () {
    phantomExecute(savePhantomData);
}